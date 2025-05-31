package com.christmas.recommend.exception.code;

import org.springframework.http.HttpStatus;

import com.christmas.common.exception.CustomErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RecommendErrorCode implements CustomErrorCode {

    NOT_EXIST_CATEGORY(HttpStatus.INTERNAL_SERVER_ERROR, "키워드에 존재하지 않는 카테고리입니다.");

    private final HttpStatus status;
    private final String message;
}
