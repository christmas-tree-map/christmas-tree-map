package com.christmas.infrastructure.route.dto;

import java.util.List;
import java.util.Map;

import com.christmas.infrastructure.route.domain.FacilityType;
import com.fasterxml.jackson.databind.JsonNode;

public record RouteInfo(
        int totalSeconds,
        Map<FacilityType, Integer> facilityInfo,
        List<JsonNode> route
) {
}
