package com.christmas.feed.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class S3Exception extends CustomException {

    public S3Exception(final CustomErrorCode errorCode, final Map<String, Object> invalidData) {
        super(errorCode, invalidData);
    }
}
