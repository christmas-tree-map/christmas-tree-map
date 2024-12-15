package com.christmas.feed.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.christmas.feed.repository.entity.ImageFileEntity;

public interface ImageFileRepository extends JpaRepository<ImageFileEntity, Long> {
}
