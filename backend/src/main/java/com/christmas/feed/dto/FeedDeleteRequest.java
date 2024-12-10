package com.christmas.feed.dto;

import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "피드 삭제 요청 바디")
public record FeedDeleteRequest(
        @Schema(description = "비밀번호")
        @NotNull
        String password
) {
}