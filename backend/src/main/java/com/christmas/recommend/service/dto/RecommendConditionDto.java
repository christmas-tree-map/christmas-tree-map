package com.christmas.recommend.service.dto;

import com.christmas.recommend.domain.RecommendKeyword;

public record RecommendConditionDto(
        Double longitude,
        Double latitude,
        int radius,
        RecommendKeyword keyword
) {
}
