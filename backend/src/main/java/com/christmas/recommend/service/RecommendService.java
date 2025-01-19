package com.christmas.recommend.service;

import static com.christmas.recommend.domain.RecommendKeyword.getKeywords;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.christmas.infrastructure.route.domain.FacilityType;
import com.christmas.infrastructure.route.domain.PointType;
import com.christmas.infrastructure.route.dto.RouteConditionDto;
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
import com.christmas.recommend.dto.AttractionGetResponse;
import com.christmas.recommend.dto.CourseGetRequest;
import com.christmas.recommend.dto.CourseGetResponse;
import com.christmas.recommend.dto.PedestrianRoute;
import com.christmas.util.RandomIntPicker;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class RecommendService {

    private static final int RECOMMEND_RADIUS = 1000;
    public static final int RECOMMEND_ATTRACTION_COUNT = 3;

    private final SearchApiManager searchApiManager;
    private final RouteApiManager routeApiManager;
    private final SearchApiParser searchApiParser;
    private final RandomIntPicker randomPicker;

    public CourseGetResponse getCourse(CourseGetRequest request) {
        List<JsonNode> foods = findLocationsByKeyword(request, LocationCategory.FOOD);
        List<JsonNode> cafes = findLocationsByKeyword(request, LocationCategory.CAFE);
        List<JsonNode> attractions = findLocationsByKeyword(request, LocationCategory.CULTURE);

        List<JsonNode> lunchAndDinner = getRandomLocations(foods, 2);
        JsonNode lunch = lunchAndDinner.stream()
                .findFirst()
                .orElse(null);
        JsonNode dinner = lunchAndDinner.size() == 2 ? lunchAndDinner.get(1) : null;
        JsonNode cafe = getRandomLocation(cafes);
        JsonNode attraction = getRandomLocation(attractions);

        // todo: 각 값이 null일 경우 체크.
        XY nowXY = new XY(request.longitude(), request.latitude());
        XY lunchXY = searchApiParser.extractXYFromLocation(lunch);
        XY cafeXY = searchApiParser.extractXYFromLocation(cafe);
        XY attractionXY = searchApiParser.extractXYFromLocation(attraction);
        XY dinnerXY = searchApiParser.extractXYFromLocation(dinner);
        RouteConditionDto condition = new RouteConditionDto(nowXY, "현재 위치", dinnerXY, "코스 마지막 위치",
                List.of(lunchXY, cafeXY, attractionXY));
        JsonNode routesDistance = routeApiManager.getPedestrianRoute(condition).block();

        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);

        // 경로 계산 로직
        RouteApiParser parser = RouteApiParser.from(routesDistance);
        // 1. 현재 위치에서 점심

        RouteInfo lunchRoute = parser.getDistanceInfo(PointType.SP, PointType.PP1);
        PedestrianRoute lunchInfo = new PedestrianRoute(lunchRoute.totalSeconds() / 60,
                makeFacilityInfo(lunchRoute.facilityInfo()));
        JsonNode lunchInfoJson = mapper.valueToTree(lunchInfo);
        ObjectNode lunchResult = (ObjectNode) lunch;
        lunchResult.set("pedestrian_route", lunchInfoJson);

        // 2. 점심에서 카페
        RouteInfo cafeRoute = parser.getDistanceInfo(PointType.PP1, PointType.PP2);
        PedestrianRoute cafeInfo = new PedestrianRoute(cafeRoute.totalSeconds() / 60,
                makeFacilityInfo(cafeRoute.facilityInfo()));
        JsonNode cafeInfoJson = mapper.valueToTree(cafeInfo);
        ObjectNode cafeResult = (ObjectNode) cafe;
        cafeResult.set("pedestrian_route", cafeInfoJson);

        // 3. 카페에서 어트랙션
        RouteInfo attractionRoute = parser.getDistanceInfo(PointType.PP2, PointType.PP3);
        PedestrianRoute attractionInfo = new PedestrianRoute(attractionRoute.totalSeconds() / 60,
                makeFacilityInfo(attractionRoute.facilityInfo()));
        JsonNode attractionInfoJson = mapper.valueToTree(attractionInfo);
        ObjectNode attractionResult = (ObjectNode) attraction;
        attractionResult.set("pedestrian_route", attractionInfoJson);

        // 4. 어트랙션에서 저녁
        RouteInfo dinnerRoute = parser.getDistanceInfo(PointType.PP3, PointType.EP);
        PedestrianRoute dinnerInfo = new PedestrianRoute(dinnerRoute.totalSeconds() / 60,
                makeFacilityInfo(dinnerRoute.facilityInfo()));
        JsonNode dinnerInfoJson = mapper.valueToTree(dinnerInfo);
        ObjectNode dinnerResult = (ObjectNode) dinner;
        dinnerResult.set("pedestrian_route", dinnerInfoJson);

        return new CourseGetResponse(lunchResult, cafeResult, attractionResult, dinnerResult);
    }

    private List<JsonNode> findLocationsByKeyword(CourseGetRequest request, LocationCategory category) {
        int minLength = 1;
        if (category.equals(LocationCategory.FOOD)) {
            minLength = 2;
        }
        SearchConditionDto condition = setConditionByKeyword(request, category);
        for (RecommendKeyword keyword : getKeywords(category)) {
            List<JsonNode> locations = searchApiManager.findLocationsByKeyword(keyword, condition)
                    .block();
            if (locations.size() >= minLength) {
                return locations;
            }
        }
        SearchConditionDto categoryCondition = setConditionByCategory(request, category);
        return searchApiManager.findLocationsByCategory(categoryCondition)
                .block();
    }

    private Map<String, Integer> makeFacilityInfo(Map<FacilityType, Integer> facilityTypeInfo) {
        return facilityTypeInfo.entrySet()
                .stream()
                .filter(entry -> !entry.getKey().equals(FacilityType.일반보행자도로))
                .collect(Collectors.toMap(
                        entry -> entry.getKey().name(), Entry::getValue
                ));
    }

    private SearchConditionDto setConditionByKeyword(CourseGetRequest request, LocationCategory category) {
        if (category.equals(LocationCategory.CULTURE)) {
            return new SearchConditionDto(request.longitude(), request.latitude(), RECOMMEND_RADIUS, null);
        }
        return setConditionByCategory(request, category);
    }

    private SearchConditionDto setConditionByCategory(CourseGetRequest request, LocationCategory category) {
        return new SearchConditionDto(request.longitude(), request.latitude(), RECOMMEND_RADIUS, category);
    }

    public AttractionGetResponse getAttributes(AttractionGetRequest request) {
        SearchConditionDto condition = new SearchConditionDto(
                request.longitude(),
                request.latitude(),
                RECOMMEND_RADIUS,
                LocationCategory.CULTURE
        );
        List<JsonNode> attractions = searchApiManager.findLocationsByCategory(condition)
                .block();
        List<JsonNode> randomAttractions = getRandomLocations(attractions, RECOMMEND_ATTRACTION_COUNT);
        return new AttractionGetResponse(randomAttractions);
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

    private JsonNode getRandomLocation(List<JsonNode> locations) {
        if (locations.isEmpty()) {
            return null;
        }
        int randomIndex = randomPicker.pickValue(locations.size());
        return locations.get(randomIndex);
    }
}
