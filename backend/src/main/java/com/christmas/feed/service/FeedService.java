package com.christmas.feed.service;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.christmas.feed.domain.NicknameGenerator;
import com.christmas.feed.dto.FeedCreateRequest;
import com.christmas.feed.dto.FeedGetResponse;
import com.christmas.feed.repository.FeedImageFileRepository;
import com.christmas.feed.repository.FeedRepository;
import com.christmas.feed.repository.entity.FeedEntity;
import com.christmas.feed.repository.entity.FeedImageFileEntity;
import com.christmas.feed.repository.entity.ImageFileEntity;
import com.christmas.tree.exception.NotFoundTreeException;
import com.christmas.tree.exception.code.TreeErrorCode;
import com.christmas.tree.repository.TreeEntity;
import com.christmas.tree.repository.TreeRepository;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class FeedService {

    private final TreeRepository treeRepository;
    private final FeedRepository feedRepository;
    private final FeedImageFileRepository feedImageFileRepository;
    private final ImageFileService imageFileService;

    public long createFeed(FeedCreateRequest request, MultipartFile image) {
        // todo 1. 트리 id로 트리 찾기.
        TreeEntity treeEntity = treeRepository.findById(request.treeId())
                .orElseThrow(() -> new NotFoundTreeException(
                        TreeErrorCode.NOT_FOUND_TREE,
                        Map.of("tree id", String.valueOf(request.treeId())))
                );
        // todo 2. 닉네임 생성 및 중복검사
        String nickname = generateUniqueNickname(NicknameGenerator.generate());

        // todo 3. 피드 객체 만들기
        FeedEntity feedEntity = new FeedEntity(treeEntity, nickname, request.password(), request.content(), 0L);

        // todo 4. 피드 객체 저장
        FeedEntity savedFeedEntity = feedRepository.save(feedEntity);

        // todo 5. 이미지 서비스 호출해서 이미지 엔티티 저장 및 s3 업로드
        ImageFileEntity imageFileEntity = imageFileService.createImage(image);

        // todo: 피드이미지 저장
        feedImageFileRepository.save(new FeedImageFileEntity(feedEntity, imageFileEntity));

        // todo 6. 피드 id 반환
        return savedFeedEntity.getId();
    }

    private String generateUniqueNickname(String randomNickname) {
        if (feedRepository.existsByNickname(randomNickname)) {
            int count = feedRepository.countAllByNickname(randomNickname);
            return NicknameGenerator.addCountForDuplicate(randomNickname, count);
        }
        return randomNickname;
    }

    public List<FeedGetResponse> getAllFeedByTree(long treeId) {
        TreeEntity treeEntity = treeRepository.findById(treeId)
                .orElseThrow(() -> new NotFoundTreeException(
                        TreeErrorCode.NOT_FOUND_TREE,
                        Map.of("tree id", String.valueOf(treeId)))
                );
        // 모든 피드 엔티티 불러옴.
        List<FeedEntity> feedEntities = feedRepository.findAllByTreeEntityOrderByCreatedAtDesc(treeEntity);
        // 이제 각 피드 엔티티의 이미지를 불러와야 함.
        List<FeedGetResponse> response = new ArrayList<>();
        for (FeedEntity feedEntity : feedEntities) {
            FeedImageFileEntity feedImageFileEntity = feedImageFileRepository.findByFeedEntity(feedEntity);
            URL imageUrl = imageFileService.getImageUrl(feedImageFileEntity.getImageFileEntity());
            response.add(new FeedGetResponse(
                    feedEntity.getNickname(),
                    feedEntity.getCreatedAt(),
                    imageUrl.toString(),
                    feedEntity.getContent(),
                    feedEntity.getLikeCount())
            );
        }
        return response;
    }
}
