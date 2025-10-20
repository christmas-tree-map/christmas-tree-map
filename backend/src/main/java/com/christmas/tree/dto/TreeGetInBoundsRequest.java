package com.christmas.tree.dto;

import com.christmas.common.dto.Coordinate;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "트리 조회 요청")
public record TreeGetInBoundsRequest(Coordinate now, Coordinate topRight, Coordinate bottomLeft) {
}
