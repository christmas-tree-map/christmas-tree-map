package com.christmas.map.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.christmas.map.domain.FacilityType;
import com.christmas.map.domain.PointType;
import com.christmas.map.dto.DistanceFeature;
import com.christmas.map.dto.DistanceRouteInfo;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class DistanceApiParser {

    private final List<DistanceFeature> features;

    public static DistanceApiParser from(JsonNode distance) {
        List<DistanceFeature> features = new ArrayList<>();
        JsonNode jsonFeatures = distance.path("features");
        for (int i = 0; i < jsonFeatures.size(); i++) {
            JsonNode feature = jsonFeatures.get(i);
            JsonNode geometry = feature.path("geometry");
            JsonNode properties = feature.path("properties");
            features.add(new DistanceFeature(geometry, properties));
        }
        return new DistanceApiParser(features);
    }

    public DistanceRouteInfo getDistanceInfo(PointType start, PointType end) {
        int totalSeconds = 0;
        Map<FacilityType, Integer> facilityInfo = new HashMap<>();
        boolean startFlag = false;

        for (DistanceFeature feature : features) {
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
        return new DistanceRouteInfo(totalSeconds, facilityInfo);
    }
}
