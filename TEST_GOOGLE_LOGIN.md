# 🧪 Google Login Testing Guide

## Quick Test Checklist

### ✅ Pre-Test Verification

1. **Backend Running?**
   ```bash
   # Check if backend is running on port 8080
   curl http://localhost:8080/api/auth/google
   ```

2. **Frontend Running?**
   ```bash
   # Check if frontend is running on port 3000
   curl http://localhost:3000
   ```

3. **Environment Variables Set?**
   - [ ] `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
   - [ ] `NEXT_PUBLIC_API_URL` is set
   - [ ] `NEXT_PUBLIC_API_TIMEOUT=60000`

### 🧪 Test Cases

#### Test 1: Google Login with New User
**Steps:**
1. Open http://localhost:3000/auth/login
2. Click "Continue with Google"
3. Select a Gmail account that has NEVER logged in before
4. Verify:
   - [ ] Google popup opens
   - [ ] User can select account
   - [ ] Redirects to /dashboard
   - [ ] User data is saved in database

**Expected Result:** ✅ New user created, logged in successfully

---

#### Test 2: Google Login with Existing User
**Steps:**
1. Open http://localhost:3000/auth/login
2. Click "Continue with Google"
3. Select a Gmail account that has logged in before
4. Verify:
   - [ ] Google popup opens
   - [ ] User can select account
   - [ ] Redirects to /dashboard
   - [ ] Existing user data loaded

**Expected Result:** ✅ Existing user logged in successfully

---

#### Test 3: Timeout Handling (Cold Start)
**Steps:**
1. Stop backend
2. Start backend (cold start simulation)
3. Immediately try Google login
4. Verify:
   - [ ] Shows "Server is warming up..." message
   - [ ] Waits up to 60 seconds
   - [ ] Eventually succeeds or shows clear error

**Expected Result:** ✅ Graceful handling of cold start

---

#### Test 4: Multiple Gmail Accounts
**Steps:**
1. Login with gmail1@gmail.com
2. Logout
3. Login with gmail2@gmail.com
4. Logout
5. Login with gmail3@gmail.com
6. Verify:
   - [ ] All 3 accounts can login
   - [ ] No domain restrictions
   - [ ] Each gets their own data

**Expected Result:** ✅ All Gmail accounts work

---

#### Test 5: Error Handling
**Steps:**
1. Stop backend completely
2. Try Google login
3. Verify:
   - [ ] Shows network error
   - [ ] Shows "Server is warming up..." message
   - [ ] Doesn't crash frontend

**Expected Result:** ✅ Graceful error handling

---

## 🔍 Debugging

### Check Backend Logs
```bash
# Look for these log messages:
# "Google login for: user@gmail.com"
# "Creating new user from Google login: user@gmail.com"
```

### Check Frontend Console
```javascript
// Should see:
// "GSI Init Error:" (if Google SDK fails)
// "Google login error:" (if backend fails)
```

### Check Database
```sql
-- Verify user was created
SELECT * FROM users WHERE email = 'your-test-email@gmail.com';

-- Check user role
SELECT email, role, is_active FROM users;
```

### Check Network Tab
1. Open DevTools → Network
2. Try Google login
3. Look for:
   - `POST /api/auth/google` (should be 200 OK)
   - Response should have `token`, `user`, `mfaRequired: false`

## 🚨 Common Issues

### Issue: "Google Sign-In failed to load"
**Cause:** Google SDK not loaded  
**Fix:** 
- Check internet connection
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
- Refresh page

### Issue: "Request timed out"
**Cause:** Backend cold start  
**Fix:** 
- Wait 60 seconds
- Try again
- Check backend is running

### Issue: "Invalid Google token"
**Cause:** Token verification failed  
**Fix:**
- Check backend can reach `https://oauth2.googleapis.com/tokeninfo`
- Verify Google Client ID is correct
- Check user's email is verified on Google

### Issue: "Network error"
**Cause:** Backend not running  
**Fix:**
- Start backend: `cd bankend && mvn spring-boot:run`
- Check port 8080 is not blocked

## ✅ Success Criteria

All tests should pass with:
- ✅ Any Gmail user can login
- ✅ No domain restrictions
- ✅ Auto account creation
- ✅ Proper error handling
- ✅ 60 second timeout
- ✅ Clear error messages

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

Test 1 (New User):        [ ] Pass  [ ] Fail
Test 2 (Existing User):   [ ] Pass  [ ] Fail
Test 3 (Timeout):         [ ] Pass  [ ] Fail
Test 4 (Multiple Accounts): [ ] Pass  [ ] Fail
Test 5 (Error Handling):  [ ] Pass  [ ] Fail

Notes:
_________________________________
_________________________________
_________________________________
```
