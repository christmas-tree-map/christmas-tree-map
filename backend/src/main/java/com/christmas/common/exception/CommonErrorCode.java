package com.christmas.common.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum CommonErrorCode implements CustomErrorCode {

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에 예상치 못한 문제가 발생했습니다.");

    private final HttpStatus status;
    private final String message;
}
