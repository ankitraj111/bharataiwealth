package com.bharatai.wealth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/advisor")
@CrossOrigin(origins = "http://localhost:3000")
public class AdvisorController {
    @GetMapping("/insights")
    public ResponseEntity<List<Map<String, String>>> getInsights() {
        return ResponseEntity.ok(List.of(
                Map.of("type", "INSIGHT", "message", "Consider diversifying into more equity funds.")));
    }
}
