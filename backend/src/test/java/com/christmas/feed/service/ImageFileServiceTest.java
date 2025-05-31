package com.christmas.feed.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.christmas.feed.repository.entity.ImageFileEntity;

@SpringBootTest
class ImageFileServiceTest {

    @Autowired
    private ImageFileService imageFileService;


    @DisplayName("s3를 사용해 업로드한 이미지를 저장한다.")
    @Test
    void create_image() {
        // given
        String originName = "imageOriginName";
        MultipartFile image = new MockMultipartFile("imageName", originName, "image/png", "content".getBytes());

        // when
        ImageFileEntity actual = imageFileService.createImage(image);

        // then
        assertThat(actual.getFileName()).isEqualTo(originName);
    }

    @DisplayName("이미지를 수정한다. - 기존 이미지를 s3에서 삭제하고, 새로운 이미지를 업로드 한 결과를 저장한다.")
    @Test
    void update_image() {
        // given
        MultipartFile oldImage = new MockMultipartFile("imageName", "originName", "image/png", "content".getBytes());
        ImageFileEntity savedImage = imageFileService.createImage(oldImage);
        MultipartFile newImage = new MockMultipartFile("newName", "newOriginName", "image/png", "content".getBytes());

        // when
        final ImageFileEntity actual = imageFileService.updateImage(savedImage, newImage);

        // then
        assertThat(actual.getFileName()).isEqualTo(newImage.getOriginalFilename());
    }

    @DisplayName("이미지를 삭제한다.")
    @Test
    void delete_image() {
        // given
        MultipartFile image = new MockMultipartFile("imageName", "originName", "image/png", "content".getBytes());
        ImageFileEntity savedImage = imageFileService.createImage(image);

        // when & then
        assertThatCode(() -> imageFileService.deleteImage(savedImage)).doesNotThrowAnyException();
    }
}
