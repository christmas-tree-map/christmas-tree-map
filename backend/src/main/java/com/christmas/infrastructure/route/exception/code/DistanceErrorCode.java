package com.christmas.infrastructure.route.exception.code;

import org.springframework.http.HttpStatus;

import com.christmas.common.exception.CustomErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum DistanceErrorCode implements CustomErrorCode {

    NOT_EXIST_FACILITY_CODE(HttpStatus.INTERNAL_SERVER_ERROR, "해당 시설물 code가 존재하지 않습니다."),
    NOT_FOUND_POINT_TYPE_BY_NAME(HttpStatus.INTERNAL_SERVER_ERROR, "point type 이름으로 변수를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String message;
}
