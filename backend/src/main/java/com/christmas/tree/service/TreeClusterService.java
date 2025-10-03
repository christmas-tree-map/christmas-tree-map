package com.christmas.tree.service;

import com.christmas.common.dto.Coordinate;
import com.christmas.tree.domain.TreeClusterPoint;
import com.christmas.tree.dto.TreeCluster;
import com.christmas.tree.repository.TreeEntity;
import com.christmas.util.RandomIntPicker;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.commons.math3.ml.clustering.CentroidCluster;
import org.apache.commons.math3.ml.clustering.KMeansPlusPlusClusterer;
import org.apache.commons.math3.ml.distance.EuclideanDistance;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TreeClusterService {

    private static final int MAX_ITERATIONS = 100;

    private final RandomIntPicker randomIntPicker;

    public List<TreeCluster> toCluster(final List<TreeEntity> trees, final int zoomLevel) {
        if (trees.isEmpty() || trees.size() < 5) {
            return trees.stream()
                    .map(tree -> new TreeCluster(new Coordinate(tree.getLocation().getX(), tree.getLocation().getY()), List.of()))
                    .toList();
        }
        final List<TreeClusterPoint> treePoints = trees.stream()
                .map(TreeClusterPoint::new)
                .toList();
        final int clusterCount = getClusterCountByZoomLevel(zoomLevel, trees.size());
        final KMeansPlusPlusClusterer<TreeClusterPoint> clusterGenerator =
                new KMeansPlusPlusClusterer<>(
                        clusterCount,
                        MAX_ITERATIONS,
                        new EuclideanDistance()
                );
        final List<CentroidCluster<TreeClusterPoint>> clusters = clusterGenerator.cluster(treePoints);
        return clusters.stream()
                .map(cluster -> {
                    final Coordinate center = new Coordinate(
                            cluster.getCenter().getPoint()[0],
                            cluster.getCenter().getPoint()[1]
                    );
                    final List<TreeEntity> members = cluster.getPoints().stream()
                            .map(TreeClusterPoint::getTreeEntity)
                            .toList();

                    return new TreeCluster(center, members);
                })
                .toList();
    }

    private int getClusterCountByZoomLevel(int zoomLevel, int dataSize) {
        final int baseZoom = 5;
        final int zoomFactor = Math.max(0, zoomLevel - baseZoom);

        int kByZoom = 3 + (zoomFactor * 2);
        int kByDataDensity = dataSize / 4;
        int k = Math.min(kByZoom, kByDataDensity);

        return Math.max(2, Math.min(k, 20));
    }
}
