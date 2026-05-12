# 🌐 Vercel Domain Setup - www.bharataiwealth.com

## ✅ Code Update Done:
- ✅ `vercel.json` updated with domain aliases
- ✅ Pushed to GitHub (commit: `bc16493`)
- ✅ Vercel will auto-deploy

---

## 🔧 Vercel Dashboard Setup (Manual):

### Step 1: Go to Vercel Domains Settings
**Open this link:**
```
https://vercel.com/ankitraj147101-6438s-projects/frontend/settings/domains
```

---

### Step 2: Add Custom Domain

1. **Click "Add" button** (or "Add Domain")
2. **Enter domain:**
   ```
   www.bharataiwealth.com
   ```
3. **Click "Add"**

---

### Step 3: Verify Domain Ownership

Vercel will show you DNS records to add. You should see:

**Type:** `CNAME`
**Name:** `www`
**Value:** Something like `cname.vercel-dns.com`

---

### Step 4: Check Current DNS

Aapka DNS already configured hai:
- ✅ **Record:** `www.bharataiwealth.com`
- ✅ **Type:** `CNAME`
- ✅ **Value:** `d98b76c307e19120.vercel-dns-017.com`

Agar Vercel different value dikha raha hai, toh:
1. Apne domain provider (GoDaddy/Namecheap/etc.) mein jao
2. DNS settings mein jao
3. `www` CNAME record ko update karo with new value

---

### Step 5: Add Root Domain (Optional)

Agar aap `bharataiwealth.com` (without www) bhi add karna chahte ho:

1. **Click "Add" again**
2. **Enter:**
   ```
   bharataiwealth.com
   ```
3. **Click "Add"**
4. Vercel will show you `A` record to add in DNS

---

## 🎯 Expected Result:

After adding domain in Vercel:
- ✅ `www.bharataiwealth.com` → Your Vercel app
- ✅ `bharataiwealth.com` → Redirects to www (optional)
- ✅ SSL certificate auto-generated
- ✅ HTTPS enabled

---

## ⏱️ Propagation Time:

- **Vercel setup:** Instant
- **DNS propagation:** 5-30 minutes
- **SSL certificate:** 1-5 minutes after DNS

---

## 🧪 Test Domain:

After setup, test:

1. **Open:** https://www.bharataiwealth.com
2. **Should load:** Your frontend
3. **Check SSL:** Green padlock in browser
4. **Test login:** Google OAuth should work

---

## 🐛 Troubleshooting:

### Domain not working
- Wait 15-30 minutes for DNS propagation
- Clear browser cache
- Try incognito mode
- Check DNS with: `nslookup www.bharataiwealth.com`

### SSL certificate error
- Wait 5 minutes for Vercel to generate certificate
- Make sure DNS is pointing to Vercel
- Check Vercel dashboard for certificate status

### "Domain already in use"
- Domain might be added to another Vercel project
- Remove from old project first
- Or transfer ownership

---

## 📋 Quick Checklist:

- [ ] Code pushed to GitHub (✅ Done)
- [ ] Vercel auto-deployed (wait 2 minutes)
- [ ] Go to Vercel Domains settings
- [ ] Click "Add" button
- [ ] Enter: www.bharataiwealth.com
- [ ] Verify DNS records match
- [ ] Wait for SSL certificate
- [ ] Test: https://www.bharataiwealth.com
- [ ] Test Google login

---

## 🚀 Current Status:

- ✅ **Code:** Domain aliases added to vercel.json
- ✅ **GitHub:** Pushed (commit bc16493)
- ⏳ **Vercel:** Auto-deploying (2 minutes)
- ⏳ **Manual:** Add domain in Vercel dashboard
- ⏳ **DNS:** Already configured (should work)
- ⏳ **SSL:** Will auto-generate

---

## 🎯 Next Steps:

1. **Wait 2 minutes** for Vercel auto-deploy
2. **Go to:** https://vercel.com/ankitraj147101-6438s-projects/frontend/settings/domains
3. **Click "Add"**
4. **Enter:** www.bharataiwealth.com
5. **Verify DNS** matches
6. **Wait 5 minutes** for SSL
7. **Test:** https://www.bharataiwealth.com

---

**Domain configuration code is ready! Just add it in Vercel dashboard now.** 🌐
