package com.christmas.feed.dto;

import org.springframework.web.multipart.MultipartFile;

public record FeedUpdateRequest(
        String content,
        MultipartFile image,
        String password
) {
}
