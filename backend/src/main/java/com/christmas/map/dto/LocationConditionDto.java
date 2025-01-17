package com.christmas.map.dto;

import com.christmas.map.domain.LocationCategory;

public record LocationConditionDto(
        Double x,
        Double y,
        int radius,
        LocationCategory category
) {
}
