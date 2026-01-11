package com.bharatai.wealth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class GoalsController {

    private final com.bharatai.wealth.repository.GoalRepository goalRepository;
    private final com.bharatai.wealth.repository.UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<com.bharatai.wealth.model.Goal>> getGoals(
            org.springframework.security.core.Authentication authentication) {
        com.bharatai.wealth.model.User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(goalRepository.findByUser(user));
    }

    @PostMapping
    public ResponseEntity<com.bharatai.wealth.model.Goal> addGoal(@RequestBody com.bharatai.wealth.model.Goal goal,
            org.springframework.security.core.Authentication authentication) {
        com.bharatai.wealth.model.User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        goal.setUser(user);
        return ResponseEntity.ok(goalRepository.save(goal));
    }
}
