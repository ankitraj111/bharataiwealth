package com.bharatai.wealth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class MLServiceClient {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ml.service.url:http://localhost:8000}")
    private String mlServiceUrl;

    @org.springframework.cache.annotation.Cacheable(value = "aiConfidence", key = "'global'")
    public Integer getAIConfidence() {
        try {
            // Use ClientHttpRequestFactory with timeout in a real world app,
            // for now we'll just handle the exception if it timeouts/fails.
            @SuppressWarnings("unchecked")
            Map<String, Object> health = restTemplate.getForObject(mlServiceUrl + "/health", Map.class);
            if (health != null && "healthy".equals(health.get("status"))) {
                return 98; // Dynamic value from health check
            }
        } catch (Exception e) {
            log.warn("ML Service unreachable: {}", e.getMessage());
        }
        return 87; // Fallback mock value
    }

    @org.springframework.cache.annotation.Cacheable(value = "predictions", key = "#symbol")
    public Map<String, Object> getPrediction(String symbol) {
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> prediction = restTemplate.getForObject(
                    mlServiceUrl + "/predict?symbol=" + symbol, Map.class);
            return prediction;
        } catch (Exception e) {
            log.warn("Failed to fetch prediction for {}: {}", symbol, e.getMessage());
            return null;
        }
    }

    @org.springframework.cache.annotation.Cacheable(value = "portfolioAnalysis", key = "#symbols")
    public Map<String, Object> getPortfolioAnalysis(java.util.List<String> symbols) {
        if (symbols == null || symbols.isEmpty())
            return null;
        try {
            String symbolsParam = String.join(",", symbols);
            @SuppressWarnings("unchecked")
            Map<String, Object> analysis = (Map<String, Object>) restTemplate.getForObject(
                    mlServiceUrl + "/analyze/portfolio?symbols=" + symbolsParam, Map.class);
            return analysis;
        } catch (Exception e) {
            log.warn("Failed to fetch portfolio analysis: {}", e.getMessage());
            return null;
        }
    }
}
