package com.christmas.infrastructure.crawling;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;
import java.util.Map;

public class UnsupportedOsException extends CustomException {
    public UnsupportedOsException(CustomErrorCode errorCode, Map<String, Object> invalidData) {
        super(errorCode, invalidData);
    }
}
