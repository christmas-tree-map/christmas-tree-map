package com.christmas.recommend.service;

import static com.christmas.recommend.domain.RecommendKeyword.getKeywords;

import com.christmas.infrastructure.crawling.ImageApiCrawler;
import java.util.ArrayList;
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
    private final ImageApiCrawler imageApiCrawler;

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

        List<XY> locationsNotNull = new ArrayList<>();
        locationsNotNull.add(new XY(request.longitude(), request.latitude())); // 무조건 존재
        if (lunch != null) {
            locationsNotNull.add(searchApiParser.extractXYFromLocation(lunch));
        }
        if (cafe != null) {
            locationsNotNull.add(searchApiParser.extractXYFromLocation(cafe));
        }
        if (attraction != null) {
            locationsNotNull.add(searchApiParser.extractXYFromLocation(attraction));
        }
        if (dinner != null) {
            locationsNotNull.add(searchApiParser.extractXYFromLocation(dinner));
        }

        if (locationsNotNull.size() == 1) {
            return new CourseGetResponse(null, null, null, null);
        }
        RouteConditionDto condition = makeRouteCondition(locationsNotNull);
        JsonNode routesDistance = routeApiManager.getPedestrianRoute(condition).block();

        // 경로 계산 로직
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
        List<RouteInfo> routes = getRoutes(locationsNotNull, routesDistance);
        int count = 0;

        RouteInfo lunchRoute = null;
        ObjectNode lunchResult = null;
        if (lunch != null) {
            lunchRoute = routes.get(count++);
            String placeName = searchApiParser.extractNameFromLocation(lunch);
            String imageUrl = imageApiCrawler.crawlImage(placeName);
            lunchResult = makeRoute(lunch, lunchRoute, imageUrl, mapper);
        }

        RouteInfo cafeRoute = null;
        ObjectNode cafeResult = null;
        if (cafe != null) {
            cafeRoute = routes.get(count++);
            String placeName = searchApiParser.extractNameFromLocation(cafe);
            String imageUrl = imageApiCrawler.crawlImage(placeName);
            cafeResult = makeRoute(cafe, cafeRoute, imageUrl, mapper);
        }

        RouteInfo attractionRoute = null;
        ObjectNode attractionResult = null;
        if (attraction != null) {
            attractionRoute = routes.get(count++);
            String placeName = searchApiParser.extractNameFromLocation(attraction);
            String imageUrl = imageApiCrawler.crawlImage(placeName);
            attractionResult = makeRoute(attraction, attractionRoute, imageUrl, mapper);
        }

        RouteInfo dinnerRoute = null;
        ObjectNode dinnerResult = null;
        if (dinner != null) {
            dinnerRoute = routes.get(count);
            String placeName = searchApiParser.extractNameFromLocation(dinner);
            String imageUrl = imageApiCrawler.crawlImage(placeName);
            dinnerResult = makeRoute(dinner, dinnerRoute, imageUrl, mapper);
        }
        return new CourseGetResponse(lunchResult, cafeResult, attractionResult, dinnerResult);
    }

    private ObjectNode makeRoute(JsonNode location, RouteInfo routeInfo, String imageUrl, ObjectMapper mapper) {
        if (location == null) {
            return null;
        }
        PedestrianRoute route = new PedestrianRoute(
                routeInfo.totalSeconds() / 60,
                makeFacilityInfo(routeInfo.facilityInfo()),
                routeInfo.route()
        );
        ObjectNode result = (ObjectNode) location;
        result.put("image_url", imageUrl);
        JsonNode infoJson = mapper.valueToTree(route);
        result.set("pedestrian", infoJson);
        return result;
    }

    private RouteConditionDto makeRouteCondition(List<XY> locationsNotNull) {
        if (locationsNotNull.size() == 2) {
            return new RouteConditionDto(locationsNotNull.get(0), "시작 장소", locationsNotNull.get(1), "종료 장소", List.of());
        }
        List<XY> passPlace = new ArrayList<>();
        for (int i = 1; i < locationsNotNull.size() - 1; i++) {
            passPlace.add(locationsNotNull.get(i));
        }
        return new RouteConditionDto(locationsNotNull.get(0), "시작 장소",
                locationsNotNull.get(locationsNotNull.size() - 1), "종료 장소", passPlace);
    }

    private List<RouteInfo> getRoutes(List<XY> locationsNotNull, JsonNode routesDistance) {
        RouteApiParser parser = RouteApiParser.from(routesDistance);
        if (locationsNotNull.size() == 2) {
            return List.of(parser.getDistanceInfo(PointType.SP, PointType.EP));
        }

        List<RouteInfo> routeInfos = new ArrayList<>();
        for (int i = 0; i < locationsNotNull.size() - 1; i++) {
            if (i == 0) {
                routeInfos.add(parser.getDistanceInfo(PointType.SP, PointType.PP1));
            } else if (i == locationsNotNull.size() - 2) {
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
        for (JsonNode attraction : randomAttractions) {
            String placeName = searchApiParser.extractNameFromLocation(attraction);
            String imageUrl = imageApiCrawler.crawlImage(placeName);
            ((ObjectNode) attraction).put("image_url", imageUrl);
        }
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
