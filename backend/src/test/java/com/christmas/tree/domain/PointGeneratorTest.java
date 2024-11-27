package com.christmas.tree.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.christmas.tree.exception.PointOutOfRangeException;

class PointGeneratorTest {

    @DisplayName("위도, 경도 값으로 Point 좌표를 생성한다.")
    @Test
    void generate_point() {
        // given
        final Double latitude = 127.2;
        final Double longitude = 50.4;

        // when & then
        assertThatCode(() -> PointGenerator.generate(latitude, longitude)).doesNotThrowAnyException();
    }

    @DisplayName("위도, 경도 범위에 벗어나는 값일 경우 예외가 발생한다.")
    @Test
    void invalid_data_thrown_exception() {
        // given
        final Double latitude = 190.9;
        final Double longitude = -93.3;

        // when & then
        assertThatThrownBy(() -> PointGenerator.generate(latitude, longitude))
                .isExactlyInstanceOf(PointOutOfRangeException.class);
    }
}
