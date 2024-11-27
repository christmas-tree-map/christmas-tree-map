package com.christmas.tree.dto;

public record TreeGetResponse(
        Double latitude,
        Double longitude,
        String imageCode
) {
}
