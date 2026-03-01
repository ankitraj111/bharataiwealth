# 🎯 Admin Panel - Quick Reference Card

```
╔══════════════════════════════════════════════════════════════╗
║           BHARAT AI WEALTH - ADMIN PANEL                     ║
║                  Quick Reference Card                        ║
╚══════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────┐
│ 🚀 QUICK START (3 Steps)                                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Start Services:                                          │
│     start-admin.cmd                                          │
│                                                              │
│  2. Make Admin:                                              │
│     psql -U postgres -d wealthdb                             │
│     UPDATE users SET role = 'ADMIN' WHERE email = '...';     │
│     \q                                                       │
│                                                              │
│  3. Access:                                                  │
│     http://localhost:3001/admin                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 🌐 URLS                                                       │
├──────────────────────────────────────────────────────────────┤
│  Backend:     http://localhost:8080                          │
│  Frontend:    http://localhost:3001                          │
│  Login:       http://localhost:3001/auth/login               │
│  Admin Panel: http://localhost:3001/admin                    │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 🔌 PORTS                                                      │
├──────────────────────────────────────────────────────────────┤
│  PostgreSQL: 5432                                            │
│  Backend:    8080                                            │
│  Frontend:   3001                                            │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 💻 COMMANDS                                                   │
├──────────────────────────────────────────────────────────────┤
│  Start All:        start-admin.cmd                           │
│  Diagnose:         diagnose.cmd                              │
│  Start Backend:    cd bankend && mvn spring-boot:run         │
│  Start Frontend:   cd frontend && npm run dev                │
│  Make Admin:       psql -U postgres -d wealthdb              │
│                    UPDATE users SET role = 'ADMIN' ...       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 🔧 TROUBLESHOOTING                                            │
├──────────────────────────────────────────────────────────────┤
│  Error                          Solution                     │
│  ─────────────────────────────  ──────────────────────────   │
│  "refused to connect"           start-admin.cmd              │
│  "Access Denied"                Make yourself ADMIN          │
│  "Token expired"                Login again                  │
│  "Port already in use"          Kill process or change port  │
│  "Database connection failed"   Start PostgreSQL             │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ ✅ CHECKLIST                                                  │
├──────────────────────────────────────────────────────────────┤
│  □ PostgreSQL running                                        │
│  □ Database 'wealthdb' exists                                │
│  □ .env file configured                                      │
│  □ Backend running (port 8080)                               │
│  □ Frontend running (port 3001)                              │
│  □ User role = ADMIN                                         │
│  □ Logged in                                                 │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 🎨 ADMIN PANEL FEATURES                                       │
├──────────────────────────────────────────────────────────────┤
│  Dashboard         User statistics, login activity           │
│  User Management   View, edit, enable/disable users          │
│  Security Logs     Audit logs, failed logins                 │
│  System Settings   Stats, cache, configuration               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 📚 DOCUMENTATION                                              │
├──────────────────────────────────────────────────────────────┤
│  ADMIN_QUICK_START.md         1-minute quick start           │
│  START_ADMIN_PANEL.md         Complete startup guide         │
│  ADMIN_PANEL_HINDI.md         हिंदी में गाइड                │
│  ADMIN_TROUBLESHOOTING.md     Fix any issue                  │
│  ADMIN_PANEL_SUMMARY.md       Complete overview              │
│  HOW_TO_ACCESS_ADMIN.md       Step-by-step access            │
│  ADMIN_PANEL_GUIDE.md         Feature documentation          │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 🛠️ DIAGNOSTIC COMMANDS                                        │
├──────────────────────────────────────────────────────────────┤
│  Check PostgreSQL:  psql -U postgres -l                      │
│  Check Backend:     curl http://localhost:8080/api/health    │
│  Check Frontend:    curl http://localhost:3001               │
│  Check Role:        SELECT role FROM users WHERE email='...' │
│  Check Ports:       netstat -ano | findstr ":8080 :3001"    │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 🔐 SECURITY                                                   │
├──────────────────────────────────────────────────────────────┤
│  Authentication:    JWT token-based                          │
│  Authorization:     Role-based (RBAC)                        │
│  Audit Logging:     All admin actions logged                 │
│  Self-Protection:   Cannot delete own account                │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ 📊 API ENDPOINTS                                              │
├──────────────────────────────────────────────────────────────┤
│  GET  /api/admin/dashboard                                   │
│  GET  /api/admin/users                                       │
│  PUT  /api/admin/users/{id}/role                             │
│  PUT  /api/admin/users/{id}/status                           │
│  GET  /api/admin/security/audit-logs                         │
│  GET  /api/admin/security/failed-logins                      │
│  GET  /api/admin/system/stats                                │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ ✨ SUCCESS INDICATORS                                         │
├──────────────────────────────────────────────────────────────┤
│  Backend:   "Started BharatAiWealthApplication"              │
│  Frontend:  "✓ Ready on http://localhost:3001"               │
│  Database:  Role shows as "ADMIN"                            │
│  Browser:   Dashboard loads with statistics                  │
└──────────────────────────────────────────────────────────────┘

╔══════════════════════════════════════════════════════════════╗
║  Need Help?                                                  ║
║  • Run: diagnose.cmd                                         ║
║  • Check: ADMIN_TROUBLESHOOTING.md                           ║
║  • Read: START_ADMIN_PANEL.md                                ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Print-Friendly Version

### Quick Start
```
1. start-admin.cmd
2. psql -U postgres -d wealthdb
   UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
   \q
3. http://localhost:3001/admin
```

### URLs
```
Backend:  http://localhost:8080
Frontend: http://localhost:3001
Admin:    http://localhost:3001/admin
```

### Ports
```
PostgreSQL: 5432
Backend:    8080
Frontend:   3001
```

### Common Issues
```
"refused to connect"     → start-admin.cmd
"Access Denied"          → Make yourself ADMIN
"Token expired"          → Login again
"Port already in use"    → Kill process
"Database failed"        → Start PostgreSQL
```

### Checklist
```
□ PostgreSQL running
□ Database exists
□ .env configured
□ Backend running
□ Frontend running
□ Role = ADMIN
□ Logged in
```

### Diagnostic
```
diagnose.cmd                              # Full diagnostic
psql -U postgres -l                       # Check PostgreSQL
curl http://localhost:8080/api/health     # Check backend
curl http://localhost:3001                # Check frontend
```

---

## Mobile-Friendly Version

**Start:**
1. `start-admin.cmd`
2. Make admin in database
3. Login and access

**URLs:**
- Admin: `localhost:3001/admin`
- Login: `localhost:3001/auth/login`

**Fix Issues:**
- Not connecting? Run `start-admin.cmd`
- Access denied? Make yourself ADMIN
- Token expired? Login again

**Check Status:**
```
diagnose.cmd
```

**Docs:**
- Quick: `ADMIN_QUICK_START.md`
- Full: `START_ADMIN_PANEL.md`
- Hindi: `ADMIN_PANEL_HINDI.md`

---

## Bookmark This Page

Save this file for quick reference when working with the admin panel.

**File:** `QUICK_REFERENCE_CARD.md`

**Location:** Project root directory

**Usage:** Open anytime you need quick commands or troubleshooting steps.

---

**Everything you need on one page!** 🎯
