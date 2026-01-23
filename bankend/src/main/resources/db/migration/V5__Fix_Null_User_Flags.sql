-- V5__Fix_Null_User_Flags.sql
-- Flyway Migration: Fix NULL values and add NOT NULL constraints
-- Version: 5.0
-- Date: 2026-01-23

-- 1. Update existing nulls to defaults
UPDATE users SET is_active = TRUE WHERE is_active IS NULL;
UPDATE users SET mfa_enabled = FALSE WHERE mfa_enabled IS NULL;
UPDATE users SET failed_login_attempts = 0 WHERE failed_login_attempts IS NULL;
UPDATE users SET account_locked = FALSE WHERE account_locked IS NULL;

-- 2. Add NOT NULL constraints (some may already have them, adding IF NOT EXISTS isn't standard SQL but we'll use ALTER)
ALTER TABLE users ALTER COLUMN is_active SET NOT NULL;
ALTER TABLE users ALTER COLUMN mfa_enabled SET NOT NULL;
ALTER TABLE users ALTER COLUMN failed_login_attempts SET NOT NULL;
ALTER TABLE users ALTER COLUMN account_locked SET NOT NULL;
