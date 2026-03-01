package com.bharatai.wealth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tax")
@RequiredArgsConstructor
public class TaxController {

        private final com.bharatai.wealth.repository.TaxRecordRepository taxRecordRepository;
        private final com.bharatai.wealth.repository.UserRepository userRepository;

        @GetMapping("/estimate")
        public ResponseEntity<com.bharatai.wealth.model.TaxRecord> getTaxEstimate(
                        org.springframework.security.core.Authentication authentication) {
                com.bharatai.wealth.model.User user = userRepository.findByEmail(authentication.getName())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                return ResponseEntity.ok(taxRecordRepository.findByUserAndFinancialYear(user, "2024-25")
                                .orElseGet(() -> com.bharatai.wealth.model.TaxRecord.builder()
                                                .financialYear("2024-25")
                                                .totalIncome(java.math.BigDecimal.ZERO)
                                                .taxPaid(java.math.BigDecimal.ZERO)
                                                .deductions80c(java.math.BigDecimal.ZERO)
                                                .otherDeductions(java.math.BigDecimal.ZERO)
                                                .build()));
        }
}
