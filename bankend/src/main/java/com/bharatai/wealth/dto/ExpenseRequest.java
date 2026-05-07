package com.bharatai.wealth.dto;

import com.bharatai.wealth.model.Expense;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Request DTO for creating/updating expenses.
 * Validated at the controller layer before reaching service.
 */
public record ExpenseRequest(
        @NotNull(message = "Amount is required")
        @Positive(message = "Amount must be positive")
        BigDecimal amount,

        @NotBlank(message = "Description is required")
        @Size(max = 255, message = "Description must be under 255 characters")
        String description,

        @NotNull(message = "Category is required")
        Expense.Category category,

        @NotNull(message = "Date is required")
        LocalDate date,

        @Size(max = 255, message = "Merchant name must be under 255 characters")
        String merchantName,

        Expense.PaymentSource paymentSource
) {}
