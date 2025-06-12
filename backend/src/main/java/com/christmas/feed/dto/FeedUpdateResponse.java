package com.christmas.feed.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "피드 수정 응답")
public record FeedUpdateResponse(
        @Schema(description = "피드 id")
        long id,
        @Schema(description = "트리 id")
        long treeId,
        @Schema(description = "피드에 삽입된 이미지", example = "크리스마스.jpg")
        String imageUrl,
        @Schema(description = "피드 내용")
        String content
) {
}
