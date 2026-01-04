package com.bharatai.wealth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PredictionController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getPredictions() {
        List<Map<String, Object>> predictions = new ArrayList<>();

        Map<String, Object> p1 = new HashMap<>();
        p1.put("symbol", "RELIANCE");
        p1.put("currentPrice", 2580.50);
        p1.put("predictedPrice", 2640.00);
        p1.put("confidence", 92);
        p1.put("action", "Buy");
        predictions.add(p1);

        Map<String, Object> p2 = new HashMap<>();
        p2.put("symbol", "TCS");
        p2.put("currentPrice", 3450.75);
        p2.put("predictedPrice", 3520.00);
        p2.put("confidence", 85);
        p2.put("action", "Hold");
        predictions.add(p2);

        return ResponseEntity.ok(predictions);
    }
}
