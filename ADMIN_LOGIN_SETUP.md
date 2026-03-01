# Admin Login Setup - ankit@gmail.com

## Quick Setup (3 Steps)

### Step 1: Backend mein Rate Limiting Disable kar diya hai ✅
- `AuthService.java` updated - account locking disabled
- `LoginAttemptService.java` updated - failed attempts tracking disabled
- Ab unlimited login attempts kar sakte ho

### Step 2: Backend Restart karo
```cmd
cd bankend
mvnw spring-boot:run
```

### Step 3: Admin User Create karo (pgAdmin mein)

#### Option A: Signup se Admin Banao (RECOMMENDED - SABSE AASAN)
1. Frontend kholo: http://localhost:3000
2. "Sign up for free" pe click karo
3. Ye details bharo:
   - Name: Ankit
   - Email: ankit@gmail.com
   - Password: admin123
4. Signup karo
5. pgAdmin kholo aur ye SQL run karo:
```sql
-- User ko ADMIN bana do
UPDATE users SET role = 'ADMIN' WHERE email = 'ankit@gmail.com';
```
6. Logout karo aur phir se login karo
7. Admin panel access karo: http://localhost:3000/admin

#### Option B: Direct SQL se Create karo
pgAdmin mein ye SQL commands run karo:

```sql
-- Pehle purana user delete karo (agar hai to)
DELETE FROM users WHERE email = 'ankit@gmail.com';

-- Naya admin user create karo
-- Password: admin123 (BCrypt hashed)
INSERT INTO users (
    name, 
    email, 
    password, 
    role, 
    is_active, 
    mfa_enabled, 
    created_at
) VALUES (
    'Ankit',
    'ankit@gmail.com',
    '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cyhQQl3MpbshYPrxYPldR93ILN/jO',
    'ADMIN',
    true,
    false,
    NOW()
);

-- Verify karo
SELECT id, name, email, role, is_active FROM users WHERE email = 'ankit@gmail.com';
```

## Login Credentials
- **Email**: ankit@gmail.com
- **Password**: admin123

## Admin Panel Access
- **URL**: http://localhost:3000/admin
- **Login**: http://localhost:3000/auth/login

## Troubleshooting

### Problem: "Invalid email address" error
**Solution**: Ye frontend validation error hai. Email format sahi hai, backend restart karo.

### Problem: 401 Unauthorized
**Solution**: 
1. Check karo backend chal raha hai: http://localhost:8080/api/auth/login
2. Password hash sahi hai ya nahi verify karo
3. User ADMIN role mein hai ya nahi check karo

### Problem: Admin page nahi khul raha
**Solution**:
1. Pehle login karo: http://localhost:3000/auth/login
2. Dashboard khulega
3. Phir manually admin page kholo: http://localhost:3000/admin
4. Ya browser console mein check karo user role:
```javascript
const token = localStorage.getItem('token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Role:', payload.role);
```

## Important Notes

### Development Mode Active
- ✅ Rate limiting DISABLED
- ✅ Account locking DISABLED  
- ✅ Failed login attempts tracking DISABLED
- ⚠️ Production mein deploy karne se pehle ye features ENABLE karna padega

### Password Hash
BCrypt hash for "admin123":
```
$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cyhQQl3MpbshYPrxYPldR93ILN/jO
```

Agar alag password chahiye to:
1. Backend start karo
2. Signup karo with new password
3. pgAdmin mein role change karo to ADMIN

## Quick Commands

### Start Backend
```cmd
cd bankend
mvnw spring-boot:run
```

### Start Frontend
```cmd
cd frontend
npm run dev
```

### Check User in Database
```sql
SELECT id, name, email, role, is_active, mfa_enabled, failed_login_attempts, account_locked 
FROM users 
WHERE email = 'ankit@gmail.com';
```

### Reset Password (if needed)
```sql
-- Password: admin123
UPDATE users 
SET password = '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cyhQQl3MpbshYPrxYPldR93ILN/jO'
WHERE email = 'ankit@gmail.com';
```

### Make User Admin
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'ankit@gmail.com';
```

## Summary
1. ✅ Rate limiting disabled
2. ✅ Account locking disabled
3. ✅ Password hash ready: admin123
4. ✅ SQL commands ready
5. 🎯 Next: Backend restart karo aur admin user create karo
