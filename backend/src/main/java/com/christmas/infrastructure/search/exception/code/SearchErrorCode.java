package com.christmas.infrastructure.search.exception.code;

import org.springframework.http.HttpStatus;

import com.christmas.common.exception.CustomErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SearchErrorCode implements CustomErrorCode {

    KEYWORD_PARAMETER_NULL(HttpStatus.INTERNAL_SERVER_ERROR, "카카오맵 키워드로 장소 검색 api 요청의 키워드 파라미터가 존재하지 않습니다."),
    CATEGORY_PARAMETER_NULL(HttpStatus.INTERNAL_SERVER_ERROR, "카카오맵 카테고리로 장소 검색 api 요청의 카테고리 파라미터가 존재하지 않습니다.");

    private final HttpStatus status;
    private final String message;
}
