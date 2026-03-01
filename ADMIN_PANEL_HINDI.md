# 🚀 Admin Panel - पूरी गाइड (हिंदी में)

## समस्या: "localhost refused to connect"

इसका मतलब है कि आपका backend और/या frontend चालू नहीं है। ये steps follow करें:

---

## ✅ Step-by-Step समाधान

### Step 1: PostgreSQL Database Check करें

**Windows Command Prompt में:**
```cmd
psql -U postgres -l
```

**अगर PostgreSQL चालू नहीं है:**
```cmd
# PostgreSQL service start करें
net start postgresql-x64-14

# या Services app use करें (Win + R, type: services.msc)
# "postgresql" ढूंढें और Start पर click करें
```

**Database बनाएं (अगर नहीं है):**
```cmd
psql -U postgres
CREATE DATABASE wealthdb;
\q
```

---

### Step 2: Environment Variables Configure करें

**Project root में `.env` file बनाएं:**
```bash
# Example file copy करें
copy .env.example .env

# .env file edit करें
notepad .env
```

**जरूरी values:**
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/wealthdb
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=apka_password

JWT_SECRET=koi_bhi_32_characters_ka_random_string
AUDIT_HMAC_KEY=koi_bhi_32_characters_ka_random_string
ENCRYPTION_MASTER_KEY=koi_bhi_32_characters_ka_random_string
ML_SERVICE_API_KEY=koi_bhi_random_api_key
```

**Secrets generate करें (PowerShell में):**
```powershell
# Random base64 string generate करें
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

---

### Step 3: Backend Start करें (Spring Boot)

**Command Prompt खोलें project folder में:**
```cmd
cd bankend
mvn spring-boot:run
```

**ये message आने का wait करें:**
```
Started BharatAiWealthApplication in X.XXX seconds
```

**Backend test करें:**
```cmd
curl http://localhost:8080/api/health
```

**Expected response:**
```json
{"status":"UP"}
```

**अगर error आए:**
- Database connection check करें
- .env file exist करती है check करें
- Port 8080 free है check करें: `netstat -ano | findstr :8080`

---

### Step 4: Frontend Start करें (Next.js)

**नया Command Prompt खोलें:**
```cmd
cd frontend
npm install
npm run dev
```

**ये message आने का wait करें:**
```
✓ Ready on http://localhost:3001
```

**Frontend test करें:**
Browser में खोलें: `http://localhost:3001`

---

### Step 5: खुद को Admin बनाएं

**Option A: psql use करके (Command Line)**
```cmd
psql -U postgres -d wealthdb

# ये SQL command run करें
UPDATE users SET role = 'ADMIN' WHERE email = 'apka@email.com';

# Verify करें
SELECT email, role FROM users WHERE email = 'apka@email.com';

# Exit करें
\q
```

**Option B: pgAdmin use करके (GUI)**
1. pgAdmin खोलें
2. `wealthdb` से connect करें
3. Navigate करें: Databases → wealthdb → Schemas → public → Tables → users
4. Right-click → View/Edit Data → All Rows
5. अपनी email की row ढूंढें
6. `role` column को `ADMIN` में change करें
7. Save करें (F6)

---

### Step 6: Login करें और Admin Panel खोलें

1. **Browser खोलें:** `http://localhost:3001`

2. **Login page पर जाएं:** `http://localhost:3001/auth/login`

3. **अपने credentials से login करें**

4. **Admin panel खोलें:** `http://localhost:3001/admin`

---

## 🎯 Quick Checklist

Admin panel access करने से पहले verify करें:

- [ ] PostgreSQL चालू है
- [ ] Database `wealthdb` exist करता है
- [ ] `.env` file secrets के साथ configured है
- [ ] Backend port 8080 पर चल रहा है
- [ ] Frontend port 3001 पर चल रहा है
- [ ] आपके user का role ADMIN है
- [ ] आप logged in हैं

---

## 🔧 Common Problems और Solutions

### Problem 1: "Port 8080 already in use"

**Port 8080 कौन use कर रहा है देखें:**
```cmd
netstat -ano | findstr :8080
```

**Process को kill करें:**
```cmd
taskkill /PID <PID_NUMBER> /F
```

### Problem 2: "Database connection failed"

**PostgreSQL चालू है check करें:**
```cmd
psql -U postgres -l
```

**.env में credentials check करें:**
```env
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=apka_actual_password
```

### Problem 3: "npm command not found"

**Node.js install करें:**
1. Download करें: https://nodejs.org/
2. LTS version install करें
3. Command Prompt restart करें
4. Verify करें: `node --version`

### Problem 4: "mvn command not found"

**Maven install करें:**
1. Download करें: https://maven.apache.org/download.cgi
2. Extract करें C:\Program Files\Maven में
3. PATH में add करें: `C:\Program Files\Maven\bin`
4. Command Prompt restart करें
5. Verify करें: `mvn --version`

### Problem 5: Admin Panel पर "Access Denied"

**अपना role check करें:**
```sql
SELECT email, role FROM users WHERE email = 'apka@email.com';
```

**अगर ADMIN नहीं है, तो update करें:**
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'apka@email.com';
```

### Problem 6: "Token expired" या "Unauthorized"

**Solution:** फिर से login करें fresh token के लिए

1. जाएं: `http://localhost:3001/auth/login`
2. Credentials enter करें
3. Admin panel फिर से try करें

---

## 📱 Admin Panel Test करें

### Test 1: Backend API Check करें
```cmd
curl http://localhost:8080/api/health
```

**Expected:** `{"status":"UP"}`

