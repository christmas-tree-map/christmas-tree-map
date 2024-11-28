package com.christmas.common.exception;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ExceptionResponse {

    private static final String MESSAGE_DELIMITER = ", ";

    private final int status;
    private final String message;
    private final String invalidData;

    public static ExceptionResponse from(final CustomException e) {
        return new ExceptionResponse(
                e.getStatus().value(),
                e.getMessage(),
                e.getInvalidDataFormat()
        );
    }

    public static ExceptionResponse of(final CustomErrorCode errorCode) {
        return new ExceptionResponse(errorCode.getStatus().value(), errorCode.getMessage(), "");
    }

    public static ExceptionResponse from(final MethodArgumentNotValidException e) {
        final BindingResult bindingResult = e.getBindingResult();
        final List<String> allErrorMessage = new ArrayList<>();
        final Map<String, String> invalidData = new HashMap<>();
        for (final FieldError fieldError : bindingResult.getFieldErrors()) {
            invalidData.put(fieldError.getField(), getRejectedValue(fieldError));
            allErrorMessage.add(fieldError.getDefaultMessage());
        }
        final String message = String.join(MESSAGE_DELIMITER, allErrorMessage);
        CustomException customException = new CustomException(HttpStatus.BAD_REQUEST, message, invalidData);
        return ExceptionResponse.from(customException);
    }

    private static String getRejectedValue(final FieldError fieldError) {
        if (fieldError.getRejectedValue() == null) {
            return "null";
        }
        return fieldError.getRejectedValue()
                .toString();
    }
}
