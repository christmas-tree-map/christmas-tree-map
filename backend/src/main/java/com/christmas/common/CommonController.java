package com.christmas.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonController {

    @GetMapping("/health-check")
    public String getHealthCheck() {
        return "christmas tree health-check success";
    }
}
