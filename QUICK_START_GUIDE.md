# 🚀 Quick Start Guide - Bharat AI Wealth

## 🎯 Goal
Get your app running locally in **5 minutes** and test Google login!

## ✅ Prerequisites

### Required:
- ✅ **Java 17+** - [Download](https://adoptium.net/)
- ✅ **Node.js 18+** - [Download](https://nodejs.org/)
- ✅ **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)
- ✅ **Git** - [Download](https://git-scm.com/)

### Check Installation:
```bash
java -version    # Should show 17 or higher
node -v          # Should show 18 or higher
psql --version   # Should show 14 or higher
git --version    # Should show any version
```

## 🏃 Quick Start (Windows)

### Option 1: Automated Script (Easiest!)
```bash
# Just double-click this file:
quick-start.cmd
```

This will:
1. ✅ Check Java & Node.js
2. ✅ Start Backend (port 8080)
3. ✅ Start Frontend (port 3000)
4. ✅ Open login page in browser

### Option 2: Manual Start

#### Step 1: Setup Database
```bash
# Start PostgreSQL
# Create database
psql -U postgres
CREATE DATABASE wealthdb;
\q
```

#### Step 2: Configure Environment
```bash
# Copy .env.example to .env
copy .env.example .env

# Edit .env and update:
# - DATABASE_PASSWORD (your postgres password)
# - JWT_SECRET (generate using: openssl rand -base64 32)
```

#### Step 3: Start Backend
```bash
cd bankend
mvn clean install
mvn spring-boot:run
```

**Wait for**: `Started WealthApplication in X seconds`

#### Step 4: Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

**Wait for**: `Ready in Xs`

#### Step 5: Open Browser
```
http://localhost:3000/auth/login
```

## 🎉 Test Google Login

### Step 1: Click "Continue with Google"
![Google Login Button](https://via.placeholder.com/400x60/1E88E5/FFFFFF?text=Continue+with+Google)

### Step 2: Select Gmail Account
- Any Gmail account works!
- No restrictions
- No whitelist

### Step 3: Automatic Redirect
- ✅ Account created automatically
- ✅ Redirected to dashboard
- ✅ Ready to use!

## 🐛 Troubleshooting

### Problem: "Request timed out"
**Solution:**
```
1. Wait 60 seconds (backend is warming up)
2. Try again
3. Check backend logs for errors
```

### Problem: Backend won't start
**Solution:**
```bash
# Check if port 8080 is already in use
netstat -ano | findstr :8080

# Kill the process if needed
taskkill /PID <process-id> /F

# Try starting again
cd bankend
mvn spring-boot:run
```

### Problem: Frontend won't start
**Solution:**
```bash
# Check if port 3000 is already in use
netstat -ano | findstr :3000

# Kill the process if needed
taskkill /PID <process-id> /F

# Clear cache and reinstall
cd frontend
rmdir /s /q node_modules
rmdir /s /q .next
npm install
npm run dev
```

### Problem: Database connection failed
**Solution:**
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Check database exists
psql -U postgres -c "\l" | findstr wealthdb

# Create if missing
psql -U postgres -c "CREATE DATABASE wealthdb;"

# Update .env with correct credentials
```

### Problem: "Google Sign-In failed to load"
**Solution:**
```
1. Refresh the page
2. Check internet connection
3. Clear browser cache
4. Try different browser
```

## 📁 Project Structure

```
bharat-ai-wealth-ui/
├── bankend/                 # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       ├── java/       # Java source code
│   │       └── resources/  # Config files
│   └── pom.xml             # Maven dependencies
│
├── frontend/               # Next.js frontend
│   ├── app/               # Pages & routes
│   ├── components/        # React components
│   ├── lib/              # Utilities
│   └── package.json      # NPM dependencies
│
├── ml-service/           # Python ML service
│   └── main.py          # FastAPI server
│
├── .env                 # Environment variables
├── quick-start.cmd     # Quick start script
└── README.md          # Main documentation
```

## 🔧 Configuration Files

### Backend (.env):
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/wealthdb
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
JWT_SECRET=your-jwt-secret-32-chars-minimum
ENCRYPTION_MASTER_KEY=your-encryption-key-32-chars
```

### Frontend (frontend/.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_TIMEOUT=60000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=1075300655845-jv31r0erhq0psjlrpf4mrh2389l7h7hg.apps.googleusercontent.com
```

## 🧪 Verify Everything Works

### 1. Backend Health Check
```bash
curl http://localhost:8080/actuator/health
# Should return: {"status":"UP"}
```

### 2. Frontend Health Check
```bash
curl http://localhost:3000
# Should return: HTML content
```

### 3. Database Check
```sql
psql -U postgres -d wealthdb
SELECT COUNT(*) FROM users;
\q
```

### 4. Google Login Test
1. Open: http://localhost:3000/auth/login
2. Click: "Continue with Google"
3. Login with any Gmail
4. Should redirect to: http://localhost:3000/dashboard

## 📚 Next Steps

### After Successful Login:
1. ✅ Explore the dashboard
2. ✅ Add some portfolio items
3. ✅ Check AI predictions
4. ✅ Try different features

### For Development:
1. 📖 Read [GOOGLE_LOGIN_FIXED.md](./GOOGLE_LOGIN_FIXED.md)
2. 📖 Read [SECURITY_ARCHITECTURE.md](./SECURITY_ARCHITECTURE.md)
3. 🧪 Run tests: [TEST_GOOGLE_LOGIN.md](./TEST_GOOGLE_LOGIN.md)
4. 🚀 Deploy: [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md)

### For Production:
1. 🔐 Change all default passwords
2. 🔑 Generate new JWT secrets
3. 🌐 Deploy to Vercel/Render
4. 📊 Set up monitoring

## 🎯 Common Commands

### Backend:
```bash
# Start backend
cd bankend
mvn spring-boot:run

# Build JAR
mvn clean package

# Run tests
mvn test

# Clean build
mvn clean install
```

### Frontend:
```bash
# Start dev server
cd frontend
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Database:
```bash
# Connect to database
psql -U postgres -d wealthdb

# Backup database
pg_dump -U postgres wealthdb > backup.sql

# Restore database
psql -U postgres wealthdb < backup.sql
```

## 🆘 Need Help?

### Documentation:
- 📖 [Main README](./README.md)
- 🔐 [Security Guide](./SECURITY_ARCHITECTURE.md)
- 🧪 [Testing Guide](./TEST_GOOGLE_LOGIN.md)
- 🚀 [Deployment Guide](./DEPLOYMENT_READY.md)
- 🇮🇳 [Hindi Guide](./GOOGLE_LOGIN_HINDI.md)

### Common Issues:
- Port already in use → Kill the process
- Database connection failed → Check PostgreSQL
- Google login failed → Check internet & credentials
- Timeout error → Wait 60 seconds for warm-up

### Still Stuck?
1. Check backend logs in terminal
2. Check frontend console (F12 in browser)
3. Check database connection
4. Try restarting everything

## ✅ Success Checklist

- [ ] Java 17+ installed
- [ ] Node.js 18+ installed
- [ ] PostgreSQL running
- [ ] Database created (wealthdb)
- [ ] .env file configured
- [ ] Backend started (port 8080)
- [ ] Frontend started (port 3000)
- [ ] Login page opens
- [ ] Google login works
- [ ] Dashboard loads

**If all checked, you're ready to go! 🎉**

---

**Last Updated**: 2026-05-12
**Version**: 1.0.0
**Status**: ✅ Ready for Development
