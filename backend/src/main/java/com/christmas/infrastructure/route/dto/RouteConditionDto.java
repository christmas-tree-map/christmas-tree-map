package com.christmas.infrastructure.route.dto;

import java.util.List;

public record RouteConditionDto(
        XY start,
        String startName,
        XY end,
        String endName,
        List<XY> passList
) {
}
