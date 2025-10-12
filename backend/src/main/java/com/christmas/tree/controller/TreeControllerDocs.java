package com.christmas.tree.controller;

import com.christmas.common.exception.ExceptionResponse;
import com.christmas.tree.dto.TreeCreateRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@Tag(name = "트리 API")
public interface TreeControllerDocs {

    @Operation(summary = "트리 마커를 생성한다.")
    @ApiResponse(responseCode = "201", description = "트리 마커 생성 성공 시 트리 id를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = Long.class))
    )
    @ApiResponse(responseCode = "400", description = "트리 마커 생성 실패 시 예외를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ExceptionResponse.class))
    )
    ResponseEntity<Long> createTree(
            @Parameter(description = "트리 생성에 필요한 정보(경도, 위도, 이미지 코드)", required = true)
            TreeCreateRequest request
    );
}
