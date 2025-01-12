package com.christmas.recommend.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.christmas.common.exception.ExceptionResponse;
import com.christmas.recommend.dto.CourseGetRequest;
import com.christmas.recommend.dto.CourseGetResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "추천 API")
public interface RecommendControllerDocs {

    @Operation(summary = "추천 코스를 반환한다. 추천 코스는 점심, 카페, 볼거리, 저녁으로 이루어져 있다. 결과가 존재하지 않는 코스 필드는 null로 반환된다.")
    @ApiResponse(responseCode = "200", description = "추천 코스 반환에 성공한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = CourseGetResponse.class)))
    @ApiResponse(responseCode = "4XX", description = "추천 코스 반환에 실패한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ExceptionResponse.class)))
    ResponseEntity<CourseGetResponse> getCourse(
            @Parameter(description = "현재 위치의 경도 및 위도", required = true)
            @ModelAttribute CourseGetRequest courseGetRequest
    );
}
