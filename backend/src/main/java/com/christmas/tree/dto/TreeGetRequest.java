package com.christmas.tree.dto;

import jakarta.validation.constraints.NotNull;

public record TreeGetRequest(
        @NotNull(message = "위도 값이 존재하지 않습니다.")
        Double latitude,
        @NotNull(message = "경도 값이 존재하지 않습니다.")
        Double longitude
) {
}
