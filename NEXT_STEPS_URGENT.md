# 🚨 URGENT: Complete These 2 Steps to Fix Google Login

## ✅ Already Done:
- ✅ New Google OAuth Client ID created
- ✅ Code updated with new Client ID
- ✅ Documentation created

---

## 🔴 DO THESE 2 THINGS NOW:

### 1️⃣ Add URLs to Google OAuth (5 minutes)

**Go to**: https://console.cloud.google.com/apis/credentials

**Click on**: "Bharat AI Wealth Web 01"

**Click**: "Edit" button

**In "Authorized JavaScript origins" section:**
- You already have: `https://www.bharataiwealth.com` and `http://localhost:3000`
- Click "+ Add URI" and add these 4 URLs (one by one):

```
https://bharataiwealth.com
https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
https://frontend-three-gamma-64.vercel.app
```

**In "Authorized redirect URIs" section:**
- Add the SAME 4 URLs (click "+ Add URI" for each):

```
https://bharataiwealth.com
https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
https://frontend-three-gamma-64.vercel.app
```

**Click "SAVE" at the bottom!** ⚠️

---

### 2️⃣ Add Environment Variables to Vercel (5 minutes)

**Go to**: https://vercel.com/ankitraj147101-6438s-projects/frontend/settings/environment-variables

**Add these 4 variables** (click "Add New" for each):

#### Variable 1:
- Name: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- Value: `1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com`
- Check: ✅ Production ✅ Preview ✅ Development
- Click "Save"

#### Variable 2:
- Name: `NEXT_PUBLIC_API_URL`
- Value: `https://bharat-wealth-backend.onrender.com`
- Check: ✅ Production ✅ Preview ✅ Development
- Click "Save"

#### Variable 3:
- Name: `NEXT_PUBLIC_API_TIMEOUT`
- Value: `60000`
- Check: ✅ Production ✅ Preview ✅ Development
- Click "Save"

#### Variable 4:
- Name: `NEXT_PUBLIC_ENABLE_MFA`
- Value: `false`
- Check: ✅ Production ✅ Preview ✅ Development
- Click "Save"

---

### 3️⃣ Redeploy Vercel (2 minutes)

**After adding all variables:**

1. Go to: https://vercel.com/ankitraj147101-6438s-projects/frontend
2. Click on the latest deployment
3. Click "Redeploy" button
4. Select "Use existing Build Cache"
5. Click "Redeploy"

---

### 4️⃣ Wait & Test (5 minutes)

**Wait 5 minutes**, then:

1. Clear browser cache (Ctrl + Shift + Delete)
2. Open incognito window (Ctrl + Shift + N)
3. Go to: https://www.bharataiwealth.com/auth/login
4. Click "Continue with Google"
5. Select any Gmail account
6. ✅ Should redirect to dashboard!

---

## 📋 Quick Checklist:

- [ ] Step 1: Added 4 URLs to Google OAuth origins
- [ ] Step 1: Added 4 URLs to Google OAuth redirect URIs
- [ ] Step 1: Clicked SAVE in Google Console
- [ ] Step 2: Added NEXT_PUBLIC_GOOGLE_CLIENT_ID to Vercel
- [ ] Step 2: Added NEXT_PUBLIC_API_URL to Vercel
- [ ] Step 2: Added NEXT_PUBLIC_API_TIMEOUT to Vercel
- [ ] Step 2: Added NEXT_PUBLIC_ENABLE_MFA to Vercel
- [ ] Step 2: Selected all 3 environments for each variable
- [ ] Step 3: Triggered Vercel redeploy
- [ ] Step 4: Waited 5 minutes
- [ ] Step 4: Tested Google login

---

## 🎯 Your New Client ID:

```
1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com
```

This is already in your local code. Just need to add to Vercel!

---

## 📸 What You Should See:

### In Google Console:
- **Authorized JavaScript origins**: 6 URLs total
- **Authorized redirect URIs**: 6 URLs total
- Status: ✅ Enabled

### In Vercel:
- 4 environment variables
- Each with 3 environments checked
- Status: ✅ Saved

### After Testing:
- Google popup opens
- Select Gmail account
- Redirects to dashboard
- User is logged in
- No errors

---

## ⏱️ Total Time: ~20 minutes

**Status**: 🟡 Waiting for you to complete Steps 1 & 2

**Once you complete these steps, Google login will work for ANY Gmail user!** 🚀

---

## 📞 Need Help?

If you get stuck:
1. Check the screenshot you sent - your OAuth client is correct
2. Make sure you click SAVE in Google Console
3. Make sure you check all 3 environments in Vercel
4. Wait full 5 minutes before testing
5. Use incognito mode for testing

**The setup is correct - just need to add the URLs and variables!**
