package com.christmas.recommend.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import com.christmas.recommend.dto.AttractionGetRequest;
import com.christmas.recommend.dto.AttractionGetResponse;
import com.christmas.recommend.dto.CourseGetRequest;
import com.christmas.recommend.dto.CourseGetResponse;
import com.christmas.recommend.service.RecommendService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class RecommendController implements RecommendControllerDocs {

    private final RecommendService recommendService;

    @GetMapping("/course")
    public ResponseEntity<CourseGetResponse> getCourse(@Valid @ModelAttribute CourseGetRequest request) {
        CourseGetResponse response = recommendService.getCourse(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("/attraction")
    public ResponseEntity<AttractionGetResponse> getAttractions(@Valid @ModelAttribute AttractionGetRequest request) {
        AttractionGetResponse response = recommendService.getAttributes(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }
}
