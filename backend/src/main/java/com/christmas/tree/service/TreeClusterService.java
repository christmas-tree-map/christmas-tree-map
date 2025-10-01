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

    private static final int NUM_CLUSTERS = 5;
    private static final int MAX_ITERATIONS = 1000;

    private final RandomIntPicker randomIntPicker;

    public List<TreeCluster> toCluster(final List<TreeEntity> trees) {
        final List<TreeClusterPoint> treePoints = trees.stream()
                .map(TreeClusterPoint::new)
                .toList();
        final KMeansPlusPlusClusterer<TreeClusterPoint> clusterGenerator =
                new KMeansPlusPlusClusterer<>(
                        NUM_CLUSTERS,
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
}
