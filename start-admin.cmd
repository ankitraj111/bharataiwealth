@echo off
echo ========================================
echo Bharat AI Wealth - Admin Panel Startup
echo ========================================
echo.

REM Check if PostgreSQL is running
echo [1/5] Checking PostgreSQL...
psql -U postgres -l >nul 2>&1
if errorlevel 1 (
    echo [ERROR] PostgreSQL is not running!
    echo.
    echo Please start PostgreSQL service:
    echo   1. Press Win + R
    echo   2. Type: services.msc
    echo   3. Find "postgresql" service
    echo   4. Click "Start"
    echo.
    echo Or run: net start postgresql-x64-14
    echo.
    pause
    exit /b 1
)
echo [OK] PostgreSQL is running
echo.

REM Check if .env file exists
echo [2/5] Checking configuration...
if not exist ".env" (
    echo [WARNING] .env file not found!
    echo Creating .env from .env.example...
    copy .env.example .env
    echo.
    echo [ACTION REQUIRED] Please edit .env file with your values:
    echo   - DATABASE_PASSWORD
    echo   - JWT_SECRET
    echo   - AUDIT_HMAC_KEY
    echo   - ENCRYPTION_MASTER_KEY
    echo   - ML_SERVICE_API_KEY
    echo.
    echo Opening .env file in notepad...
    notepad .env
    echo.
    echo After editing, save and close notepad, then run this script again.
    pause
    exit /b 1
)
echo [OK] Configuration file exists
echo.

REM Start Backend
echo [3/5] Starting Backend (Spring Boot)...
echo This will open in a new window...
start "Bharat AI - Backend" cmd /k "cd bankend && echo Starting Backend on port 8080... && mvn spring-boot:run"
echo [OK] Backend starting...
echo Waiting 15 seconds for backend to initialize...
timeout /t 15 /nobreak >nul
echo.

REM Start Frontend
echo [4/5] Starting Frontend (Next.js)...
echo This will open in a new window...
start "Bharat AI - Frontend" cmd /k "cd frontend && echo Starting Frontend on port 3001... && npm run dev"
echo [OK] Frontend starting...
echo Waiting 10 seconds for frontend to initialize...
timeout /t 10 /nobreak >nul
echo.

REM Open Admin Panel
echo [5/5] Opening Admin Panel in browser...
echo.
echo ========================================
echo Services Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3001
echo Admin:    http://localhost:3001/admin
echo.
echo ========================================
echo IMPORTANT: Make yourself ADMIN first!
echo ========================================
echo.
echo Run this SQL command in PostgreSQL:
echo.
echo   psql -U postgres -d wealthdb
echo   UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
echo   \q
echo.
echo Then:
echo   1. Go to: http://localhost:3001/auth/login
echo   2. Login with your credentials
echo   3. Access: http://localhost:3001/admin
echo.
echo ========================================
echo.

REM Wait a bit more then open browser
timeout /t 5 /nobreak >nul
start http://localhost:3001

echo Press any key to exit this window...
echo (Backend and Frontend will keep running)
pause >nul
