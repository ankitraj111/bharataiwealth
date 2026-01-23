-- V1__Initial_Schema.sql
-- Flyway Migration: Initial schema for Bharat AI Wealth platform
-- Version: 1.0
-- Date: 2026-01-23

-- ==================== Users Table ====================
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    is_active BOOLEAN DEFAULT TRUE,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(255),
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked BOOLEAN DEFAULT FALSE,
    lock_time TIMESTAMP,
    last_login TIMESTAMP,
    last_login_ip VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- ==================== Portfolio Table ====================
CREATE TABLE IF NOT EXISTS portfolio_items (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    symbol VARCHAR(20) NOT NULL,
    quantity DECIMAL(19, 4) NOT NULL,
    avg_buy_price DECIMAL(19, 4) NOT NULL,
    current_price DECIMAL(19, 4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- ==================== Goals Table ====================
CREATE TABLE IF NOT EXISTS goals (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    target_amount DECIMAL(19, 2) NOT NULL,
    current_amount DECIMAL(19, 2) DEFAULT 0,
    target_date DATE,
    category VARCHAR(50),
    priority VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- ==================== Expenses Table (UPDATED with all entity columns) ====================
CREATE TABLE IF NOT EXISTS expenses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    is_auto_synced BOOLEAN NOT NULL DEFAULT FALSE,
    source_trans_id VARCHAR(255) UNIQUE,
    payment_source VARCHAR(50) NOT NULL DEFAULT 'CASH',
    merchant_name VARCHAR(255),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

-- ==================== Emergency Fund Table ====================
CREATE TABLE IF NOT EXISTS emergency_funds (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    target_amount DECIMAL(19, 2) NOT NULL,
    current_amount DECIMAL(19, 2) DEFAULT 0,
    monthly_contribution DECIMAL(19, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- ==================== Bank Connections Table ====================
CREATE TABLE IF NOT EXISTS bank_connections (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    bank_name VARCHAR(255) NOT NULL,
    account_number VARCHAR(255),
    account_type VARCHAR(50),
    balance DECIMAL(19, 2),
    is_primary BOOLEAN DEFAULT FALSE,
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_synced TIMESTAMP
);

-- ==================== Alerts Table ====================
CREATE TABLE IF NOT EXISTS alerts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    message TEXT,
    alert_type VARCHAR(50),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== Tax Records Table ====================
CREATE TABLE IF NOT EXISTS tax_records (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    financial_year VARCHAR(20) NOT NULL,
    income_type VARCHAR(100),
    amount DECIMAL(19, 2),
    tax_paid DECIMAL(19, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== Family Members Table ====================
CREATE TABLE IF NOT EXISTS family_members (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    relationship VARCHAR(100),
    date_of_birth DATE,
    is_dependent BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== Indexes ====================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_portfolio_user ON portfolio_items(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_user ON goals(user_id);
CREATE INDEX IF NOT EXISTS idx_expense_user_date ON expenses(user_id, date);
CREATE INDEX IF NOT EXISTS idx_expense_is_deleted ON expenses(is_deleted);
CREATE INDEX IF NOT EXISTS idx_alerts_user ON alerts(user_id);
