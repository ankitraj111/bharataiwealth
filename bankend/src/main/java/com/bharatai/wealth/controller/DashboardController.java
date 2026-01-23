package com.bharatai.wealth.controller;

import com.bharatai.wealth.repository.ExpenseRepository;
import com.bharatai.wealth.repository.PortfolioRepository;
import com.bharatai.wealth.repository.UserRepository;
import com.bharatai.wealth.service.MLServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
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

        // Calculate dynamic gains
        double portfolioGain = 0.0;
        List<com.bharatai.wealth.model.PortfolioItem> items = portfolioRepository.findByUser(user);
        if (!items.isEmpty()) {
            java.util.List<String> symbols = items.stream().map(com.bharatai.wealth.model.PortfolioItem::getSymbol)
                    .toList();
            Map<String, Object> analysis = mlServiceClient.getPortfolioAnalysis(symbols);
            if (analysis != null && analysis.containsKey("analysis")) {
                java.math.BigDecimal totalInvested = java.math.BigDecimal.ZERO;
                java.math.BigDecimal currentTotalValue = java.math.BigDecimal.ZERO;

                @SuppressWarnings("unchecked")
                java.util.List<Map<String, Object>> analysisResults = (java.util.List<Map<String, Object>>) analysis
                        .get("analysis");
                Map<String, Double> priceMap = new java.util.HashMap<>();
                for (Map<String, Object> res : analysisResults) {
                    if (res.containsKey("symbol") && res.containsKey("current_price")) {
                        priceMap.put((String) res.get("symbol"), ((Number) res.get("current_price")).doubleValue());
                    }
                }

                for (com.bharatai.wealth.model.PortfolioItem item : items) {
                    java.math.BigDecimal invested = item.getQuantity().multiply(item.getAvgBuyPrice());
                    totalInvested = totalInvested.add(invested);

                    Double livePrice = priceMap.get(item.getSymbol());
                    if (livePrice != null) {
                        currentTotalValue = currentTotalValue
                                .add(item.getQuantity().multiply(java.math.BigDecimal.valueOf(livePrice)));
                    } else {
                        // Fallback to DB current price if ML service fails for this symbol
                        currentTotalValue = currentTotalValue.add(item.getQuantity().multiply(item.getCurrentPrice()));
                    }
                }

                if (totalInvested.compareTo(java.math.BigDecimal.ZERO) > 0) {
                    portfolioGain = currentTotalValue.subtract(totalInvested)
                            .divide(totalInvested, 4, java.math.RoundingMode.HALF_UP)
                            .multiply(java.math.BigDecimal.valueOf(100))
                            .doubleValue();
                }
            }
        }

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalNetWorth", totalNetWorth != null ? totalNetWorth : java.math.BigDecimal.ZERO);
        summary.put("monthlyExpense", monthlyExpense != null ? monthlyExpense : java.math.BigDecimal.ZERO);
        summary.put("portfolioGain", portfolioGain);
        summary.put("aiConfidence", mlServiceClient.getAIConfidence());
        summary.put("userName", user.getName());

        return ResponseEntity.ok(summary);
    }
}
