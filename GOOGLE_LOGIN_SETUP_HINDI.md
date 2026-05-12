# 🎯 Google Login Setup - हिंदी गाइड

## ✅ क्या हो गया है:
- ✅ नया OAuth Client ID बना लिया: `1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com`
- ✅ Code में नया Client ID डाल दिया
- ✅ Google Console में 2 URLs add हो गए

---

## 🔴 अब ये करना है (बहुत जरूरी):

### Step 1: Google Console में बाकी URLs Add करो

1. **यहाँ जाओ**: https://console.cloud.google.com/apis/credentials
2. **"Bharat AI Wealth Web 01"** पर click करो
3. **"Edit"** button दबाओ

### Step 2: "Authorized JavaScript origins" में ये URLs add करो

**अभी ये हैं:**
- ✅ `https://www.bharataiwealth.com`
- ✅ `http://localhost:3000`

**ये ADD करो (हर एक के लिए "+ Add URI" दबाओ):**
```
https://bharataiwealth.com
https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
https://frontend-three-gamma-64.vercel.app
```

### Step 3: "Authorized redirect URIs" में भी same URLs add करो

**ये ADD करो:**
```
https://bharataiwealth.com
https://bharataiwealth-a5daw0yb0-ankitraj147101-6438s-projects.vercel.app
https://frontend-nc9m7r6el-ankitraj147101-6438s-projects.vercel.app
https://frontend-three-gamma-64.vercel.app
```

### Step 4: SAVE करो
**नीचे "SAVE" button दबाओ!** ⚠️ ये मत भूलना!

---

## 🚀 Vercel में Environment Variables Add करो

### Vercel Dashboard खोलो:
https://vercel.com/ankitraj147101-6438s-projects/frontend/settings/environment-variables

### ये 4 Variables Add करो:

हर एक के लिए **"Add New"** दबाओ:

#### 1. Google Client ID
- **Key**: `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- **Value**: `1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com`
- **Environment**: ✅ Production ✅ Preview ✅ Development (तीनों check करो!)

#### 2. Backend URL
- **Key**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://bharat-wealth-backend.onrender.com`
- **Environment**: ✅ Production ✅ Preview ✅ Development

#### 3. Timeout
- **Key**: `NEXT_PUBLIC_API_TIMEOUT`
- **Value**: `60000`
- **Environment**: ✅ Production ✅ Preview ✅ Development

#### 4. MFA Disable
- **Key**: `NEXT_PUBLIC_ENABLE_MFA`
- **Value**: `false`
- **Environment**: ✅ Production ✅ Preview ✅ Development

**जरूरी**: हर variable के लिए तीनों environment checkboxes check करो!

---

## 🔄 Vercel Redeploy करो

Environment variables add करने के बाद:

1. यहाँ जाओ: https://vercel.com/ankitraj147101-6438s-projects/frontend
2. Latest deployment पर click करो
3. **"Redeploy"** button दबाओ
4. **"Use existing Build Cache"** select करो
5. **"Redeploy"** दबाओ

---

## 🧪 Google Login Test करो

**5 मिनट wait करो**, फिर:

1. **Browser cache clear करो**: Ctrl + Shift + Delete
2. **Incognito window खोलो**: Ctrl + Shift + N
3. **यहाँ जाओ**: https://www.bharataiwealth.com/auth/login
4. **"Continue with Google" दबाओ**
5. **कोई भी Gmail account select करो**
6. **Result**: ✅ Dashboard पर redirect होना चाहिए

---

## 📋 Checklist:

- [ ] Google OAuth में 4 Vercel URLs add किए "Authorized JavaScript origins" में
- [ ] Google OAuth में 4 Vercel URLs add किए "Authorized redirect URIs" में
- [ ] Google Console में SAVE दबाया
- [ ] Vercel में 4 environment variables add किए
- [ ] हर variable के लिए तीनों environments select किए
- [ ] Vercel redeploy किया
- [ ] 5 मिनट wait किया
- [ ] Browser cache clear किया
- [ ] Incognito mode में test किया

---

## 🐛 अगर फिर भी काम नहीं करे:

### Error: "Access blocked: Authorization Error"
**Solution**: 
- Check करो सभी URLs Google OAuth में add हैं
- Google Console में SAVE दबाया था?
- 5 मिनट और wait करो
- दूसरा browser try करो

### Error: "origin_mismatch"
**Solution**:
- जिस URL से access कर रहे हो वो Google OAuth में नहीं है
- वो URL add करो origins और redirect URIs दोनों में
- SAVE दबाओ

### Error: "deleted_client" या "invalid_client"
**Solution**:
- Client ID गलत है
- Vercel में check करो Client ID match करता है: `1075300655845-fdjafsmfjgfe8tmdbc4f3ukr403d91.apps.googleusercontent.com`

---

## 🎊 Success कैसे पता चलेगा:

जब सब ठीक होगा:
1. ✅ "Continue with Google" दबाओगे
2. ✅ Google popup खुलेगा
3. ✅ Gmail account select करोगे
4. ✅ Popup बंद होगा
5. ✅ Dashboard पर redirect होगा
6. ✅ User login हो जाएगा
7. ✅ Console में कोई error नहीं

---

## ⏱️ कितना समय लगेगा:

1. ⏳ Google OAuth में URLs add करो (5 मिनट)
2. ⏳ Vercel में variables add करो (5 मिनट)
3. ⏳ Redeploy करो (2 मिनट)
4. ⏳ Deployment wait करो (5 मिनट)
5. ✅ Test करो

**Total**: ~20 मिनट

---

## 🎯 Important URLs:

### Google Console:
https://console.cloud.google.com/apis/credentials

### Vercel Dashboard:
https://vercel.com/ankitraj147101-6438s-projects/frontend/settings/environment-variables

### Test URL:
https://www.bharataiwealth.com/auth/login

---

**Status**: 🟡 Manual configuration pending
**Next**: Google OAuth में URLs add करो, फिर Vercel में variables add करो

**ये दोनों steps complete करने के बाद Google login काम करने लगेगा!** 🚀
