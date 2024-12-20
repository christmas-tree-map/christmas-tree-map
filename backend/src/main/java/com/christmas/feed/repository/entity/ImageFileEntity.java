package com.christmas.feed.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.christmas.common.application.TimestampEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "image_file")
public class ImageFileEntity extends TimestampEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "image_key", nullable = false)
    private String imageKey;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    public ImageFileEntity(String fileName, String imageKey, String imageUrl) {
        this.fileName = fileName;
        this.imageKey = imageKey;
        this.imageUrl = imageUrl;
    }

    public void updateImage(String fileName, String imageKey, String imageUrl) {
        this.fileName = fileName;
        this.imageKey = imageKey;
        this.imageUrl = imageUrl;
    }
}
