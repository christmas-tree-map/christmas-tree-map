package com.christmas.map.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.christmas.map.domain.LocationCategory;
import com.christmas.map.exception.IllegalKakaoMapRequest;
import com.christmas.map.exception.code.MapErrorCode;
import com.christmas.recommend.domain.RecommendKeyword;
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
    public static final String CATEGORY_SEARCH_URL = "/search/category.json";
    public static final int MAX_LOCATION_SIZE = 15;

    @Value("${map.kakao.rest-api-key}")
    private String apiKey;

    @Value("${map.kakao.default-url}")
    private String defaultUrl;

    private final WebClient webClient;
    private final MapApiQuery mapApiQuery;

    public Mono<List<JsonNode>> findLocationsByKeyword(RecommendKeyword keyword, RecommendConditionDto condition) {
        String query = mapApiQuery.makeQuery(setParametersByKeyword(keyword, condition));
        String url = defaultUrl + KEYWORD_SEARCH_URL + query;
        Mono<JsonNode> result = callKakaoMapApi(url);
        log.info("키워드 [{}]로 카카오맵 장소 찾기 api 요청 성공", keyword);
        return parseLocations(result);
    }

    private Map<String, String> setParametersByKeyword(RecommendKeyword keyword, RecommendConditionDto condition) {
        if (keyword == null) {
            throw new IllegalKakaoMapRequest(MapErrorCode.KEYWORD_PARAMETER_NULL, Map.of("keyword", "null"));
        }
        Map<String, String> parameters = setDefaultParameters(condition);
        parameters.put("query", keyword.name());
        return parameters;
    }

    private Map<String, String> setDefaultParameters(RecommendConditionDto condition) {
        Map<String, String> parameters = new HashMap<>();
        parameters.put("size", String.valueOf(MAX_LOCATION_SIZE));
        Optional.ofNullable(condition.category())
                .ifPresent(category -> parameters.put(LocationCategory.FIELD_NAME, category.getCode()));
        Optional.ofNullable(condition.longitude())
                .ifPresent(longitude -> parameters.put("x", String.valueOf(longitude)));
        Optional.ofNullable(condition.latitude())
                .ifPresent(latitude -> parameters.put("y", String.valueOf(latitude)));
        Optional.ofNullable(condition.radius())
                .ifPresent(radius -> parameters.put("radius", String.valueOf(radius)));
        return parameters;
    }

    public Mono<List<JsonNode>> findLocationsByCategory(RecommendConditionDto condition) {
        if (condition.category() == null) {
            throw new IllegalKakaoMapRequest(MapErrorCode.KEYWORD_PARAMETER_NULL, Map.of("category", "null"));
        }
        String query = mapApiQuery.makeQuery(setDefaultParameters(condition));
        String url = defaultUrl + CATEGORY_SEARCH_URL + query;
        Mono<JsonNode> result = callKakaoMapApi(url);
        log.info("카테고리 [{}]로 카카오맵 장소 찾기 api 요청 성공", condition.category());
        return parseLocations(result);
    }

    private Mono<JsonNode> callKakaoMapApi(String url) {
        return webClient.get()
                .uri(url)
                .header("Authorization", String.format(AUTH_VALUE_FORMAT, apiKey))
                .retrieve()
                .bodyToMono(JsonNode.class);
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
