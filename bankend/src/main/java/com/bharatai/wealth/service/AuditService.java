package com.bharatai.wealth.service;

import com.bharatai.wealth.model.AuditLog;
import com.bharatai.wealth.model.AuditLog.AuditEventType;
import com.bharatai.wealth.repository.AuditLogRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Map;

/**
 * Service for creating tamper-proof audit logs.
 * All audit entries are signed with HMAC-SHA256 for integrity verification.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AuditService {

    private final AuditLogRepository auditLogRepository;
    private final ObjectMapper objectMapper;

    @Value("${audit.hmac-key:BharatAIWealthAuditKey2026SecureHMACKey}")
    private String hmacKey;

    /**
     * Logs a security event asynchronously.
     */
    @Async
    public void logEvent(
            AuditEventType eventType,
            Long userId,
            String userEmail,
            String ipAddress,
            String userAgent,
            boolean success,
            Map<String, Object> details) {
        try {
            String detailsJson = details != null ? objectMapper.writeValueAsString(details) : null;

            AuditLog auditLog = AuditLog.builder()
                    .timestamp(LocalDateTime.now())
                    .eventType(eventType)
                    .userId(userId)
                    .userEmail(userEmail)
                    .ipAddress(ipAddress)
                    .userAgent(userAgent)
                    .details(detailsJson)
                    .success(success)
                    .checksum(calculateChecksum(eventType, userId, userEmail, detailsJson))
                    .build();

            auditLogRepository.save(auditLog);
            log.debug("Audit log created: {} for user: {}", eventType, userEmail);

        } catch (Exception e) {
            log.error("Failed to create audit log: {}", e.getMessage());
        }
    }

    /**
     * Logs a trade/transaction event.
     */
    @Async
    public void logTransaction(
            AuditEventType eventType,
            Long userId,
            String userEmail,
            String ipAddress,
            String resourceType,
            String resourceId,
            String action,
            boolean success,
            Map<String, Object> details) {
        try {
            String detailsJson = details != null ? objectMapper.writeValueAsString(details) : null;

            AuditLog auditLog = AuditLog.builder()
                    .timestamp(LocalDateTime.now())
                    .eventType(eventType)
                    .userId(userId)
                    .userEmail(userEmail)
                    .ipAddress(ipAddress)
                    .resourceType(resourceType)
                    .resourceId(resourceId)
                    .action(action)
                    .details(detailsJson)
                    .success(success)
                    .checksum(calculateChecksum(eventType, userId, userEmail, detailsJson))
                    .build();

            auditLogRepository.save(auditLog);
            log.info("Transaction audit: {} - {} {} (success: {})", eventType, action, resourceId, success);

        } catch (Exception e) {
            log.error("Failed to create transaction audit log: {}", e.getMessage());
        }
    }

    /**
     * Logs a failed event with error message.
     */
    @Async
    public void logFailure(
            AuditEventType eventType,
            String userEmail,
            String ipAddress,
            String errorMessage) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .timestamp(LocalDateTime.now())
                    .eventType(eventType)
                    .userEmail(userEmail)
                    .ipAddress(ipAddress)
                    .success(false)
                    .errorMessage(errorMessage)
                    .checksum(calculateChecksum(eventType, null, userEmail, errorMessage))
                    .build();

            auditLogRepository.save(auditLog);
            log.warn("Audit failure logged: {} for {}: {}", eventType, userEmail, errorMessage);

        } catch (Exception e) {
            log.error("Failed to create failure audit log: {}", e.getMessage());
        }
    }

    /**
     * Verifies the integrity of an audit log entry.
     */
    public boolean verifyIntegrity(AuditLog auditLog) {
        try {
            String expectedChecksum = calculateChecksum(
                    auditLog.getEventType(),
                    auditLog.getUserId(),
                    auditLog.getUserEmail(),
                    auditLog.getDetails());
            return expectedChecksum.equals(auditLog.getChecksum());
        } catch (Exception e) {
            log.error("Integrity verification failed: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Calculates HMAC-SHA256 checksum for audit log integrity.
     */
    private String calculateChecksum(AuditEventType eventType, Long userId, String email, String details) {
        try {
            String data = String.format("%s|%s|%s|%s",
                    eventType,
                    userId != null ? userId : "",
                    email != null ? email : "",
                    details != null ? details : "");

            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec = new SecretKeySpec(hmacKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(keySpec);

            byte[] hmacBytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hmacBytes);

        } catch (Exception e) {
            log.error("Checksum calculation failed: {}", e.getMessage());
            throw new RuntimeException("Failed to calculate checksum", e);
        }
    }
}
