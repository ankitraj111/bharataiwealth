# 🔧 Admin Panel Troubleshooting Guide

## Quick Diagnosis

```
Can't access http://localhost:3001/admin?
│
├─ Error: "localhost refused to connect"
│  └─ Services not running → See Section 1
│
├─ Error: "Access Denied" or "403 Forbidden"
│  └─ Not admin role → See Section 2
│
├─ Error: "Token expired" or "Unauthorized"
│  └─ Need to login again → See Section 3
│
├─ Error: "404 Not Found"
│  └─ Frontend not running → See Section 4
│
└─ Error: "500 Internal Server Error"
   └─ Backend issue → See Section 5
```

---

## Section 1: Services Not Running

### Symptom
```
This site can't be reached
localhost refused to connect
ERR_CONNECTION_REFUSED
```

### Diagnosis
```cmd
# Check if backend is running
curl http://localhost:8080/api/health

# Check if frontend is running
curl http://localhost:3001
```

### Solution

**Option A: Use Startup Script**
```cmd
start-admin.cmd
```

**Option B: Manual Start**

Terminal 1 - Backend:
```cmd
cd bankend
mvn spring-boot:run
```

Terminal 2 - Frontend:
```cmd
cd frontend
npm run dev
```

### Verification
```cmd
# Backend should respond
curl http://localhost:8080/api/health
# Expected: {"status":"UP"}

# Frontend should respond
curl http://localhost:3001
# Expected: HTML content
```

---

## Section 2: Access Denied (Not Admin)

### Symptom
```
Access denied. Admin role required.
403 Forbidden
```

### Diagnosis
```sql
-- Check your role
psql -U postgres -d wealthdb
SELECT email, role FROM users WHERE email = 'your@email.com';
```

### Solution
```sql
-- Make yourself admin
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';

-- Verify
SELECT email, role FROM users WHERE email = 'your@email.com';

-- Exit
\q
```

### Verification
- Role should show as `ADMIN`
- Logout and login again
- Try accessing admin panel

---

## Section 3: Token Expired

### Symptom
```
Token expired
Unauthorized
401 Unauthorized
```

### Diagnosis
- Token expires after certain time
- Need fresh token

### Solution
1. Go to: http://localhost:3001/auth/login
2. Login with your credentials
3. Try admin panel again: http://localhost:3001/admin

### Verification
- Should see admin dashboard
- No unauthorized errors

---

## Section 4: Page Not Found

### Symptom
```
404 - Page Not Found
This page could not be found
```

### Diagnosis
```cmd
# Check if frontend is running
curl http://localhost:3001
```

### Solution
```cmd
# Restart frontend
cd frontend
npm run dev
```

### Verification
- Frontend console shows: `✓ Ready on http://localhost:3001`
- Homepage loads: http://localhost:3001
- Admin page loads: http://localhost:3001/admin

---

## Section 5: Internal Server Error

### Symptom
```
500 Internal Server Error
Application error
```

### Diagnosis
```cmd
# Check backend logs
cd bankend
type logs\application.log
```

### Common Causes

**A. Database Connection Failed**
```
Error: Connection refused
Could not connect to database
```

Solution:
```cmd
# Start PostgreSQL
net start postgresql-x64-14

# Verify
psql -U postgres -l
```

**B. Missing Environment Variables**
```
Error: JWT_SECRET not found
Error: DATABASE_PASSWORD not set
```

Solution:
```cmd
# Create .env file
copy .env.example .env
notepad .env
```

**C. Port Already in Use**
```
Error: Port 8080 already in use
```

Solution:
```cmd
# Find process using port
netstat -ano | findstr :8080

# Kill process
taskkill /PID <PID> /F
```

---

## Complete Diagnostic Checklist

Run these commands to check everything:

```cmd
@echo off
echo ========================================
echo Admin Panel Diagnostic Check
echo ========================================
echo.

echo [1] Checking PostgreSQL...
psql -U postgres -l >nul 2>&1
if errorlevel 1 (
    echo [FAIL] PostgreSQL not running
) else (
    echo [PASS] PostgreSQL running
)
echo.

echo [2] Checking Backend...
curl -s http://localhost:8080/api/health >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Backend not responding on port 8080
) else (
    echo [PASS] Backend running on port 8080
)
echo.

echo [3] Checking Frontend...
curl -s http://localhost:3001 >nul 2>&1
if errorlevel 1 (
    echo [FAIL] Frontend not responding on port 3001
) else (
    echo [PASS] Frontend running on port 3001
)
echo.

echo [4] Checking .env file...
if exist ".env" (
    echo [PASS] .env file exists
) else (
    echo [FAIL] .env file missing
)
echo.

echo ========================================
echo Diagnostic Complete
echo ========================================
pause
```

Save as `diagnose.cmd` and run it.

---

## Port Conflicts

### Check What's Using Ports

```cmd
# Check port 8080 (Backend)
netstat -ano | findstr :8080

# Check port 3001 (Frontend)
netstat -ano | findstr :3001

# Check port 5432 (PostgreSQL)
netstat -ano | findstr :5432
```

### Kill Process Using Port

```cmd
# Find PID from netstat output
# Then kill it
taskkill /PID <PID_NUMBER> /F
```

---

## Database Issues

### Can't Connect to PostgreSQL

```cmd
# Check if service is running
sc query postgresql-x64-14

# Start service
net start postgresql-x64-14

# Or use Services app
# Win + R → services.msc → Find postgresql → Start
```

### Database Doesn't Exist

```cmd
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE wealthdb;

# Exit
\q
```

### Wrong Password

