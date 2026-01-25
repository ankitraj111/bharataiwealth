-- V7__Add_Performance_Indexes.sql
-- Add indexes for performance optimization

-- Index for portfolio items by user and symbol for faster lookups
CREATE INDEX IF NOT EXISTS idx_portfolio_user_symbol ON portfolio_items(user_id, symbol);

-- Index for expenses by date for faster monthly sum calculations
CREATE INDEX IF NOT EXISTS idx_expense_date ON expenses(date);

-- Index for goals by user for faster retrieval
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id);
