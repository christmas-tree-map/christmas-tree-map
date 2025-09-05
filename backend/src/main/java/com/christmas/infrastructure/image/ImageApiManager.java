package com.christmas.infrastructure.image;

import com.fasterxml.jackson.databind.JsonNode;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@RequiredArgsConstructor
@Component
public class ImageApiManager {

    private static final String TEXT_SEARCH_URL = "/places:searchText";
    private static final String PLACE_PHOTOS_URL_FORMAT = "/%s/media?maxHeightPx=400&maxWidthPx=400&key=%s";

    @Value("${map.google.api-key}")
    private String apiKey;

    @Value("${map.google.default-url}")
    private String defaultUrl;

    private final RestClient restClient;

    public String findPlaceImage(final String placeName, final double longitude, final double latitude) {
        String name = extractFirstPhotoName(callTextSearch(placeName, longitude, latitude));
        if (name == null) {
            return null;
        }
        JsonNode photoInfo = callPlacePhotos(name);
        if (photoInfo == null) {
            return null;
        }
        return extractPhotoUri(photoInfo);
    }

    private JsonNode callTextSearch(final String textQuery, final double longitude, final double latitude) {
        final String url = defaultUrl + TEXT_SEARCH_URL;

        return restClient
                .post()
                .uri(url)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header("X-Goog-Api-Key", apiKey)
                .header("X-Goog-FieldMask", "places.name,places.photos")
                .body(Map.of("textQuery", textQuery,
                        "pageSize", 1,
                        "locationBias", Map.of(
                        "circle", Map.of(
                                "center", Map.of(
                                        "latitude", latitude,
                                        "longitude", longitude
                                ),
                                "radius", 100.0
                        )
                )))
                .retrieve()
                .body(JsonNode.class);
    }

    private JsonNode callPlacePhotos(final String placeId) {
        final String urlFormat = defaultUrl + PLACE_PHOTOS_URL_FORMAT;
        final String url = String.format(urlFormat, placeId, apiKey);

        return restClient
                .get()
                .uri(url)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .retrieve()
                .body(JsonNode.class);
    }

    private String extractFirstPhotoName(JsonNode root) {
        JsonNode places = root.get("places");
        if (places != null && places.isArray() && places.size() > 0) {
            JsonNode firstPlace = places.get(0);
            JsonNode photos = firstPlace.get("photos");
            if (photos != null && photos.isArray() && photos.size() > 0) {
                JsonNode name = photos.get(0).get("name");
                if (name != null && name.isTextual()) {
                    return name.asText();
                }
            }
        }
        return null;
    }

    private String extractPhotoUri(final JsonNode photoInfo) {
        return photoInfo.get("photoUri").textValue();
    }
}
