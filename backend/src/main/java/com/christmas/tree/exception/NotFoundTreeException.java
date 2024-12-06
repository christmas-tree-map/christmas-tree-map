package com.christmas.tree.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class NotFoundTreeException extends CustomException {
    public NotFoundTreeException(final CustomErrorCode errorCode, final Map<String, String> invalidData) {
        super(errorCode, invalidData);
    }
}
