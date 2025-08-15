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
            lunch.putPedestrian(lunchRouteInfo);
        }
        RouteInfo cafeRouteInfo = null;
        if (cafe.isExist()) {
            cafeRouteInfo = routes.get(count++);
            cafe.putPedestrian(cafeRouteInfo);
        }
        RouteInfo attractionRouteInfo = null;
        if (attraction.isExist()) {
            attractionRouteInfo = routes.get(count++);
            attraction.putPedestrian(attractionRouteInfo);
        }
        RouteInfo dinnerRouteInfo = null;
        if (dinner.isExist()) {
            dinnerRouteInfo = routes.get(count);
            dinner.putPedestrian(dinnerRouteInfo);
        }
    }

    public boolean isExist() {
        return lunch.isExist() || cafe.isExist() || attraction.isExist() || dinner.isExist();
    }
}
