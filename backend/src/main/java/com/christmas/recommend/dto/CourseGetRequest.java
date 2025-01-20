package com.christmas.recommend.dto;

import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "코스 추천 요청")
public record CourseGetRequest(
        @Schema(description = "현재 위치 경도")
        @NotNull(message = "경도 값이 존재하지 않습니다.")
        Double longitude,

        @Schema(description = "현재 위치 위도")
        @NotNull(message = "위도 값이 존재하지 않습니다.")
        Double latitude
) {
}
