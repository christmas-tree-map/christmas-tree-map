package com.christmas.map.exception.code;

import org.springframework.http.HttpStatus;

import com.christmas.common.exception.CustomErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MapErrorCode implements CustomErrorCode {

    KEYWORD_PARAMETER_NULL(HttpStatus.INTERNAL_SERVER_ERROR, "카카오맵 키워드로 검색 api 요청에서 query 파라미터가 존재하지 않습니다.");

    private final HttpStatus status;
    private final String message;
}
