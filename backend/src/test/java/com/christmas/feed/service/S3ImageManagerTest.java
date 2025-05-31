package com.christmas.feed.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import com.christmas.feed.exception.NotFoundS3ImageException;


@SpringBootTest
class S3ImageManagerTest {

    @Autowired
    private S3ImageManager s3ImageManager;

    @DisplayName("Multipart 이미지를 s3에 업로드한다.")
    @Test
    void upload_image() {
        // given
        MockMultipartFile image = new MockMultipartFile("test", "test.png", "image/png", "test".getBytes());
        String key = "testkey";

        // when
        String actual = s3ImageManager.upload(key, image).toString();

        // then
        assertThat(actual).contains(key);
    }

    @DisplayName("이미지를 s3에서 삭제한다.")
    @Test
    void delete_image() {
        // given
        String key = "testKey";
        MockMultipartFile image = new MockMultipartFile("test", "test.png", "image/png", "test".getBytes());
        s3ImageManager.upload(key, image);

        // when
        s3ImageManager.deleteByKey(key);

        // then
        assertThatThrownBy(() -> s3ImageManager.getUrlByKey(key))
                .isExactlyInstanceOf(NotFoundS3ImageException.class);
    }
}
