package com.bharatai.wealth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO for comprehensive 20-step Stock Analysis with risk-based filtering
 */
public class StockAnalysisDTO {

    public enum RiskCategory {
        LOW, MEDIUM, HIGH
    }

    public enum CyclePhase {
        EARLY_EXPANSION, MID_EXPANSION, LATE_CYCLE, RECESSION
    }

    public enum Verdict {
        STRONG_BUY, ACCUMULATE, HOLD, AVOID
    }

    public enum ImpactLevel {
        HIGH, MEDIUM, LOW
    }

    // =============================================
    // Main Response
    // =============================================
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class StockAnalysisResponse {
        private String symbol;
        private String name;
        private String sector;
        private Double currentPrice;
        private Double changePercent;
        private RiskCategory riskCategory;

        // Section 14: Business Cycle
        private BusinessCycle businessCycle;

        // Section 15: Earnings Trend
        private EarningsTrend earningsTrend;

        // Section 16: Insider Activity
        private InsiderActivity insiderActivity;

        // Section 17: Global Peers
        private GlobalPeers globalPeers;

        // Section 18: AI Score
        private AIScore aiScore;

        // Section 19: Risk Metrics
        private RiskMetrics riskMetrics;

        // Section 20: Event Radar
        private EventRadar eventRadar;

        // Existing sections (1-13) - abbreviated for risk filtering
        private Fundamentals fundamentals;
        private Valuation valuation;
        private Technicals technicals;
        private FnOData fnoData; // Only for HIGH risk
        private SmartMoney smartMoney;
        private Sentiment sentiment;
    }

    // =============================================
    // Section 14: Business Cycle Mapping
    // =============================================
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BusinessCycle {
        private CyclePhase phase;
        private Integer cyclePosition; // 0-100: where in cycle
        private String description;
        private List<CycleHistoryPoint> historicalCycles;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CycleHistoryPoint {
        private String period;
        private CyclePhase phase;
        private Double returnPercent;
    }

    // =============================================
    // Section 15: Earnings Trend Analysis
    // =============================================
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class EarningsTrend {
        private List<QuarterResult> quarters; // Last 8 quarters
        private Integer epsBeatStreak;
        private Double revenueGrowthYoY;
        private Double marginTrend;
        private String analystEstimate;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuarterResult {
        private String quarter; // e.g., "Q3 FY25"
        private Double revenue;
        private Double eps;
        private Double epsEstimate;
        private Boolean beat; // true if EPS > estimate
        private Double margin;
    }

    // =============================================
    // Section 16: Insider/Promoter Activity
    // =============================================
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InsiderActivity {
        private Double promoterHolding;
        private Double promoterChange; // change in last quarter
        private String trend; // INCREASING, STABLE, DECREASING
        private List<InsiderTransaction> recentTransactions;
        private Boolean isBullish; // Based on recent activity
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InsiderTransaction {
        private LocalDate date;
        private String insiderName;
        private String role; // PROMOTER, DIRECTOR, KEY_MGMT
        private String type; // BUY, SELL
        private Long quantity;
        private Double value;
    }

    // =============================================
    // Section 17: Global Peer Benchmarking
    // =============================================
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GlobalPeers {
        private List<PeerComparison> peers;
        private Double valuationGap; // vs global average (negative = undervalued)
        private Double growthGap; // vs global average
        private String insight;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PeerComparison {
        private String name;
        private String country;
        private Double marketCap; // in billion USD
        private Double peRatio;
        private Double revenueGrowth;
        private Double profitMargin;
    }

    // =============================================
    // Section 18: AI Scoring Engine (0-100)
    // =============================================
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AIScore {
        private Integer total; // 0-100
        private Integer fundamentals; // 40% weight
        private Integer valuation; // 20% weight
        private Integer technicals; // 20% weight
        private Integer capitalFlow; // 10% weight
        private Integer sentiment; // 10% weight
        private Verdict verdict;
        private String verdictReason;
    }

    // =============================================
    // Section 19: Risk-Adjusted Metrics
    // =============================================
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RiskMetrics {
        private Double beta;
        private Double sharpeRatio;
        private Double sortinoRatio;
        private Double maxDrawdown; // negative percentage
        private Double volatility;
        private String riskLevel; // LOW, MODERATE, HIGH
        private List<DrawdownHistory> drawdownHistory;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DrawdownHistory {
        private String period;
        private Double drawdownPercent;
        private Integer recoveryDays;
    }

    // =============================================
    // Section 20: Event Radar
    // =============================================
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class EventRadar {
        private List<UpcomingEvent> upcoming;
        private String overallRiskLevel; // HIGH_RISK, MODERATE, TAILWIND
        private String weekOutlook;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpcomingEvent {
        private LocalDate date;
        private String event;
        private String type; // RESULTS, RBI, FED, ELECTION, BUDGET
        private ImpactLevel impact;
        private String potentialEffect;
    }

    // =============================================
    // Existing Sections (Abbreviated)
    // =============================================
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Fundamentals {
        private Double roe;
        private Double roce;
        private Double debtToEquity;
        private Double currentRatio;
        private Double revenueGrowth5Y;
        private Double profitGrowth5Y;
        private Boolean isCashFlowPositive;
        private String moatStrength; // STRONG, MODERATE, WEAK
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Valuation {
        private Double peRatio;
        private Double pbRatio;
        private Double evEbitda;
        private Double pegRatio;
        private Double intrinsicValue;
        private Double marginOfSafety;
        private String valuationStatus; // UNDERVALUED, FAIR, OVERVALUED
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Technicals {
        private String trend; // BULLISH, BEARISH, SIDEWAYS
        private Double rsi;
        private String macdSignal;
        private Double sma50;
        private Double sma200;
        private Boolean goldenCross;
        private Boolean deathCross;
        private List<Double> supportLevels;
        private List<Double> resistanceLevels;
        // For HIGH risk - intraday data
        private Double vwap;
        private String intradayTrend;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FnOData {
        private Long openInterest;
        private Double oiChange;
        private Double maxPain;
        private String oiTrend; // LONG_BUILDUP, SHORT_BUILDUP, LONG_UNWINDING, SHORT_COVERING
        private Double putCallRatio;
        private Boolean isShortCoveringActive;
        private List<StrikeData> topStrikes;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class StrikeData {
        private Double strike;
        private Long callOI;
        private Long putOI;
        private Double oiChange;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SmartMoney {
        private Double fiiHolding;
        private Double fiiChange;
        private Double diiHolding;
        private Double diiChange;
        private Double mfHolding;
        private String institutionalTrend; // ACCUMULATING, NEUTRAL, DISTRIBUTING
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Sentiment {
        private Double bullishPercent;
        private Integer newsScore; // -100 to +100
        private String socialBuzz; // HIGH, MODERATE, LOW
        private Integer analystBuyRatings;
        private Integer analystHoldRatings;
        private Integer analystSellRatings;
        private Double averageTargetPrice;
    }
}
