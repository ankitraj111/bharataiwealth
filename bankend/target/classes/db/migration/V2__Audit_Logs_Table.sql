-- V2__Audit_Logs_Table.sql
-- Flyway Migration: Add audit logging for security events
-- Version: 2.0
-- Date: 2026-01-23

-- ==================== Audit Logs Table ====================
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    user_id BIGINT,
    user_email VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    resource_type VARCHAR(50),
    resource_id VARCHAR(255),
    action VARCHAR(50),
    details TEXT,
    success BOOLEAN,
    error_message VARCHAR(500),
    checksum VARCHAR(64) NOT NULL
);

-- ==================== Audit Indexes for Performance ====================
CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_event_type ON audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_success ON audit_logs(success);
CREATE INDEX IF NOT EXISTS idx_audit_ip_address ON audit_logs(ip_address);

-- ==================== Comment on Table ====================
COMMENT ON TABLE audit_logs IS 'Immutable audit log table for security events with HMAC-SHA256 integrity verification';
COMMENT ON COLUMN audit_logs.checksum IS 'HMAC-SHA256 checksum for tamper-proof verification';
COMMENT ON COLUMN audit_logs.event_type IS 'Event types: LOGIN_SUCCESS, LOGIN_FAILED, MFA_ENABLED, TRADE_EXECUTED, etc.';
