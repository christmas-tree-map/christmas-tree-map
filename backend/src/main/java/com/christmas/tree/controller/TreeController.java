package com.christmas.tree.controller;

import com.christmas.common.dto.Coordinate;
import com.christmas.tree.dto.TreeClusterGetRequest;
import com.christmas.tree.dto.TreeClusterGetResponse;
import com.christmas.tree.dto.TreeGetWithinRadiusRequest;
import com.christmas.tree.dto.TreeGetInBoundsRequest;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.christmas.tree.dto.TreeCreateRequest;
import com.christmas.tree.dto.TreeGetResponse;
import com.christmas.tree.service.TreeService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class TreeController {

    private final TreeService treeService;

    @PostMapping("/tree")
    public ResponseEntity<Long> createTree(@Valid @RequestBody final TreeCreateRequest request) {
        final long id = treeService.createTree(request);
        return ResponseEntity.created(URI.create("/"))
                .body(id);
    }

    @GetMapping("/tree/in-bounds")
    public ResponseEntity<List<TreeGetResponse>> getTreeInBounds(
            @NotNull @RequestParam(value = "longitude") double longitude,
            @NotNull @RequestParam(value = "latitude") double latitude,
            @NotNull @RequestParam(value = "tr_latitude") double trLatitude,
            @NotNull @RequestParam(value = "tr_longitude") double trLongitude,
            @NotNull @RequestParam(value = "bl_latitude") double blLatitude,
            @NotNull @RequestParam(value = "bl_longitude") double blLongitude
    ) {
        final TreeGetInBoundsRequest request = new TreeGetInBoundsRequest(new Coordinate(longitude, latitude), new Coordinate(trLongitude, trLatitude), new Coordinate(blLongitude, blLatitude));
        final List<TreeGetResponse> trees = treeService.getTreeInBounds(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(trees);
    }

    @GetMapping("/tree/near")
    public ResponseEntity<List<TreeGetResponse>> getTreeWithinRadius(
            @NotNull @RequestParam(value = "longitude") double longitude,
            @NotNull @RequestParam(value = "latitude") double latitude
    ) {
        final TreeGetWithinRadiusRequest request = new TreeGetWithinRadiusRequest(longitude, latitude);
        final List<TreeGetResponse> trees = treeService.getTreeWithinRadius(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(trees);
    }

    @GetMapping("/tree/cluster")
    public ResponseEntity<List<TreeClusterGetResponse>> getTreeByCluster(
            @NotNull @RequestParam(value = "zoom") int zoom,
            @NotNull @RequestParam(value = "tr_latitude") double trLatitude,
            @NotNull @RequestParam(value = "tr_longitude") double trLongitude,
            @NotNull @RequestParam(value = "bl_latitude") double blLatitude,
            @NotNull @RequestParam(value = "bl_longitude") double blLongitude
    ) {
        final TreeClusterGetRequest request = new TreeClusterGetRequest(zoom, new Coordinate(trLongitude, trLatitude), new Coordinate(blLongitude, blLatitude));
        final List<TreeClusterGetResponse> trees = treeService.getTreeByCluster(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(trees);
    }
}
