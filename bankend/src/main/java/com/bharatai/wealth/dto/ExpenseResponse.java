package com.bharatai.wealth.dto;

import com.bharatai.wealth.model.Expense;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Response DTO for expenses.
 * Never exposes internal fields (user entity, isDeleted flag).
 */
public record ExpenseResponse(
        Long id,
        BigDecimal amount,
        String description,
        Expense.Category category,
        LocalDate date,
        String merchantName,
        Expense.PaymentSource paymentSource,
        boolean isAutoSynced
) {
    public static ExpenseResponse from(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getDescription(),
                expense.getCategory(),
                expense.getDate(),
                expense.getMerchantName(),
                expense.getPaymentSource(),
                expense.isAutoSynced()
        );
    }
}
