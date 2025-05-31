package com.christmas.feed.exception.code;

import org.springframework.http.HttpStatus;

import com.christmas.common.exception.CustomErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum FeedErrorCode implements CustomErrorCode {
    IMAGE_READ_FAIL(HttpStatus.BAD_REQUEST, "이미지 접근에 실패하여 이미지를 읽을 수 없습니다."),
    IMAGE_UPLOAD_FAIL(HttpStatus.UNPROCESSABLE_ENTITY, "이미지 저장 요청을 처리하던 중 오류가 발생하였습니다."),
    IMAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "이미지를 챶을 수 없습니다."),
    IMAGE_DELETE_FAIL(HttpStatus.UNPROCESSABLE_ENTITY, "이미지 삭제 요청을 처리하던 중 오류가 발생했습니다."),
    FEED_NOT_FOUND(HttpStatus.NOT_FOUND, "피드를 찾을 수 없습니다."),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 올바르지 않습니다."),
    NEGATIVE_LIKE_COUNT(HttpStatus.BAD_REQUEST, "좋아요 수가 0이기 때문에 좋아요를 취소할 수 없습니다.")
    ;

    private final HttpStatus status;
    private final String message;
}
