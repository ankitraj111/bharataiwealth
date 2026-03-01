@echo off
echo ========================================
echo Bharat AI Wealth - System Diagnostic
echo ========================================
echo.
echo Running diagnostic checks...
echo.

set PASS=0
set FAIL=0

REM Check 1: PostgreSQL
echo [1/7] Checking PostgreSQL...
psql -U postgres -l >nul 2>&1
if errorlevel 1 (
    echo [FAIL] PostgreSQL is not running
    echo        Fix: net start postgresql-x64-14
    set /a FAIL+=1
) else (
    echo [PASS] PostgreSQL is running
    set /a PASS+=1
)
echo.

REM Check 2: Database exists
echo [2/7] Checking database 'wealthdb'...
psql -U postgres -l | findstr wealthdb >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Database 'wealthdb' does not exist
    echo        Fix: psql -U postgres -c "CREATE DATABASE wealthdb;"
    set /a FAIL+=1
) else (
    echo [PASS] Database 'wealthdb' exists
    set /a PASS+=1
)
echo.

REM Check 3: .env file
echo [3/7] Checking .env file...
if exist ".env" (
    echo [PASS] .env file exists
    set /a PASS+=1
) else (
    echo [FAIL] .env file missing
    echo        Fix: copy .env.example .env
    set /a FAIL+=1
)
echo.

REM Check 4: Backend
echo [4/7] Checking Backend (port 8080)...
curl -s http://localhost:8080/api/health >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Backend not responding on port 8080
    echo        Fix: cd bankend ^&^& mvn spring-boot:run
    set /a FAIL+=1
) else (
    echo [PASS] Backend is running on port 8080
    set /a PASS+=1
)
echo.

REM Check 5: Frontend
echo [5/7] Checking Frontend (port 3001)...
curl -s http://localhost:3001 >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Frontend not responding on port 3001
    echo        Fix: cd frontend ^&^& npm run dev
    set /a FAIL+=1
) else (
    echo [PASS] Frontend is running on port 3001
    set /a PASS+=1
)
echo.

REM Check 6: Java
echo [6/7] Checking Java...
java -version >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Java not found
    echo        Fix: Install Java 17+ from https://adoptium.net/
    set /a FAIL+=1
) else (
    echo [PASS] Java is installed
    set /a PASS+=1
)
echo.

REM Check 7: Node.js
echo [7/7] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Node.js not found
    echo        Fix: Install Node.js from https://nodejs.org/
    set /a FAIL+=1
) else (
    echo [PASS] Node.js is installed
    set /a PASS+=1
)
echo.

REM Summary
echo ========================================
echo Diagnostic Summary
echo ========================================
echo.
echo Tests Passed: %PASS%/7
echo Tests Failed: %FAIL%/7
echo.

if %FAIL% EQU 0 (
    echo [SUCCESS] All checks passed!
    echo.
    echo Your system is ready. Now:
    echo   1. Make yourself admin:
    echo      psql -U postgres -d wealthdb
    echo      UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
    echo      \q
    echo.
    echo   2. Login: http://localhost:3001/auth/login
    echo   3. Access: http://localhost:3001/admin
    echo.
) else (
    echo [WARNING] Some checks failed!
    echo.
    echo Please fix the failed checks above.
    echo.
    echo Quick fixes:
    echo   - PostgreSQL: net start postgresql-x64-14
    echo   - Database: psql -U postgres -c "CREATE DATABASE wealthdb;"
    echo   - .env: copy .env.example .env
    echo   - Backend: cd bankend ^&^& mvn spring-boot:run
    echo   - Frontend: cd frontend ^&^& npm run dev
    echo.
)

echo ========================================
echo Port Status
echo ========================================
echo.
echo Checking ports...
netstat -ano | findstr ":8080 :3001 :5432"
echo.

echo ========================================
echo.
echo For detailed troubleshooting, see:
echo   - ADMIN_TROUBLESHOOTING.md
echo   - START_ADMIN_PANEL.md
echo   - ADMIN_PANEL_HINDI.md
echo.
pause
