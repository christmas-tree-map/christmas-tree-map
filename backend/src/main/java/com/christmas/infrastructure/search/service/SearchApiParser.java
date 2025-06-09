package com.christmas.infrastructure.search.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.christmas.infrastructure.route.dto.XY;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import reactor.core.publisher.Mono;

@Component
public class SearchApiParser {

    public Mono<List<JsonNode>> parseLocations(Mono<JsonNode> monoLocations) {
        return monoLocations.map(locations -> {
            List<JsonNode> result = new ArrayList<>();
            JsonNode documents = locations.path("documents");
            JsonNode meta = locations.path("meta");

            for (int i = 0; i < documents.size(); i++) {
                ObjectNode location = (ObjectNode) documents.get(i);
                location.set("meta", meta);
                result.add(location);
            }
            return result;
        });
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
