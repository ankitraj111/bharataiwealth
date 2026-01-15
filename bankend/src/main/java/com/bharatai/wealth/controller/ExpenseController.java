package com.bharatai.wealth.controller;

import com.bharatai.wealth.model.Expense;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.ExpenseRepository;
import com.bharatai.wealth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    @GetMapping
    @org.springframework.cache.annotation.Cacheable(value = "expenses", key = "#authentication.name")
    public ResponseEntity<List<Expense>> getExpenses(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(expenseRepository.findByUserAndIsDeletedFalseOrderByDateDesc(user));
    }

    @PostMapping
    @org.springframework.cache.annotation.CacheEvict(value = { "expenses",
            "dashboardSummary" }, key = "#authentication.name")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        expense.setUser(user);
        return ResponseEntity.ok(expenseRepository.save(expense));
    }

    @PatchMapping("/{id}")
    @org.springframework.cache.annotation.CacheEvict(value = { "expenses",
            "dashboardSummary" }, key = "#authentication.name")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, Object> updates,
            Authentication authentication) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getEmail().equals(authentication.getName())) {
            return ResponseEntity.status(403).build();
        }

        if (updates.containsKey("category")) {
            expense.setCategory(Expense.Category.valueOf((String) updates.get("category")));
        }
        if (updates.containsKey("description")) {
            expense.setDescription((String) updates.get("description"));
        }
        if (updates.containsKey("amount")) {
            expense.setAmount(new java.math.BigDecimal(updates.get("amount").toString()));
        }
        if (updates.containsKey("date")) {
            expense.setDate(java.time.LocalDate.parse((String) updates.get("date")));
        }
        if (updates.containsKey("merchantName")) {
            expense.setMerchantName((String) updates.get("merchantName"));
        }

        return ResponseEntity.ok(expenseRepository.save(expense));
    }

    @DeleteMapping("/{id}")
    @org.springframework.cache.annotation.CacheEvict(value = { "expenses",
            "dashboardSummary" }, key = "#authentication.name")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable Long id,
            Authentication authentication) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getEmail().equals(authentication.getName())) {
            return ResponseEntity.status(403).build();
        }

        expense.setDeleted(true);
        expenseRepository.save(expense);
        return ResponseEntity.noContent().build();
    }
}
