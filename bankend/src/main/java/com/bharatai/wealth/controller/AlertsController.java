package com.bharatai.wealth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/alerts")
@CrossOrigin(origins = "http://localhost:3000")
public class AlertsController {
    @GetMapping
    public ResponseEntity<List<Map<String, String>>> getAlerts() {
        return ResponseEntity.ok(List.of(
                Map.of("id", "1", "title", "Market Update", "message", "NIFTY is showing strong bullish signs.")));
    }
}
