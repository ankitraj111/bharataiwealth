# 🚀 Admin Panel - Complete Startup Guide

## Problem: "localhost refused to connect"

This means your backend and/or frontend are not running. Follow these steps:

---

## ✅ Step-by-Step Solution

### Step 1: Check PostgreSQL Database

**Windows Command Prompt:**
```cmd
psql -U postgres -l
```

**If PostgreSQL is not running:**
```cmd
# Start PostgreSQL service
net start postgresql-x64-14

# Or use Services app (Win + R, type: services.msc)
# Find "postgresql" and click Start
```

**Create database if needed:**
```cmd
psql -U postgres
CREATE DATABASE wealthdb;
\q
```

---

### Step 2: Configure Environment Variables

**Create `.env` file in project root:**
```bash
# Copy example file
copy .env.example .env

# Edit .env with your values
notepad .env
```

**Minimum required values:**
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/wealthdb
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password

JWT_SECRET=your_jwt_secret_minimum_32_characters_long
AUDIT_HMAC_KEY=your_audit_hmac_key_minimum_32_characters
ENCRYPTION_MASTER_KEY=your_encryption_master_key_32_bytes
ML_SERVICE_API_KEY=your_ml_service_api_key
```

**Generate secrets (PowerShell):**
```powershell
# Generate random base64 string
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

---

### Step 3: Start Backend (Spring Boot)

**Open Command Prompt in project folder:**
```cmd
cd bankend
mvn spring-boot:run
```

**Wait for this message:**
```
Started BharatAiWealthApplication in X.XXX seconds
```

**Test backend is running:**
```cmd
curl http://localhost:8080/api/health
```

**Expected response:**
```json
{"status":"UP"}
```

**If you see errors:**
- Check database connection
- Verify .env file exists
- Check port 8080 is not in use: `netstat -ano | findstr :8080`

---

### Step 4: Start Frontend (Next.js)

**Open NEW Command Prompt:**
```cmd
cd frontend
npm install
npm run dev
```

**Wait for this message:**
```
✓ Ready on http://localhost:3001
```

**Test frontend is running:**
Open browser: `http://localhost:3001`

---

### Step 5: Make Yourself Admin

**Option A: Using psql (Command Line)**
```cmd
psql -U postgres -d wealthdb

# Run this SQL
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';

# Verify
SELECT email, role FROM users WHERE email = 'your@email.com';

# Exit
\q
```

**Option B: Using pgAdmin (GUI)**
1. Open pgAdmin
2. Connect to `wealthdb`
3. Navigate: Databases → wealthdb → Schemas → public → Tables → users
4. Right-click → View/Edit Data → All Rows
5. Find your email row
6. Change `role` column to `ADMIN`
7. Click Save (F6)

---

### Step 6: Login and Access Admin Panel

1. **Open browser:** `http://localhost:3001`

2. **Go to login:** `http://localhost:3001/auth/login`

3. **Login with your credentials**

4. **Access admin panel:** `http://localhost:3001/admin`

---

## 🎯 Quick Checklist

Before accessing admin panel, verify:

- [ ] PostgreSQL is running
- [ ] Database `wealthdb` exists
- [ ] `.env` file configured with secrets
- [ ] Backend running on port 8080
- [ ] Frontend running on port 3001
- [ ] Your user has ADMIN role
- [ ] You are logged in

---

## 🔧 Common Issues & Solutions

### Issue 1: "Port 8080 already in use"

**Find what's using port 8080:**
```cmd
netstat -ano | findstr :8080
```

**Kill the process:**
```cmd
taskkill /PID <PID_NUMBER> /F
```

### Issue 2: "Database connection failed"

**Check PostgreSQL is running:**
```cmd
psql -U postgres -l
```

**Check credentials in .env:**
```env
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_actual_password
```

### Issue 3: "npm command not found"

**Install Node.js:**
1. Download from: https://nodejs.org/
2. Install LTS version
3. Restart Command Prompt
4. Verify: `node --version`

### Issue 4: "mvn command not found"

