package com.christmas.infrastructure.route.dto;

import com.fasterxml.jackson.databind.JsonNode;

public record RouteFeature(
        JsonNode geometry,
        JsonNode properties
) {
}
