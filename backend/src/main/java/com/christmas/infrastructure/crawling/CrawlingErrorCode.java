package com.christmas.infrastructure.crawling;

import com.christmas.common.exception.CustomErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CrawlingErrorCode implements CustomErrorCode {

    NOT_SUPPORT_OS(HttpStatus.INTERNAL_SERVER_ERROR, "지원되지 않는 os입니다.");

    private final HttpStatus status;
    private final String message;
}
