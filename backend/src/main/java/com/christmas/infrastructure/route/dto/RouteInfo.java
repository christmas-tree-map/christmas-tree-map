package com.christmas.infrastructure.route.dto;

import java.util.Map;

import com.christmas.infrastructure.route.domain.FacilityType;

public record RouteInfo(
        int totalSeconds,
        Map<FacilityType, Integer> facilityInfo
) {
}
