package com.christmas.infrastructure.route.exception;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;
import java.util.Map;

public class JsonParseException extends CustomException {

    public JsonParseException(CustomErrorCode errorCode,
                              Map<String, Object> invalidData, Throwable cause) {
        super(errorCode, invalidData, cause);
    }
}
