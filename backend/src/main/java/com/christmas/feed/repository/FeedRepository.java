package com.christmas.feed.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.christmas.feed.repository.entity.FeedEntity;
import com.christmas.tree.repository.TreeEntity;

public interface FeedRepository extends JpaRepository<FeedEntity, Long> {

    boolean existsByNicknameStartingWith(String nickname);

    @Query("SELECT COUNT(f) FROM FeedEntity AS f WHERE f.nickname LIKE :nickname%")
    int countAllByNickname(String nickname);

    List<FeedEntity> findAllByTreeEntityOrderByCreatedAtDesc(TreeEntity treeEntity);
}
