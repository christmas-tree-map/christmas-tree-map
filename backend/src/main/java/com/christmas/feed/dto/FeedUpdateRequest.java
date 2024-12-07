package com.christmas.feed.dto;

import jakarta.validation.constraints.NotBlank;

import org.springframework.web.multipart.MultipartFile;

public record FeedUpdateRequest(
        String content,
        MultipartFile image,
        @NotBlank(message = "비밀번호가 비어있습니다.")
        String password
) {
}
