package com.bharatai.wealth.controller;

import com.bharatai.wealth.dto.StockAnalysisDTO.*;
import com.bharatai.wealth.service.StockAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * REST Controller for Stock Analysis with Risk-Based Filtering
 */
@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
public class StockAnalysisController {

    private final StockAnalysisService stockAnalysisService;

    /**
     * Get full stock analysis with risk-based filtering
     * 
     * @param symbol Stock symbol (e.g., RELIANCE, TCS)
     * @param risk   Risk category: LOW, MEDIUM, HIGH (default: MEDIUM)
     */
    @GetMapping("/{symbol}/analysis")
    public ResponseEntity<StockAnalysisResponse> getStockAnalysis(
            @PathVariable String symbol,
            @RequestParam(defaultValue = "MEDIUM") String risk) {

        RiskCategory riskLevel;
        try {
            riskLevel = RiskCategory.valueOf(risk.toUpperCase());
        } catch (IllegalArgumentException e) {
            riskLevel = RiskCategory.MEDIUM;
        }

        StockAnalysisResponse analysis = stockAnalysisService.getFullAnalysis(symbol, riskLevel);

        // Apply risk-based filtering
        if (riskLevel == RiskCategory.LOW) {
            // Low Risk: Remove F&O data, simplify technicals
            analysis.setFnoData(null);
            if (analysis.getTechnicals() != null) {
                analysis.getTechnicals().setVwap(null);
                analysis.getTechnicals().setIntradayTrend(null);
            }
        } else if (riskLevel == RiskCategory.MEDIUM) {
            // Medium Risk: Partial F&O (remove detailed strikes)
            if (analysis.getFnoData() != null) {
                analysis.getFnoData().setTopStrikes(null);
            }
        }
        // HIGH Risk: Full data (no filtering)

        return ResponseEntity.ok(analysis);
    }

    /**
     * Get AI Score only (lightweight endpoint)
     */
    @GetMapping("/{symbol}/score")
    public ResponseEntity<AIScore> getAIScore(@PathVariable String symbol) {
        AIScore score = stockAnalysisService.calculateAIScore(symbol);
        return ResponseEntity.ok(score);
    }

    /**
     * Get available stocks for analysis
     */
    @GetMapping("/available")
    public ResponseEntity<List<Map<String, Object>>> getAvailableStocks() {
        List<Map<String, Object>> stocks = Arrays.asList(
                createStockEntry("RELIANCE", "Reliance Industries", "Oil & Gas / Retail", 2856.50),
                createStockEntry("TCS", "Tata Consultancy Services", "IT Services", 4125.30),
                createStockEntry("HDFCBANK", "HDFC Bank", "Banking", 1678.45),
                createStockEntry("INFY", "Infosys", "IT Services", 1892.20),
                createStockEntry("TATAMOTORS", "Tata Motors", "Automobile", 785.60),
                createStockEntry("ADANIENT", "Adani Enterprises", "Conglomerate", 2450.80),
                createStockEntry("ICICIBANK", "ICICI Bank", "Banking", 1125.90),
                createStockEntry("WIPRO", "Wipro", "IT Services", 485.30),
                createStockEntry("SBIN", "State Bank of India", "Banking", 825.40),
                createStockEntry("BHARTIARTL", "Bharti Airtel", "Telecom", 1645.75));
        return ResponseEntity.ok(stocks);
    }

    /**
     * Batch analysis for multiple stocks (for portfolio view)
     */
    @GetMapping("/batch")
    public ResponseEntity<List<Map<String, Object>>> getBatchAnalysis(
            @RequestParam List<String> symbols,
            @RequestParam(defaultValue = "MEDIUM") String risk) {

        RiskCategory riskLevel;
        try {
            riskLevel = RiskCategory.valueOf(risk.toUpperCase());
        } catch (IllegalArgumentException e) {
            riskLevel = RiskCategory.MEDIUM;
        }

        List<Map<String, Object>> results = new ArrayList<>();
        for (String symbol : symbols) {
            StockAnalysisResponse analysis = stockAnalysisService.getFullAnalysis(symbol, riskLevel);
            Map<String, Object> summary = new HashMap<>();
            summary.put("symbol", symbol);
            summary.put("name", analysis.getName());
            summary.put("currentPrice", analysis.getCurrentPrice());
            summary.put("changePercent", analysis.getChangePercent());
            summary.put("aiScore", analysis.getAiScore());
            summary.put("riskMetrics", analysis.getRiskMetrics());
            summary.put("verdict", analysis.getAiScore().getVerdict());
            results.add(summary);
        }

        return ResponseEntity.ok(results);
    }

    /**
     * Search stocks by query
     */
    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchStocks(@RequestParam String q) {
        String query = q.toUpperCase();
        List<Map<String, Object>> results = new ArrayList<>();

        // Simple mock search
        String[][] stocks = {
                { "RELIANCE", "Reliance Industries", "Oil & Gas / Retail" },
                { "TCS", "Tata Consultancy Services", "IT Services" },
                { "HDFCBANK", "HDFC Bank", "Banking" },
                { "INFY", "Infosys", "IT Services" },
                { "TATAMOTORS", "Tata Motors", "Automobile" },
                { "ADANIENT", "Adani Enterprises", "Conglomerate" },
                { "ICICIBANK", "ICICI Bank", "Banking" },
                { "WIPRO", "Wipro", "IT Services" },
                { "SBIN", "State Bank of India", "Banking" },
                { "BHARTIARTL", "Bharti Airtel", "Telecom" },
                { "MARUTI", "Maruti Suzuki", "Automobile" },
                { "BAJFINANCE", "Bajaj Finance", "NBFC" },
                { "KOTAKBANK", "Kotak Mahindra Bank", "Banking" },
                { "ASIANPAINT", "Asian Paints", "Consumer Goods" },
                { "LT", "Larsen & Toubro", "Infrastructure" }
        };

        for (String[] stock : stocks) {
            if (stock[0].contains(query) || stock[1].toUpperCase().contains(query)) {
                Map<String, Object> result = new HashMap<>();
                result.put("symbol", stock[0]);
                result.put("name", stock[1]);
                result.put("sector", stock[2]);
                results.add(result);
            }
        }

        return ResponseEntity.ok(results);
    }

    private Map<String, Object> createStockEntry(String symbol, String name, String sector, double price) {
        Map<String, Object> entry = new HashMap<>();
        entry.put("symbol", symbol);
        entry.put("name", name);
        entry.put("sector", sector);
        entry.put("price", price);
        return entry;
    }
}