**Install Maven:**
1. Download from: https://maven.apache.org/download.cgi
2. Extract to C:\Program Files\Maven
3. Add to PATH: `C:\Program Files\Maven\bin`
4. Restart Command Prompt
5. Verify: `mvn --version`

### Issue 5: "Access Denied" on Admin Panel

**Check your role:**
```sql
SELECT email, role FROM users WHERE email = 'your@email.com';
```

**If not ADMIN, update:**
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
```

### Issue 6: "Token expired" or "Unauthorized"

**Solution:** Login again to get fresh token

1. Go to: `http://localhost:3001/auth/login`
2. Enter credentials
3. Try admin panel again

---

## 📱 Testing Admin Panel

### Test 1: Check Backend API
```cmd
curl http://localhost:8080/api/health
```

**Expected:** `{"status":"UP"}`

### Test 2: Check Frontend
Open browser: `http://localhost:3001`

**Expected:** Homepage loads

### Test 3: Login and Get Token
```cmd
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"your@email.com\",\"password\":\"YourPassword123!\"}"
```

**Expected:** JSON with `token` field

### Test 4: Access Admin Dashboard
```cmd
curl -X GET http://localhost:8080/api/admin/dashboard ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected:** JSON with user statistics

---

## 🎨 What You'll See

When admin panel loads successfully:

```
✅ Admin Dashboard Header
✅ Total Users: X
✅ Active Users: X
✅ Premium Users: X
✅ Failed Logins (24h): X
✅ Quick Action Buttons:
   - User Management
   - Security Logs
   - System Settings
✅ System Status: Healthy
```

---

## 🚀 Complete Startup Script

**Create `start-admin.cmd` file:**
```cmd
@echo off
echo Starting Bharat AI Wealth Admin Panel...
echo.

echo [1/4] Checking PostgreSQL...
psql -U postgres -l >nul 2>&1
if errorlevel 1 (
    echo ERROR: PostgreSQL not running!
    echo Please start PostgreSQL service
    pause
    exit /b 1
)
echo ✓ PostgreSQL is running

echo.
echo [2/4] Starting Backend...
start "Backend" cmd /k "cd bankend && mvn spring-boot:run"
timeout /t 10

echo.
echo [3/4] Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 5

echo.
echo [4/4] Opening Admin Panel...
timeout /t 15
start http://localhost:3001/admin

echo.
echo ✓ Admin Panel Started!
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3001
echo Admin Panel: http://localhost:3001/admin
echo.
pause
```

**Run it:**
```cmd
start-admin.cmd
```

---

## 📞 Still Having Issues?

### Check Logs

**Backend logs:**
```cmd
cd bankend
type logs\application.log
```

**Frontend logs:**
- Open browser
- Press F12 (Developer Tools)
- Check Console tab

### Verify Services

**Check all services running:**
```cmd
# PostgreSQL
psql -U postgres -l

# Backend
curl http://localhost:8080/api/health

# Frontend
curl http://localhost:3001
```

---

## ✅ Success Indicators

You know everything is working when:

1. **Backend console shows:**
   ```
   Started BharatAiWealthApplication in X.XXX seconds
   ```

2. **Frontend console shows:**
   ```
   ✓ Ready on http://localhost:3001
   ```

3. **Browser shows:**
   - Admin Dashboard with statistics
   - No "refused to connect" errors
   - No "Access Denied" errors

---

## 🎉 You're Ready!

Once all services are running:

1. **Login:** `http://localhost:3001/auth/login`
2. **Admin Panel:** `http://localhost:3001/admin`
3. **Manage users, view logs, monitor security**

**Enjoy your admin panel!** 🚀

---

## 📚 Related Documentation

- [HOW_TO_ACCESS_ADMIN.md](./HOW_TO_ACCESS_ADMIN.md) - Detailed access guide
- [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md) - Feature documentation
- [DAILY_SECURITY_CHECKLIST.md](./DAILY_SECURITY_CHECKLIST.md) - Security best practices
- [README.md](./README.md) - Project overview

---

**Need more help?** Check the logs and error messages for specific issues.
