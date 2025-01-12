package com.christmas.recommend.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class NotExistKeywordCategory extends CustomException {
    public NotExistKeywordCategory(CustomErrorCode errorCode, Map<String, String> invalidData) {
        super(errorCode, invalidData);
    }
}
