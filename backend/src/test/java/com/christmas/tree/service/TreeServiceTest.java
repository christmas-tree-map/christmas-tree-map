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

    @DisplayName("현재 위치와 가까운 순서대로 트리를 반환한다.")
    @Test
    void get_tree_order_by_asc() {
        // given
        final List<Double> nearest = List.of(126.978900190292, 37.57068050838813);
        final List<Double> secondNearest = List.of(126.97762075424428, 37.5717389421641);
        final List<Double> thirdNearest = List.of(126.98022692200705, 37.572557060470906);
        final List<List<Double>> treesByOrder = List.of(nearest, secondNearest, thirdNearest);
        for (List<Double> trees : treesByOrder) {
            createTree(trees.get(0), trees.get(1));
        }
        final Double nowX = 126.97790401142962;
        final Double nowY = 37.57085151524508;
        final TreeGetRequest request = new TreeGetRequest(nowX, nowY);

        // when
        final List<TreeGetResponse> actual = treeService.getTreeByRange(request);
        final List<List<Double>> actualTrees = actual.stream()
                .map(response -> List.of(response.longitude(), response.latitude()))
                .toList();

        // then
        assertThat(actualTrees).containsExactlyElementsOf(treesByOrder);
    }

    private void createTree(final Double longitude, final Double latitude) {
        final TreeCreateRequest treeCreateRequest = new TreeCreateRequest(longitude, latitude, "test");
        treeService.createTree(treeCreateRequest);
    }
}
