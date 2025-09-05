package com.christmas.recommend.dto;

import com.christmas.recommend.domain.Location;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "볼거리 3가지 장소 응답")
public record AttractionGetResponse(
        @Schema(description = "볼거리 장소 정보가 3개 들어있다. 만약 해당 위치에 볼거리가 3개보다 적다면, 3개보다 더 적은 값이 응답된다.")
        List<JsonNode> attractions
) {
    public static AttractionGetResponse from(List<Location> locations) {
        List<JsonNode> attractions = locations.stream()
                .map(location -> (JsonNode) location.getRaw())
                .toList();
        return new AttractionGetResponse(attractions);
    }
}
