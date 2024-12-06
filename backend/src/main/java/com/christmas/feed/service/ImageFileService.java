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
        s3ImageManager.upload(key, image);
        return imageFileRepository.save(new ImageFileEntity(key));
    }

    public URL getImageUrl(ImageFileEntity imageFileEntity) {
        String s3Key = imageFileEntity.getImageKey();
        return s3ImageManager.getUrlByKey(s3Key);
    }
}
