package com.christmas.feed.dto;

import jakarta.validation.constraints.NotBlank;

public record FeedVerifyRequest(@NotBlank(message = "비밀번호가 공백입니다.") String password) {
}
