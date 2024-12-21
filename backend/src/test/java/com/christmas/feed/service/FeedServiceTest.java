package com.christmas.feed.service;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.christmas.feed.dto.FeedCreateRequest;
import com.christmas.feed.repository.FeedImageFileRepository;
import com.christmas.feed.repository.FeedRepository;
import com.christmas.feed.repository.ImageFileRepository;
import com.christmas.feed.repository.entity.FeedEntity;
import com.christmas.feed.repository.entity.ImageFileEntity;
import com.christmas.tree.domain.PointGenerator;
import com.christmas.tree.repository.TreeEntity;
import com.christmas.tree.repository.TreeRepository;

@Transactional
@SpringBootTest
class FeedServiceTest {

    @Autowired
    private FeedService feedService;

    @Autowired
    private TreeRepository treeRepository;

    @Autowired
    private FeedRepository feedRepository;

    @MockBean
    private ImageFileService imageFileService;

    @Autowired
    private FeedImageFileRepository feedImageFileRepository;

    @Autowired
    private ImageFileRepository imageFileRepository;

    @Test
    @DisplayName("피드를 생성한다. - 피드 레포지토리, 피드이미지 레포지토리, 이미지 레포지토리에 저장")
    void create_feed() {
        // given
        TreeEntity treeEntity = treeRepository.save(new TreeEntity(PointGenerator.generate(127.2, 30.5), "IMAGE_CODE"));
        ImageFileEntity imageFileEntity = imageFileRepository.save(new ImageFileEntity("test", "test", "test"));
        when(imageFileService.createImage(any()))
                .thenReturn(imageFileEntity);
        MultipartFile image = new MockMultipartFile("testImage", "content".getBytes());
        FeedCreateRequest request = new FeedCreateRequest(treeEntity.getId(), "피드 내용", "abc234!!");

        // when
        long feedId = feedService.createFeed(request, image);

        // then
        assertThat(feedRepository.existsById(feedId)).isTrue();
        assertThat(feedImageFileRepository.findAll()).hasSize(1);
    }

    @Test
    @DisplayName("피드 생성 시 닉네임이 DB에 존재하면 닉네임 뒤에 중복 개수를 붙인다.")
    void create_duplicate_nickname() {
        // given
        final TreeEntity treeEntity = treeRepository.save(
                new TreeEntity(PointGenerator.generate(127.2, 30.5), "IMAGE_CODE"));
        String nickname = "귀여운산타클로스";
        int count = 2;
        for (int i = 0; i < count; i++) {
            feedRepository.save(new FeedEntity(treeEntity, nickname, "abcde123", "내용", 0L));
        }
        MultipartFile image = new MockMultipartFile("testImage", "content".getBytes());
        FeedCreateRequest request = new FeedCreateRequest(treeEntity.getId(), "피드 내용", "abc234!!");


        // when
        long feedId = feedService.createFeed(request, image);

        // then

    }
}
