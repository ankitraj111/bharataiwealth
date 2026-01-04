package com.bharatai.wealth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/tax")
@CrossOrigin(origins = "http://localhost:3000")
public class TaxController {
    @GetMapping("/estimate")
    public ResponseEntity<Map<String, Object>> getTaxEstimate() {
        return ResponseEntity.ok(Map.of(
                "estimatedTax", 45000,
                "deductions", 150000));
    }
}
