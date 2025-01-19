package com.christmas.infrastructure.route.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class IllegalTmapRequest extends CustomException {

    public IllegalTmapRequest(CustomErrorCode errorCode, Map<String, Object> invalidData) {
        super(errorCode, invalidData);
    }
}
