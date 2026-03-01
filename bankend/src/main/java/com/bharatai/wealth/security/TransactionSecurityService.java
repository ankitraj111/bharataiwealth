package com.bharatai.wealth.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Base64;
import java.util.UUID;

/**
 * Bank-level transaction security
 * Implements transaction signing, verification, and idempotency
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionSecurityService {

    private static final String HMAC_ALGORITHM = "HmacSHA256";
    private static final long TRANSACTION_TIMEOUT_SECONDS = 300; // 5 minutes

    private final SecurityAuditLogger auditLogger;

    /**
     * Generate unique transaction ID (idempotency key)
     */
    public String generateTransactionId() {
        return UUID.randomUUID().toString();
    }

    /**
     * Sign transaction data using HMAC-SHA256
     * Used to verify transaction integrity
     */
    public String signTransaction(String transactionData, String secretKey) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            SecretKeySpec secretKeySpec = new SecretKeySpec(
                secretKey.getBytes(StandardCharsets.UTF_8), 
                HMAC_ALGORITHM
            );
            mac.init(secretKeySpec);
            
            byte[] signature = mac.doFinal(transactionData.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(signature);
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            log.error("Transaction signing failed", e);
            throw new RuntimeException("Failed to sign transaction", e);
        }
    }

    /**
     * Verify transaction signature
     */
    public boolean verifyTransactionSignature(String transactionData, String signature, String secretKey) {
        String expectedSignature = signTransaction(transactionData, secretKey);
        return expectedSignature.equals(signature);
    }

    /**
     * Create transaction token with timestamp
     * Format: transactionId|timestamp|signature
     */
    public String createTransactionToken(String transactionId, String userId, String secretKey) {
        long timestamp = Instant.now().getEpochSecond();
        String data = transactionId + "|" + userId + "|" + timestamp;
        String signature = signTransaction(data, secretKey);
        
        return Base64.getEncoder().encodeToString(
            (data + "|" + signature).getBytes(StandardCharsets.UTF_8)
        );
    }

    /**
     * Verify transaction token
     * Checks signature and timestamp validity
     */
    public boolean verifyTransactionToken(String token, String secretKey) {
        try {
            String decoded = new String(Base64.getDecoder().decode(token), StandardCharsets.UTF_8);
            String[] parts = decoded.split("\\|");
            
            if (parts.length != 4) {
                return false;
            }
            
            String transactionId = parts[0];
            String userId = parts[1];
            String timestamp = parts[2];
            String signature = parts[3];
            
            // Verify timestamp (prevent replay attacks)
            long txTimestamp = Long.parseLong(timestamp);
            long currentTimestamp = Instant.now().getEpochSecond();
            
            if (currentTimestamp - txTimestamp > TRANSACTION_TIMEOUT_SECONDS) {
                log.warn("Transaction token expired: {}", transactionId);
                return false;
            }
            
            // Verify signature
            String data = transactionId + "|" + userId + "|" + timestamp;
            return verifyTransactionSignature(data, signature, secretKey);
            
        } catch (Exception e) {
            log.error("Transaction token verification failed", e);
            return false;
        }
    }

    /**
     * Log transaction for audit trail
     */
    public void logTransaction(String transactionId, String userId, String transactionType, 
                               String amount, String status) {
        auditLogger.logSecurityEvent(
            SecurityAuditLogger.SecurityEvent.valueOf("TRANSACTION_" + status.toUpperCase()),
            userId,
            "system",
            java.util.Map.of(
                "transactionId", transactionId,
                "type", transactionType,
                "amount", amount,
                "timestamp", Instant.now().toString()
            )
        );
    }

    /**
     * Validate transaction amount (prevent overflow attacks)
     */
    public boolean validateTransactionAmount(double amount) {
        // Check for negative amounts
        if (amount < 0) {
            return false;
        }
        
        // Check for unrealistic amounts (adjust based on business rules)
        if (amount > 10000000) { // 1 Crore limit
            return false;
        }
        
        // Check for precision attacks (too many decimal places)
        String amountStr = String.valueOf(amount);
        if (amountStr.contains(".")) {
            String[] parts = amountStr.split("\\.");
            if (parts.length > 1 && parts[1].length() > 2) {
                return false; // Max 2 decimal places
            }
        }
        
        return true;
    }
}
