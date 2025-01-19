package com.christmas.infrastructure.route.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.christmas.infrastructure.route.domain.FacilityType;
import com.christmas.infrastructure.route.dto.RouteFeature;
import com.christmas.infrastructure.route.dto.RouteInfo;
import com.christmas.infrastructure.route.domain.PointType;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RouteApiParser {

    private final List<RouteFeature> features;

    public static RouteApiParser from(JsonNode distance) {
        List<RouteFeature> features = new ArrayList<>();
        JsonNode jsonFeatures = distance.path("features");
        for (int i = 0; i < jsonFeatures.size(); i++) {
            JsonNode feature = jsonFeatures.get(i);
            JsonNode geometry = feature.path("geometry");
            JsonNode properties = feature.path("properties");
            features.add(new RouteFeature(geometry, properties));
        }
        return new RouteApiParser(features);
    }

    public RouteInfo getDistanceInfo(PointType start, PointType end) {
        int totalSeconds = 0;
        Map<FacilityType, Integer> facilityInfo = new HashMap<>();
        boolean startFlag = false;

        for (RouteFeature feature : features) {
            JsonNode geometry = feature.geometry();
            JsonNode properties = feature.properties();
            if ("Point".equals(geometry.get("type").asText())) {
                if (end.name().equals(properties.get("pointType").asText())) {
                    break;
                }
                if (!startFlag && start.name().equals(properties.get("pointType").asText())) {
                    startFlag = true;
                }
            } else {
                if (startFlag) {
                    totalSeconds += properties.get("time").asInt();
                    int code = properties.get("facilityType").asInt();
                    FacilityType facilityType = FacilityType.convertCode(code);
                    facilityInfo.put(facilityType, facilityInfo.getOrDefault(facilityType, 0) + 1);
                }
            }
        }
        return new RouteInfo(totalSeconds, facilityInfo);
    }
}
