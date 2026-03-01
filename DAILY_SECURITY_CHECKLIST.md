# ✅ Daily Security Checklist - Tension Khatam!

## 6 Golden Rules - Follow Karo, Tension Bhool Jao! 🛡️

---

## 🔐 Rule 1: Secrets Kabhi GitHub Par Upload Mat Karo

### ❌ GALAT (Never Do This):

```bash
# .env file with secrets
JWT_SECRET=mySecretKey123
DATABASE_PASSWORD=admin123

# Git commit
git add .env
git commit -m "Added config"
git push  # ❌ DANGER! Secrets exposed!
```

### ✅ SAHI (Always Do This):

```bash
# Step 1: Add .env to .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo "*.key" >> .gitignore
echo "*.pem" >> .gitignore

# Step 2: Create .env.example (without real values)
cp .env .env.example
# Edit .env.example and replace real values with placeholders

# Step 3: Commit only .env.example
git add .gitignore .env.example
git commit -m "Added env example"
git push  # ✅ SAFE!
```

### 🚨 Already Uploaded Secrets? Fix Immediately:

```bash
# Step 1: Change all secrets immediately
# Generate new JWT_SECRET, DATABASE_PASSWORD, etc.

# Step 2: Remove from Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Step 3: Force push (careful!)
git push origin --force --all

# Step 4: Rotate all exposed secrets
```

### Daily Check:
```bash
# Check if any secrets in Git
git log --all --full-history -- "*.env"
git log --all --full-history -- "*.key"

# Should return nothing!
```

---

## 🔑 Rule 2: Strong Passwords Use Karo

### ❌ GALAT Passwords:

```
❌ password
❌ 123456
❌ admin123
❌ qwerty
❌ yourname123
❌ company@2024
```

### ✅ SAHI Passwords:

```
✅ K8$mN2pQ7@rT5uV9wX  (Random, 18+ chars)
✅ Correct-Horse-Battery-Staple-2024!  (Passphrase)
✅ MyD0g$N@me!sMax&2024  (Personal + symbols)
```

### Generate Strong Passwords:

```bash
# Method 1: OpenSSL (Best)
openssl rand -base64 32

# Method 2: PowerShell (Windows)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Method 3: Online (Use trusted sites only)
# https://passwordsgenerator.net/
```

### Password Checklist:

```
✅ Minimum 12 characters (better: 16+)
✅ Uppercase letters (A-Z)
✅ Lowercase letters (a-z)
✅ Numbers (0-9)
✅ Special characters (!@#$%^&*)
✅ Not in common password list
✅ Different for each service
✅ Changed every 90 days
```

### Daily Check:
```bash
# Check password strength
# Use: https://www.passwordmonster.com/

# Rotate passwords quarterly
# Set reminder: Every 3 months
```

---

## 🔄 Rule 3: Server Updates Regular Rakho

### Daily Update Check:

```bash
# Backend (Java/Spring Boot)
cd bankend
mvn versions:display-dependency-updates

# Frontend (Node.js)
cd frontend
npm outdated

# ML Service (Python)
cd ml-service
pip list --outdated
```

### Weekly Updates:

```bash
# Update dependencies (every Monday)

# Backend
mvn clean install -U

# Frontend
npm update
npm audit fix

# ML Service
pip install --upgrade -r requirements.txt
```

### Security Updates (Immediate):

```bash
# Check for security vulnerabilities

# Backend
mvn org.owasp:dependency-check-maven:check

# Frontend
npm audit
npm audit fix --force  # If critical

# ML Service
pip-audit
```

### Monthly System Updates:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y

# CentOS/RHEL
sudo yum update -y

# Windows Server
# Use Windows Update
```

### Update Schedule:

```
Daily:    Check for updates
Weekly:   Apply non-critical updates
Monthly:  Full system update
Critical: Apply immediately (within 24 hours)
```

---

## 📊 Rule 4: Logs Monitor Karo

### Daily Log Check (10 minutes):

```bash
# Backend logs
tail -f logs/application.log | grep -i "error\|exception\|security"

# Check for security events
grep "SECURITY_EVENT" logs/application.log | tail -20

# Check for failed logins
grep "LOGIN_FAILURE" logs/application.log | tail -20

# Check for blocked IPs
grep "IP blocked" logs/application.log | tail -20
```

### What to Look For:

```
🚨 RED FLAGS (Immediate Action):
- Multiple failed login attempts
- SQL injection attempts
- XSS attack attempts
- Unusual traffic patterns
- New IP addresses with high activity
- Error rate spike
- Database connection errors

