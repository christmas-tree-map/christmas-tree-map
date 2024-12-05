package com.christmas.feed.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.christmas.feed.repository.entity.FeedEntity;

public interface FeedRepository extends JpaRepository<FeedEntity, Long> {
}
