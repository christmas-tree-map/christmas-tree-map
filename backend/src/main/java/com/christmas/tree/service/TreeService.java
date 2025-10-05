package com.christmas.tree.service;

import com.christmas.tree.dto.TreeCluster;
import com.christmas.tree.dto.TreeClusterGetRequest;
import com.christmas.tree.dto.TreeClusterGetResponse;
import com.christmas.tree.dto.TreeCreateRequest;
import com.christmas.tree.dto.TreeGetRequest;
import com.christmas.tree.dto.TreeGetResponse;
import com.christmas.tree.dto.TreeWithDistanceProjection;
import com.christmas.tree.repository.TreeEntity;
import com.christmas.tree.repository.TreeRepository;
import com.christmas.util.PointGenerator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TreeService {

    private static final int SEARCH_RADIUS_M = 2000;

    private final TreeClusterService treeClusterService;
    private final TreeRepository treeRepository;

    public long createTree(final TreeCreateRequest request) {
        final Point location = PointGenerator.generate(request.longitude(), request.latitude());
        final TreeEntity tree = treeRepository.save(new TreeEntity(location, request.imageCode()));
        return tree.getId();
    }

    public List<TreeGetResponse> getTreeByRange(final TreeGetRequest request) {
        final Point location = PointGenerator.generate(request.longitude(), request.latitude());
        final List<TreeWithDistanceProjection> trees = treeRepository.findByLocationInRangeOrderByAscWithDistance(location,
                SEARCH_RADIUS_M);
        return trees.stream()
                .map(tree ->
                    new TreeGetResponse(tree.getId(), tree.getDistance(), tree.getLongitude(), tree.getLatitude(), tree.getImageCode())
                )
                .toList();
    }

    public List<TreeClusterGetResponse> getTreeByCluster(final TreeClusterGetRequest request) {
        final List<TreeEntity> trees = treeRepository.findAllWithinBounds(request.topRight().longitude(),
                request.topRight().latitude(), request.bottomLeft().longitude(), request.bottomLeft().latitude());
        final List<TreeCluster> clusters = treeClusterService.toCluster(trees, request.zoom());
        return clusters.stream()
                .map(cluster -> new TreeClusterGetResponse(
                        cluster.center().longitude(),
                        cluster.center().longitude(),
                        cluster.members().size())
                )
                .toList();
    }
}
