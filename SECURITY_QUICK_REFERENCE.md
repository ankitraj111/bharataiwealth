# 🛡️ Security Quick Reference Card

## One-Page Security Guide for Bharat AI Wealth

### 🔑 Environment Variables (Required)

```bash
# Backend
JWT_SECRET=<32+ chars>
AUDIT_HMAC_KEY=<32+ chars>
ML_SERVICE_API_KEY=<random key>
DATABASE_PASSWORD=<strong password>

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_ENABLE_MFA=true

# ML Service
API_KEY=<same as ML_SERVICE_API_KEY>
```

### 🚦 Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| Login | 5 requests | 15 min |
| Register | 3 requests | 15 min |
| Auth | 10 requests | 1 min |
| General API | 100 requests | 1 min |
| ML Service | 60 requests | 1 min |

### 🚫 IP Blocking

- **Trigger**: 10 failed login attempts
- **Duration**: 30 minutes
- **Auto-unblock**: Yes

### 🔐 Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 digit
- At least 1 special character
- Not in common passwords list

### 🛡️ Security Headers

```
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: [strict policy]
Strict-Transport-Security: max-age=31536000
```

### 🔧 Security Components

#### Frontend (`frontend/lib/security.ts`)
```typescript
import { validateEmail, validatePassword, sanitizeHtml } from '@/lib/security';

// Validate
validateEmail(email);
validatePassword(password);

// Sanitize
sanitizeHtml(userInput);
```

#### Backend (Java)
```java
@Autowired
private InputSanitizer inputSanitizer;
private PasswordValidator passwordValidator;
private SecurityAuditLogger auditLogger;

// Use
inputSanitizer.sanitizeInput(input);
passwordValidator.validate(password);
auditLogger.logSecurityEvent(event, userId, ip);
```

### 🧪 Quick Tests

```bash
# Test rate limiting
for i in {1..6}; do curl http://localhost:8080/api/auth/login; done

# Test security headers
curl -I http://localhost:3001

# Test authentication
curl -H "Authorization: Bearer TOKEN" http://localhost:8080/api/portfolio/list

# Test ML service API key
curl -H "X-API-Key: KEY" http://localhost:8000/predict?symbol=RELIANCE
```

### 📊 Security Monitoring

```bash
# Check audit logs
tail -f logs/application.log | grep "SECURITY_EVENT"

# Monitor rate limits
curl -v http://localhost:8080/api/health | grep "X-RateLimit"

# Check blocked IPs
# Review application logs for "IP blocked" messages
```

### 🚨 Security Incident Response

1. **Detect** → Check audit logs
2. **Isolate** → Block affected IPs/users
3. **Investigate** → Review attack vector
4. **Remediate** → Patch vulnerabilities
5. **Document** → Update security policies

### ✅ Pre-Deployment Checklist

- [ ] Strong secrets generated
- [ ] CORS origins updated
- [ ] HTTPS enabled
- [ ] Database secured
- [ ] Rate limits tested
- [ ] IP blocking tested
- [ ] Security headers verified
- [ ] Audit logging enabled

### 📁 Key Files

| File | Purpose |
|------|---------|
| `SECURITY_IMPLEMENTATION.md` | Full guide |
| `SECURITY_TESTING_GUIDE.md` | Testing procedures |
| `SECURITY_CHECKLIST.md` | Detailed checklist |
| `SECURITY_SUMMARY.md` | Implementation summary |
| `.env.example` | Config template |

### 🔗 Quick Links

- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **Spring Security**: https://spring.io/projects/spring-security
- **Next.js Security**: https://nextjs.org/docs/advanced-features/security-headers

### 💡 Common Commands

```bash
# Generate strong secret
openssl rand -base64 32

# Check dependencies
npm audit
mvn org.owasp:dependency-check-maven:check

# Run security scan
zap-cli quick-scan http://localhost:8080

# Test CORS
curl -H "Origin: http://localhost:3001" -I http://localhost:8080/api/health
```

---

**Keep this card handy for quick security reference!**
