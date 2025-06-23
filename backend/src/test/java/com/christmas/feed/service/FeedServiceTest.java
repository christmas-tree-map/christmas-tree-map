package com.christmas.feed.service;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.christmas.feed.dto.FeedCreateRequest;
import com.christmas.feed.dto.FeedUpdateResponse;
import com.christmas.feed.repository.FeedImageFileRepository;
import com.christmas.feed.repository.FeedRepository;
import com.christmas.feed.repository.ImageFileRepository;
import com.christmas.feed.repository.entity.FeedEntity;
import com.christmas.feed.repository.entity.FeedImageFileEntity;
import com.christmas.feed.repository.entity.ImageFileEntity;
import com.christmas.tree.domain.PointGenerator;
import com.christmas.tree.repository.TreeEntity;
import com.christmas.tree.repository.TreeRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@SpringBootTest
class FeedServiceTest {

    @Autowired
    private FeedService feedService;

    @Autowired
    private ImageFileService imageFileService;

    @Autowired
    private TreeRepository treeRepository;

    @Autowired
    private FeedRepository feedRepository;

    @Autowired
    private FeedImageFileRepository feedImageFileRepository;

    @Autowired
    private ImageFileRepository imageFileRepository;

    @Test
    @DisplayName("피드를 생성한다. - 피드 레포지토리, 피드이미지 레포지토리, 이미지 레포지토리에 저장")
    void create_feed() {
        // given
        TreeEntity treeEntity = treeRepository.save(new TreeEntity(PointGenerator.generate(127.2, 30.5), "IMAGE_CODE"));
        MultipartFile image = new MockMultipartFile("Image", "newContent".getBytes());
        FeedCreateRequest request = new FeedCreateRequest(treeEntity.getId(), "피드 내용", "abc234!!");

        // when
        long feedId = feedService.createFeed(request, image);

        // then
        assertThat(feedRepository.existsById(feedId)).isTrue();
        assertThat(feedImageFileRepository.findAll()).hasSize(1);
    }

    @Disabled
    @Test
    @DisplayName("피드 생성 시 닉네임이 DB에 존재하면 닉네임 뒤에 중복 개수를 붙인다.")
    void create_duplicate_nickname() {
        // given
        TreeEntity treeEntity = treeRepository.save(
                new TreeEntity(PointGenerator.generate(127.2, 30.5), "IMAGE_CODE"));
        String nickname = "귀여운산타클로스";
        feedRepository.save(new FeedEntity(treeEntity, nickname, "abcde123", "내용", 0L));
        MultipartFile image = new MockMultipartFile("testImage", "content".getBytes());
        FeedCreateRequest request = new FeedCreateRequest(treeEntity.getId(), "피드 내용", "abc234!!");
        ImageFileEntity imageFileEntity = imageFileRepository.save(new ImageFileEntity("test", "test", "test"));
        when(imageFileService.createImage(any()))
                .thenReturn(imageFileEntity);
        // todo: 닉네임 제너레이터 인터페이스로 바꾸기
        feedService.createFeed(request, image);
        int count = 2;

        // when
        long feedId = feedService.createFeed(request, image);
        FeedEntity feedEntity = feedRepository.findById(feedId)
                .orElseThrow();

        // then
        assertThat(feedEntity.getNickname()).isEqualTo(nickname + count);
    }

    @Test
    @DisplayName("피드 비밀번호가 다르면 false를 반환한다.")
    void verify_password() {
        // given
        TreeEntity treeEntity = treeRepository.save(new TreeEntity(PointGenerator.generate(127.2, 30.5), "IMAGE_CODE"));
        String truePassword = "realpwd1234";
        String falsePassword = "nonopwd!!";
        FeedEntity feedEntity = new FeedEntity(treeEntity, "hoho", truePassword, "hi", 1L);
        FeedEntity save = feedRepository.save(feedEntity);

        // when
        boolean isVerify = feedService.canUpdateFeed(save.getId(), falsePassword);

        // then
        assertThat(isVerify).isFalse();
    }

    @Test
    @DisplayName("피드 수정 - 이미지 파일만 수정한다.")
    void update_feed_image_only() {
        // given
        TreeEntity treeEntity = treeRepository.save(new TreeEntity(PointGenerator.generate(127.2, 30.5), "IMAGE_CODE"));
        MultipartFile oldImage = new MockMultipartFile("oldImage", "oldContent".getBytes());
        long id = feedService.createFeed(new FeedCreateRequest(treeEntity.getId(), "content", "password123"), oldImage);
        MultipartFile newImage = new MockMultipartFile("newImage", "newContent".getBytes());

        // when
        FeedUpdateResponse response = feedService.updateFeed(id, newImage, null);

        // then
        FeedEntity feedEntity = feedRepository.findById(response.id())
                .orElseThrow();
        FeedImageFileEntity feedImageFileEntity = feedImageFileRepository.findByFeedEntity(feedEntity);
        assertThat(response.imageUrl()).isEqualTo(feedImageFileEntity.getImageFileEntity().getImageUrl());
    }
}
