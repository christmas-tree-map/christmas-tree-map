package com.christmas.tree.service;

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

    private static final int SEARCH_RADIUS_KM = 2000;

    private final TreeRepository treeRepository;

    public long createTree(final TreeCreateRequest request) {
        final Point location = PointGenerator.generate(request.latitude(), request.longitude());
        final TreeEntity tree = treeRepository.save(new TreeEntity(location, request.imageCode()));
        return tree.getId();
    }

    public List<TreeGetResponse> getTreeByRange(final TreeGetRequest request) {
        final Point location = PointGenerator.generate(request.latitude(), request.longitude());
        List<TreeEntity> trees = treeRepository.findByLocationInRange(location, SEARCH_RADIUS_KM);
        return trees.stream()
                .map(tree -> {
                    final Point point = tree.getLocation();
                    return new TreeGetResponse(point.getX(), point.getY(), tree.getImageCode());
                })
                .toList();
    }
}
