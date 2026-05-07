package com.bharatai.wealth.dto;

import com.bharatai.wealth.model.PortfolioItem;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record PortfolioRequest(
        @NotBlank(message = "Symbol is required")
        @Size(max = 20, message = "Symbol must be under 20 characters")
        String symbol,

        @NotBlank(message = "Name is required")
        @Size(max = 255, message = "Name must be under 255 characters")
        String name,

        @NotNull(message = "Asset type is required")
        PortfolioItem.AssetType type,

        @NotNull(message = "Quantity is required")
        @Positive(message = "Quantity must be positive")
        BigDecimal quantity,

        @NotNull(message = "Average buy price is required")
        @PositiveOrZero(message = "Average buy price must be non-negative")
        BigDecimal avgBuyPrice,

        @NotNull(message = "Current price is required")
        @PositiveOrZero(message = "Current price must be non-negative")
        BigDecimal currentPrice
) {}