🟡 YELLOW FLAGS (Monitor):
- Slow response times
- Memory usage high
- Disk space low
- Unusual user behavior
```

### Automated Monitoring Setup:

```bash
# Create monitoring script
cat > monitor.sh << 'EOF'
#!/bin/bash

# Check for security events in last hour
SECURITY_EVENTS=$(grep "SECURITY_EVENT" logs/application.log | grep "$(date -d '1 hour ago' '+%Y-%m-%d %H')" | wc -l)

if [ $SECURITY_EVENTS -gt 10 ]; then
    echo "⚠️ High security events: $SECURITY_EVENTS in last hour"
    # Send alert (email/SMS)
fi

# Check for failed logins
FAILED_LOGINS=$(grep "LOGIN_FAILURE" logs/application.log | grep "$(date '+%Y-%m-%d')" | wc -l)

if [ $FAILED_LOGINS -gt 50 ]; then
    echo "🚨 High failed logins: $FAILED_LOGINS today"
    # Send alert
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

if [ $DISK_USAGE -gt 80 ]; then
    echo "⚠️ Disk usage high: ${DISK_USAGE}%"
    # Send alert
fi
EOF

chmod +x monitor.sh

# Run every hour
crontab -e
# Add: 0 * * * * /path/to/monitor.sh
```

### Daily Monitoring Checklist:

```
Morning (9 AM):
✅ Check overnight logs
✅ Review security events
✅ Check system health

Afternoon (3 PM):
✅ Quick log scan
✅ Check error rates

Evening (6 PM):
✅ Review day's activity
✅ Check for anomalies
```

---

## 💾 Rule 5: Backup Daily Rakho

### Automated Daily Backup:

```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# 1. Database Backup
echo "📦 Backing up database..."
pg_dump -U postgres wealthdb | gzip > $BACKUP_DIR/db_$DATE.sql.gz

# 2. Application Files
echo "📦 Backing up application..."
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /path/to/app

# 3. Configuration Files
echo "📦 Backing up configs..."
tar -czf $BACKUP_DIR/config_$DATE.tar.gz \
    /path/to/.env \
    /path/to/application.properties

# 4. Encrypt Backup
echo "🔐 Encrypting backup..."
gpg --encrypt --recipient admin@yourcompany.com \
    $BACKUP_DIR/db_$DATE.sql.gz

# 5. Upload to Cloud (AWS S3)
echo "☁️ Uploading to cloud..."
aws s3 cp $BACKUP_DIR/db_$DATE.sql.gz.gpg \
    s3://your-backup-bucket/daily/

# 6. Delete old backups (keep 30 days)
echo "🗑️ Cleaning old backups..."
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "✅ Backup completed: $DATE"
EOF

chmod +x backup.sh

# Schedule daily backup (2 AM)
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

### Backup Verification:

```bash
# Test restore monthly
# Create test script
cat > test_restore.sh << 'EOF'
#!/bin/bash

echo "🧪 Testing backup restore..."

# 1. Get latest backup
LATEST_BACKUP=$(ls -t /backups/db_*.sql.gz | head -1)

# 2. Create test database
createdb test_restore

# 3. Restore backup
gunzip -c $LATEST_BACKUP | psql -U postgres test_restore

# 4. Verify data
psql -U postgres test_restore -c "SELECT COUNT(*) FROM users;"

# 5. Cleanup
dropdb test_restore

echo "✅ Restore test completed"
EOF

chmod +x test_restore.sh

# Run monthly
crontab -e
# Add: 0 3 1 * * /path/to/test_restore.sh
```

### Backup Checklist:

```
Daily:
✅ Database backup (automated)
✅ Application files backup
✅ Configuration backup
✅ Verify backup completed

Weekly:
✅ Test restore process
✅ Check backup size
✅ Verify cloud upload

Monthly:
✅ Full restore test
✅ Review backup retention
✅ Update backup script
```

### 3-2-1 Backup Rule:

```
3 copies of data:
  - Original
  - Local backup
  - Cloud backup

2 different media:
  - Hard disk
  - Cloud storage

1 offsite copy:
  - AWS S3 / Google Cloud
```

---

## 👥 Rule 6: Admin Access Limited Rakho

### Current Admin Users Audit:

```bash
# Check who has admin access
# Database
psql -U postgres -c "SELECT usename, usesuper FROM pg_user;"

# Application
# Check users with ADMIN role
psql -U postgres wealthdb -c "SELECT email, role FROM users WHERE role = 'ADMIN';"

# Server
# Check sudo users
grep -Po '^sudo.+:\K.*$' /etc/group

# SSH access
cat /etc/ssh/sshd_config | grep "AllowUsers"
```

