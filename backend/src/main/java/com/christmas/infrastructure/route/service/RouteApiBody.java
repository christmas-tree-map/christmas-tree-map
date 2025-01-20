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
        body.put("startX", condition.start().x());
        body.put("startY", condition.start().y());
        body.put("startName", condition.startName());
        body.put("endX", condition.end().x());
        body.put("endY", condition.end().y());
        body.put("endName", condition.endName());
        String passList = condition.passList()
                .stream()
                .map(xy -> String.format(XY_DELIMITER_FORMAT, xy.x(), xy.y()))
                .collect(Collectors.joining(PASS_LIST_DELIMITER));
        body.put("passList", passList);
        body.put("searchOption", 4);
        return body;
    }
}
