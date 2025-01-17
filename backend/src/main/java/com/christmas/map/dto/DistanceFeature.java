package com.christmas.map.dto;

import com.fasterxml.jackson.databind.JsonNode;

public record DistanceFeature(
        JsonNode geometry,
        JsonNode properties
) {
}
