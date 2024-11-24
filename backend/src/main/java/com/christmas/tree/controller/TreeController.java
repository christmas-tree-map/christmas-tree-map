package com.christmas.tree.controller;

import java.net.URI;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.christmas.tree.dto.TreeCreateRequest;
import com.christmas.tree.service.TreeService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class TreeController {

    private final TreeService treeService;

    @PostMapping("/tree")
    public ResponseEntity<Long> createTree(@Valid final TreeCreateRequest request) {
        final long id = treeService.createTree(request);
        return ResponseEntity.created(URI.create("/"))
                .body(id);
    }
}
