package com.christmas.tree.controller;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        return ResponseEntity.status(HttpStatus.OK.value())
                .body(trees);
    }
}
