package com.christmas.infrastructure.route.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class NotFoundPointType extends CustomException {
    public NotFoundPointType(CustomErrorCode errorCode, Map<String, Object> invalidData) {
        super(errorCode, invalidData);
    }
}
