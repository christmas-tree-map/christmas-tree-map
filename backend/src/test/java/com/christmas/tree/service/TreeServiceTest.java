package com.christmas.tree.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import com.christmas.common.dto.Coordinate;
import com.christmas.tree.dto.TreeGetInBoundsRequest;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.christmas.tree.dto.TreeCreateRequest;
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

    @DisplayName("범위 내에 있는 트리를 반환한다.")
    @Test
    void get_tree_in_bounds() {
        // given
        createTree(127.1053, 37.2435);  // 범위 안
        createTree(127.1100, 37.3000);  // 범위 밖
        final Coordinate now = new Coordinate(127.110800, 37.255000);
        final Coordinate topRight = new Coordinate(127.13055655573426, 37.29507057088285);
        final Coordinate bottomLeft = new Coordinate(127.08715150311343, 37.21113323112043);
        final TreeGetInBoundsRequest request = new TreeGetInBoundsRequest(now, topRight, bottomLeft);

        // when
        final List<TreeGetResponse> actual = treeService.getTreeInBounds(request);

        // then
        assertThat(actual).hasSize(1);
    }

    @DisplayName("현재 위치와 가까운 순서대로 트리를 반환한다.")
    @Test
    void get_tree_order_by_asc() {
        // given
        final List<Double> nearest = List.of(127.1053, 37.2435);
        final List<Double> secondNearest = List.of(127.1002, 37.235);
        final List<Double> thirdNearest = List.of(127.09249999999999, 37.223);
        final List<List<Double>> treesByOrder = List.of(nearest, secondNearest, thirdNearest);
        for (List<Double> trees : treesByOrder) {
            createTree(trees.get(0), trees.get(1));
        }
        final Coordinate now = new Coordinate(127.110800, 37.255000);
        final Coordinate topRight = new Coordinate(127.13055655573426, 37.29507057088285);
        final Coordinate bottomLeft = new Coordinate(127.08715150311343, 37.21113323112043);
        final TreeGetInBoundsRequest request = new TreeGetInBoundsRequest(now, topRight, bottomLeft);

        // when
        final List<TreeGetResponse> actual = treeService.getTreeInBounds(request);
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
