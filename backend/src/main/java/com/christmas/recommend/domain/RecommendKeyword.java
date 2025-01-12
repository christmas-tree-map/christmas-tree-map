package com.christmas.recommend.domain;

import static com.christmas.map.domain.LocationCategory.CAFE;
import static com.christmas.map.domain.LocationCategory.CULTURE;
import static com.christmas.map.domain.LocationCategory.FOOD;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.christmas.map.domain.LocationCategory;
import com.christmas.recommend.exception.NotExistKeywordCategory;
import com.christmas.recommend.exception.code.RecommendErrorCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum RecommendKeyword {

    일식(List.of(FOOD)),
    중식(List.of(FOOD)),
    한식(List.of(FOOD)),
    양식(List.of(FOOD)),
    분위기있는(List.of(CAFE)),
    루프탑(List.of(CAFE)),
    디저트(List.of(CAFE)),
    전시(List.of(CULTURE)),
    복합문화공간(List.of(CULTURE)),
    공방(List.of(CULTURE)),
    공원(List.of(CULTURE)),
    공연장(List.of(CULTURE)),
    명소거리(List.of(CULTURE)),
    영화관(List.of(CULTURE));

    private final List<LocationCategory> category;

    protected static final List<RecommendKeyword> FOOD_KEYWORDS = Arrays.stream(values())
            .filter(keyword -> keyword.category.contains(FOOD))
            .toList();
    protected static final List<RecommendKeyword> CAFE_KEYWORDS = Arrays.stream(values())
            .filter(keyword -> keyword.category.contains(CAFE))
            .toList();
    protected static final List<RecommendKeyword> CULTURE_KEYWORDS = Arrays.stream(values())
            .filter(keyword -> keyword.category.contains(CULTURE))
            .toList();

    public static List<RecommendKeyword> getKeywords(LocationCategory category) {
        if (category.equals(FOOD)) {
            return FOOD_KEYWORDS;
        }
        if (category.equals(CAFE)) {
            return CAFE_KEYWORDS;
        }
        if (category.equals(CULTURE)) {
            return CULTURE_KEYWORDS;
        }
        throw new NotExistKeywordCategory(
                RecommendErrorCode.NOT_EXIST_CATEGORY,
                Map.of("category", String.valueOf(category))
        );
    }
}
