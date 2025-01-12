package com.christmas.map.exception;

import java.util.Map;

import com.christmas.common.exception.CustomErrorCode;
import com.christmas.common.exception.CustomException;

public class IllegalKakaoMapRequest extends CustomException {

    public IllegalKakaoMapRequest(CustomErrorCode errorCode, Map<String, String> invalidData) {
        super(errorCode, invalidData);
    }
}
