package com.christmas.recommend.service;

import static com.christmas.recommend.domain.RecommendKeyword.getKeywords;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.christmas.map.LocationCategory;
import com.christmas.map.MapApiManager;
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
        JsonNode lunch = lunchAndDinner != null ? lunchAndDinner.get(0) : null;
        JsonNode dinner = lunchAndDinner != null ? lunchAndDinner.get(1) : null;
        JsonNode cafe = getRandomLocation(cafes);
        JsonNode attraction = getRandomLocation(attractions);

        return new CourseGetResponse(lunch, cafe, attraction, dinner);
    }

    private List<JsonNode> findRandomLocations(CourseGetRequest request, LocationCategory category) {
        int minLength = 1;
        if (category.equals(LocationCategory.FOOD)) {
            minLength = 2;
        }
        for (RecommendKeyword keyword : getKeywords(category)) {
            RecommendConditionDto condition = new RecommendConditionDto(
                    request.longitude(),
                    request.latitude(),
                    RECOMMEND_RADIUS,
                    keyword
            );
            List<JsonNode> locations = mapApiManager.findLocations(category, condition)
                    .block();
            if (locations.size() >= minLength) {
                return locations;
            }
        }
        return List.of();
    }

    private List<JsonNode> getRandomLocations(List<JsonNode> locations, int count) {
        if (locations.isEmpty() || locations.size() < count) {
            return null;
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
