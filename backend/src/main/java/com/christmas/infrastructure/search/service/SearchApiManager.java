package com.christmas.infrastructure.search.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

import com.christmas.infrastructure.search.dto.SearchConditionDto;
import com.christmas.infrastructure.search.exception.code.SearchErrorCode;
import com.christmas.infrastructure.search.exception.IllegalKakaoMapRequest;
import com.christmas.recommend.domain.RecommendKeyword;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@Component
public class SearchApiManager {

    private static final String AUTH_VALUE_FORMAT = "KakaoAK %s";
    public static final String KEYWORD_SEARCH_URL = "/search/keyword.json";
    public static final String CATEGORY_SEARCH_URL = "/search/category.json";
    public static final int MAX_LOCATION_SIZE = 15;

    @Value("${map.kakao.rest-api-key}")
    private String apiKey;

    @Value("${map.kakao.default-url}")
    private String defaultUrl;

    private final SearchApiQuery searchApiQuery;
    private final SearchApiParser searchApiParser;
    private final RestClient restClient;

    public List<JsonNode> findLocationsByKeyword(RecommendKeyword keyword, SearchConditionDto condition) {
        String query = searchApiQuery.makeQuery(setParametersByKeyword(keyword, condition));
        String url = defaultUrl + KEYWORD_SEARCH_URL + query;
        JsonNode result = callKakaoMapApi(url);
        log.info("키워드 [{}]로 카카오맵 장소 찾기 api 요청 성공", keyword);
        return searchApiParser.parseLocations(result);
    }

    private Map<String, Object> setParametersByKeyword(RecommendKeyword keyword, SearchConditionDto condition) {
        if (keyword == null) {
            throw new IllegalKakaoMapRequest(SearchErrorCode.KEYWORD_PARAMETER_NULL, Map.of("keyword", "null"));
        }
        Map<String, Object> parameters = setDefaultParameters(condition);
        parameters.put("query", keyword.name());
        return parameters;
    }

    private Map<String, Object> setDefaultParameters(SearchConditionDto condition) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("size", String.valueOf(MAX_LOCATION_SIZE));
        Optional.ofNullable(condition.category())
                .ifPresent(category -> parameters.put("category_group_code", category.getCode()));
        Optional.ofNullable(condition.x())
                .ifPresent(x -> parameters.put("x", x));
        Optional.ofNullable(condition.y())
                .ifPresent(y -> parameters.put("y", y));
        Optional.ofNullable(condition.radius())
                .ifPresent(radius -> parameters.put("radius", radius));
        return parameters;
    }

    public List<JsonNode> findLocationsByCategory(SearchConditionDto condition) {
        if (condition.category() == null) {
            throw new IllegalKakaoMapRequest(SearchErrorCode.CATEGORY_PARAMETER_NULL, Map.of("category", "null"));
        }
        String query = searchApiQuery.makeQuery(setDefaultParameters(condition));
        String url = defaultUrl + CATEGORY_SEARCH_URL + query;
        JsonNode result = callKakaoMapApi(url);
        log.info("카테고리 [{}]로 카카오맵 장소 찾기 api 요청 성공", condition.category().name());
        return searchApiParser.parseLocations(result);
    }

    private JsonNode callKakaoMapApi(String url) {
        return restClient
                .get()
                .uri(url)
                .header("Authorization", String.format(AUTH_VALUE_FORMAT, apiKey))
                .retrieve()
                .body(JsonNode.class);
    }
}
