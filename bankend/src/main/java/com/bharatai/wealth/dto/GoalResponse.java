package com.bharatai.wealth.dto;

import com.bharatai.wealth.model.Goal;
import java.math.BigDecimal;

public record GoalResponse(
        Long id,
        String name,
        String type,
        BigDecimal targetAmount,
        BigDecimal currentAmount,
        Integer targetYear,
        BigDecimal monthlyRequired,
        String status,
        double progressPercent
) {
    public static GoalResponse from(Goal goal) {
        double progress = goal.getTargetAmount().compareTo(BigDecimal.ZERO) > 0
                ? goal.getCurrentAmount()
                      .divide(goal.getTargetAmount(), 4, java.math.RoundingMode.HALF_UP)
                      .multiply(BigDecimal.valueOf(100)).doubleValue()
                : 0.0;

        return new GoalResponse(
                goal.getId(),
                goal.getName(),
                goal.getType(),
                goal.getTargetAmount(),
                goal.getCurrentAmount(),
                goal.getTargetYear(),
                goal.getMonthlyRequired(),
                goal.getStatus(),
                Math.min(progress, 100.0)
        );
    }
}
