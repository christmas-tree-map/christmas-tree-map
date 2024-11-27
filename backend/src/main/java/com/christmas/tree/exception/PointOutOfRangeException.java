package com.christmas.tree.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class PointOutOfRangeException extends CustomException {

    public PointOutOfRangeException(final CustomErrorCode errorCode, final Map<String, String> invalidData) {
        super(errorCode, invalidData);
    }
}
