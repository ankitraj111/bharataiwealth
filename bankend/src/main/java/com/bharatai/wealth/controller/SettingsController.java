package com.bharatai.wealth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    @GetMapping
    public ResponseEntity<Map<String, Object>> getSettings() {
        return ResponseEntity.ok(Map.of(
                "currency", "INR",
                "notifications", true));
    }
}
