# 🔐 How to Access Admin Panel

## ⚡ QUICK FIX: "localhost refused to connect"

**Problem:** Services not running

**Solution:**
```cmd
# Run this script (it will start everything)
start-admin.cmd

# Then make yourself admin
psql -U postgres -d wealthdb
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
\q

# Login and access
http://localhost:3001/auth/login
http://localhost:3001/admin
```

**📚 Full Guides:**
- [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) - 1-minute quick start
- [START_ADMIN_PANEL.md](./START_ADMIN_PANEL.md) - Complete startup guide
- [ADMIN_PANEL_HINDI.md](./ADMIN_PANEL_HINDI.md) - हिंदी में पूरी गाइड

---

## Step-by-Step Guide to Access Admin Dashboard

---

## 🚀 Quick Start

### Step 1: Make Yourself Admin

**Option A: Using Database (Recommended)**

```sql
-- Connect to your PostgreSQL database
psql -U postgres -d wealthdb

-- Update your user to ADMIN role
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';

-- Verify
SELECT email, role FROM users WHERE email = 'your@email.com';
```

**Option B: Using pgAdmin (GUI)**

1. Open pgAdmin
2. Connect to `wealthdb`
3. Navigate to: Databases → wealthdb → Schemas → public → Tables → users
4. Right-click on `users` → View/Edit Data → All Rows
5. Find your email
6. Change `role` column to `ADMIN`
7. Save

---

### Step 2: Start the Application

**Backend:**
```bash
cd bankend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

### Step 3: Login

1. Open browser: `http://localhost:3001`
2. Go to login page: `http://localhost:3001/auth/login`
3. Login with your admin credentials

---

### Step 4: Access Admin Panel

**Option A: Direct URL**
```
http://localhost:3001/admin
```

**Option B: Add Navigation Link**

Edit your main navigation to include admin link:

```typescript
// In your navigation component
{user?.role === 'ADMIN' && (
  <Link href="/admin">
    <button className="admin-button">
      🔐 Admin Panel
    </button>
  </Link>
)}
```

---

## 🧪 Testing Admin Panel

### Using Browser:

1. **Open Admin Dashboard:**
   ```
   http://localhost:3001/admin
   ```

2. **You should see:**
   - Total users count
   - Active users
   - Premium users
   - Failed logins (24h)
   - Quick action buttons

### Using API Directly:

```bash
# 1. Login to get token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your@email.com",
    "password": "YourPassword123!"
  }'

# Copy the token from response

# 2. Access admin dashboard
curl -X GET http://localhost:8080/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# 3. Get all users
curl -X GET http://localhost:8080/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📱 Admin Panel Features

### What You Can See:

1. **Dashboard** (`/admin`)
   - User statistics
   - Login activity
   - System health
   - Quick actions

2. **User Management** (`/admin/users`)
   - List all users
   - Edit user roles
   - Enable/disable accounts
   - Delete users

3. **Security Logs** (`/admin/security`)
   - Audit logs
   - Failed login attempts
   - Suspicious activity

4. **System Settings** (`/admin/system`)
   - System statistics
   - Cache management
   - Configuration

---

## 🔧 Troubleshooting

### Issue 1: "Access Denied" Error

**Problem:** You see "Access denied. Admin role required."

**Solution:**
```sql
-- Check your role
SELECT email, role FROM users WHERE email = 'your@email.com';

-- If not ADMIN, update it
UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
```

### Issue 2: Page Not Found (404)

**Problem:** `/admin` page shows 404

**Solution:**
```bash
# Make sure the file exists
ls frontend/app/admin/page.tsx

# If not, the file was created in this session
# Restart your Next.js dev server
cd frontend
npm run dev
```

### Issue 3: Token Expired

**Problem:** "Token expired" or "Unauthorized"

**Solution:**
```typescript
// Login again to get fresh token
// Or check token expiration in your code
```

### Issue 4: Backend Not Running

**Problem:** Cannot connect to API

**Solution:**
```bash
# Check if backend is running
curl http://localhost:8080/api/health

# If not running, start it
cd bankend
mvn spring-boot:run
```

---

## 🎨 Customizing Admin Panel

### Change Colors:

Edit `frontend/app/admin/page.tsx`:

```typescript
// Change primary color from blue to your brand color
className="bg-blue-600" // Change to bg-purple-600, bg-green-600, etc.
```

### Add More Stats:

```typescript
// Add new stat card
<div className="bg-white rounded-lg shadow p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">Your Stat</p>
      <p className="text-3xl font-bold text-gray-900">{yourValue}</p>
    </div>
    <div className="bg-blue-100 p-3 rounded-full">
      {/* Your icon */}
    </div>
  </div>
</div>
```

### Add Navigation:

```typescript
// In your main layout or navbar
import Link from 'next/link';

{isAdmin && (
  <Link href="/admin" className="admin-link">
    Admin Panel
  </Link>
)}
```

---

## 🔒 Security Best Practices

### 1. Protect Admin Routes

```typescript
// In middleware.ts or layout
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin')) {
    // Verify admin role
    if (!isAdmin(token)) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
}
```

### 2. Hide Admin Links

```typescript
// Only show admin link to admins
{user?.role === 'ADMIN' && (
  <Link href="/admin">Admin Panel</Link>
)}
```

### 3. Log Admin Actions

All admin actions are automatically logged in the backend.

---

## 📊 Admin Panel URLs

```
Main Dashboard:       http://localhost:3001/admin
User Management:      http://localhost:3001/admin/users
Security Logs:        http://localhost:3001/admin/security
System Settings:      http://localhost:3001/admin/system

API Endpoints:
Dashboard:            GET  /api/admin/dashboard
Users List:           GET  /api/admin/users
User Details:         GET  /api/admin/users/{id}
Update Role:          PUT  /api/admin/users/{id}/role
Update Status:        PUT  /api/admin/users/{id}/status
Delete User:          DELETE /api/admin/users/{id}
Audit Logs:           GET  /api/admin/security/audit-logs
Failed Logins:        GET  /api/admin/security/failed-logins
System Stats:         GET  /api/admin/system/stats
```

---

## ✅ Quick Checklist

Before accessing admin panel:

- [ ] Backend is running (`mvn spring-boot:run`)
- [ ] Frontend is running (`npm run dev`)
- [ ] Database is running (PostgreSQL)
- [ ] Your user has ADMIN role
- [ ] You are logged in
- [ ] Token is valid

---

## 🎉 Success!

If everything is set up correctly, you should see:

```
✅ Admin Dashboard with stats
✅ User count cards
✅ Login activity
✅ Quick action buttons
✅ System health status
```

---

## 📞 Need Help?

**Common Issues:**
1. Access denied → Check your role in database
2. 404 error → Restart Next.js dev server
3. API errors → Check backend is running
4. Token issues → Login again

**Check Logs:**
```bash
# Backend logs
tail -f bankend/logs/application.log

# Frontend logs
# Check browser console (F12)
```

---

## 🚀 Next Steps

After accessing admin panel:

1. **Explore Features:**
   - View user list
   - Check security logs
   - Monitor system health

2. **Customize:**
   - Add your branding
   - Customize colors
   - Add more features

3. **Secure:**
   - Set up proper authentication
   - Add rate limiting
   - Enable audit logging

---

**Your admin panel is ready to use!** 🎊

**URL:** `http://localhost:3001/admin`

**Enjoy managing your application!** 🚀
