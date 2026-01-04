package com.bharatai.wealth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/family")
@CrossOrigin(origins = "http://localhost:3000")
public class FamilyController {
    @GetMapping("/members")
    public ResponseEntity<List<Map<String, String>>> getMembers() {
        return ResponseEntity.ok(List.of(
                Map.of("id", "1", "name", "Demo Family Member", "relation", "Self")));
    }
}
