package com.christmas.feed.controller;

import java.net.URI;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.christmas.feed.dto.ContentUpdateRequest;
import com.christmas.feed.dto.FeedCreateRequest;
import com.christmas.feed.dto.FeedGetResponse;
import com.christmas.feed.service.FeedService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class FeedController implements FeedControllerDocs {

    private final FeedService feedService;

    @PostMapping(value = "/feed", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Long> createFeed(
            @RequestPart("image") MultipartFile image,
            @Valid @RequestPart("request") FeedCreateRequest request
    ) {
        final long id = feedService.createFeed(request, image);
        return ResponseEntity.created(URI.create("/"))
                .body(id);
    }

    @PostMapping("/feed/{id}/like")
    public ResponseEntity<Long> createLike(@PathVariable("id") long id) {
        long likeCount = feedService.createLike(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(likeCount);
    }

    @GetMapping("/feed")
    public ResponseEntity<List<FeedGetResponse>> getAllFeed(@RequestParam("treeId") long treeId) {
        List<FeedGetResponse> response = feedService.getAllFeedByTree(treeId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @PatchMapping(
            value = "/feed/{id}/image",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<Void> updateImage(
            @PathVariable("id") long id,
            @RequestPart("image") MultipartFile image,
            @RequestPart("password") String password
    ) {
        feedService.updateImage(id, image, password);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }

    @PatchMapping(value = "/feed/{id}/content")
    public ResponseEntity<Void> updateContent(
            @PathVariable("id") long id,
            @Valid @RequestPart("request") ContentUpdateRequest request
    ) {
        feedService.updateContent(id, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }

    @DeleteMapping("/feed/{id}")
    public ResponseEntity<Void> deleteFeed(@PathVariable("id") long id, @RequestBody String password) {
        feedService.deleteFeed(id, password);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }
}
