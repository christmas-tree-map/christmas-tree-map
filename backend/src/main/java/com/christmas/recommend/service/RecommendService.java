package com.christmas.recommend.service;

import com.christmas.infrastructure.image.ImageApiManager;
import com.christmas.infrastructure.route.dto.RouteConditionDto;
import com.christmas.infrastructure.route.dto.RouteInfo;
import com.christmas.infrastructure.route.dto.XY;
import com.christmas.infrastructure.route.service.RouteApiManager;
import com.christmas.infrastructure.search.domain.LocationCategory;
import com.christmas.infrastructure.search.service.SearchApiManager;
import com.christmas.infrastructure.search.service.SearchApiParser;
import com.christmas.recommend.domain.Course;
import com.christmas.recommend.domain.Location;
import com.christmas.recommend.dto.AttractionGetRequest;
import com.christmas.recommend.dto.AttractionGetResponse;
import com.christmas.recommend.dto.CourseGetRequest;
import com.christmas.recommend.dto.CourseGetResponse;
import com.christmas.util.RandomIntPicker;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class RecommendService {

    public static final int RECOMMEND_ATTRACTION_COUNT = 3;

    private final SearchApiManager searchApiManager;
    private final RouteApiManager routeApiManager;
    private final SearchApiParser searchApiParser;
    private final RandomIntPicker randomPicker;
    private final ImageApiManager imageApiManager;
    private final LocationService locationService;

    public CourseGetResponse generateCourse(CourseGetRequest request) {
        List<JsonNode> foods = locationService.findLocationsByKeyword(request, LocationCategory.FOOD);
        List<JsonNode> cafes = locationService.findLocationsByKeyword(request, LocationCategory.CAFE);
        List<JsonNode> attractions = locationService.findLocationsByKeyword(request, LocationCategory.CULTURE);

        CourseFactory courseFactory = new CourseFactory(new RandomIntPicker());
        Course course = courseFactory.create(foods, cafes, attractions);
        XY current = new XY(request.longitude(), request.latitude());
        List<XY> courseRoute = course.buildRoute(current);

        if (!course.isExist()) {
            return new CourseGetResponse(null, null, null, null);
        }
        RouteConditionDto condition = makeRouteCondition(courseRoute);
        JsonNode routesRaw = routeApiManager.getPedestrianRoute(condition);
        ObjectMapper mapper = new ObjectMapper();
        mapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);
        List<RouteInfo> routes = locationService.getRoutes(courseRoute, routesRaw);

        course.addRouteInfo(routes);

        Location lunch = course.getLunch();
        String lunchImage = findPlaceImage(lunch);
        putPlaceImage(lunch, lunchImage);

        Location cafe = course.getCafe();
        String cafeImage = findPlaceImage(cafe);
        putPlaceImage(cafe, cafeImage);

        Location attraction = course.getAttraction();
        String attractionImage = findPlaceImage(attraction);
        putPlaceImage(attraction, attractionImage);

        Location dinner = course.getDinner();
        String dinnerImage = findPlaceImage(dinner);
        putPlaceImage(dinner, dinnerImage);
        return CourseGetResponse.from(course);
    }

    private String findPlaceImage(Location location) {
        if (location.isExist()) {
            String placeName = searchApiParser.extractNameFromLocation(location.getRaw());
            XY xy = searchApiParser.extractXYFromLocation(location.getRaw());
            return imageApiManager.findPlaceImage(placeName, xy.x(), xy.y());
        }
        return null;
    }

    private void putPlaceImage(Location location, String imageUrl) {
        location.putField("image_url", imageUrl);
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

    public AttractionGetResponse generateAttractions(AttractionGetRequest request) {
        List<JsonNode> attractions = locationService.findLocationsByCategory(request, LocationCategory.CULTURE);
        List<JsonNode> randomAttractions = getRandomLocations(attractions, RECOMMEND_ATTRACTION_COUNT);
        for (JsonNode attraction : randomAttractions) {
            String placeName = searchApiParser.extractNameFromLocation(attraction);
            XY xy = searchApiParser.extractXYFromLocation(attraction);
            String imageUrl = imageApiManager.findPlaceImage(placeName, xy.x(), xy.y());
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
}
