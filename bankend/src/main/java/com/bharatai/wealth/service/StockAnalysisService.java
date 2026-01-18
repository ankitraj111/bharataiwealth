package com.bharatai.wealth.service;

import com.bharatai.wealth.dto.StockAnalysisDTO;
import com.bharatai.wealth.dto.StockAnalysisDTO.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

/**
 * Service for generating stock analysis with risk-based filtering
 */
@Service
public class StockAnalysisService {

    private static final Map<String, StockInfo> STOCK_DATABASE = new HashMap<>();

    static {
        STOCK_DATABASE.put("RELIANCE", new StockInfo("Reliance Industries", "Oil & Gas / Retail", 2856.50, 1.24));
        STOCK_DATABASE.put("TCS", new StockInfo("Tata Consultancy Services", "IT Services", 4125.30, 0.85));
        STOCK_DATABASE.put("HDFCBANK", new StockInfo("HDFC Bank", "Banking", 1678.45, -0.32));
        STOCK_DATABASE.put("INFY", new StockInfo("Infosys", "IT Services", 1892.20, 1.45));
        STOCK_DATABASE.put("TATAMOTORS", new StockInfo("Tata Motors", "Automobile", 785.60, 3.21));
        STOCK_DATABASE.put("ADANIENT", new StockInfo("Adani Enterprises", "Conglomerate", 2450.80, 2.15));
        STOCK_DATABASE.put("ICICIBANK", new StockInfo("ICICI Bank", "Banking", 1125.90, 0.68));
        STOCK_DATABASE.put("WIPRO", new StockInfo("Wipro", "IT Services", 485.30, -0.45));
        STOCK_DATABASE.put("SBIN", new StockInfo("State Bank of India", "Banking", 825.40, 1.02));
        STOCK_DATABASE.put("BHARTIARTL", new StockInfo("Bharti Airtel", "Telecom", 1645.75, 0.92));
    }

    public StockAnalysisResponse getFullAnalysis(String symbol, RiskCategory riskLevel) {
        StockInfo info = STOCK_DATABASE.getOrDefault(symbol.toUpperCase(),
                new StockInfo(symbol, "Unknown", 1000.0, 0.5));

        return StockAnalysisResponse.builder()
                .symbol(symbol.toUpperCase())
                .name(info.name)
                .sector(info.sector)
                .currentPrice(info.price)
                .changePercent(info.change)
                .riskCategory(riskLevel)
                .businessCycle(generateBusinessCycle(symbol))
                .earningsTrend(generateEarningsTrend(symbol))
                .insiderActivity(generateInsiderActivity(symbol))
                .globalPeers(generateGlobalPeers(symbol, info.sector))
                .aiScore(calculateAIScore(symbol))
                .riskMetrics(generateRiskMetrics(symbol, riskLevel))
                .eventRadar(generateEventRadar(symbol))
                .fundamentals(generateFundamentals(symbol))
                .valuation(generateValuation(symbol, info.price))
                .technicals(generateTechnicals(symbol, info.price, riskLevel))
                .fnoData(riskLevel == RiskCategory.HIGH || riskLevel == RiskCategory.MEDIUM
                        ? generateFnOData(symbol, info.price)
                        : null)
                .smartMoney(generateSmartMoney(symbol))
                .sentiment(generateSentiment(symbol))
                .build();
    }

    // ==========================================
    // Section 14: Business Cycle Mapping
    // ==========================================
    private BusinessCycle generateBusinessCycle(String symbol) {
        Random rand = new Random(symbol.hashCode());
        CyclePhase[] phases = CyclePhase.values();
        CyclePhase phase = phases[rand.nextInt(phases.length)];

        List<CycleHistoryPoint> history = Arrays.asList(
                CycleHistoryPoint.builder().period("2019-20").phase(CyclePhase.RECESSION).returnPercent(-12.5).build(),
                CycleHistoryPoint.builder().period("2020-21").phase(CyclePhase.EARLY_EXPANSION).returnPercent(45.2)
                        .build(),
                CycleHistoryPoint.builder().period("2021-22").phase(CyclePhase.MID_EXPANSION).returnPercent(28.3)
                        .build(),
                CycleHistoryPoint.builder().period("2022-23").phase(CyclePhase.LATE_CYCLE).returnPercent(8.5).build(),
                CycleHistoryPoint.builder().period("2023-24").phase(phase).returnPercent(15.0 + rand.nextDouble() * 20)
                        .build());

        String description = switch (phase) {
            case EARLY_EXPANSION -> "Company is in early recovery mode with improving margins";
            case MID_EXPANSION -> "Strong growth phase with expanding market share";
            case LATE_CYCLE -> "Mature phase with stable but slowing growth";
            case RECESSION -> "Defensive mode - focus on cost optimization";
        };

        return BusinessCycle.builder()
                .phase(phase)
                .cyclePosition(30 + rand.nextInt(50))
                .description(description)
                .historicalCycles(history)
                .build();
    }

