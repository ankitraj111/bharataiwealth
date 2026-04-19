# 🚀 Vercel Deployment Guide - Bharat AI Wealth

This guide will help you deploy the frontend of the Bharat AI Wealth platform to Vercel.

## 📋 Prerequisites

1.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
2.  **GitHub Repository**: Ensure your code is pushed to a GitHub repository.
3.  **Backend Live**: Ensure your backend is running on Render (as per your implementation).

## 🛠️ Step 1: Connect your Repository to Vercel

1.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Ensure you are in the **"ankitraj147101-6438's projects"** team scope.
3.  Click **"Add New..."** → **"Project"**.
4.  Connect your GitHub account and select the **`bharat-ai-wealth-ui`** repository.

## ⚙️ Step 2: Configure Project Settings

When the "Import Project" screen appears, follow these settings:

- **Team/Scope**: `ankitraj147101-6438's projects` (Team ID: `team_giIQKCmLrHzKR5EzoL4w3rwC`)
- **Framework Preset**: Select **Next.js**.
2.  **Root Directory**: Click "Edit" and select the **`frontend`** folder.
3.  **Build and Output Settings**: 
    - Build Command: `npm run build`
    - Output Directory: `.next`
    - (These should be automatically detected because of the `vercel.json` I added).

## 🔐 Step 3: Add Environment Variables

This is the most important step for the app to function. Expand the **"Environment Variables"** section and add the following:

| Key | Value |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `https://bharat-wealth-backend.onrender.com` |
| `NEXT_PUBLIC_ML_SERVICE_URL` | `https://bharat-wealth-ml.onrender.com` |
| `NEXT_PUBLIC_ENABLE_MFA` | `false` |

## 🚀 Step 4: Deploy

1.  Click **"Deploy"**.
2.  Vercel will build your project. Once finished, you will get a production URL (e.g., `bharat-ai-wealth.vercel.app`).

---

## 🔍 Troubleshooting

- **Build Fails?**: I have verified the build locally and it is working. Ensure you selected the `frontend` folder as the Root Directory.
- **API Errors?**: Double-check the `NEXT_PUBLIC_API_URL`. It must point to your live Backend on Render.
- **Images not loading?**: The app is configured with `unoptimized: true` for images, which works perfectly with Vercel.

---

**Architecture Note**: Your app now correctly handles both GitHub Pages (as fallback) and Vercel (recommended) through the `next.config.mjs` logic.
