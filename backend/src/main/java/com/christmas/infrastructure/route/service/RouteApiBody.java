package com.christmas.infrastructure.route.service;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.christmas.infrastructure.route.dto.RouteConditionDto;

@Component
public class RouteApiBody {

    private static final String XY_DELIMITER_FORMAT = "%s,%s";
    private static final String PASS_LIST_DELIMITER = "_";

    public Map<String, Object> makeBody(RouteConditionDto condition) {
        Map<String, Object> body = new HashMap<>();
        body.put("startX", condition.start().longitude());
        body.put("startY", condition.start().latitude());
        body.put("startName", condition.startName());
        body.put("endX", condition.end().longitude());
        body.put("endY", condition.end().latitude());
        body.put("endName", condition.endName());
        if (!condition.passList().isEmpty()) {
            String passList = condition.passList()
                    .stream()
                    .map(xy -> String.format(XY_DELIMITER_FORMAT, xy.longitude(), xy.latitude()))
                    .collect(Collectors.joining(PASS_LIST_DELIMITER));
            body.put("passList", passList);
        }
        return body;
    }
}
