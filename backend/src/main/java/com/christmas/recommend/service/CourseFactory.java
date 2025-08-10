package com.christmas.recommend.service;

import com.christmas.recommend.domain.Course;
import com.christmas.recommend.domain.Location;
import com.christmas.util.RandomIntPicker;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CourseFactory {

    private final RandomIntPicker randomPicker;

    public Course create(List<JsonNode> foods, List<JsonNode> cafes, List<JsonNode> attractions) {
        List<JsonNode> lunchAndDinner = getRandomLocations(foods, 2);
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode lunch = (ObjectNode) lunchAndDinner.stream()
                .findFirst()
                .orElse(mapper.createObjectNode());
        ObjectNode cafe = getRandomLocation(cafes, mapper);
        ObjectNode dinner = lunchAndDinner.size() == 2 ? (ObjectNode) lunchAndDinner.get(1) : mapper.createObjectNode();
        ObjectNode attraction = getRandomLocation(attractions, mapper);
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

    private ObjectNode getRandomLocation(List<JsonNode> locations, ObjectMapper mapper) {
        if (locations.isEmpty()) {
            return mapper.createObjectNode();
        }
        int randomIndex = randomPicker.pickValue(locations.size());
        return (ObjectNode) locations.get(randomIndex);
    }
}
