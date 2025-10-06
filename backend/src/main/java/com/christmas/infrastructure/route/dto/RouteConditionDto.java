package com.christmas.infrastructure.route.dto;

import com.christmas.common.dto.Coordinate;
import java.util.List;

public record RouteConditionDto(
        Coordinate start,
        String startName,
        Coordinate end,
        String endName,
        List<Coordinate> passList
) {
}
