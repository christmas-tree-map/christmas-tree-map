package com.christmas.tree.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.christmas.tree.dto.TreeCreateRequest;
import com.christmas.tree.dto.TreeGetRequest;
import com.christmas.tree.dto.TreeGetResponse;

@Transactional
@SpringBootTest
class TreeServiceTest {

    @Autowired
    private TreeService treeService;

    @DisplayName("트리를 생성한다.")
    @Test
    void create_tree() {
        // given
        final Double longitude = 127.1;
        final Double latitude = 37.5;
        final TreeCreateRequest treeCreateRequest = new TreeCreateRequest(longitude, latitude, "test");

        // when & then
        assertThatCode(() -> treeService.createTree(treeCreateRequest)).doesNotThrowAnyException();
    }

    @DisplayName("특정 좌표의 2km 내에 있는 트리를 반환한다.")
    @Test
    void get_tree_by_range() {
        // given
        createTree(127.12, 37.52);  // 2km 밖
        createTree(127.09, 37.49);  // 2km 안
        final Double longitude = 127.1;
        final Double latitude = 37.5;
        final TreeGetRequest request = new TreeGetRequest(longitude, latitude);

        // when
        final List<TreeGetResponse> actual = treeService.getTreeByRange(request);

        // then
        assertThat(actual).hasSize(1);
    }

    private void createTree(final Double longitude, final Double latitude) {
        final TreeCreateRequest treeCreateRequest = new TreeCreateRequest(longitude, latitude, "test");
        treeService.createTree(treeCreateRequest);
    }
}
