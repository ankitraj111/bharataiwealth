-- V6__Drop_Bank_Connections.sql
-- Flyway Migration: Remove bank/broker connection functionality
-- Version: 6.0
-- Date: 2026-01-24

-- Drop bank connections table as broker integration is removed
DROP TABLE IF EXISTS bank_connections CASCADE;

-- Remove any bank-related indexes if they exist
DROP INDEX IF EXISTS idx_bank_connections_user;
