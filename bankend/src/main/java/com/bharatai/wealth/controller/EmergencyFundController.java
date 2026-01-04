package com.bharatai.wealth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/emergency-fund")
@CrossOrigin(origins = "http://localhost:3000")
public class EmergencyFundController {
    @GetMapping
    public ResponseEntity<Map<String, Object>> getFund() {
        return ResponseEntity.ok(Map.of(
                "target", 500000,
                "current", 250000));
    }
}
