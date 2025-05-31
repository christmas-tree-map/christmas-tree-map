package com.christmas.infrastructure.route.domain;

import java.util.Map;

import com.christmas.infrastructure.route.exception.IllegalTmapRequest;
import com.christmas.infrastructure.route.exception.code.DistanceErrorCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum FacilityType {

    교량(1),
    터널(2),
    고가도로(3),
    일반보행자도로(11),
    육교(12),
    지하보도(14),
    횡단보도(15),
    대형시설물이동통로(16),
    계단(17);

    private final int code;

    public static FacilityType convertCode(int code) {
        for (FacilityType facilityType : FacilityType.values()) {
            if (facilityType.code == code) {
                return facilityType;
            }
        }
        throw new IllegalTmapRequest(DistanceErrorCode.NOT_EXIST_FACILITY_CODE, Map.of("facilityType code", code));
    }
}
