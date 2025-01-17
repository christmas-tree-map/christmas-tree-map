package com.christmas.map.domain;

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
}
