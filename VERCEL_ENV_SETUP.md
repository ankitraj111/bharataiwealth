# 🔧 Vercel Environment Variables Setup

## Step 1: Get Backend URL from Render

1. Go to Render Dashboard: https://dashboard.render.com
2. Click on **bharat-wealth-backend** service
3. Copy the URL (e.g., `https://bharat-wealth-backend.onrender.com`)

## Step 2: Update Vercel Environment Variables

1. Go to: https://vercel.com/ankitraj147101-6438s-projects/frontend/settings/environment-variables

2. Add these environment variables:

### Production Environment Variables:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://bharat-wealth-backend.onrender.com` | Production |
| `NEXT_PUBLIC_API_TIMEOUT` | `60000` | Production |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `1075300655845-jv31r0erhq0psjlrpf4mrh2389l7h7hg.apps.googleusercontent.com` | Production |
| `NEXT_PUBLIC_ENABLE_MFA` | `false` | Production |

## Step 3: Redeploy

After adding environment variables:
1. Go to Deployments tab
2. Click on latest deployment
3. Click "Redeploy" button
4. Wait for deployment to complete

## Step 4: Update Google OAuth

1. Go to: https://console.cloud.google.com/apis/credentials
2. Edit your OAuth 2.0 Client ID
3. Add Authorized JavaScript origins:
   ```
   https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
   https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
   https://www.bharataiwealth.com
   ```
4. Add Authorized redirect URIs:
   ```
   https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
   https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
   https://www.bharataiwealth.com
   ```
5. Click Save

## Step 5: Test

1. Wait 5 minutes for Google OAuth to propagate
2. Clear browser cache
3. Visit: https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app/auth/login
4. Click "Continue with Google"
5. Should work! ✅

## 🚨 Important Notes:

### Backend CORS Configuration:
Make sure your backend allows requests from Vercel domain. Check `application.properties`:

```properties
# Add to backend application.properties
cors.allowed-origins=https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app,https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app,https://www.bharataiwealth.com
```

### Database Connection:
Make sure backend can connect to PostgreSQL database on Render.

### ML Service:
If using ML service, add its URL too:
```
NEXT_PUBLIC_ML_SERVICE_URL=https://bharat-wealth-ml.onrender.com
```

## ✅ Verification Checklist:

- [ ] Backend URL copied from Render
- [ ] Environment variables added to Vercel
- [ ] Frontend redeployed
- [ ] Google OAuth origins updated
- [ ] Waited 5 minutes for propagation
- [ ] Browser cache cleared
- [ ] Tested Google login
- [ ] Backend CORS configured
- [ ] Database connected

## 🎯 Expected Result:

After completing all steps:
1. ✅ Frontend loads from Vercel
2. ✅ Backend API calls work
3. ✅ Google login works
4. ✅ User can access dashboard
5. ✅ Data loads from database

---

**Status**: ⏳ Pending Configuration
**Next Step**: Add environment variables to Vercel
