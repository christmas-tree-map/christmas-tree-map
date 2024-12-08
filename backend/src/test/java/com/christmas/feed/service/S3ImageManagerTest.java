package com.christmas.feed.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;

import com.christmas.config.S3MockConfig;

import io.findify.s3mock.S3Mock;

@Import(S3MockConfig.class)
@SpringBootTest
class S3ImageManagerTest {

    @Autowired
    private S3Mock s3Mock;

    @Autowired
    private S3ImageManager s3ImageManager;

    @AfterEach
    public void tearDown() {
        s3Mock.stop();
    }

    @DisplayName("Multipart 이미지를 s3에 업로드한다.")
    @Test
    void upload_image() {
        // given
        String imageName = "testname";
        String originalImageName = "testname.png";
        String contentType = "image/png";
        byte[] content = imageName.getBytes();
        MockMultipartFile image = new MockMultipartFile(imageName, originalImageName, contentType, content);
        String key = "testkey";

        // when
        String actual = s3ImageManager.upload(key, image);

        // then
        assertThat(actual).contains(key);
    }
}
