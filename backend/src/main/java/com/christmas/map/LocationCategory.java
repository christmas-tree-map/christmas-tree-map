package com.christmas.map;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LocationCategory {

    FOOD("FD6"),
    CAFE("CE7"),
    CULTURE("CT1");

    public static final String FIELD_NAME = "category_group_code";

    private String code;
}
