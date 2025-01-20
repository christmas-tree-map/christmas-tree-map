package com.christmas.feed.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class InvalidPasswordException extends CustomException {
    public InvalidPasswordException(CustomErrorCode errorCode, Map<String, Object> invalidData) {
        super(errorCode, invalidData);
    }
}
