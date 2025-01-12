package com.christmas.recommend.service;

import static com.christmas.recommend.domain.RecommendKeyword.getKeywords;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.christmas.map.domain.LocationCategory;
import com.christmas.map.service.MapApiManager;
import com.christmas.recommend.domain.RecommendKeyword;
import com.christmas.recommend.dto.CourseGetRequest;
import com.christmas.recommend.dto.CourseGetResponse;
import com.christmas.recommend.service.dto.RecommendConditionDto;
import com.christmas.util.RandomIntPicker;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class RecommendService {

    private static final int RECOMMEND_RADIUS = 2000;

    private final MapApiManager mapApiManager;
    private final RandomIntPicker randomPicker;

    public CourseGetResponse getCourse(CourseGetRequest request) {
        List<JsonNode> foods = findRandomLocations(request, LocationCategory.FOOD);
        List<JsonNode> cafes = findRandomLocations(request, LocationCategory.CAFE);
        List<JsonNode> attractions = findRandomLocations(request, LocationCategory.CULTURE);

        List<JsonNode> lunchAndDinner = getRandomLocations(foods, 2);
        JsonNode lunch = lunchAndDinner.stream()
                .findFirst()
                .orElse(null);
        JsonNode dinner = lunchAndDinner.stream()
                .filter(list -> list.size() == 2)
                .map(list -> list.get(1))
                .findFirst()
                .orElse(null);
        JsonNode cafe = getRandomLocation(cafes);
        JsonNode attraction = getRandomLocation(attractions);

        return new CourseGetResponse(lunch, cafe, attraction, dinner);
    }

    private List<JsonNode> findRandomLocations(CourseGetRequest request, LocationCategory category) {
        int minLength = 1;
        if (category.equals(LocationCategory.FOOD)) {
            minLength = 2;
        }
        RecommendConditionDto condition = setCondition(request, category);
        for (RecommendKeyword keyword : getKeywords(category)) {
            List<JsonNode> locations = mapApiManager.findLocationsByKeyword(keyword, condition)
                    .block();
            if (locations.size() >= minLength) {
                return locations;
            }
        }
        return List.of();
    }

    private RecommendConditionDto setCondition(CourseGetRequest request, LocationCategory category) {
        if (category.equals(LocationCategory.CULTURE)) {
            return new RecommendConditionDto(request.longitude(), request.latitude(), RECOMMEND_RADIUS, null);
        }
        return new RecommendConditionDto(request.longitude(), request.latitude(), RECOMMEND_RADIUS, category);
    }

    private List<JsonNode> getRandomLocations(List<JsonNode> locations, int count) {
        if (locations.size() < count) {
            return locations;
        }
        List<Integer> indexes = randomPicker.pickUniqueValues(locations.size(), count);
        return indexes.stream()
                .map(locations::get)
                .toList();
    }

    private JsonNode getRandomLocation(List<JsonNode> locations) {
        if (locations.isEmpty()) {
            return null;
        }
        int randomIndex = randomPicker.pickValue(locations.size());
        return locations.get(randomIndex);
    }
}
