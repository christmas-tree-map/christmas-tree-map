package com.christmas.feed.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.christmas.common.application.TimestampEntity;
import com.christmas.tree.repository.TreeEntity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "feed")
public class FeedEntity extends TimestampEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tree_id")
    private TreeEntity treeEntity;

    @Column(name = "nickname", unique = true, nullable = false)
    private String nickname;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "like_count", nullable = false)
    private Long likeCount;

    public FeedEntity(TreeEntity treeEntity, String nickname, String password, String content, Long likeCount) {
        this.treeEntity = treeEntity;
        this.nickname = nickname;
        this.password = password;
        this.content = content;
        this.likeCount = likeCount;
    }

    public long addLike() {
        return likeCount + 1;
    }
}