### Limit Admin Access:

```bash
# 1. Remove unnecessary admin users
# Database
psql -U postgres -c "ALTER USER oldadmin NOSUPERUSER;"

# Application
# Update in database
UPDATE users SET role = 'USER' WHERE email = 'oldadmin@example.com';

# 2. Implement least privilege
# Create read-only user
CREATE USER readonly WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE wealthdb TO readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;

# 3. Use separate accounts
# Don't use root/admin for daily tasks
# Create personal accounts with sudo only when needed
```

### Admin Access Policy:

```
✅ Principle of Least Privilege:
   - Give minimum required permissions
   - No permanent admin access
   - Use sudo only when needed

✅ Separate Accounts:
   - Personal account for daily work
   - Admin account only for admin tasks
   - No shared accounts

✅ MFA for Admin:
   - Mandatory 2FA for all admins
   - Hardware keys preferred
   - SMS as backup

✅ Access Review:
   - Monthly review of admin users
   - Remove inactive accounts
   - Audit admin actions

✅ Logging:
   - Log all admin actions
   - Monitor sudo usage
   - Alert on suspicious activity
```

### Admin Access Checklist:

```
Daily:
✅ Review admin login attempts
✅ Check sudo usage logs

Weekly:
✅ Review admin user list
✅ Check for unauthorized access

Monthly:
✅ Full admin access audit
✅ Remove inactive accounts
✅ Update access policies
```

---

## 📋 Complete Daily Checklist

### Morning Routine (15 minutes):

```
☐ Check overnight logs
☐ Review security events
☐ Verify backup completed
☐ Check system health (CPU, memory, disk)
☐ Review failed login attempts
```

### Afternoon Check (5 minutes):

```
☐ Quick log scan
☐ Check error rates
☐ Monitor active users
```

### Evening Review (10 minutes):

```
☐ Review day's security events
☐ Check for anomalies
☐ Verify all systems running
☐ Plan tomorrow's updates
```

### Weekly Tasks (30 minutes):

```
☐ Update dependencies
☐ Test backup restore
☐ Review admin access
☐ Check for security updates
☐ Review monitoring alerts
```

### Monthly Tasks (2 hours):

```
☐ Full system update
☐ Complete backup test
☐ Admin access audit
☐ Security policy review
☐ Update documentation
```

---

## 🚨 Emergency Response

### If Something Goes Wrong:

```
1. DON'T PANIC! 🧘

2. Assess the situation:
   - What happened?
   - When did it happen?
   - Who is affected?

3. Immediate actions:
   - Block suspicious IPs
   - Revoke compromised credentials
   - Enable maintenance mode if needed

4. Investigate:
   - Check logs
   - Identify attack vector
   - Document everything

5. Fix:
   - Patch vulnerability
   - Restore from backup if needed
   - Update security measures

6. Communicate:
   - Notify affected users
   - Update team
   - Document incident

7. Learn:
   - Post-mortem analysis
   - Update procedures
   - Improve security
```

---

## ✅ Final Checklist Summary

### 6 Golden Rules:

```
1. ✅ Secrets kabhi GitHub par upload mat karo
   - Use .gitignore
   - Use .env.example
   - Rotate if exposed

2. ✅ Strong passwords use karo
   - 16+ characters
   - Mix of all types
   - Different for each service

3. ✅ Server updates regular rakho
   - Daily: Check updates
   - Weekly: Apply updates
   - Critical: Immediate

4. ✅ Logs monitor karo
   - Morning: Review overnight
   - Afternoon: Quick check
   - Evening: Day review

5. ✅ Backup daily rakho
   - Automated daily backup
   - Weekly restore test
   - 3-2-1 rule

6. ✅ Admin access limited rakho
   - Least privilege
   - Separate accounts
   - Monthly audit
```

---

## 🎉 Follow Karo, Tension Khatam!

**Ye 6 rules follow karo:**
- ✅ 90% security problems solve
- ✅ Sleep peacefully
- ✅ No major incidents
- ✅ Users ka data safe
- ✅ Business secure

**Time investment:**
- Daily: 30 minutes
- Weekly: 30 minutes
- Monthly: 2 hours

**Result:**
- 🛡️ Strong security
- 😴 Peaceful sleep
- 💰 No data breaches
- ✅ Happy users

---

**Bas ye 6 rules follow karo - baaki sab automatic!** 🚀

**Security = Discipline, not rocket science!** 💡
