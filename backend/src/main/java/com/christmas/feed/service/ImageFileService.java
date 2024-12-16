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

    public ImageFileEntity createImage(MultipartFile image) {
        String key = UUID.randomUUID() + image.getOriginalFilename();
        final URL imageUrl = s3ImageManager.upload(key, image);
        return imageFileRepository.save(new ImageFileEntity(image.getOriginalFilename(), key, imageUrl.toString()));
    }

    public ImageFileEntity updateImage(ImageFileEntity imageFileEntity, MultipartFile newImage) {
        String oldKey = imageFileEntity.getImageKey();
        String newKey = UUID.randomUUID() + newImage.getOriginalFilename();
        URL url = s3ImageManager.upload(newKey, newImage);
        imageFileEntity.updateImage(newImage.getOriginalFilename(), newKey, url.toString());
        s3ImageManager.deleteByKey(oldKey);
        return imageFileEntity;
    }

    public void deleteImage(ImageFileEntity imageFileEntity) {
        imageFileRepository.deleteById(imageFileEntity.getId());
        s3ImageManager.deleteByKey(imageFileEntity.getImageKey());
    }
}
