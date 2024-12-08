package com.christmas.feed.domain;

import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class NicknameGeneratorTest {

    @DisplayName("닉네임을 생성한다.")
    @Test
    void generate_nickname() {
        assertThatCode(() -> NicknameGenerator.generate()).doesNotThrowAnyException();
    }

    @DisplayName("중복 닉네임 뒤에 숫자를 붙인다.")
    @Test
    void add_count_duplicate_nickname() {
        String nickname = NicknameGenerator.generate();
        int count = 3;
        assertThatCode(() -> NicknameGenerator.addCountForDuplicate(nickname, count)).doesNotThrowAnyException();
    }
}
