-- ========================================
-- Bharat AI Wealth - Admin User Setup
-- ========================================
-- Email: ankit@gmail.com
-- Password: admin123
-- ========================================

-- Step 1: Delete existing user (if any)
DELETE FROM users WHERE email = 'ankit@gmail.com';

-- Step 2: Create admin user with BCrypt hashed password
-- Password: admin123
-- BCrypt Hash: $2a$10$dXJ3SW6G7P50lGmMkkmwe.20cyhQQl3MpbshYPrxYPldR93ILN/jO
INSERT INTO users (
    name, 
    email, 
    password, 
    role, 
    is_active, 
    mfa_enabled, 
    created_at
) VALUES (
    'Ankit',
    'ankit@gmail.com',
    '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cyhQQl3MpbshYPrxYPldR93ILN/jO',
    'ADMIN',
    true,
    false,
    NOW()
);

-- Step 3: Verify the user was created successfully
SELECT 
    id, 
    name, 
    email, 
    role, 
    is_active, 
    mfa_enabled,
    created_at
FROM users 
WHERE email = 'ankit@gmail.com';

-- ========================================
-- Setup Complete!
-- ========================================
-- Now you can login at: http://localhost:3000/auth/login
-- Email: ankit@gmail.com
-- Password: admin123
-- Admin Panel: http://localhost:3000/admin
-- ========================================
