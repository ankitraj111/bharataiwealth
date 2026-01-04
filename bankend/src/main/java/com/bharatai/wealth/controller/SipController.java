package com.bharatai.wealth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sip")
@CrossOrigin(origins = "http://localhost:3000")
public class SipController {
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getSips() {
        return ResponseEntity.ok(List.of(
                Map.of("id", "1", "fund", "Index Fund Nifty 50", "amount", 10000)));
    }
}
