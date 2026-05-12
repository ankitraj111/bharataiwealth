@echo off
REM Quick Start Script for Bharat AI Wealth
REM This script starts both backend and frontend

echo ========================================
echo   Bharat AI Wealth - Quick Start
echo ========================================
echo.

REM Check if Java is installed
echo [1/5] Checking Java installation...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17+ from https://adoptium.net/
    pause
    exit /b 1
)
echo ✓ Java is installed

REM Check if Node.js is installed
echo [2/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed

REM Check if PostgreSQL is running
echo [3/5] Checking PostgreSQL...
echo Note: Make sure PostgreSQL is running on localhost:5432
echo.

REM Start Backend
echo [4/5] Starting Backend (Spring Boot)...
echo This will take 30-60 seconds...
echo.
start "Bharat AI Wealth - Backend" cmd /k "cd /d %~dp0bankend && mvn spring-boot:run"
echo ✓ Backend starting in new window...
echo.

REM Wait a bit for backend to start
echo Waiting 10 seconds for backend to initialize...
timeout /t 10 /nobreak >nul

REM Start Frontend
echo [5/5] Starting Frontend (Next.js)...
echo.
start "Bharat AI Wealth - Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"
echo ✓ Frontend starting in new window...
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Login Page: http://localhost:3000/auth/login
echo.
echo ✓ Click "Continue with Google" to login
echo ✓ Any Gmail account will work!
echo.
echo Press any key to open the login page...
pause >nul

REM Open browser
start http://localhost:3000/auth/login

echo.
echo To stop the servers, close the terminal windows.
echo.
pause
