-- V4__Add_Demo_User.sql
-- Flyway Migration: Add default demo user
-- Version: 4.0
-- Date: 2026-01-23

-- Password for demo user is 'demo123'
-- Hash generated using BCrypt
INSERT INTO users (name, email, password, role, is_active, mfa_enabled, created_at)
VALUES (
    'Demo User', 
    'demo@bharatai.com', 
    '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.7uKCv1.', 
    'USER', 
    TRUE, 
    FALSE, 
    CURRENT_TIMESTAMP
) ON CONFLICT (email) DO NOTHING;
