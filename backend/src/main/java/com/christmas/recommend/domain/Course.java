package com.christmas.recommend.domain;

import com.christmas.infrastructure.route.domain.FacilityType;
import com.christmas.infrastructure.route.dto.RouteInfo;
import com.christmas.infrastructure.route.dto.XY;
import com.christmas.recommend.dto.PedestrianRoute;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Course {

    private final Location lunch;
    private final Location cafe;
    private final Location attraction;
    private final Location dinner;

    public List<XY> buildRoute(XY current) {
        List<XY> positions = new ArrayList<>();
        positions.add(current);
        if (lunch.isExist()) {
            positions.add(lunch.extractXY());
        }
        if (cafe.isExist()) {
            positions.add(cafe.extractXY());
        }
        if (attraction.isExist()) {
            positions.add(attraction.extractXY());
        }
        if (dinner.isExist()) {
            positions.add(dinner.extractXY());
        }
        return positions;
    }

    public void addRouteInfo(List<RouteInfo> routes) {
        if (routes == null) {
            return;
        }
        int count = 0;
        RouteInfo lunchRouteInfo = null;
        if (lunch.isExist()) {
            lunchRouteInfo = routes.get(count++);
            lunch.putObjectField("pedestrian", makePedestrianRoute(lunchRouteInfo));
        }
        RouteInfo cafeRouteInfo = null;
        if (cafe.isExist()) {
            cafeRouteInfo = routes.get(count++);
            cafe.putObjectField("pedestrian", makePedestrianRoute(cafeRouteInfo));
        }
        RouteInfo attractionRouteInfo = null;
        if (attraction.isExist()) {
            attractionRouteInfo = routes.get(count++);
            cafe.putObjectField("pedestrian", makePedestrianRoute(attractionRouteInfo));
        }
        RouteInfo dinnerRouteInfo = null;
        if (dinner.isExist()) {
            dinnerRouteInfo = routes.get(count);
            dinner.putObjectField("pedestrian", makePedestrianRoute(dinnerRouteInfo));
        }
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
        return lunch.isExist() || cafe.isExist() || attraction.isExist() || dinner.isExist();
    }
}
