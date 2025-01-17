package com.christmas.map.dto;

import java.util.Map;

import com.christmas.map.domain.FacilityType;

public record DistanceRouteInfo(
        int totalSeconds,
        Map<FacilityType, Integer> facilityInfo
) {
}
