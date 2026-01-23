package com.bharatai.wealth.controller;

import com.bharatai.wealth.repository.UserRepository;
import com.bharatai.wealth.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class HealthController {

    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        try {
            long userCount = userRepository.count();
            return ResponseEntity.ok(Map.of(
                    "status", "UP",
                    "service", "Bharat AI Wealth API",
                    "userCount", userCount,
                    "dbStatus", "Connected"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "status", "DOWN",
                    "error", e.getMessage()));
        }
    }
}
