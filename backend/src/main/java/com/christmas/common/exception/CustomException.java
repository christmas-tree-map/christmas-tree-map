package com.christmas.common.exception;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private static final String EXCEPTION_FORMAT = "code: %s, message: %s";
    private static final String DATA_FORMAT = "[property: %s, value: %s]";
    private static final String DATA_FORMAT_DELIMITER = ", ";
    private static final String LOG_FORMAT = "%s\n%s";

    private final HttpStatus status;
    private final String message;
    private final Map<String, Object> invalidData;

    public CustomException(final CustomErrorCode errorCode, final Map<String, Object> invalidData) {
        this.status = errorCode.getStatus();
        this.message = errorCode.getMessage();
        this.invalidData = invalidData;
    }

    public CustomException(final HttpStatus status, final String message, final Map<String, Object> invalidData) {
        this.status = status;
        this.message = message;
        this.invalidData = invalidData;
    }

    public String getInvalidDataFormat() {
        return invalidData.keySet()
                .stream()
                .map(key -> String.format(DATA_FORMAT, key, invalidData.get(key)))
                .collect(Collectors.joining(DATA_FORMAT_DELIMITER));
    }
}
