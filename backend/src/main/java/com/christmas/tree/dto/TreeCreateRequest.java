package com.christmas.tree.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "트리 생성 요청 바디")
public record TreeCreateRequest(
        @Schema(description = "트리의 경도", example = "127")
        @NotNull(message = "경도 값이 존재하지 않습니다.")
        Double longitude,

        @Schema(description = "트리의 위도", example = "37")
        @NotNull(message = "위도 값이 존재하지 않습니다.")
        Double latitude,

        @Schema(description = "트리 마커 이미지 코드", example = "TREE_01")
        @NotBlank(message = "이미지 코드가 비어있습니다.")
        String imageCode
) {
}
