package com.bharatai.wealth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emergency-fund")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class EmergencyFundController {

    private final com.bharatai.wealth.repository.EmergencyFundRepository emergencyFundRepository;
    private final com.bharatai.wealth.repository.UserRepository userRepository;

    @GetMapping
    public ResponseEntity<com.bharatai.wealth.model.EmergencyFund> getFund(
            org.springframework.security.core.Authentication authentication) {
        com.bharatai.wealth.model.User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(emergencyFundRepository.findByUser(user)
                .orElseGet(() -> com.bharatai.wealth.model.EmergencyFund.builder()
                        .user(user)
                        .targetAmount(java.math.BigDecimal.ZERO)
                        .currentAmount(java.math.BigDecimal.ZERO)
                        .monthlyExpenses(java.math.BigDecimal.ZERO)
                        .monthsBuffer(6)
                        .build()));
    }

    @PostMapping
    public ResponseEntity<com.bharatai.wealth.model.EmergencyFund> updateFund(
            @RequestBody com.bharatai.wealth.model.EmergencyFund fund,
            org.springframework.security.core.Authentication authentication) {
        com.bharatai.wealth.model.User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        fund.setUser(user);
        return ResponseEntity.ok(emergencyFundRepository.save(fund));
    }
}
