package com.christmas.recommend.domain;

import com.christmas.infrastructure.route.domain.FacilityType;
import com.christmas.infrastructure.route.dto.RouteInfo;
import com.christmas.infrastructure.route.dto.XY;
import com.christmas.recommend.dto.PedestrianRoute;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class Location {

    private final ObjectNode raw;

    public void putImageUrl(String url) {
        raw.put("image_url", url);
    }

    public void putPedestrian(RouteInfo routeInfo) {
        PedestrianRoute pedestrian = makePedestrianRoute(routeInfo);
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
        JsonNode jsonPedestrian = mapper.valueToTree(pedestrian);
        raw.set("pedestrian", jsonPedestrian);
    }

    private PedestrianRoute makePedestrianRoute(RouteInfo routeInfo) {
        return new PedestrianRoute(
                routeInfo.totalSeconds() / 60,
                makeFacilityInfo(routeInfo.facilityInfo()),
                routeInfo.route()
        );
    }

    private Map<String, Integer> makeFacilityInfo(Map<FacilityType, Integer> facilityTypeInfo) {
        return facilityTypeInfo.entrySet()
                .stream()
                .filter(entry -> !entry.getKey().equals(FacilityType.일반보행자도로))
                .collect(Collectors.toMap(
                        entry -> entry.getKey().name(), Entry::getValue
                ));
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

    public String extractName() {
        return raw.get("place_name").asText();
    }

    public ObjectNode getRaw() {
        return raw;
    }
}
