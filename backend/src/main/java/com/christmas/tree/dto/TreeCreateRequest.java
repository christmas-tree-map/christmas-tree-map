package com.christmas.tree.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TreeCreateRequest(
        @NotNull
        Double longitude,
        @NotNull
        Double latitude,
        @NotBlank
        String imageCode
) {
}
