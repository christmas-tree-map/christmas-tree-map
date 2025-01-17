package com.christmas.feed.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class NotFoundS3ImageException extends CustomException {

    public NotFoundS3ImageException(final CustomErrorCode errorCode, final Map<String, Object> invalidData) {
        super(errorCode, invalidData);
    }
}
