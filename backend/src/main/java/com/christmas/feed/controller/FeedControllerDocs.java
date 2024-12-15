package com.christmas.feed.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.christmas.common.exception.ExceptionResponse;
import com.christmas.feed.dto.ContentUpdateRequest;
import com.christmas.feed.dto.FeedCreateRequest;
import com.christmas.feed.dto.FeedDeleteRequest;
import com.christmas.feed.dto.FeedGetResponse;
import com.christmas.feed.dto.FeedUpdateRequest;
import com.christmas.feed.dto.FeedUpdateResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "피드 API")
public interface FeedControllerDocs {

    @Operation(summary = "피드를 생성한다.")
    @ApiResponse(responseCode = "201", description = "피드 생성 성공 시 피드 id를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = Long.class))
    )
    @ApiResponse(responseCode = "4XX", description = "피드 생성 실패 시 예외를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ExceptionResponse.class))
    )
    ResponseEntity<Long> createFeed(
            @Parameter(description = "이미지 파일", required = true, content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            MultipartFile image,
            @Parameter(description = "피드 생성 요청 바디", required = true)
            FeedCreateRequest request
    );

    @Operation(summary = "특정 피드의 좋아요를 1 늘린다.")
    @ApiResponse(responseCode = "200", description = "좋아요 성공 시 피드의 총 좋아요 수를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = Long.class))
    )
    @ApiResponse(responseCode = "4XX", description = "좋아요 실패 시 예외를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ExceptionResponse.class))
    )
    ResponseEntity<Long> createLike(@Parameter(description = "feedId", required = true, example = "1") long id);

    @Operation(summary = "특정 트리의 모든 피드를 반환한다.")
    @ApiResponse(responseCode = "200", description = "피드 조회 성공 시 트리의 모든 피드를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, array = @ArraySchema(schema = @Schema(implementation = FeedGetResponse.class)))
    )
    @ApiResponse(responseCode = "4XX", description = "피드 조회 실패 시 예외를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ExceptionResponse.class))
    )
    ResponseEntity<List<FeedGetResponse>> getAllFeed(@Parameter(description = "treeId", required = true) long treeId);

    @Operation(summary = "피드를 수정한다.")
    @ApiResponse(responseCode = "200", description = "피드 수정에 성공 시 수정 시간, 이미지 url, 피드 내용을 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, array = @ArraySchema(schema = @Schema(implementation = FeedGetResponse.class)))
    )
    @ApiResponse(responseCode = "4XX", description = "피드 수정 실패 시 예외를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ExceptionResponse.class))
    )
    ResponseEntity<FeedUpdateResponse> updateFeed(
            @Parameter(description = "피드 id", required = true)
            long id,
            @Parameter(description = "이미지 파일", content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            MultipartFile image,
            @Parameter(description = "비밀번호 및 피드 내용", required = true)
            FeedUpdateRequest request
    );

    @Operation(summary = "피드를 삭제한다.")
    @ApiResponse(responseCode = "204", description = "피드 삭제에 성공한다.")
    @ApiResponse(responseCode = "4XX", description = "피드 삭제 실패 시 예외를 반환한다.",
            content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ExceptionResponse.class))
    )
    ResponseEntity<Void> deleteFeed(
            @Parameter(description = "피드 id", required = true)
            long id,
            @Parameter(description = "비밀번호", example = "abs123", required = true)
            FeedDeleteRequest password
    );
}
