# 🏗️ Security Architecture

## Bharat AI Wealth - Security Architecture Overview

### 🎯 Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│  • HTTPS/TLS Encryption                                         │
│  • Secure Cookie Storage                                        │
│  • CSP Enforcement                                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                           │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Security Headers Layer                                    │ │
│  │  • X-Frame-Options: DENY                                  │ │
│  │  • Content-Security-Policy                                │ │
│  │  • HSTS (Production)                                      │ │
│  └───────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Input Validation Layer (lib/security.ts)                  │ │
│  │  • Email validation                                       │ │
│  │  • Password strength check                                │ │
│  │  • XSS sanitization                                       │ │
│  │  • Client-side rate limiting                              │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot)                        │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Filter Chain (Ordered)                                    │ │
│  │  1. IP Blocking Filter                                    │ │
│  │     • Track failed attempts                               │ │
│  │     • Block after 10 failures                             │ │
│  │     • 30-minute timeout                                   │ │
│  │                                                            │ │
│  │  2. Rate Limiting Filter                                  │ │
│  │     • Token bucket algorithm                              │ │
│  │     • Per-endpoint limits                                 │ │
│  │     • Per-IP tracking                                     │ │
│  │                                                            │ │
│  │  3. JWT Authentication Filter                             │ │
│  │     • Token validation                                    │ │
│  │     • User authentication                                 │ │
│  │     • Role extraction                                     │ │
│  └───────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Security Components                                       │ │
│  │  • InputSanitizer (SQL/XSS prevention)                    │ │
│  │  • PasswordValidator (strength check)                     │ │
│  │  • SecurityAuditLogger (event tracking)                   │ │
│  │  • ApiKeyAuthFilter (service auth)                        │ │
│  └───────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Authorization Layer                                       │ │
│  │  • Role-based access control                              │ │
│  │  • Method-level security                                  │ │
│  │  • Resource-level permissions                             │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓ API Key
┌─────────────────────────────────────────────────────────────────┐
│                    ML SERVICE (FastAPI)                         │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Middleware Stack                                          │ │
│  │  1. Security Headers Middleware                           │ │
│  │  2. Rate Limiting Middleware (60 req/min)                 │ │
│  │  3. API Key Authentication Middleware                     │ │
│  └───────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Input Validation                                          │ │
│  │  • Input sanitization                                     │ │
│  │  • Numeric validation                                     │ │
│  │  • Portfolio data validation                              │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL)                        │
│  • Encrypted connections                                        │
│  • Strong credentials                                           │
│  • Parameterized queries                                        │
│  • Audit logging                                                │
└─────────────────────────────────────────────────────────────────┘
```

### 🔐 Authentication Flow

```
┌──────────┐                                    ┌──────────┐
│  Client  │                                    │  Backend │
└────┬─────┘                                    └────┬─────┘
     │                                               │
     │  1. Login Request (email, password)          │
     │─────────────────────────────────────────────>│
     │                                               │
     │                                          ┌────▼────┐
     │                                          │ IP Check│
     │                                          │ (Blocked?)
     │                                          └────┬────┘
     │                                               │
     │                                          ┌────▼────┐
     │                                          │Rate Limit
     │                                          │  Check  │
     │                                          └────┬────┘
     │                                               │
     │                                          ┌────▼────┐
     │                                          │Sanitize │
     │                                          │ Input   │
     │                                          └────┬────┘
     │                                               │
     │                                          ┌────▼────┐
     │                                          │Validate │
     │                                          │Password │
     │                                          └────┬────┘
     │                                               │
     │                                          ┌────▼────┐
     │                                          │Generate │
     │                                          │  JWT    │
     │                                          └────┬────┘
     │                                               │
     │                                          ┌────▼────┐
     │                                          │  Log    │
     │                                          │ Event   │
     │                                          └────┬────┘
     │                                               │
     │  2. JWT Token + Refresh Token                │
     │<─────────────────────────────────────────────│
     │                                               │
     │  3. API Request (Authorization: Bearer JWT)  │
     │─────────────────────────────────────────────>│
     │                                               │
     │                                          ┌────▼────┐
     │                                          │Validate │
     │                                          │  JWT    │
     │                                          └────┬────┘
     │                                               │
     │                                          ┌────▼────┐
     │                                          │Extract  │
     │                                          │  User   │
     │                                          └────┬────┘
     │                                               │
     │                                          ┌────▼────┐
     │                                          │Check    │
     │                                          │  Roles  │
     │                                          └────┬────┘
     │                                               │
     │  4. Response                                  │
     │<─────────────────────────────────────────────│
     │                                               │
```

### 🚦 Rate Limiting Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Rate Limiting System                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Token Bucket Algorithm                    │   │
│  │                                                      │   │
│  │  Client IP/User ──> Bucket (Capacity: N tokens)    │   │
│  │                                                      │   │
│  │  • Tokens refill at fixed rate                      │   │
│  │  • Each request consumes 1 token                    │   │
│  │  • No tokens = Request rejected (429)               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Endpoint-Specific Limits:                                 │
│  ┌──────────────────┬──────────┬──────────┐               │
│  │ Endpoint         │ Tokens   │ Window   │               │
│  ├──────────────────┼──────────┼──────────┤               │
│  │ /auth/login      │ 5        │ 15 min   │               │
│  │ /auth/register   │ 3        │ 15 min   │               │
│  │ /auth/*          │ 10       │ 1 min    │               │
│  │ Default          │ 100      │ 1 min    │               │
│  └──────────────────┴──────────┴──────────┘               │
└─────────────────────────────────────────────────────────────┘
```

