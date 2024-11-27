package com.christmas.tree.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.christmas.tree.dto.TreeCreateRequest;
import com.christmas.tree.dto.TreeGetRequest;
import com.christmas.tree.dto.TreeGetResponse;

@SpringBootTest
class TreeServiceTest {

    @Autowired
    private TreeService treeService;

    @DisplayName("트리를 생성한다.")
    @Test
    void create_tree() {
        // given
        final Double latitude = 127.1;
        final Double longitude = 37.5;
        final TreeCreateRequest treeCreateRequest = new TreeCreateRequest(latitude, longitude, "test");

        // when & then
        assertThatCode(() -> treeService.createTree(treeCreateRequest)).doesNotThrowAnyException();
    }

    @DisplayName("특정 좌표의 2km 내에 있는 트리를 반환한다.")
    @Test
    void get_tree_by_range() {
        // given
        createTree(127.12, 37.52);  // 2km 밖
        createTree(127.07, 37.47);  // 2km 안
        final Double latitude = 127.1;
        final Double longitude = 37.5;
        final TreeGetRequest request = new TreeGetRequest(latitude, longitude);

        // when
        final List<TreeGetResponse> actual = treeService.getTreeByRange(request);

        // then
        assertThat(actual).hasSize(1);
    }

    private void createTree(final Double latitude, final Double longitude) {
        final TreeCreateRequest treeCreateRequest = new TreeCreateRequest(latitude, longitude, "test");
        treeService.createTree(treeCreateRequest);
    }
}
