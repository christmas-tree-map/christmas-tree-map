package com.christmas.feed.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.christmas.feed.domain.NicknameGenerator;
import com.christmas.feed.dto.FeedCreateRequest;
import com.christmas.feed.dto.FeedGetResponse;
import com.christmas.feed.dto.FeedUpdateRequest;
import com.christmas.feed.exception.InvalidPasswordException;
import com.christmas.feed.exception.code.FeedErrorCode;
import com.christmas.feed.repository.FeedImageFileRepository;
import com.christmas.feed.repository.FeedRepository;
import com.christmas.feed.repository.entity.FeedEntity;
import com.christmas.feed.repository.entity.FeedImageFileEntity;
import com.christmas.feed.repository.entity.ImageFileEntity;
import com.christmas.feed.dto.FeedUpdateResponse;
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
        if (feedRepository.existsByNicknameStartingWith(randomNickname)) {
            int count = feedRepository.countAllByNickname(randomNickname);
            return NicknameGenerator.addCountForDuplicate(randomNickname, count);
        }
        return randomNickname;
    }

    public long createLike(long id) {
        FeedEntity feedEntity = feedRepository.findById(id)
                .orElseThrow(() -> new NotFoundTreeException(
                        FeedErrorCode.FEED_NOT_FOUND,
                        Map.of("id", String.valueOf(id)))
                );
        return feedEntity.addLike();
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
            ImageFileEntity imageFileEntity = feedImageFileRepository.findByFeedEntity(feedEntity)
                    .getImageFileEntity();
            response.add(new FeedGetResponse(
                    feedEntity.getId(),
                    treeEntity.getImageCode(),
                    feedEntity.getNickname(),
                    latestUpdatedAt(feedEntity, imageFileEntity),
                    imageFileEntity.getImageUrl(),
                    feedEntity.getContent(),
                    feedEntity.getLikeCount())
            );
        }
        return response;
    }

    private LocalDateTime latestUpdatedAt(FeedEntity feedEntity, ImageFileEntity imageFileEntity) {
        if (feedEntity.getUpdatedAt().isAfter(imageFileEntity.getUpdatedAt())) {
            return feedEntity.getUpdatedAt();
        }
        return imageFileEntity.getUpdatedAt();
    }

    public FeedUpdateResponse updateFeed(long id, MultipartFile image, FeedUpdateRequest request) {
        FeedEntity feedEntity = feedRepository.findById(id)
                .orElseThrow(() -> new NotFoundTreeException(
                        FeedErrorCode.FEED_NOT_FOUND,
                        Map.of("id", String.valueOf(id)))
                );
        if (invalidPassword(feedEntity, request.password())) {
            throw new InvalidPasswordException(FeedErrorCode.INVALID_PASSWORD, Map.of("password", request.password()));
        }
        if (image != null) {
            FeedImageFileEntity feedImageFileEntity = feedImageFileRepository.findByFeedEntity(feedEntity);
            imageFileService.updateImage(feedImageFileEntity.getImageFileEntity(), image);
        }
        if (request.content() != null) {
            feedEntity.updateContent(request.content());
        }
        ImageFileEntity imageFileEntity = feedImageFileRepository.findByFeedEntity(feedEntity)
                .getImageFileEntity();
        return new FeedUpdateResponse(id, imageFileEntity.getImageUrl(), feedEntity.getContent());
    }

    private boolean invalidPassword(FeedEntity feedEntity, String password) {
        return !feedEntity.getPassword().equals(password);
    }

    public long deleteFeed(long id, String password) {
        FeedEntity feedEntity = feedRepository.findById(id)
                .orElseThrow(() -> new NotFoundTreeException(
                        FeedErrorCode.FEED_NOT_FOUND,
                        Map.of("id", String.valueOf(id)))
                );
        if (invalidPassword(feedEntity, password)) {
            throw new InvalidPasswordException(FeedErrorCode.INVALID_PASSWORD, Map.of("password", password));
        }
        deleteFeedCascade(id, feedEntity);
        return id;
    }

    private void deleteFeedCascade(long id, FeedEntity feedEntity) {
        FeedImageFileEntity feedImageFileEntity = feedImageFileRepository.findByFeedEntity(feedEntity);
        feedImageFileRepository.deleteByFeedEntity(feedEntity);
        imageFileService.deleteImage(feedImageFileEntity.getImageFileEntity());
        feedRepository.deleteById(id);
    }

    public long deleteLike(long id) {
        FeedEntity feedEntity = feedRepository.findById(id)
                .orElseThrow(() -> new NotFoundTreeException(
                        FeedErrorCode.FEED_NOT_FOUND,
                        Map.of("id", String.valueOf(id)))
                );
        feedEntity.removeLike();
        return feedEntity.getLikeCount();
    }
}
