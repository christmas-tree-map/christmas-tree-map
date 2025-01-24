package com.christmas.recommend.dto;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;

public record PedestrianRoute(
        int durationMinutes,
        Map<String, Integer> facilityType,
        List<JsonNode> route
) {
}
