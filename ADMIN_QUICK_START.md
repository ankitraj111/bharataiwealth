# 🚀 Admin Panel - Quick Start (1 Minute)

## Problem: "localhost refused to connect"

**Reason:** Services not running

**Solution:** Follow these 3 steps

---

## ⚡ 3-Step Quick Fix

### Step 1: Run Startup Script
```cmd
start-admin.cmd
```

This will:
- ✅ Check PostgreSQL
- ✅ Start Backend (port 8080)
- ✅ Start Frontend (port 3001)
- ✅ Open browser

---

### Step 2: Make Yourself Admin

**Open Command Prompt:**
```cmd
psql -U postgres -d wealthdb
```

**Run this SQL:**
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
```

**Exit:**
```sql
\q
```

---

### Step 3: Login and Access

1. **Login:** http://localhost:3001/auth/login
2. **Admin Panel:** http://localhost:3001/admin

---

## ✅ Done!

You should now see:
- Total Users
- Active Users
- Premium Users
- Failed Logins
- Quick Actions

---

## 🔧 Manual Method (If Script Fails)

### Terminal 1: Start Backend
```cmd
cd bankend
mvn spring-boot:run
```

### Terminal 2: Start Frontend
```cmd
cd frontend
npm run dev
```

### Terminal 3: Make Admin
```cmd
psql -U postgres -d wealthdb
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
\q
```

---

## 📱 URLs to Remember

| Service | URL |
|---------|-----|
| Backend API | http://localhost:8080 |
| Frontend | http://localhost:3001 |
| Login | http://localhost:3001/auth/login |
| Admin Panel | http://localhost:3001/admin |

---

## 🆘 Common Errors

### "Port 8080 already in use"
```cmd
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### "Database connection failed"
```cmd
net start postgresql-x64-14
```

### "Access Denied"
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
```

---

## 📚 Full Documentation

- [START_ADMIN_PANEL.md](./START_ADMIN_PANEL.md) - Complete guide (English)
- [ADMIN_PANEL_HINDI.md](./ADMIN_PANEL_HINDI.md) - पूरी गाइड (हिंदी)
- [HOW_TO_ACCESS_ADMIN.md](./HOW_TO_ACCESS_ADMIN.md) - Detailed access guide
- [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md) - Feature documentation

---

## 🎯 Checklist

Before accessing admin panel:

- [ ] PostgreSQL running
- [ ] Backend running (port 8080)
- [ ] Frontend running (port 3001)
- [ ] User role = ADMIN
- [ ] Logged in

---

**That's it! Your admin panel is ready.** 🎉

**Access:** http://localhost:3001/admin
