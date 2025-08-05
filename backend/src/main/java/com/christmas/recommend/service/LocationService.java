package com.christmas.recommend.service;

import static com.christmas.recommend.domain.RecommendKeyword.getKeywords;

import com.christmas.infrastructure.image.ImageApiManager;
import com.christmas.infrastructure.route.domain.PointType;
import com.christmas.infrastructure.route.dto.RouteInfo;
import com.christmas.infrastructure.route.dto.XY;
import com.christmas.infrastructure.route.service.RouteApiManager;
import com.christmas.infrastructure.route.service.RouteApiParser;
import com.christmas.infrastructure.search.domain.LocationCategory;
import com.christmas.infrastructure.search.dto.SearchConditionDto;
import com.christmas.infrastructure.search.service.SearchApiManager;
import com.christmas.infrastructure.search.service.SearchApiParser;
import com.christmas.recommend.domain.RecommendKeyword;
import com.christmas.recommend.dto.AttractionGetRequest;
import com.christmas.recommend.dto.CourseGetRequest;
import com.christmas.util.RandomIntPicker;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LocationService {

    private static final int LOCATION_RADIUS = 1000;

    private final SearchApiManager searchApiManager;
    private final RouteApiManager routeApiManager;
    private final SearchApiParser searchApiParser;
    private final RandomIntPicker randomPicker;
    private final ImageApiManager imageApiManager;

    public List<JsonNode> findLocationsByKeyword(CourseGetRequest request, LocationCategory category) {
        int minLength = 1;
        if (category.equals(LocationCategory.FOOD)) {
            minLength = 2;
        }
        SearchConditionDto condition = setConditionByKeyword(request, category);
        for (RecommendKeyword keyword : getKeywords(category)) {
            List<JsonNode> locations = searchApiManager.findLocationsByKeyword(keyword, condition);
            if (locations.size() >= minLength) {
                return locations;
            }
        }
        SearchConditionDto categoryCondition = setConditionByCategory(request, category);
        return searchApiManager.findLocationsByCategory(categoryCondition);
    }

    public List<JsonNode> findLocationsByCategory(AttractionGetRequest request, LocationCategory category) {
        SearchConditionDto condition = new SearchConditionDto(
                request.longitude(),
                request.latitude(),
                LOCATION_RADIUS,
                category
        );
        return searchApiManager.findLocationsByCategory(condition);
    }

    public List<RouteInfo> getRoutes(List<XY> courseRoute, JsonNode routesDistance) {
        RouteApiParser parser = RouteApiParser.from(routesDistance);
        if (courseRoute.size() == 2) {
            return List.of(parser.getDistanceInfo(PointType.SP, PointType.EP));
        }

        List<RouteInfo> routeInfos = new ArrayList<>();
        for (int i = 0; i < courseRoute.size() - 1; i++) {
            if (i == 0) {
                routeInfos.add(parser.getDistanceInfo(PointType.SP, PointType.PP1));
            } else if (i == courseRoute.size() - 2) {
                PointType start = PointType.findByName("PP" + i);
                routeInfos.add(parser.getDistanceInfo(start, PointType.EP));
            } else {
                PointType start = PointType.findByName("PP" + i);
                PointType end = PointType.findByName("PP" + (i + 1));
                routeInfos.add(parser.getDistanceInfo(start, end));
            }
        }
        return routeInfos;
    }

    private SearchConditionDto setConditionByKeyword(CourseGetRequest request, LocationCategory category) {
        if (category.equals(LocationCategory.CULTURE)) {
            return new SearchConditionDto(request.longitude(), request.latitude(), LOCATION_RADIUS, null);
        }
        return setConditionByCategory(request, category);
    }

    private SearchConditionDto setConditionByCategory(CourseGetRequest request, LocationCategory category) {
        return new SearchConditionDto(request.longitude(), request.latitude(), LOCATION_RADIUS, category);
    }
}
