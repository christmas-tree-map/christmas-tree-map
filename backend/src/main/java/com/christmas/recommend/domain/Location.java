package com.christmas.recommend.domain;

import com.christmas.infrastructure.route.dto.XY;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Location {

    private final ObjectNode raw;

    public void putField(String fieldName, String value) {
        raw.put(fieldName, value);
    }

    public void putObjectField(String fieldName, Object value) {
        JsonNode json = new ObjectMapper()
                .valueToTree(value);
        raw.set(fieldName, json);
    }

    public boolean isExist() {
        return !raw.isEmpty();
    }

    public XY extractXY() {
        if (raw == null) {
            return null;
        }
        double x = raw.get("x").asDouble();
        double y = raw.get("y").asDouble();
        return new XY(x, y);
    }

    public String extractName(JsonNode location) {
        return location.get("place_name").asText();
    }

    public ObjectNode getRaw() {
        return raw;
    }
}