### Test 2: Frontend Check करें
Browser में खोलें: `http://localhost:3001`

**Expected:** Homepage load हो जाए

### Test 3: Login करें और Token लें
```cmd
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"apka@email.com\",\"password\":\"ApkaPassword123!\"}"
```

**Expected:** JSON with `token` field

### Test 4: Admin Dashboard Access करें
```cmd
curl -X GET http://localhost:8080/api/admin/dashboard ^
  -H "Authorization: Bearer APKA_TOKEN_YAHAN"
```

**Expected:** JSON with user statistics

---

## 🎨 आपको क्या दिखेगा

जब admin panel successfully load होगा:

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

**`start-admin.cmd` file बनाएं:**
```cmd
@echo off
echo Bharat AI Wealth Admin Panel Start Ho Raha Hai...
echo.

echo [1/4] PostgreSQL Check Kar Rahe Hain...
psql -U postgres -l >nul 2>&1
if errorlevel 1 (
    echo ERROR: PostgreSQL nahi chal raha!
    echo Please PostgreSQL service start karein
    pause
    exit /b 1
)
echo ✓ PostgreSQL chal raha hai

echo.
echo [2/4] Backend Start Kar Rahe Hain...
start "Backend" cmd /k "cd bankend && mvn spring-boot:run"
timeout /t 10

echo.
echo [3/4] Frontend Start Kar Rahe Hain...
start "Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 5

echo.
echo [4/4] Admin Panel Khol Rahe Hain...
timeout /t 15
start http://localhost:3001/admin

echo.
echo ✓ Admin Panel Start Ho Gaya!
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3001
echo Admin Panel: http://localhost:3001/admin
echo.
pause
```

**Run करें:**
```cmd
start-admin.cmd
```

---

## 📞 अभी भी Problem है?

### Logs Check करें

**Backend logs:**
```cmd
cd bankend
type logs\application.log
```

**Frontend logs:**
- Browser खोलें
- F12 दबाएं (Developer Tools)
- Console tab check करें

### Services Verify करें

**सभी services चल रही हैं check करें:**
```cmd
# PostgreSQL
psql -U postgres -l

# Backend
curl http://localhost:8080/api/health

# Frontend
curl http://localhost:3001
```

---

## ✅ Success के Indicators

सब कुछ काम कर रहा है जब:

1. **Backend console में दिखे:**
   ```
   Started BharatAiWealthApplication in X.XXX seconds
   ```

2. **Frontend console में दिखे:**
   ```
   ✓ Ready on http://localhost:3001
   ```

3. **Browser में दिखे:**
   - Admin Dashboard with statistics
   - कोई "refused to connect" error नहीं
   - कोई "Access Denied" error नहीं

---

## 🎉 आप तैयार हैं!

जब सभी services चल रही हों:

1. **Login करें:** `http://localhost:3001/auth/login`
2. **Admin Panel खोलें:** `http://localhost:3001/admin`
3. **Users manage करें, logs देखें, security monitor करें**

**अपने admin panel का मजा लें!** 🚀

---

## 💡 Important Tips (हिंदी में)

### Tip 1: Services हमेशा इसी order में start करें
1. पहले PostgreSQL
2. फिर Backend (Spring Boot)
3. फिर Frontend (Next.js)

### Tip 2: Ports याद रखें
- Backend: `8080`
- Frontend: `3001`
- PostgreSQL: `5432`

### Tip 3: Admin बनने के लिए
Database में manually role change करना होगा:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'apka@email.com';
```

### Tip 4: Token expire हो जाए तो
फिर से login करें fresh token के लिए

### Tip 5: Error आए तो
1. Logs check करें
2. Services restart करें
3. Database connection verify करें

---

## 🎯 Admin Panel Features (क्या कर सकते हैं)

### 1. Dashboard
- Total users देखें
- Active users देखें
- Premium users देखें
- Failed logins monitor करें

### 2. User Management
- सभी users की list देखें
- User roles change करें (USER, PREMIUM, ANALYST, ADMIN)
- Accounts enable/disable करें
- Users delete करें

### 3. Security Logs
- Audit logs देखें
- Failed login attempts track करें
- Suspicious activity monitor करें

### 4. System Settings
- System statistics देखें
- Cache clear करें
- Configuration manage करें

---

## 📚 Related Documentation

- [START_ADMIN_PANEL.md](./START_ADMIN_PANEL.md) - English startup guide
- [HOW_TO_ACCESS_ADMIN.md](./HOW_TO_ACCESS_ADMIN.md) - Detailed access guide
- [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md) - Feature documentation
- [DAILY_SECURITY_CHECKLIST.md](./DAILY_SECURITY_CHECKLIST.md) - Security best practices

---

## 🆘 Common Questions (सवाल-जवाब)

**Q: Admin panel kaise access karein?**
A: `http://localhost:3001/admin` - lekin pehle login karna hoga

**Q: Admin kaise banein?**
A: Database mein role change karein: `UPDATE users SET role = 'ADMIN' WHERE email = 'apka@email.com';`

**Q: Backend start nahi ho raha?**
A: Check karein:
- PostgreSQL chal raha hai?
- .env file exist karti hai?
- Port 8080 free hai?

**Q: Frontend start nahi ho raha?**
A: Check karein:
- Node.js install hai?
- `npm install` run kiya?
- Port 3001 free hai?

**Q: "Access Denied" error aa raha hai?**
A: Apna role ADMIN hai check karein database mein

---

**Aur help chahiye?** Logs aur error messages check karein specific issues ke liye.

**Sab kuch samajh aa gaya?** Toh start karein! 🚀
