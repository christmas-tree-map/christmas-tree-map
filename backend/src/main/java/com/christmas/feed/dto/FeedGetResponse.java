package com.christmas.feed.dto;

import java.time.LocalDateTime;

public record FeedGetResponse(
        String treeImageCode,
        String nickname,
        LocalDateTime createdAt,
        String imageUrl,
        String content,
        long likeCount
) {
}
