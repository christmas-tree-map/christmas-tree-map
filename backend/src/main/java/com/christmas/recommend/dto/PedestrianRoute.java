package com.christmas.recommend.dto;

import java.util.Map;

public record PedestrianRoute(
        int durationMinutes,
        Map<String, Integer> facilityType
) {
}
