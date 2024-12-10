package com.christmas.feed.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "피드 수정 요청")
public record FeedUpdateRequest(
        @Schema(description = "비밀번호")
        @NotBlank(message = "비밀번호가 비어있습니다.")
        String password,

        @Nullable
        @Schema(description = "수정한 피드 내용. 수정을 했을 때만 값을 요청한다.", nullable = true)
        String content
) {
}
