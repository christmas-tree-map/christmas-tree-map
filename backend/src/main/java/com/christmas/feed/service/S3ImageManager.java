package com.christmas.feed.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.christmas.feed.exception.NotFoundS3ImageException;
import com.christmas.feed.exception.S3Exception;
import com.christmas.feed.exception.code.FeedErrorCode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3ImageManager {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final AmazonS3 amazonS3;

    public URL upload(String s3Key, MultipartFile image) {
        String imageName = image.getOriginalFilename();
        String extension = image.getContentType();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(extension);
        metadata.setContentLength(image.getSize());
        try (InputStream inputStream = image.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucketName, s3Key, inputStream, metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            log.warn("S3 upload error log", e);
            throw new S3Exception(FeedErrorCode.IMAGE_READ_FAIL, Map.of("image", imageName), e);
        } catch (Exception e) {
            log.warn("S3 upload error log", e);
            throw new S3Exception(FeedErrorCode.IMAGE_UPLOAD_FAIL, Map.of("image", imageName), e);
        }
        return amazonS3.getUrl(bucketName, s3Key);
    }

    public void deleteByKey(String key) {
        if (!amazonS3.doesObjectExist(bucketName, key)) {
            throw new NotFoundS3ImageException(FeedErrorCode.IMAGE_NOT_FOUND, Map.of("image key", key));
        }
        try {
            amazonS3.deleteObject(bucketName, key);
        } catch (Exception e) {
            log.warn("S3 delete error log", e);
            throw new S3Exception(FeedErrorCode.IMAGE_DELETE_FAIL, Map.of("image key", key), e);
        }
    }

    public URL getUrlByKey(String key) {
        if (!amazonS3.doesObjectExist(bucketName, key)) {
            throw new NotFoundS3ImageException(FeedErrorCode.IMAGE_NOT_FOUND, Map.of("image key", key));
        }
        return amazonS3.getUrl(bucketName, key);
    }
}
