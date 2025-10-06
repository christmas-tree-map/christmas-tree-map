package com.christmas.tree.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "트리 조회 응답 바디 element. 실제 응답은 TreeGetResponse 배열이다.")
public record TreeGetResponse(
        @Schema(description = "트리 id", example = "1")
        long id,

        @Schema(description = "현재 위치에서 트리까지의 거리")
        double distance,

        @Schema(description = "트리 경도", example = "127")
        Double longitude,

        @Schema(description = "트리 위도", example = "35")
        Double latitude,

        @Schema(description = "트리 이미지 코드", example = "TREE_01")
        String imageCode
) {
}
