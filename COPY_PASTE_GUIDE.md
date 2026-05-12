# 📋 Copy-Paste Guide - Google OAuth Setup

## 🎯 Your Client ID (Already Created):
```
1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com
```

---

## 1️⃣ GOOGLE CONSOLE - Add URLs

### Open This Link:
```
https://console.cloud.google.com/apis/credentials
```

### Click on: "Bharat AI Wealth Web 01"
### Click: "Edit" button

---

### Copy-Paste These URLs (One by One):

#### For "Authorized JavaScript origins":
Click "+ Add URI" and paste each URL:

```
https://bharataiwealth.com
```

```
https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
```

```
https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
```

```
https://frontend-three-gamma-64.vercel.app
```

---

#### For "Authorized redirect URIs":
Click "+ Add URI" and paste each URL:

```
https://bharataiwealth.com
```

```
https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
```

```
https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
```

```
https://frontend-three-gamma-64.vercel.app
```

### ⚠️ Click "SAVE" at the bottom!

---

## 2️⃣ VERCEL - Add Environment Variables

### Open This Link:
```
https://vercel.com/ankitraj147101-6438s-projects/frontend/settings/environment-variables
```

---

### Variable 1: Google Client ID

Click "Add New" and fill:

**Name:**
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID
```

**Value:**
```
1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com
```

**Environments:** ✅ Production ✅ Preview ✅ Development

Click "Save"

---

### Variable 2: Backend URL

Click "Add New" and fill:

**Name:**
```
NEXT_PUBLIC_API_URL
```

**Value:**
```
https://bharat-wealth-backend.onrender.com
```

**Environments:** ✅ Production ✅ Preview ✅ Development

Click "Save"

---

### Variable 3: API Timeout

Click "Add New" and fill:

**Name:**
```
NEXT_PUBLIC_API_TIMEOUT
```

**Value:**
```
60000
```

**Environments:** ✅ Production ✅ Preview ✅ Development

Click "Save"

---

### Variable 4: Disable MFA

Click "Add New" and fill:

**Name:**
```
NEXT_PUBLIC_ENABLE_MFA
```

**Value:**
```
false
```

**Environments:** ✅ Production ✅ Preview ✅ Development

Click "Save"

---

## 3️⃣ REDEPLOY VERCEL

### Open This Link:
```
https://vercel.com/ankitraj147101-6438s-projects/frontend
```

1. Click on latest deployment
2. Click "Redeploy" button
3. Select "Use existing Build Cache"
4. Click "Redeploy"

---

## 4️⃣ TEST (After 5 Minutes)

### Open This Link in Incognito:
```
https://www.bharataiwealth.com/auth/login
```

1. Click "Continue with Google"
2. Select any Gmail account
3. ✅ Should redirect to dashboard!

---

## ✅ Checklist:

- [ ] Added 4 URLs to Google OAuth "Authorized JavaScript origins"
- [ ] Added 4 URLs to Google OAuth "Authorized redirect URIs"
- [ ] Clicked SAVE in Google Console
- [ ] Added Variable 1: NEXT_PUBLIC_GOOGLE_CLIENT_ID
- [ ] Added Variable 2: NEXT_PUBLIC_API_URL
- [ ] Added Variable 3: NEXT_PUBLIC_API_TIMEOUT
- [ ] Added Variable 4: NEXT_PUBLIC_ENABLE_MFA
- [ ] Checked all 3 environments for each variable
- [ ] Clicked "Redeploy" in Vercel
- [ ] Waited 5 minutes
- [ ] Tested in incognito mode

---

## 🎊 Done!

After completing all steps, Google login will work for ANY Gmail user on:
- ✅ www.bharataiwealth.com
- ✅ All Vercel deployment URLs
- ✅ localhost:3000

**Total Time: ~15 minutes**
