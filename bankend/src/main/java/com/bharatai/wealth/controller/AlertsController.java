package com.bharatai.wealth.controller;

import lombok.RequiredArgsConstructor;
import com.bharatai.wealth.model.Alert;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.AlertRepository;
import com.bharatai.wealth.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class AlertsController {

    private final AlertRepository alertRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Alert>> getAlerts(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(alertRepository.findByUserOrderByTimestampDesc(user));
    }

    @PostMapping("/read/{id}")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        alertRepository.findById(id).ifPresent(alert -> {
            alert.setIsRead(true);
            alertRepository.save(alert);
        });
        return ResponseEntity.ok().build();
    }
}
