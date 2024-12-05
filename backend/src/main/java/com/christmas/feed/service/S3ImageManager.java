package com.christmas.feed.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.christmas.feed.exception.NotFoundS3ImageException;
import com.christmas.feed.exception.S3Exception;
import com.christmas.feed.exception.code.FeedErrorCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class S3ImageManager {

    @Value("${cloud.aws.s3.bucket-name}")
    private String bucketName;

    private final AmazonS3 amazonS3;

    public String upload(String key, MultipartFile image) {
        String imageName = image.getOriginalFilename();
        String extension = image.getContentType();
        String s3Key = "images/" + key;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(extension);
        try {
            final InputStream inputStream = image.getInputStream();
            amazonS3.putObject(bucketName, s3Key, inputStream, metadata);
        } catch (IOException e) {
            throw new S3Exception(FeedErrorCode.IMAGE_READ_FAIL, Map.of("image", imageName));
        } catch (Exception e) {
            throw new S3Exception(FeedErrorCode.IMAGE_UPLOAD_FAIL, Map.of("image", imageName));
        }
        return amazonS3.getUrl(bucketName, s3Key).toString();
    }

    public void deleteByKey(String key) {
        if (!amazonS3.doesObjectExist(bucketName, key)) {
            throw new NotFoundS3ImageException(FeedErrorCode.IMAGE_NOT_FOUND, Map.of("image key", key));
        }
        try {
            amazonS3.deleteObject(bucketName, key);
        } catch (Exception e) {
            throw new S3Exception(FeedErrorCode.IMAGE_DELETE_FAIL, Map.of("image key", key));
        }
    }

    public String getUrlByKey(String key) {
        if (!amazonS3.doesObjectExist(bucketName, key)) {
            throw new NotFoundS3ImageException(FeedErrorCode.IMAGE_NOT_FOUND, Map.of("image key", key));
        }
        return amazonS3.getUrl(bucketName, key).toString();
    }
}
