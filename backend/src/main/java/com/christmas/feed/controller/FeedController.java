package com.christmas.feed.controller;

import com.christmas.feed.dto.FeedVerifyRequest;
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

import com.christmas.feed.dto.FeedCreateRequest;
import com.christmas.feed.dto.FeedDeleteRequest;
import com.christmas.feed.dto.FeedGetResponse;
import com.christmas.feed.dto.FeedUpdateRequest;
import com.christmas.feed.dto.FeedUpdateResponse;
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

    @PostMapping("/feed/{id}/verify-password")
    public ResponseEntity<Boolean> canUpdateFeed(@PathVariable("id") long id, @Valid @RequestBody FeedVerifyRequest request) {
        final boolean canUpdateFeed = feedService.canUpdateFeed(id, request.password());
        return ResponseEntity.status(HttpStatus.OK)
                .body(canUpdateFeed);
    }

    @PatchMapping(
            value = "/feed/{id}",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE}
    )
    public ResponseEntity<FeedUpdateResponse> updateFeed(
            @PathVariable("id") long id,
            @RequestPart("image") MultipartFile image,
            @Valid @RequestPart("request") FeedUpdateRequest request
    ) {
        FeedUpdateResponse response = feedService.updateFeed(id, image, request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @DeleteMapping("/feed/{id}")
    public ResponseEntity<Long> deleteFeed(@PathVariable("id") long id, @Valid @RequestBody FeedDeleteRequest request) {
        long deletedId = feedService.deleteFeed(id, request.password());
        return ResponseEntity.status(HttpStatus.OK)
                .body(deletedId);
    }

    @DeleteMapping("/feed/{id}/like")
    public ResponseEntity<Long> deleteLike(@PathVariable("id") long id) {
        long likeCount = feedService.deleteLike(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(likeCount);
    }
}
