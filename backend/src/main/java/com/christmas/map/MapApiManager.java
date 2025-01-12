package com.christmas.map;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.christmas.recommend.service.dto.RecommendConditionDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@Component
public class MapApiManager {

    private static final String AUTH_VALUE_FORMAT = "KakaoAK %s";
    public static final String KEYWORD_SEARCH_URL = "/search/keyword.json";
    public static final int MAX_LOCATION_SIZE = 15;

    @Value("${map.kakao.rest-api-key}")
    private String apiKey;

    @Value("${map.kakao.default-url}")
    private String defaultUrl;

    private final WebClient webClient;
    private final MapApiQuery mapApiQuery;

    public Mono<List<JsonNode>> findLocations(LocationCategory category, RecommendConditionDto condition) {
        String query = mapApiQuery.makeQuery(setParameters(category, condition));
        log.info("카카오맵 api 요청 완료");
        Mono<JsonNode> result = getLocationsResult(query);
        return parseLocations(result);
    }

    private Mono<JsonNode> getLocationsResult(String query) {
        String url = defaultUrl + KEYWORD_SEARCH_URL + query;
        return webClient.get()
                .uri(url)
                .header("Authorization", String.format(AUTH_VALUE_FORMAT, apiKey))
                .retrieve()
                .bodyToMono(JsonNode.class);
    }

    private Map<String, String> setParameters(LocationCategory category, RecommendConditionDto condition) {
        Map<String, String> parameters = new HashMap<>();
        if (!category.equals(LocationCategory.CULTURE)) {
            parameters.put(LocationCategory.FIELD_NAME, category.getCode());
        }
        parameters.put("x", String.valueOf(condition.longitude()));
        parameters.put("y", String.valueOf(condition.latitude()));
        parameters.put("radius", String.valueOf(condition.radius()));
        parameters.put("query", condition.keyword().name());
        parameters.put("size", String.valueOf(MAX_LOCATION_SIZE));
        return parameters;
    }

    private Mono<List<JsonNode>> parseLocations(Mono<JsonNode> monoLocations) {
        return monoLocations.map(locations -> {
            List<JsonNode> result = new ArrayList<>();
            JsonNode documents = locations.path("documents");
            JsonNode meta = locations.path("meta");

            for (int i = 0; i < documents.size(); i++) {
                ObjectNode location = (ObjectNode) documents.get(i);
                location.set("meta", meta);
                result.add(location);
            }
            return result;
        });
    }
}
