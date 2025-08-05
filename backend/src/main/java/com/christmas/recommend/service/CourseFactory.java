package com.christmas.recommend.service;

import com.christmas.recommend.domain.Course;
import com.christmas.recommend.domain.Location;
import com.christmas.util.RandomIntPicker;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CourseFactory {

    private final RandomIntPicker randomPicker;

    public Course create(List<JsonNode> foods, List<JsonNode> cafes, List<JsonNode> attractions) {
        List<JsonNode> lunchAndDinner = getRandomLocations(foods, 2);
        // todo: null 대신 빈 ObjectNode로 대체
        ObjectNode lunch = (ObjectNode) lunchAndDinner.stream()
                .findFirst()
                .orElse(null);
        ObjectNode cafe = (ObjectNode) getRandomLocation(cafes);
        ObjectNode dinner = lunchAndDinner.size() == 2 ? (ObjectNode) lunchAndDinner.get(1) : null;
        ObjectNode attraction = (ObjectNode) getRandomLocation(attractions);
        return new Course(new Location(lunch), new Location(cafe), new Location(dinner), new Location(attraction));
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
