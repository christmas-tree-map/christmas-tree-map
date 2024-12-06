package com.christmas.feed.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.christmas.common.application.TimestampEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "image_file")
public class ImageFileEntity extends TimestampEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_key", nullable = false)
    private String imageKey;

    public ImageFileEntity(String imageKey) {
        this.imageKey = imageKey;
    }

    public void updateImageKey(String imageKey) {
        this.imageKey = imageKey;
    }
}
