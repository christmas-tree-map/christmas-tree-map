package com.christmas.common.exception;

import org.springframework.core.NestedExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class CommonExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ExceptionResponse> handleCustomException(final CustomException e) {
        log.warn("cause & message: {}, invalidData: {}", NestedExceptionUtils.getMostSpecificCause(e), e.getInvalidData());

        return ResponseEntity.status(e.getStatus())
                .body(ExceptionResponse.from(e));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleValidException(final MethodArgumentNotValidException e) {
        log.warn("cause: {}, message: {}", NestedExceptionUtils.getMostSpecificCause(e), e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ExceptionResponse.from(e));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(final Exception e) {
        log.error("cause: {}, message: {}", NestedExceptionUtils.getMostSpecificCause(e), e.getMessage());

        return ResponseEntity.status(CommonErrorCode.INTERNAL_SERVER_ERROR.getStatus())
                .body(ExceptionResponse.of(CommonErrorCode.INTERNAL_SERVER_ERROR));
    }
}
