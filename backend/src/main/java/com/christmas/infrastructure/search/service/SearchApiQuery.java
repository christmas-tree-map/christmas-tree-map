package com.christmas.infrastructure.search.service;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

@Component
public class SearchApiQuery {

    private static final String QUERY_FORMAT = "?%s";
    private static final String PARAMETER_FORMAT = "%s=%s";
    private static final String PARAMETER_DELIMITER = "&";

    public String makeQuery(Map<String, Object> parameters) {
        String query = parameters.entrySet()
                .stream()
                .map(entry -> String.format(PARAMETER_FORMAT, entry.getKey(), entry.getValue()))
                .collect(Collectors.joining(PARAMETER_DELIMITER));
        return String.format(QUERY_FORMAT, query);
    }
}
