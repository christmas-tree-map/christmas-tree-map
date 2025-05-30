package com.christmas.infrastructure.route.service;

import com.christmas.infrastructure.route.dto.RouteConditionDto;
import com.christmas.infrastructure.route.exception.JsonParseException;
import com.christmas.infrastructure.route.exception.code.DistanceErrorCode;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@Component
public class RouteApiManager {

    @Value("${map.tmap.app-key}")
    private String appKey;

    @Value("${map.tmap.default-url}")
    private String defaultUrl;

    private static final String PEDESTRIAN_ROUTE_URL = "/pedestrian?version=1&callback=function";
    private static final int MAX_PASS_LIST = 5;

    private final WebClient webClient;
    private final RouteApiBody routeApiBody;

    public Mono<JsonNode> getPedestrianRoute(RouteConditionDto condition) {
        String url = defaultUrl + PEDESTRIAN_ROUTE_URL;
        Map<String, Object> body = routeApiBody.makeBody(condition);
        Mono<JsonNode> result = callTMapApi(url, body);
        log.info("티맵 api 보행자 거리 완료");
        return result;
    }

    private Mono<JsonNode> callTMapApi(String url, Map<String, Object> body) {
        return webClient.post()
                .uri(url)
                .header("accept", "application/json")
                .header("content-type", "application/json")
                .header("appKey", appKey)
                .body(BodyInserters.fromValue(body))
                .retrieve()
                .bodyToMono(String.class)
                .map(this::removeControlCode);
    }

    private JsonNode removeControlCode(String rawJson) {
        String cleaned = rawJson.replaceAll("\\p{Cntrl}", "");
        try {
            return new ObjectMapper().readTree(cleaned);
        } catch (Exception e) {
            throw new JsonParseException(DistanceErrorCode.TMAP_JSON_PARSE_ERROR, Map.of("컨트롤 코드 제거한 tmap api 응답", cleaned), e);
        }
    }
}
