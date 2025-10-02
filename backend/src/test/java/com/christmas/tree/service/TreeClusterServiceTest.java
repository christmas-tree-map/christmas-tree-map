package com.christmas.tree.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.christmas.tree.dto.TreeCluster;
import com.christmas.tree.repository.TreeEntity;
import com.christmas.util.PointGenerator;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TreeClusterServiceTest {

    @Autowired
    private TreeClusterService treeClusterService;

    private final List<TreeEntity> KOREA_COORDINATES = List.of(
            new TreeEntity(PointGenerator.generate(127.89012, 37.12345), ""), new TreeEntity(PointGenerator.generate(128.34567, 34.56789), ""),
            new TreeEntity(PointGenerator.generate(129.12345, 36.98765), ""), new TreeEntity(PointGenerator.generate(127.01234, 33.78901), ""),
            new TreeEntity(PointGenerator.generate(128.90123, 38.01234), ""), new TreeEntity(PointGenerator.generate(126.56789, 35.34567), ""),
            new TreeEntity(PointGenerator.generate(129.56789, 37.45678), ""), new TreeEntity(PointGenerator.generate(126.34567, 34.01234), ""),
            new TreeEntity(PointGenerator.generate(130.01234, 36.54321), ""), new TreeEntity(PointGenerator.generate(128.78901, 33.45678), ""),
            new TreeEntity(PointGenerator.generate(127.12345, 37.87654), ""), new TreeEntity(PointGenerator.generate(129.34567, 35.09876), ""),
            new TreeEntity(PointGenerator.generate(126.78901, 34.90123), ""), new TreeEntity(PointGenerator.generate(127.45678, 36.23456), ""),
            new TreeEntity(PointGenerator.generate(131.01234, 37.67890), ""), new TreeEntity(PointGenerator.generate(126.12345, 33.12345), ""),
            new TreeEntity(PointGenerator.generate(128.12345, 38.43210), ""), new TreeEntity(PointGenerator.generate(129.89012, 35.78901), ""),
            new TreeEntity(PointGenerator.generate(127.67890, 34.23456), ""), new TreeEntity(PointGenerator.generate(127.09876, 36.78901), "")
    );

    @Test
    @DisplayName("트리를 클러스터링 하여 반환한다.")
    void tree_clustering() {
        // given
        final List<TreeEntity> trees = KOREA_COORDINATES;

        // when
        final List<TreeCluster> actual = treeClusterService.toCluster(trees);
        for (TreeCluster tc : actual) {
            System.out.print(tc.center().longitude() + ", "+ tc.center().latitude() + ": ");
            for (TreeEntity tree : tc.members()) {
                System.out.print("("+tree.getLocation().getCoordinate().getX()+ ", " + tree.getLocation().getCoordinate().getY() + ") ");
            }
            System.out.println();
        }
        // then
        long totalMembers = actual.stream()
                .mapToLong(cluster -> cluster.members().size())
                .sum();
        assertThat(totalMembers).isEqualTo(trees.size());
    }
}