    // ==========================================
    // Section 15: Earnings Trend Analysis
    // ==========================================
    private EarningsTrend generateEarningsTrend(String symbol) {
        Random rand = new Random(symbol.hashCode());
        List<QuarterResult> quarters = new ArrayList<>();
        String[] qLabels = { "Q1 FY24", "Q2 FY24", "Q3 FY24", "Q4 FY24", "Q1 FY25", "Q2 FY25", "Q3 FY25", "Q4 FY25" };
        double baseRevenue = 20000 + rand.nextDouble() * 50000;
        double baseEps = 15 + rand.nextDouble() * 30;

        int beatCount = 0;
        for (int i = 0; i < 8; i++) {
            double revenue = baseRevenue * (1 + 0.02 * i + rand.nextDouble() * 0.1);
            double eps = baseEps * (1 + 0.025 * i + rand.nextDouble() * 0.08);
            double estimate = eps * (0.92 + rand.nextDouble() * 0.1);
            boolean beat = eps > estimate;
            if (beat)
                beatCount++;

            quarters.add(QuarterResult.builder()
                    .quarter(qLabels[i])
                    .revenue(Math.round(revenue * 100.0) / 100.0)
                    .eps(Math.round(eps * 100.0) / 100.0)
                    .epsEstimate(Math.round(estimate * 100.0) / 100.0)
                    .beat(beat)
                    .margin(15 + rand.nextDouble() * 15)
                    .build());
        }

        return EarningsTrend.builder()
                .quarters(quarters)
                .epsBeatStreak(beatCount)
                .revenueGrowthYoY(8 + rand.nextDouble() * 15)
                .marginTrend(rand.nextBoolean() ? 1.5 : -0.8)
                .analystEstimate(beatCount > 5 ? "Above consensus" : "In-line with estimates")
                .build();
    }

    // ==========================================
    // Section 16: Insider/Promoter Activity
    // ==========================================
    private InsiderActivity generateInsiderActivity(String symbol) {
        Random rand = new Random(symbol.hashCode());
        double holding = 40 + rand.nextDouble() * 30;
        double change = -2 + rand.nextDouble() * 4;

        List<InsiderTransaction> transactions = Arrays.asList(
                InsiderTransaction.builder()
                        .date(LocalDate.now().minusDays(15))
                        .insiderName("Promoter Group")
                        .role("PROMOTER")
                        .type(change > 0 ? "BUY" : "SELL")
                        .quantity((long) (50000 + rand.nextInt(200000)))
                        .value(Math.abs(change) * 10000000)
                        .build(),
                InsiderTransaction.builder()
                        .date(LocalDate.now().minusDays(45))
                        .insiderName("Key Management")
                        .role("KEY_MGMT")
                        .type(rand.nextBoolean() ? "BUY" : "SELL")
                        .quantity((long) (10000 + rand.nextInt(50000)))
                        .value(5000000 + rand.nextDouble() * 10000000)
                        .build());

        return InsiderActivity.builder()
                .promoterHolding(Math.round(holding * 100.0) / 100.0)
                .promoterChange(Math.round(change * 100.0) / 100.0)
                .trend(change > 0.5 ? "INCREASING" : change < -0.5 ? "DECREASING" : "STABLE")
                .recentTransactions(transactions)
                .isBullish(change > 0)
                .build();
    }

