package com.christmas.feed.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.annotation.Nullable;

@Schema(name = "피드 수정 요청")
public record FeedUpdateRequest(
        @Schema(description = "수정한 피드 내용. 수정을 했을 때만 값을 요청한다.", nullable = true)
        @Nullable
        String content
) {
}
