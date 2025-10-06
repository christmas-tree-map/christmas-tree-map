package com.christmas.tree.controller;

import com.christmas.common.dto.Coordinate;
import com.christmas.tree.dto.TreeClusterGetRequest;
import com.christmas.tree.dto.TreeClusterGetResponse;
import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.christmas.tree.dto.TreeCreateRequest;
import com.christmas.tree.dto.TreeGetRequest;
import com.christmas.tree.dto.TreeGetResponse;
import com.christmas.tree.service.TreeService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class TreeController implements TreeControllerDocs {

    private final TreeService treeService;

    @PostMapping("/tree")
    public ResponseEntity<Long> createTree(@Valid @RequestBody final TreeCreateRequest request) {
        final long id = treeService.createTree(request);
        return ResponseEntity.created(URI.create("/"))
                .body(id);
    }

    @GetMapping("/tree")
    public ResponseEntity<List<TreeGetResponse>> getTreeByRange(
            @Valid @ModelAttribute final TreeGetRequest treeGetRequest) {
        final List<TreeGetResponse> trees = treeService.getTreeByRange(treeGetRequest);
        return ResponseEntity.status(HttpStatus.OK)
                .body(trees);
    }

    @GetMapping("/tree/cluster")
    public ResponseEntity<List<TreeClusterGetResponse>> getTreeByCluster(
            @RequestParam(value = "zoom") int zoom,
            @RequestParam(value = "tr_latitude") double trLatitude,
            @RequestParam(value = "tr_longitude") double trLongitude,
            @RequestParam(value = "bl_latitude") double blLatitude,
            @RequestParam(value = "bl_longitude") double blLongitude
    ) {
        final TreeClusterGetRequest request = new TreeClusterGetRequest(zoom, new Coordinate(trLongitude, trLatitude), new Coordinate(blLongitude, blLatitude));
        final List<TreeClusterGetResponse> trees = treeService.getTreeByCluster(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(trees);
    }
}
