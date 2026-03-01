-- V8__Sync_Schema_With_Models.sql
-- Flyway Migration: Add missing columns to sync DB schema with JPA entities
-- Version: 8.0
-- Date: 2026-02-23

DO $$
BEGIN
    -- ==================== portfolio_items ====================
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_items' AND column_name='name') THEN
        ALTER TABLE portfolio_items ADD COLUMN name VARCHAR(255) NOT NULL DEFAULT '';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='portfolio_items' AND column_name='type') THEN
        ALTER TABLE portfolio_items ADD COLUMN type VARCHAR(50) NOT NULL DEFAULT 'STOCK';
    END IF;

    -- ==================== emergency_funds ====================
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='emergency_funds' AND column_name='monthly_expenses') THEN
        ALTER TABLE emergency_funds ADD COLUMN monthly_expenses DECIMAL(12, 2) DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='emergency_funds' AND column_name='months_buffer') THEN
        ALTER TABLE emergency_funds ADD COLUMN months_buffer INTEGER DEFAULT 6;
    END IF;

    -- ==================== tax_records ====================
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tax_records' AND column_name='total_income') THEN
        ALTER TABLE tax_records ADD COLUMN total_income DECIMAL(15, 2) DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tax_records' AND column_name='deductions_80c') THEN
        ALTER TABLE tax_records ADD COLUMN deductions_80c DECIMAL(12, 2) DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tax_records' AND column_name='other_deductions') THEN
        ALTER TABLE tax_records ADD COLUMN other_deductions DECIMAL(12, 2) DEFAULT 0;
    END IF;

    -- Rename income_type to financial_year mapping fix (if income_type stored as column but model expects total_income)
    -- The column "income_type" and "amount" in V1 don't match the model. Keep them for backward compat.

END $$;
