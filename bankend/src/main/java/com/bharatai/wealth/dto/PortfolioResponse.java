package com.bharatai.wealth.dto;

import com.bharatai.wealth.model.PortfolioItem;
import java.math.BigDecimal;

public record PortfolioResponse(
        Long id,
        String symbol,
        String name,
        PortfolioItem.AssetType type,
        BigDecimal quantity,
        BigDecimal avgBuyPrice,
        BigDecimal currentPrice,
        BigDecimal totalValue,
        BigDecimal gainLoss,
        double gainLossPercent
) {
    public static PortfolioResponse from(PortfolioItem item) {
        BigDecimal totalValue = item.getQuantity().multiply(item.getCurrentPrice());
        BigDecimal invested = item.getQuantity().multiply(item.getAvgBuyPrice());
        BigDecimal gainLoss = totalValue.subtract(invested);
        double gainLossPercent = invested.compareTo(BigDecimal.ZERO) > 0
                ? gainLoss.divide(invested, 4, java.math.RoundingMode.HALF_UP)
                          .multiply(BigDecimal.valueOf(100)).doubleValue()
                : 0.0;

        return new PortfolioResponse(
                item.getId(),
                item.getSymbol(),
                item.getName(),
                item.getType(),
                item.getQuantity(),
                item.getAvgBuyPrice(),
                item.getCurrentPrice(),
                totalValue,
                gainLoss,
                gainLossPercent
        );
    }
}
