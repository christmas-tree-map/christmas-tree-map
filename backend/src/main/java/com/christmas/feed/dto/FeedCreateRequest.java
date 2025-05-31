package com.christmas.feed.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "피드 생성 요청 바디")
public record FeedCreateRequest(
        @Schema(description = "트리 id")
        @NotNull(message = "트리 id가 비어있습니다.")
        Long treeId,

        @Schema(description = "피드 내용")
        @NotBlank(message = "피드 내용이 비어있습니다.")
        String content,

        @Schema(description = "비밀번호")
        @NotBlank(message = "비밀번호가 비어있습니다.")
        String password
) {
}
