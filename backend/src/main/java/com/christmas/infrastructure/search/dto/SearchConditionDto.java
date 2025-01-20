package com.christmas.infrastructure.search.dto;

import com.christmas.infrastructure.search.domain.LocationCategory;

public record SearchConditionDto(
        Double x,
        Double y,
        int radius,
        LocationCategory category
) {
}
