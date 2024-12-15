package com.christmas.feed.service;

import java.net.URL;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.christmas.feed.repository.ImageFileRepository;
import com.christmas.feed.repository.entity.ImageFileEntity;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class ImageFileService {

    private final ImageFileRepository imageFileRepository;
    private final S3ImageManager s3ImageManager;

    // todo 메서드명 간단하게 변경
    public ImageFileEntity createImage(MultipartFile image) {
        String key = UUID.randomUUID() + image.getOriginalFilename();
        s3ImageManager.upload(key, image);
        return imageFileRepository.save(new ImageFileEntity(key));
    }

    public URL getImageUrl(ImageFileEntity imageFileEntity) {
        String s3Key = imageFileEntity.getImageKey();
        return s3ImageManager.getUrlByKey(s3Key);
    }

    public URL updateImage(ImageFileEntity imageFileEntity, MultipartFile image) {
        String oldKey = imageFileEntity.getImageKey();
        String newKey = UUID.randomUUID() + image.getOriginalFilename();
        URL url = s3ImageManager.upload(newKey, image);
        imageFileEntity.updateImageKey(newKey);
        s3ImageManager.deleteByKey(oldKey);
        return url;
    }

    public void deleteImage(ImageFileEntity imageFileEntity) {
        imageFileRepository.deleteById(imageFileEntity.getId());
        s3ImageManager.deleteByKey(imageFileEntity.getImageKey());
    }
}