### 🚫 IP Blocking System

```
┌─────────────────────────────────────────────────────────────┐
│                    IP Blocking System                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Failed Attempt Tracking                   │   │
│  │                                                      │   │
│  │  IP Address ──> Failed Attempts Counter             │   │
│  │                                                      │   │
│  │  Attempt 1-9:  Track & Allow                        │   │
│  │  Attempt 10:   Block IP for 30 minutes              │   │
│  │  After 30 min: Auto-unblock                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Storage:                                                   │
│  ┌──────────────────┬──────────┬──────────────────┐        │
│  │ IP Address       │ Attempts │ Block Until      │        │
│  ├──────────────────┼──────────┼──────────────────┤        │
│  │ 192.168.1.100    │ 10       │ 2026-02-27 15:30 │        │
│  │ 10.0.0.50        │ 5        │ -                │        │
│  └──────────────────┴──────────┴──────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### 📝 Security Audit Logging

```
┌─────────────────────────────────────────────────────────────┐
│                  Security Audit System                      │
│                                                             │
│  Events Tracked:                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • LOGIN_SUCCESS                                     │   │
│  │ • LOGIN_FAILURE                                     │   │
│  │ • LOGOUT                                            │   │
│  │ • PASSWORD_CHANGE                                   │   │
│  │ • MFA_ENABLED / MFA_DISABLED                        │   │
│  │ • ACCOUNT_LOCKED                                    │   │
│  │ • SUSPICIOUS_ACTIVITY                               │   │
│  │ • UNAUTHORIZED_ACCESS_ATTEMPT                       │   │
│  │ • TOKEN_REFRESH                                     │   │
│  │ • SESSION_EXPIRED                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Log Format:                                                │
│  {                                                          │
│    "timestamp": "2026-02-27T10:30:00",                     │
│    "event": "LOGIN_FAILURE",                               │
│    "userId": "user@example.com",                           │
│    "ipAddress": "192.168.1.100",                           │
│    "details": { "reason": "Invalid password" }             │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
```

### 🔑 API Key Authentication

```
┌─────────────────────────────────────────────────────────────┐
│              Service-to-Service Authentication              │
│                                                             │
│  ┌──────────┐                              ┌──────────┐    │
│  │ Backend  │                              │ML Service│    │
│  └────┬─────┘                              └────┬─────┘    │
│       │                                         │          │
│       │  Request with X-API-Key header          │          │
│       │────────────────────────────────────────>│          │
│       │                                         │          │
│       │                                    ┌────▼────┐     │
│       │                                    │Validate │     │
│       │                                    │API Key  │     │
│       │                                    └────┬────┘     │
│       │                                         │          │
│       │                                    Valid? ──┐      │
│       │                                         │   │      │
│       │                                    Yes  │   │ No   │
│       │                                         │   │      │
│       │  Response (200)                         │   │      │
│       │<────────────────────────────────────────│   │      │
│       │                                             │      │
│       │  Error (403 Forbidden)                      │      │
│       │<────────────────────────────────────────────│      │
│       │                                                    │
└─────────────────────────────────────────────────────────────┘
```

### 🛡️ Defense in Depth

```
Layer 1: Network Security
  ├─ HTTPS/TLS encryption
  ├─ CORS policy
  └─ Firewall rules

Layer 2: Application Security
  ├─ Security headers
  ├─ Input validation
  ├─ Output encoding
  └─ CSRF protection

Layer 3: Authentication & Authorization
  ├─ JWT tokens
  ├─ Role-based access control
  ├─ MFA support
  └─ Session management

Layer 4: Rate Limiting & Throttling
  ├─ Per-endpoint limits
  ├─ Per-IP tracking
  └─ Token bucket algorithm

Layer 5: Monitoring & Logging
  ├─ Security audit logs
  ├─ Failed attempt tracking
  ├─ Suspicious activity detection
  └─ Real-time alerts

Layer 6: Data Protection
  ├─ Password hashing (BCrypt)
  ├─ Encryption at rest
  ├─ Secure token storage
  └─ Data sanitization
```

### 📊 Security Metrics Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│                  Security Metrics                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Authentication Metrics:                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Failed Logins (24h):        127                     │   │
│  │ Successful Logins (24h):    1,543                   │   │
│  │ MFA Adoption Rate:          67%                     │   │
│  │ Password Resets (24h):      23                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Rate Limiting Metrics:                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Rate Limit Violations:      45                      │   │
│  │ Most Limited Endpoint:      /auth/login             │   │
│  │ Top Rate-Limited IP:        192.168.1.100           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  IP Blocking Metrics:                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ IPs Blocked (24h):          12                      │   │
│  │ Currently Blocked:          3                       │   │
│  │ Auto-Unblocked (24h):       9                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Security Events:                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Suspicious Activity:        5                       │   │
│  │ Unauthorized Attempts:      18                      │   │
│  │ Account Lockouts:           2                       │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

**This architecture provides comprehensive, multi-layered security for the Bharat AI Wealth platform.**
