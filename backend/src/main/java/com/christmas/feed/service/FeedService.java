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
import com.christmas.feed.exception.InvalidPasswordException;
import com.christmas.feed.exception.code.FeedErrorCode;
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
        TreeEntity treeEntity = treeRepository.findById(request.treeId())
                .orElseThrow(() -> new NotFoundTreeException(
                        TreeErrorCode.TREE_NOT_FOUND,
                        Map.of("tree id", String.valueOf(request.treeId())))
                );
        String nickname = generateUniqueNickname(NicknameGenerator.generate());
        FeedEntity feedEntity = new FeedEntity(treeEntity, nickname, request.password(), request.content(), 0L);
        FeedEntity savedFeedEntity = feedRepository.save(feedEntity);
        ImageFileEntity imageFileEntity = imageFileService.createImage(image);
        feedImageFileRepository.save(new FeedImageFileEntity(feedEntity, imageFileEntity));
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
                        TreeErrorCode.TREE_NOT_FOUND,
                        Map.of("tree id", String.valueOf(treeId)))
                );
        List<FeedEntity> feedEntities = feedRepository.findAllByTreeEntityOrderByCreatedAtDesc(treeEntity);
        List<FeedGetResponse> response = new ArrayList<>();
        for (FeedEntity feedEntity : feedEntities) {
            FeedImageFileEntity feedImageFileEntity = feedImageFileRepository.findByFeedEntity(feedEntity);
            URL imageUrl = imageFileService.getImageUrl(feedImageFileEntity.getImageFileEntity());
            response.add(new FeedGetResponse(
                    treeEntity.getImageCode(),
                    feedEntity.getNickname(),
                    feedEntity.getCreatedAt(),
                    imageUrl.toString(),
                    feedEntity.getContent(),
                    feedEntity.getLikeCount())
            );
        }
        return response;
    }

    public void deleteFeed(long id, String password) {
        FeedEntity feedEntity = feedRepository.findById(id)
                .orElseThrow(() -> new NotFoundTreeException(
                        FeedErrorCode.FEED_NOT_FOUND,
                        Map.of("id", String.valueOf(id)))
                );
        if (feedEntity.getPassword().equals(password)) {
            FeedImageFileEntity feedImageFileEntity = feedImageFileRepository.findByFeedEntity(feedEntity);
            feedImageFileRepository.deleteByFeedEntity(feedEntity);
            imageFileService.deleteImage(feedImageFileEntity.getImageFileEntity());
            feedRepository.deleteById(id);
        }
        throw new InvalidPasswordException(FeedErrorCode.INVALID_PASSWORD, Map.of("password", password));
    }
}
