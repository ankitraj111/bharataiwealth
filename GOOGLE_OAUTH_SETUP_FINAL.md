# 🎯 Google OAuth Setup - FINAL STEPS

## ✅ What's Done:
- ✅ New OAuth Client ID created: `1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com`
- ✅ Local `.env.local` updated with new Client ID
- ✅ Added to Google Console: `https://www.bharataiwealth.com` and `http://localhost:3000`

---

## 🔴 CRITICAL: Add Missing URLs to Google OAuth

You need to add **ALL Vercel deployment URLs** to your Google OAuth configuration.

### Step 1: Go to Google Cloud Console
1. Open: https://console.cloud.google.com/apis/credentials
2. Click on **"Bharat AI Wealth Web 01"** (your OAuth client)
3. Click **"Edit"** button

### Step 2: Add These URLs to "Authorized JavaScript origins"

**Currently you have:**
- ✅ `https://www.bharataiwealth.com`
- ✅ `http://localhost:3000`

**ADD THESE (click "+ Add URI" for each):**
```
https://bharataiwealth.com
https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
https://frontend-three-gamma-64.vercel.app
```

### Step 3: Add Same URLs to "Authorized redirect URIs"

**Currently you have:**
- ✅ `https://www.bharataiwealth.com`
- ✅ `http://localhost:3000`

**ADD THESE (click "+ Add URI" for each):**
```
https://bharataiwealth.com
https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
https://frontend-three-gamma-64.vercel.app
```

### Step 4: SAVE
**Click "SAVE" button at the bottom!** ⚠️ Don't forget this!

---

## 🚀 Configure Vercel Environment Variables

### Go to Vercel Dashboard:
https://vercel.com/ankitraj147101-6438s-projects/frontend/settings/environment-variables

### Add These Variables:

Click **"Add New"** for each:

#### 1. NEXT_PUBLIC_GOOGLE_CLIENT_ID
- **Key**: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- **Value**: `1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com`
- **Environment**: ✅ Production ✅ Preview ✅ Development

#### 2. NEXT_PUBLIC_API_URL
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://bharat-wealth-backend.onrender.com`
- **Environment**: ✅ Production ✅ Preview ✅ Development

#### 3. NEXT_PUBLIC_API_TIMEOUT
- **Key**: `NEXT_PUBLIC_API_TIMEOUT`
- **Value**: `60000`
- **Environment**: ✅ Production ✅ Preview ✅ Development

#### 4. NEXT_PUBLIC_ENABLE_MFA
- **Key**: `NEXT_PUBLIC_ENABLE_MFA`
- **Value**: `false`
- **Environment**: ✅ Production ✅ Preview ✅ Development

**Important**: Check all three environment checkboxes for each variable!

---

## 🔄 Trigger Vercel Redeploy

After adding environment variables:

### Option A - Automatic (Recommended):
1. Make any small change to code (add a comment)
2. Commit and push to GitHub
3. Vercel will auto-deploy

### Option B - Manual:
1. Go to: https://vercel.com/ankitraj147101-6438s-projects/frontend
2. Click on latest deployment
3. Click **"Redeploy"** button
4. Select **"Use existing Build Cache"**
5. Click **"Redeploy"**

---

## 🧪 Test Google Login

**Wait 5 minutes** after completing all steps above, then:

1. **Clear browser cache**: Ctrl + Shift + Delete
2. **Open incognito window**: Ctrl + Shift + N
3. **Visit**: https://www.bharataiwealth.com/auth/login
4. **Click**: "Continue with Google"
5. **Select**: Any Gmail account
6. **Expected**: ✅ Redirects to dashboard

---

## 📋 Quick Checklist:

- [ ] Added all 4 Vercel URLs to Google OAuth "Authorized JavaScript origins"
- [ ] Added all 4 Vercel URLs to Google OAuth "Authorized redirect URIs"
- [ ] Clicked SAVE in Google Console
- [ ] Added 4 environment variables to Vercel
- [ ] Selected all 3 environments (Production, Preview, Development) for each
- [ ] Triggered Vercel redeploy
- [ ] Waited 5 minutes
- [ ] Cleared browser cache
- [ ] Tested in incognito mode

---

## 🐛 If Google Login Still Fails:

### Error: "Access blocked: Authorization Error"
**Solution**: 
- Double-check all URLs are added to Google OAuth
- Make sure you clicked SAVE in Google Console
- Wait 5 more minutes for propagation
- Try different browser

### Error: "origin_mismatch"
**Solution**:
- The URL you're accessing is not in Google OAuth origins
- Add that specific URL to both origins and redirect URIs
- Click SAVE

### Error: "deleted_client" or "invalid_client"
**Solution**:
- Client ID is wrong
- Verify Client ID in Vercel matches: `1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com`

---

## 🎊 Success Criteria:

When everything works:
1. ✅ Click "Continue with Google"
2. ✅ Google popup opens
3. ✅ Select Gmail account
4. ✅ Popup closes
5. ✅ Redirects to dashboard
6. ✅ User is logged in
7. ✅ No errors in console

---

## 📸 Screenshot Reference:

Your current Google OAuth setup shows:
- **Client ID**: `1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com`
- **Name**: Bharat AI Wealth Web 01
- **Created**: May 12, 2026
- **Status**: ✅ Enabled

You just need to add the missing Vercel URLs!

---

**Next Steps:**
1. ⏳ Add Vercel URLs to Google OAuth (5 minutes)
2. ⏳ Add environment variables to Vercel (5 minutes)
3. ⏳ Trigger redeploy (2 minutes)
4. ⏳ Wait for deployment (5 minutes)
5. ✅ Test Google login

**Total Time**: ~20 minutes

**Status**: 🟡 Waiting for manual configuration