    // ==========================================
    // Section 17: Global Peer Benchmarking
    // ==========================================
    private GlobalPeers generateGlobalPeers(String symbol, String sector) {
        List<PeerComparison> peers = new ArrayList<>();

        if (sector.contains("IT")) {
            peers.add(PeerComparison.builder().name("Accenture").country("US").marketCap(220.0).peRatio(28.5)
                    .revenueGrowth(8.2).profitMargin(15.2).build());
            peers.add(PeerComparison.builder().name("Cognizant").country("US").marketCap(35.0).peRatio(18.2)
                    .revenueGrowth(5.8).profitMargin(12.5).build());
            peers.add(PeerComparison.builder().name("IBM").country("US").marketCap(180.0).peRatio(22.0)
                    .revenueGrowth(2.1).profitMargin(10.8).build());
        } else if (sector.contains("Oil") || sector.contains("Retail")) {
            peers.add(PeerComparison.builder().name("Exxon Mobil").country("US").marketCap(450.0).peRatio(12.5)
                    .revenueGrowth(15.2).profitMargin(11.5).build());
            peers.add(PeerComparison.builder().name("Aramco").country("Saudi").marketCap(2100.0).peRatio(14.8)
                    .revenueGrowth(8.5).profitMargin(28.0).build());
            peers.add(PeerComparison.builder().name("Shell").country("UK").marketCap(210.0).peRatio(8.2)
                    .revenueGrowth(12.0).profitMargin(9.2).build());
        } else if (sector.contains("Bank")) {
            peers.add(PeerComparison.builder().name("JP Morgan").country("US").marketCap(580.0).peRatio(12.8)
                    .revenueGrowth(9.5).profitMargin(35.2).build());
            peers.add(PeerComparison.builder().name("HSBC").country("UK").marketCap(165.0).peRatio(8.5)
                    .revenueGrowth(6.2).profitMargin(28.5).build());
            peers.add(PeerComparison.builder().name("DBS Bank").country("Singapore").marketCap(85.0).peRatio(11.2)
                    .revenueGrowth(10.5).profitMargin(42.0).build());
        } else if (sector.contains("Auto")) {
            peers.add(PeerComparison.builder().name("Tesla").country("US").marketCap(800.0).peRatio(65.0)
                    .revenueGrowth(25.0).profitMargin(12.5).build());
            peers.add(PeerComparison.builder().name("Toyota").country("Japan").marketCap(280.0).peRatio(10.5)
                    .revenueGrowth(8.2).profitMargin(9.8).build());
            peers.add(PeerComparison.builder().name("Volkswagen").country("Germany").marketCap(65.0).peRatio(4.5)
                    .revenueGrowth(5.5).profitMargin(6.2).build());
        } else {
            peers.add(PeerComparison.builder().name("Berkshire Hathaway").country("US").marketCap(850.0).peRatio(22.0)
                    .revenueGrowth(10.0).profitMargin(15.0).build());
            peers.add(PeerComparison.builder().name("Siemens").country("Germany").marketCap(145.0).peRatio(18.5)
                    .revenueGrowth(7.5).profitMargin(10.5).build());
        }

        Random rand = new Random(symbol.hashCode());
        return GlobalPeers.builder()
                .peers(peers)
                .valuationGap(-15 + rand.nextDouble() * 30)
                .growthGap(-5 + rand.nextDouble() * 20)
                .insight(rand.nextBoolean() ? "Trading at discount vs global peers"
                        : "Valued at premium due to growth expectations")
                .build();
    }

    // ==========================================
    // Section 18: AI Scoring Engine (0-100)
    // ==========================================
    public AIScore calculateAIScore(String symbol) {
        Random rand = new Random(symbol.hashCode());

        int fundamentals = 60 + rand.nextInt(35);
        int valuation = 50 + rand.nextInt(40);
        int technicals = 55 + rand.nextInt(35);
        int capitalFlow = 50 + rand.nextInt(40);
        int sentiment = 55 + rand.nextInt(35);

        int total = (int) (fundamentals * 0.40 + valuation * 0.20 + technicals * 0.20 + capitalFlow * 0.10
                + sentiment * 0.10);

        Verdict verdict = total >= 80 ? Verdict.STRONG_BUY
                : total >= 60 ? Verdict.ACCUMULATE : total >= 40 ? Verdict.HOLD : Verdict.AVOID;
        String reason = switch (verdict) {
            case STRONG_BUY -> "Strong fundamentals + momentum + institutional accumulation";
            case ACCUMULATE -> "Good fundamentals, wait for better entry points";
            case HOLD -> "Mixed signals - hold existing positions";
            case AVOID -> "Weak technicals and deteriorating fundamentals";
        };

        return AIScore.builder()
                .total(total)
                .fundamentals(fundamentals)
                .valuation(valuation)
                .technicals(technicals)
                .capitalFlow(capitalFlow)
                .sentiment(sentiment)
                .verdict(verdict)
                .verdictReason(reason)
                .build();
    }

