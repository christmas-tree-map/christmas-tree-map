package com.christmas.feed.dto;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "피드 조회 응답 바디")
public record FeedGetResponse(
        @Schema(description = "트리 이미지 코드", example = "TREE_01")
        String treeImageCode,
        @Schema(description = "피드 작성자 닉네임", example = "귀여운산타클로스")
        String nickname,
        @Schema(description = "피드 생성 시기", example = "2024-12-07T15:30:45.123")
        LocalDateTime createdAt,
        @Schema(description = "피드에 삽입된 이미지", example = "크리스마스.jpg")
        String imageUrl,
        @Schema(description = "피드 내용")
        String content,
        @Schema(description = "좋아요 수")
        long likeCount
) {
}
