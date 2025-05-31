package com.christmas.feed.repository.entity;

import java.util.Map;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.christmas.common.application.TimestampEntity;
import com.christmas.feed.exception.NegativeValueException;
import com.christmas.feed.exception.code.FeedErrorCode;
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

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tree_id", nullable = false)
    private TreeEntity treeEntity;

    @NotNull
    @Column(name = "nickname", unique = true, nullable = false)
    private String nickname;

    @NotNull
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d).+$", message = "비밀번호는 영문과 숫자를 포함해야 합니다.")
    @Length(min = 8, max = 16, message = "비밀번호는 최소 8자, 최대 16자여야 합니다.")
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @Length(max = 300, message = "피드 내용은 최대 300자를 넘을 수 없습니다.")
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
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
        return ++likeCount;
    }

    public void removeLike() {
        if (likeCount == 0) {
            throw new NegativeValueException(FeedErrorCode.NEGATIVE_LIKE_COUNT, Map.of("likeCount", "0"));
        }
        likeCount--;
    }

    public void updateContent(String content) {
        this.content = content;
    }
}
