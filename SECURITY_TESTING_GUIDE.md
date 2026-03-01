# Security Testing Guide

## Overview
This guide provides instructions for testing the security features implemented in Bharat AI Wealth platform.

## 🧪 Testing Checklist

### 1. Authentication & Authorization Tests

#### Test JWT Authentication
```bash
# Test without token (should fail)
curl -X GET http://localhost:8080/api/portfolio/list

# Test with invalid token (should fail)
curl -X GET http://localhost:8080/api/portfolio/list \
  -H "Authorization: Bearer invalid_token"

# Test with valid token (should succeed)
curl -X GET http://localhost:8080/api/portfolio/list \
  -H "Authorization: Bearer YOUR_VALID_TOKEN"
```

#### Test Role-Based Access Control
```bash
# Test admin endpoint with non-admin user (should fail)
curl -X GET http://localhost:8080/api/admin/users \
  -H "Authorization: Bearer USER_TOKEN"

# Test admin endpoint with admin user (should succeed)
curl -X GET http://localhost:8080/api/admin/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### 2. Rate Limiting Tests

#### Test Login Rate Limiting
```bash
# Attempt 6 login requests in quick succession (6th should fail)
for i in {1..6}; do
  curl -X POST http://localhost:8080/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}' \
    -w "\nStatus: %{http_code}\n"
  sleep 1
done
```

#### Test General API Rate Limiting
```bash
# Send 101 requests rapidly (101st should fail with 429)
for i in {1..101}; do
  curl -X GET http://localhost:8080/api/health \
    -w "\nRequest $i - Status: %{http_code}\n"
done
```

### 3. Input Validation Tests

#### Test SQL Injection Prevention
```bash
# Attempt SQL injection in email field
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com OR 1=1--","password":"test"}'
```

#### Test XSS Prevention
```bash
# Attempt XSS in input fields
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"<script>alert(1)</script>"}'
```

#### Test Password Validation
```bash
# Test weak password (should fail)
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"weak","name":"Test User"}'

# Test strong password (should succeed)
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Strong@Pass123","name":"Test User"}'
```

### 4. IP Blocking Tests

#### Test IP Blocking After Failed Attempts
```bash
# Make 11 failed login attempts from same IP
for i in {1..11}; do
  curl -X POST http://localhost:8080/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"wrong"}' \
    -w "\nAttempt $i - Status: %{http_code}\n"
  sleep 1
done

# 11th attempt should return 403 Forbidden
```

### 5. Security Headers Tests

#### Test Frontend Security Headers
```bash
# Check Next.js security headers
curl -I http://localhost:3001

# Expected headers:
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin
# Content-Security-Policy: ...
```

#### Test Backend Security Headers
```bash
# Check Spring Boot security headers
curl -I http://localhost:8080/api/health

# Expected headers:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### 6. API Key Authentication Tests (ML Service)

#### Test ML Service Without API Key
```bash
# Should fail with 403
curl -X GET http://localhost:8000/predict?symbol=RELIANCE
```

#### Test ML Service With Invalid API Key
```bash
# Should fail with 403
curl -X GET http://localhost:8000/predict?symbol=RELIANCE \
  -H "X-API-Key: invalid_key"
```

#### Test ML Service With Valid API Key
```bash
# Should succeed
curl -X GET http://localhost:8000/predict?symbol=RELIANCE \
  -H "X-API-Key: YOUR_ML_SERVICE_API_KEY"
```

### 7. CORS Tests

#### Test CORS from Allowed Origin
```bash
curl -X OPTIONS http://localhost:8080/api/health \
  -H "Origin: http://localhost:3001" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

#### Test CORS from Disallowed Origin
```bash
curl -X OPTIONS http://localhost:8080/api/health \
  -H "Origin: http://malicious-site.com" \
  -H "Access-Control-Request-Method: GET" \
  -v
```

## 🔍 Automated Security Testing

### Using OWASP ZAP
```bash
# Install OWASP ZAP
# https://www.zaproxy.org/download/

# Run automated scan
zap-cli quick-scan --self-contained \
  --start-options '-config api.disablekey=true' \
  http://localhost:8080
```

### Using Burp Suite
1. Configure browser to use Burp proxy (127.0.0.1:8080)
2. Navigate through the application
3. Run active scan on captured requests
4. Review findings

### Using npm audit (Frontend)
```bash
cd frontend
npm audit
npm audit fix
```

### Using OWASP Dependency Check (Backend)
```bash
cd bankend
mvn org.owasp:dependency-check-maven:check
```

## 📊 Security Monitoring

### Check Security Audit Logs
```bash
# Backend logs
tail -f bankend/logs/application.log | grep "SECURITY_EVENT"

# Look for:
# - Failed login attempts
# - Account lockouts
# - Suspicious activity
# - Unauthorized access attempts
```

### Monitor Rate Limiting
```bash
# Check rate limit headers in responses
curl -v http://localhost:8080/api/health

# Look for:
# X-RateLimit-Remaining: 99
# X-RateLimit-Limit: 100
```

## 🛠️ Manual Testing Scenarios

### Scenario 1: Brute Force Attack
1. Attempt to login with wrong password 10 times
2. Verify IP gets blocked
3. Wait 30 minutes or clear block manually
4. Verify access is restored

### Scenario 2: Session Hijacking
1. Login and copy JWT token
2. Logout
3. Try to use old token
4. Verify token is invalidated

### Scenario 3: CSRF Attack
1. Create malicious form on external site
2. Submit form to API endpoint
3. Verify request is blocked due to CORS

### Scenario 4: XSS Attack
1. Try to inject script tags in input fields
2. Verify input is sanitized
3. Check that script doesn't execute

### Scenario 5: SQL Injection
1. Try SQL injection patterns in login form
2. Verify input is sanitized
3. Check database logs for suspicious queries

## 🔐 Penetration Testing Tools

### Recommended Tools
- **OWASP ZAP**: Web application security scanner
- **Burp Suite**: Web vulnerability scanner
- **Nikto**: Web server scanner
- **SQLMap**: SQL injection testing
- **XSSer**: XSS vulnerability scanner
- **Nmap**: Network security scanner

### Running Nikto
```bash
nikto -h http://localhost:8080
```

### Running SQLMap
```bash
sqlmap -u "http://localhost:8080/api/auth/login" \
  --data="email=test@example.com&password=test" \
  --method=POST
```

## 📝 Security Test Report Template

```markdown
# Security Test Report

## Test Date: [DATE]
## Tester: [NAME]
## Application Version: [VERSION]

### Tests Performed
- [ ] Authentication & Authorization
- [ ] Rate Limiting
- [ ] Input Validation
- [ ] IP Blocking
- [ ] Security Headers
- [ ] API Key Authentication
- [ ] CORS Configuration

### Vulnerabilities Found
| Severity | Issue | Location | Status |
|----------|-------|----------|--------|
| High     | -     | -        | -      |
| Medium   | -     | -        | -      |
| Low      | -     | -        | -      |

### Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

### Conclusion
[Overall security assessment]
```

## 🚨 Common Security Issues to Check

### High Priority
- [ ] SQL Injection vulnerabilities
- [ ] XSS vulnerabilities
- [ ] Authentication bypass
- [ ] Broken access control
- [ ] Security misconfiguration

### Medium Priority
- [ ] Sensitive data exposure
- [ ] Missing rate limiting
- [ ] Insufficient logging
- [ ] Weak password policy
- [ ] Missing security headers

### Low Priority
- [ ] Information disclosure
- [ ] Missing CSRF protection
- [ ] Outdated dependencies
- [ ] Verbose error messages

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
