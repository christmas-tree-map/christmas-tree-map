package com.christmas.feed.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class NegativeValueException extends CustomException {
    public NegativeValueException(CustomErrorCode errorCode, Map<String, String> invalidData) {
        super(errorCode, invalidData);
    }
}