```cmd
# Reset password (if needed)
psql -U postgres
ALTER USER postgres PASSWORD 'new_password';
\q

# Update .env file
notepad .env
# Change DATABASE_PASSWORD=new_password
```

---

## Environment Variables Issues

### Missing .env File

```cmd
# Create from example
copy .env.example .env

# Edit with your values
notepad .env
```

### Required Variables

```env
# Database
DATABASE_URL=jdbc:postgresql://localhost:5432/wealthdb
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password

# Security (generate using: openssl rand -base64 32)
JWT_SECRET=your_jwt_secret_32_chars_minimum
AUDIT_HMAC_KEY=your_audit_hmac_key_32_chars
ENCRYPTION_MASTER_KEY=your_encryption_key_32_chars
ML_SERVICE_API_KEY=your_ml_api_key
```

### Generate Secrets

**PowerShell:**
```powershell
# Generate random base64 string
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Git Bash / WSL:**
```bash
openssl rand -base64 32
```

---

## Frontend Issues

### npm Command Not Found

```cmd
# Check if Node.js is installed
node --version

# If not, download from: https://nodejs.org/
# Install LTS version
# Restart Command Prompt
```

### Dependencies Not Installed

```cmd
cd frontend
npm install
```

### Port 3001 Already in Use

```cmd
# Find what's using port 3001
netstat -ano | findstr :3001

# Kill the process
taskkill /PID <PID> /F

# Or change port in package.json
# "dev": "next dev -p 3002"
```

---

## Backend Issues

### mvn Command Not Found

```cmd
# Check if Maven is installed
mvn --version

# If not, download from: https://maven.apache.org/
# Extract to C:\Program Files\Maven
# Add to PATH: C:\Program Files\Maven\bin
# Restart Command Prompt
```

### Java Not Found

```cmd
# Check if Java is installed
java --version

# If not, download JDK 17 or higher
# From: https://adoptium.net/
```

### Build Failed

```cmd
cd bankend

# Clean and rebuild
mvn clean install

# Run
mvn spring-boot:run
```

---

## Login Issues

### Can't Login

**Check credentials:**
```sql
psql -U postgres -d wealthdb
SELECT email, enabled FROM users WHERE email = 'your@email.com';
```

**If account disabled:**
```sql
UPDATE users SET enabled = true WHERE email = 'your@email.com';
```

**Reset password (if needed):**
```sql
-- Password will be hashed by application
-- Use "forgot password" feature or contact admin
```

---

## Browser Issues

### Clear Cache

1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page

### Try Incognito Mode

1. Press `Ctrl + Shift + N` (Chrome)
2. Go to: http://localhost:3001/admin
3. Login and test

### Check Browser Console

1. Press `F12`
2. Go to "Console" tab
3. Look for errors
4. Check "Network" tab for failed requests

---

## Complete Reset (Nuclear Option)

If nothing works, start fresh:

```cmd
# 1. Stop all services
taskkill /F /IM java.exe
taskkill /F /IM node.exe

# 2. Clean backend
cd bankend
mvn clean

# 3. Clean frontend
cd ..\frontend
rmdir /s /q node_modules
rmdir /s /q .next

# 4. Reinstall frontend
npm install

# 5. Restart PostgreSQL
net stop postgresql-x64-14
net start postgresql-x64-14

# 6. Start everything fresh
cd ..
start-admin.cmd
```

---

## Getting Help

### Check Logs

**Backend logs:**
```cmd
cd bankend
type logs\application.log
```

**Frontend logs:**
- Open browser
- Press F12
- Check Console tab

**PostgreSQL logs:**
```cmd
# Usually in:
C:\Program Files\PostgreSQL\14\data\log\
```

### Collect Information

When asking for help, provide:

1. **Error message** (exact text)
2. **Browser console** (F12 → Console)
3. **Backend logs** (last 50 lines)
4. **What you tried** (steps taken)
5. **System info** (Windows version, Java version, Node version)

---

## Success Indicators

Everything is working when:

✅ **PostgreSQL:**
```cmd
psql -U postgres -l
# Shows list of databases including wealthdb
```

✅ **Backend:**
```cmd
curl http://localhost:8080/api/health
# Returns: {"status":"UP"}
```

✅ **Frontend:**
```cmd
curl http://localhost:3001
# Returns: HTML content
```

✅ **Admin Role:**
```sql
SELECT role FROM users WHERE email = 'your@email.com';
# Returns: ADMIN
```

✅ **Admin Panel:**
- Opens: http://localhost:3001/admin
- Shows: Dashboard with statistics
- No errors in console

---

## Quick Reference

| Issue | Command | Expected Result |
|-------|---------|----------------|
| Check PostgreSQL | `psql -U postgres -l` | List of databases |
| Check Backend | `curl http://localhost:8080/api/health` | `{"status":"UP"}` |
| Check Frontend | `curl http://localhost:3001` | HTML content |
| Check Role | `SELECT role FROM users WHERE email='...'` | `ADMIN` |
| Start Backend | `cd bankend && mvn spring-boot:run` | "Started Application" |
| Start Frontend | `cd frontend && npm run dev` | "Ready on :3001" |
| Make Admin | `UPDATE users SET role='ADMIN' WHERE email='...'` | 1 row updated |

---

**Still stuck?** Check the full guides:
- [START_ADMIN_PANEL.md](./START_ADMIN_PANEL.md) - Complete startup guide
- [ADMIN_PANEL_HINDI.md](./ADMIN_PANEL_HINDI.md) - हिंदी में गाइड
- [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) - Quick start guide
