package com.bharatai.wealth.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Bank-level fraud detection service
 * Detects suspicious patterns and anomalies
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FraudDetectionService {

    private final SecurityAuditLogger auditLogger;
    
    // Track user activity patterns
    private final Map<String, UserActivityPattern> userPatterns = new ConcurrentHashMap<>();

    /**
     * Analyze transaction for fraud indicators
     */
    public FraudAnalysisResult analyzeTransaction(
        String userId,
        double amount,
        String transactionType,
        String ipAddress,
        String deviceFingerprint
    ) {
        FraudAnalysisResult result = new FraudAnalysisResult();
        int riskScore = 0;

        // Get or create user pattern
        UserActivityPattern pattern = userPatterns.computeIfAbsent(
            userId, 
            k -> new UserActivityPattern()
        );

        // Check 1: Unusual transaction amount
        if (isUnusualAmount(pattern, amount)) {
            riskScore += 30;
            result.addFlag("Unusual transaction amount");
        }

        // Check 2: Rapid successive transactions
        if (isRapidTransaction(pattern)) {
            riskScore += 25;
            result.addFlag("Rapid successive transactions");
        }

        // Check 3: New device
        if (isNewDevice(pattern, deviceFingerprint)) {
            riskScore += 20;
            result.addFlag("New device detected");
        }

        // Check 4: New location (IP-based)
        if (isNewLocation(pattern, ipAddress)) {
            riskScore += 15;
            result.addFlag("New location detected");
        }

        // Check 5: Unusual time (e.g., 2 AM - 5 AM)
        if (isUnusualTime()) {
            riskScore += 10;
            result.addFlag("Unusual transaction time");
        }

        // Update pattern
        pattern.recordTransaction(amount, ipAddress, deviceFingerprint);

        // Determine risk level
        result.setRiskScore(riskScore);
        if (riskScore >= 70) {
            result.setRiskLevel(RiskLevel.HIGH);
            result.setRecommendation("Block transaction and require additional verification");
        } else if (riskScore >= 40) {
            result.setRiskLevel(RiskLevel.MEDIUM);
            result.setRecommendation("Require additional authentication (OTP/MFA)");
        } else {
            result.setRiskLevel(RiskLevel.LOW);
            result.setRecommendation("Allow transaction");
        }

        // Log if suspicious
        if (riskScore >= 40) {
            auditLogger.logSecurityEvent(
                SecurityAuditLogger.SecurityEvent.SUSPICIOUS_ACTIVITY,
                userId,
                ipAddress,
                Map.of(
                    "riskScore", riskScore,
                    "flags", result.getFlags(),
                    "amount", amount,
                    "type", transactionType
                )
            );
        }

        return result;
    }

    private boolean isUnusualAmount(UserActivityPattern pattern, double amount) {
        if (pattern.getTransactionCount() < 5) {
            return false; // Not enough data
        }
        
        double avgAmount = pattern.getAverageAmount();
        // Flag if amount is 3x the average
        return amount > avgAmount * 3;
    }

    private boolean isRapidTransaction(UserActivityPattern pattern) {
        LocalDateTime lastTransaction = pattern.getLastTransactionTime();
        if (lastTransaction == null) {
            return false;
        }
        
        // Flag if transaction within 30 seconds of last one
        return LocalDateTime.now().minusSeconds(30).isBefore(lastTransaction);
    }

    private boolean isNewDevice(UserActivityPattern pattern, String deviceFingerprint) {
        return !pattern.getKnownDevices().contains(deviceFingerprint);
    }

    private boolean isNewLocation(UserActivityPattern pattern, String ipAddress) {
        return !pattern.getKnownIpAddresses().contains(ipAddress);
    }

    private boolean isUnusualTime() {
        int hour = LocalDateTime.now().getHour();
        // Flag transactions between 2 AM and 5 AM
        return hour >= 2 && hour < 5;
    }

    /**
     * Check if user behavior is suspicious
     */
    public boolean isSuspiciousBehavior(String userId) {
        UserActivityPattern pattern = userPatterns.get(userId);
        if (pattern == null) {
            return false;
        }

        // Check for rapid account changes
        if (pattern.getRecentPasswordChanges() > 2) {
            return true;
        }

        // Check for multiple failed transactions
        if (pattern.getRecentFailedTransactions() > 5) {
            return true;
        }

        return false;
    }

    public enum RiskLevel {
        LOW, MEDIUM, HIGH
    }

    public static class FraudAnalysisResult {
        private int riskScore;
        private RiskLevel riskLevel;
        private String recommendation;
        private java.util.List<String> flags = new java.util.ArrayList<>();

        public void addFlag(String flag) {
            flags.add(flag);
        }

        // Getters and setters
        public int getRiskScore() { return riskScore; }
        public void setRiskScore(int riskScore) { this.riskScore = riskScore; }
        public RiskLevel getRiskLevel() { return riskLevel; }
        public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
        public String getRecommendation() { return recommendation; }
        public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
        public java.util.List<String> getFlags() { return flags; }
    }

    private static class UserActivityPattern {
        private double totalAmount = 0;
        private int transactionCount = 0;
        private LocalDateTime lastTransactionTime;
        private final java.util.Set<String> knownDevices = ConcurrentHashMap.newKeySet();
        private final java.util.Set<String> knownIpAddresses = ConcurrentHashMap.newKeySet();
        private int recentPasswordChanges = 0;
        private int recentFailedTransactions = 0;

        public void recordTransaction(double amount, String ipAddress, String deviceFingerprint) {
            totalAmount += amount;
            transactionCount++;
            lastTransactionTime = LocalDateTime.now();
            knownDevices.add(deviceFingerprint);
            knownIpAddresses.add(ipAddress);
        }

        public double getAverageAmount() {
            return transactionCount > 0 ? totalAmount / transactionCount : 0;
        }

        // Getters
        public int getTransactionCount() { return transactionCount; }
        public LocalDateTime getLastTransactionTime() { return lastTransactionTime; }
        public java.util.Set<String> getKnownDevices() { return knownDevices; }
        public java.util.Set<String> getKnownIpAddresses() { return knownIpAddresses; }
        public int getRecentPasswordChanges() { return recentPasswordChanges; }
        public int getRecentFailedTransactions() { return recentFailedTransactions; }
    }
}
