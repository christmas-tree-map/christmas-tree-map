package com.christmas.tree.service;

import static org.assertj.core.api.Assertions.assertThatCode;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.christmas.tree.dto.TreeCreateRequest;

@SpringBootTest
class TreeServiceTest {

    @Autowired
    private TreeService treeService;

    @DisplayName("트리를 생성한다.")
    @Test
    void create_tree() {
        // given
        final Double longitude = 37.514576318427274;
        final Double latitude = 127.10410791319497;
        final TreeCreateRequest treeCreateRequest = new TreeCreateRequest(longitude, latitude, "test");

        // when & then
        assertThatCode(() -> treeService.createTree(treeCreateRequest)).doesNotThrowAnyException();
    }
}
