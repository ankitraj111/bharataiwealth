package com.bharatai.wealth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalNetWorth", 1245890.00);
        summary.put("monthlyExpense", 45600.00);
        summary.put("portfolioGain", 12.5);
        summary.put("aiConfidence", 88);
        return ResponseEntity.ok(summary);
    }
}
