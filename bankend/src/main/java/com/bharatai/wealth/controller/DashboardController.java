package com.bharatai.wealth.controller;

import com.bharatai.wealth.repository.ExpenseRepository;
import com.bharatai.wealth.repository.PortfolioRepository;
import com.bharatai.wealth.repository.UserRepository;
import com.bharatai.wealth.service.MLServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final ExpenseRepository expenseRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final MLServiceClient mlServiceClient;

    @GetMapping("/summary")
    @org.springframework.cache.annotation.Cacheable(value = "dashboardSummary", key = "#authentication.name")
    public ResponseEntity<Map<String, Object>> getSummary(
            org.springframework.security.core.Authentication authentication) {
        com.bharatai.wealth.model.User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        java.time.LocalDate firstOfMonth = java.time.LocalDate.now().withDayOfMonth(1);

        java.math.BigDecimal monthlyExpense = expenseRepository.sumMonthlyExpenses(user, firstOfMonth);
        java.math.BigDecimal totalNetWorth = portfolioRepository.sumTotalNetWorth(user);

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalNetWorth", totalNetWorth != null ? totalNetWorth : java.math.BigDecimal.ZERO);
        summary.put("monthlyExpense", monthlyExpense != null ? monthlyExpense : java.math.BigDecimal.ZERO);
        summary.put("portfolioGain", 14.2); // Still mock for now, need historical to calculate real
        summary.put("aiConfidence", mlServiceClient.getAIConfidence());
        summary.put("userName", user.getName());

        return ResponseEntity.ok(summary);
    }
}
