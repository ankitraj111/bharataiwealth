package com.bharatai.wealth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:3000")
public class GoalsController {
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getGoals() {
        return ResponseEntity.ok(List.of(
                Map.of("id", "1", "title", "Retirement", "target", 50000000, "current", 1245890)));
    }
}
