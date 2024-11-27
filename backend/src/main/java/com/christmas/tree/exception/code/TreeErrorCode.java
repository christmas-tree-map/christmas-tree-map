package com.christmas.tree.exception.code;

import org.springframework.http.HttpStatus;

import com.christmas.common.exception.CustomErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TreeErrorCode implements CustomErrorCode {

    INVALID_LOCATION(HttpStatus.BAD_REQUEST, "위도 혹은 경도가 범위에 맞지 않습니다.");

    private final HttpStatus status;
    private final String message;
}
