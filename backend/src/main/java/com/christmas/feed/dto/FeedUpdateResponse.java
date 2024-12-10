package com.christmas.feed.dto;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "피드 수정 응답 바디")
public record FeedUpdateResponse(
        @Schema(description = "피드 수정 시기", example = "2024-12-07T15:30:45.123")
        LocalDateTime updatedAt,
        @Schema(description = "피드에 삽입된 이미지", example = "크리스마스.jpg")
        String imageUrl,
        @Schema(description = "피드 내용")
        String content
) {
    public static FeedUpdateResponse from(FeedGetResponse getResponse) {
        return new FeedUpdateResponse(getResponse.updatedAt(), getResponse.imageUrl(), getResponse.content());
    }
}