    // ==========================================
    // Section 19: Risk-Adjusted Metrics
    // ==========================================
    private RiskMetrics generateRiskMetrics(String symbol, RiskCategory riskLevel) {
        Random rand = new Random(symbol.hashCode());

        double beta = 0.6 + rand.nextDouble() * 0.8;
        if (riskLevel == RiskCategory.HIGH)
            beta += 0.3;
        if (riskLevel == RiskCategory.LOW)
            beta -= 0.2;

        List<DrawdownHistory> history = Arrays.asList(
                DrawdownHistory.builder().period("Mar 2020").drawdownPercent(-35.5).recoveryDays(120).build(),
                DrawdownHistory.builder().period("Feb 2022").drawdownPercent(-18.2).recoveryDays(85).build(),
                DrawdownHistory.builder().period("Oct 2023").drawdownPercent(-12.8).recoveryDays(45).build());

        String riskLevelStr = beta > 1.1 ? "HIGH" : beta > 0.8 ? "MODERATE" : "LOW";

        return RiskMetrics.builder()
                .beta(Math.round(beta * 100.0) / 100.0)
                .sharpeRatio(0.8 + rand.nextDouble() * 1.2)
                .sortinoRatio(1.0 + rand.nextDouble() * 1.5)
                .maxDrawdown(-10 - rand.nextDouble() * 25)
                .volatility(15 + rand.nextDouble() * 20)
                .riskLevel(riskLevelStr)
                .drawdownHistory(history)
                .build();
    }

    // ==========================================
    // Section 20: Event Radar
    // ==========================================
    private EventRadar generateEventRadar(String symbol) {
        List<UpcomingEvent> events = Arrays.asList(
                UpcomingEvent.builder()
                        .date(LocalDate.now().plusDays(12))
                        .event("Q4 FY25 Results")
                        .type("RESULTS")
                        .impact(ImpactLevel.HIGH)
                        .potentialEffect("Expected revenue beat, margin pressure")
                        .build(),
                UpcomingEvent.builder()
                        .date(LocalDate.now().plusDays(25))
                        .event("RBI MPC Meeting")
                        .type("RBI")
                        .impact(ImpactLevel.MEDIUM)
                        .potentialEffect("Rate cut expectation - positive for growth stocks")
                        .build(),
                UpcomingEvent.builder()
                        .date(LocalDate.now().plusDays(45))
                        .event("Union Budget 2026")
                        .type("BUDGET")
                        .impact(ImpactLevel.HIGH)
                        .potentialEffect("Sector allocation changes possible")
                        .build());

        return EventRadar.builder()
                .upcoming(events)
                .overallRiskLevel("MODERATE")
                .weekOutlook("Neutral with upside bias - watch for earnings catalyst")
                .build();
    }

    // ==========================================
    // Fundamentals
    // ==========================================
    private Fundamentals generateFundamentals(String symbol) {
        Random rand = new Random(symbol.hashCode());
        return Fundamentals.builder()
                .roe(12 + rand.nextDouble() * 18)
                .roce(10 + rand.nextDouble() * 20)
                .debtToEquity(0.2 + rand.nextDouble() * 0.8)
                .currentRatio(1.2 + rand.nextDouble() * 1.5)
                .revenueGrowth5Y(8 + rand.nextDouble() * 15)
                .profitGrowth5Y(10 + rand.nextDouble() * 20)
                .isCashFlowPositive(rand.nextDouble() > 0.2)
                .moatStrength(rand.nextDouble() > 0.6 ? "STRONG" : rand.nextDouble() > 0.3 ? "MODERATE" : "WEAK")
                .build();
    }

    // ==========================================
    // Valuation
    // ==========================================
    private Valuation generateValuation(String symbol, double price) {
        Random rand = new Random(symbol.hashCode());
        double peRatio = 15 + rand.nextDouble() * 40;
        double intrinsic = price * (0.8 + rand.nextDouble() * 0.5);
        double marginOfSafety = ((intrinsic - price) / price) * 100;

        return Valuation.builder()
                .peRatio(Math.round(peRatio * 10.0) / 10.0)
                .pbRatio(2 + rand.nextDouble() * 6)
                .evEbitda(8 + rand.nextDouble() * 15)
                .pegRatio(0.8 + rand.nextDouble() * 2)
                .intrinsicValue(Math.round(intrinsic * 100.0) / 100.0)
                .marginOfSafety(Math.round(marginOfSafety * 100.0) / 100.0)
                .valuationStatus(marginOfSafety > 10 ? "UNDERVALUED" : marginOfSafety > -10 ? "FAIR" : "OVERVALUED")
                .build();
    }

