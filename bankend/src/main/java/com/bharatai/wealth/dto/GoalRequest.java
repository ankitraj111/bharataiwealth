package com.bharatai.wealth.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record GoalRequest(
        @NotBlank(message = "Goal name is required")
        @Size(max = 255, message = "Goal name must be under 255 characters")
        String name,

        @NotBlank(message = "Goal type is required")
        String type,

        @NotNull(message = "Target amount is required")
        @Positive(message = "Target amount must be positive")
        BigDecimal targetAmount,

        @NotNull(message = "Current amount is required")
        @PositiveOrZero(message = "Current amount must be non-negative")
        BigDecimal currentAmount,

        @NotNull(message = "Target year is required")
        @Min(value = 2024, message = "Target year must be 2024 or later")
        Integer targetYear,

        @PositiveOrZero(message = "Monthly required must be non-negative")
        BigDecimal monthlyRequired
) {}
