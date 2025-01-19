package com.christmas.infrastructure.search.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LocationCategory {

    FOOD("FD6"),
    CAFE("CE7"),
    CULTURE("CT1");

    private String code;
}
