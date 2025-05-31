package com.christmas.tree.dto;

import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "트리 조회 요청")
public record TreeGetRequest(
        @Schema(description = "현재 위치 경도", example = "127.2")
        @NotNull(message = "경도 값이 존재하지 않습니다.")
        Double longitude,

        @Schema(description = "현재 위치 위도", example = "20.3")
        @NotNull(message = "위도 값이 존재하지 않습니다.")
        Double latitude
) {
}
