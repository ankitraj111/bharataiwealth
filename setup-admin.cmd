@echo off
echo ========================================
echo Bharat AI Wealth - Admin Setup
echo ========================================
echo.
echo Email: ankit@gmail.com
echo Password: admin123
echo.
echo ========================================
echo Step 1: Backend Restart
echo ========================================
echo.
echo Backend restart kar rahe hain...
echo Please wait...
echo.
cd bankend
start cmd /k "mvnw spring-boot:run"
echo.
echo Backend starting... 30 seconds wait kar rahe hain...
timeout /t 30 /nobreak
echo.
echo ========================================
echo Step 2: Database Setup
echo ========================================
echo.
echo Ab pgAdmin kholo aur ye SQL run karo:
echo.
echo DELETE FROM users WHERE email = 'ankit@gmail.com';
echo.
echo INSERT INTO users (name, email, password, role, is_active, mfa_enabled, created_at)
echo VALUES ('Ankit', 'ankit@gmail.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cyhQQl3MpbshYPrxYPldR93ILN/jO', 'ADMIN', true, false, NOW());
echo.
echo ========================================
echo Step 3: Login
echo ========================================
echo.
echo 1. Browser mein jao: http://localhost:3000/auth/login
echo 2. Login karo:
echo    Email: ankit@gmail.com
echo    Password: admin123
echo 3. Admin panel kholo: http://localhost:3000/admin
echo.
echo ========================================
echo Setup Complete!
echo ========================================
pause
