package com.christmas.infrastructure.search.service;

import com.christmas.infrastructure.route.dto.XY;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class SearchApiParser {

    public List<JsonNode> parseLocations(JsonNode locations) {
        List<JsonNode> result = new ArrayList<>();
        JsonNode documents = locations.path("documents");
        JsonNode meta = locations.path("meta");

        for (int i = 0; i < documents.size(); i++) {
            ObjectNode location = (ObjectNode) documents.get(i);
            location.set("meta", meta);
            result.add(location);
        }
        return result;
    }

    public XY extractXYFromLocation(JsonNode location) {
        double x = location.get("x").asDouble();
        double y = location.get("y").asDouble();
        return new XY(x, y);
    }

    public String extractNameFromLocation(JsonNode location) {
        return location.get("place_name").asText();
    }
}
