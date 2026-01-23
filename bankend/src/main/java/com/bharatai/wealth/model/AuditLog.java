package com.bharatai.wealth.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Immutable audit log entity for security events.
 * All entries are signed with HMAC for integrity verification.
 */
@Entity
@Table(name = "audit_logs", indexes = {
        @Index(name = "idx_audit_user_id", columnList = "user_id"),
        @Index(name = "idx_audit_event_type", columnList = "event_type"),
        @Index(name = "idx_audit_timestamp", columnList = "timestamp")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "event_type", nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private AuditEventType eventType;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_email", length = 255)
    private String userEmail;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(name = "resource_type", length = 50)
    private String resourceType;

    @Column(name = "resource_id")
    private String resourceId;

    @Column(name = "action", length = 50)
    private String action;

    @Column(name = "details", columnDefinition = "TEXT")
    private String details;

    @Column(name = "success")
    private Boolean success;

    @Column(name = "error_message", length = 500)
    private String errorMessage;

    @Column(name = "checksum", nullable = false, length = 64)
    private String checksum;

    public enum AuditEventType {
        // Authentication Events
        LOGIN_SUCCESS,
        LOGIN_FAILED,
        LOGOUT,
        MFA_ENABLED,
        MFA_DISABLED,
        MFA_VERIFICATION_SUCCESS,
        MFA_VERIFICATION_FAILED,
        PASSWORD_CHANGED,
        PASSWORD_RESET_REQUESTED,
        ACCOUNT_LOCKED,
        ACCOUNT_UNLOCKED,

        // Authorization Events
        ACCESS_DENIED,
        ROLE_CHANGED,

        // Transaction Events
        TRADE_EXECUTED,
        TRADE_CANCELLED,
        ORDER_PLACED,

        // Data Events
        USER_CREATED,
        USER_UPDATED,
        USER_DELETED,
        PORTFOLIO_MODIFIED,
        SETTINGS_CHANGED,

        // Security Events
        SUSPICIOUS_ACTIVITY,
        RATE_LIMIT_EXCEEDED,
        TOKEN_BLACKLISTED
    }
}
