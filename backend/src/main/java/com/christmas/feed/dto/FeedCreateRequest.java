package com.christmas.feed.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FeedCreateRequest(
        @NotNull(message = "트리 id가 비어있습니다.")
        Long treeId,
        @NotBlank(message = "피드 내용이 비어있습니다.")
        String content,
        @NotBlank(message = "비밀번호가 비어있습니다.")
        String password
) {
}
