package com.christmas.tree.service;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

import com.christmas.tree.dto.TreeCreateRequest;
import com.christmas.tree.repository.TreeEntity;
import com.christmas.tree.repository.TreeRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class TreeService {

    private final TreeRepository treeRepository;

    public long createTree(final TreeCreateRequest request) {
        final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
        final Point point = geometryFactory.createPoint(new Coordinate(request.longitude(), request.latitude()));
        final TreeEntity save = treeRepository.save(new TreeEntity(point, request.imageCode()));
        return save.getId();
    }
}
