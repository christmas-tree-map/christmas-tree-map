package com.christmas.recommend.dto;

import com.christmas.recommend.domain.Course;
import com.fasterxml.jackson.databind.JsonNode;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "코스 추천 응답 바디")
public record CourseGetResponse(
        @Schema(description = "점심 장소. 해당 장소의 이름, 위치 등의 정보가 들어있고, meta 필드에는 카카오맵 api 요청에 대한 메타 정보가 들어있다."
                + "null일 경우 현재 위치의 2km 이내에 점심 장소가 없다는 뜻이다.")
        JsonNode lunch,
        @Schema(description = "카페 장소. 해당 장소의 이름, 위치 등의 정보가 들어있고, meta 필드에는 카카오맵 api 요청에 대한 메타 정보가 들어있다."
                + "null일 경우 현재 위치의 2km 이내에 카페 장소가 없다는 뜻이다.")
        JsonNode cafe,
        @Schema(description = "볼거리 장소. 해당 장소의 이름, 위치 등의 정보가 들어있고, meta 필드에는 카카오맵 api 요청에 대한 메타 정보가 들어있다."
                + "null일 경우 현재 위치의 2km 이내에 볼거리 장소가 없다는 뜻이다.")
        JsonNode attraction,
        @Schema(description = "저녁 장소. 해당 장소의 이름, 위치 등의 정보가 들어있고, meta 필드에는 카카오맵 api 요청에 대한 메타 정보가 들어있다."
                + "null일 경우 현재 위치의 2km 이내에 저녁 장소가 없다는 뜻이다.")
        JsonNode dinner
) {

    public static CourseGetResponse from(final Course course) {
        final JsonNode lunch = course.getLunch()
                .getRaw();
        final JsonNode cafe = course.getCafe()
                .getRaw();
        final JsonNode attraction = course.getAttraction()
                .getRaw();
        final JsonNode dinner = course.getDinner()
                .getRaw();
        return new CourseGetResponse(lunch, cafe, attraction, dinner);
    }
}
