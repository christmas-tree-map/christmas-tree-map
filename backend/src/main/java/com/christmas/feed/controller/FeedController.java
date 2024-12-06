package com.christmas.feed.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.christmas.feed.dto.FeedCreateRequest;
import com.christmas.feed.dto.FeedGetResponse;
import com.christmas.feed.service.FeedService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class FeedController {

    private final FeedService feedService;

    @PostMapping("/feed")
    public ResponseEntity<Long> createFeed(
            @RequestParam("image") MultipartFile image,
            @RequestBody FeedCreateRequest request
    ) {
        final long feedId = feedService.createFeed(request, image);
        return ResponseEntity.created(URI.create("/"))
                .body(feedId);
    }

    @PostMapping("/feed/{id}/like")
    public ResponseEntity<Long> createLike(@PathVariable("id") long id) {
        long likeCount = feedService.createLike(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(likeCount);
    }


    @DeleteMapping("/feed/{id}")
    public ResponseEntity<Void> deleteFeed(@PathVariable("id") long id, @RequestBody String password) {
        feedService.deleteFeed(id, password);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .build();
    }

    @GetMapping("/feed")
    public ResponseEntity<List<FeedGetResponse>> getAllFeed(@RequestParam("tree") long treeId) {
        List<FeedGetResponse> response = feedService.getAllFeedByTree(treeId);
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    // todo 4. 피드 수정


}