    // ==========================================
    // Technicals
    // ==========================================
    private Technicals generateTechnicals(String symbol, double price, RiskCategory riskLevel) {
        Random rand = new Random(symbol.hashCode());
        double sma50 = price * (0.95 + rand.nextDouble() * 0.1);
        double sma200 = price * (0.9 + rand.nextDouble() * 0.15);

        Technicals.TechnicalsBuilder builder = Technicals.builder()
                .trend(price > sma50 && sma50 > sma200 ? "BULLISH" : price < sma50 ? "BEARISH" : "SIDEWAYS")
                .rsi(30 + rand.nextDouble() * 50)
                .macdSignal(rand.nextBoolean() ? "BULLISH_CROSSOVER" : "BEARISH_CROSSOVER")
                .sma50(Math.round(sma50 * 100.0) / 100.0)
                .sma200(Math.round(sma200 * 100.0) / 100.0)
                .goldenCross(sma50 > sma200 && rand.nextBoolean())
                .deathCross(sma50 < sma200 && rand.nextBoolean())
                .supportLevels(Arrays.asList(price * 0.95, price * 0.90, price * 0.85))
                .resistanceLevels(Arrays.asList(price * 1.05, price * 1.10, price * 1.15));

        if (riskLevel == RiskCategory.HIGH) {
            builder.vwap(price * (0.98 + rand.nextDouble() * 0.04));
            builder.intradayTrend(rand.nextBoolean() ? "BULLISH" : "BEARISH");
        }

        return builder.build();
    }

    // ==========================================
    // F&O Data (Medium/High Risk Only)
    // ==========================================
    private FnOData generateFnOData(String symbol, double price) {
        Random rand = new Random(symbol.hashCode());
        String[] trends = { "LONG_BUILDUP", "SHORT_BUILDUP", "LONG_UNWINDING", "SHORT_COVERING" };

        List<StrikeData> strikes = new ArrayList<>();
        double baseStrike = Math.round(price / 100) * 100;
        for (int i = -3; i <= 3; i++) {
            strikes.add(StrikeData.builder()
                    .strike(baseStrike + i * 100)
                    .callOI((long) (100000 + rand.nextInt(500000)))
                    .putOI((long) (80000 + rand.nextInt(400000)))
                    .oiChange(-5 + rand.nextDouble() * 10)
                    .build());
        }

        return FnOData.builder()
                .openInterest((long) (5000000 + rand.nextInt(20000000)))
                .oiChange(-5 + rand.nextDouble() * 15)
                .maxPain(baseStrike)
                .oiTrend(trends[rand.nextInt(trends.length)])
                .putCallRatio(0.6 + rand.nextDouble() * 0.8)
                .isShortCoveringActive(rand.nextDouble() > 0.7)
                .topStrikes(strikes)
                .build();
    }

    // ==========================================
    // Smart Money
    // ==========================================
    private SmartMoney generateSmartMoney(String symbol) {
        Random rand = new Random(symbol.hashCode());
        double fiiChange = -2 + rand.nextDouble() * 4;
        double diiChange = -1.5 + rand.nextDouble() * 3;

        return SmartMoney.builder()
                .fiiHolding(15 + rand.nextDouble() * 25)
                .fiiChange(Math.round(fiiChange * 100.0) / 100.0)
                .diiHolding(20 + rand.nextDouble() * 20)
                .diiChange(Math.round(diiChange * 100.0) / 100.0)
                .mfHolding(8 + rand.nextDouble() * 12)
                .institutionalTrend(fiiChange + diiChange > 0.5 ? "ACCUMULATING"
                        : fiiChange + diiChange < -0.5 ? "DISTRIBUTING" : "NEUTRAL")
                .build();
    }

    // ==========================================
    // Sentiment
    // ==========================================
    private Sentiment generateSentiment(String symbol) {
        Random rand = new Random(symbol.hashCode());
        int buy = 8 + rand.nextInt(12);
        int hold = 3 + rand.nextInt(6);
        int sell = rand.nextInt(4);

        return Sentiment.builder()
                .bullishPercent(50 + rand.nextDouble() * 35)
                .newsScore((int) (-20 + rand.nextDouble() * 80))
                .socialBuzz(rand.nextDouble() > 0.6 ? "HIGH" : rand.nextDouble() > 0.3 ? "MODERATE" : "LOW")
                .analystBuyRatings(buy)
                .analystHoldRatings(hold)
                .analystSellRatings(sell)
                .averageTargetPrice(STOCK_DATABASE.containsKey(symbol)
                        ? STOCK_DATABASE.get(symbol).price * (1.1 + rand.nextDouble() * 0.2)
                        : 1200.0)
                .build();
    }

    // Helper class
    private static class StockInfo {
        String name, sector;
        double price, change;

        StockInfo(String name, String sector, double price, double change) {
            this.name = name;
            this.sector = sector;
            this.price = price;
            this.change = change;
        }
    }
}
