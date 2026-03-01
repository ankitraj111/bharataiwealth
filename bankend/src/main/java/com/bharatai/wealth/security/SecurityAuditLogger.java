package com.bharatai.wealth.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Security audit logger for tracking security-related events
 */
@Component
@Slf4j
public class SecurityAuditLogger {

    public enum SecurityEvent {
        LOGIN_SUCCESS,
        LOGIN_FAILURE,
        LOGOUT,
        PASSWORD_CHANGE,
        MFA_ENABLED,
        MFA_DISABLED,
        ACCOUNT_LOCKED,
        SUSPICIOUS_ACTIVITY,
        UNAUTHORIZED_ACCESS_ATTEMPT,
        TOKEN_REFRESH,
        SESSION_EXPIRED
    }

    public void logSecurityEvent(SecurityEvent event, String userId, String ipAddress, Map<String, Object> details) {
        Map<String, Object> auditLog = new HashMap<>();
        auditLog.put("timestamp", LocalDateTime.now());
        auditLog.put("event", event.name());
        auditLog.put("userId", userId);
        auditLog.put("ipAddress", ipAddress);
        auditLog.put("details", details);

        // Log based on severity
        switch (event) {
            case LOGIN_FAILURE, ACCOUNT_LOCKED, SUSPICIOUS_ACTIVITY, UNAUTHORIZED_ACCESS_ATTEMPT ->
                log.warn("SECURITY_EVENT: {}", auditLog);
            case LOGIN_SUCCESS, LOGOUT, PASSWORD_CHANGE, MFA_ENABLED, MFA_DISABLED, TOKEN_REFRESH, SESSION_EXPIRED ->
                log.info("SECURITY_EVENT: {}", auditLog);
        }
    }

    public void logSecurityEvent(SecurityEvent event, String userId, String ipAddress) {
        logSecurityEvent(event, userId, ipAddress, new HashMap<>());
    }
}
