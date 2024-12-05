package com.christmas.feed.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.christmas.feed.repository.entity.FeedImageFileEntity;

public interface FeedImageFileRepository extends JpaRepository<FeedImageFileEntity, Long> {
}
