package com.christmas.tree.service;

import com.christmas.tree.dto.TreeWithDistanceProjection;
import java.util.List;

import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

import com.christmas.tree.domain.PointGenerator;
import com.christmas.tree.dto.TreeCreateRequest;
import com.christmas.tree.dto.TreeGetRequest;
import com.christmas.tree.dto.TreeGetResponse;
import com.christmas.tree.repository.TreeEntity;
import com.christmas.tree.repository.TreeRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TreeService {

    private static final int SEARCH_RADIUS_M = 2000;

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
}
