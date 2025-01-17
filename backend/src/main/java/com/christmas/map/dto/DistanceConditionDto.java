package com.christmas.map.dto;

import java.util.List;

public record DistanceConditionDto(
        XY start,
        String startName,
        XY end,
        String endName,
        List<XY> passList
) {
}
