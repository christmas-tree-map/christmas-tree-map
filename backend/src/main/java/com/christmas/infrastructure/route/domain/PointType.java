package com.christmas.infrastructure.route.domain;

import java.util.Map;

import com.christmas.infrastructure.route.exception.NotFoundPointType;
import com.christmas.infrastructure.route.exception.code.DistanceErrorCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum PointType {

    SP("출발지"),
    EP("도착지"),
    PP("경유지"),
    PP1("경유지1"),
    PP2("경유지2"),
    PP3("경유지3"),
    PP4("경유지4"),
    PP5("경유지5"),
    GP("일반 안내점");

    private final String description;

    public static PointType findByName(String name) {
        for (PointType pointType : PointType.values()) {
            if (pointType.name().equals(name)) {
                return pointType;
            }
        }
        throw new NotFoundPointType(DistanceErrorCode.NOT_FOUND_POINT_TYPE_BY_NAME, Map.of("pointType name", name));
    }
}
