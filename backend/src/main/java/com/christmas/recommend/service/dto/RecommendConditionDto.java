package com.christmas.recommend.service.dto;

import com.christmas.map.domain.LocationCategory;

public record RecommendConditionDto(
        Double longitude,
        Double latitude,
        int radius,
        LocationCategory category
) {
}
