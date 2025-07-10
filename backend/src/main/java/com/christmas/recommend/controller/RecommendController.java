package com.christmas.recommend.controller;

import com.christmas.infrastructure.image.ImageApiManager;
import com.christmas.recommend.dto.AttractionGetRequest;
import com.christmas.recommend.dto.AttractionGetResponse;
import com.christmas.recommend.dto.CourseGetRequest;
import com.christmas.recommend.dto.CourseGetResponse;
import com.christmas.recommend.service.RecommendService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class RecommendController implements RecommendControllerDocs {

    private final RecommendService recommendService;
    private final ImageApiManager imageApiManager;

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
