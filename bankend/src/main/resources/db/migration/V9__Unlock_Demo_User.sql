-- V9__Unlock_Demo_User.sql
-- Flyway Migration: Unlock demo user and reset failed login attempts
-- Version: 9.0
-- Date: 2026-02-28

-- Unlock the demo user account if it was locked due to too many failed attempts
UPDATE users 
SET 
    account_locked = FALSE,
    failed_login_attempts = 0,
    lock_time = NULL
WHERE email IN ('demo@bharatai.com', 'admin@bharatai.com');

-- Ensure demo user is active
UPDATE users 
SET is_active = TRUE 
WHERE email IN ('demo@bharatai.com', 'admin@bharatai.com');
