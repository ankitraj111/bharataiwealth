# Render Deployment Guide

Complete guide for deploying Bharat AI Wealth platform to Render.

## Prerequisites

- Render account (sign up at [render.com](https://render.com))
- GitHub repository connected to Render
- Project pushed to GitHub

## Quick Start

The project includes a `render.yaml` configuration file that automates the deployment setup.

### Step 1: Create New Blueprint

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository: `ankitraj111/bharataiwealth`
4. Render will automatically detect `render.yaml` and create:
   - PostgreSQL database: `bharat-wealth-db`
   - Backend service: `bharat-wealth-backend`
   - ML service: `bharat-wealth-ml`

### Step 2: Configure Environment Variables

The following environment variables are auto-configured via `render.yaml`:

**Backend Service:**
- ✅ `DATABASE_URL` - Auto-configured from database
- ✅ `DATABASE_USERNAME` - Auto-configured from database
- ✅ `DATABASE_PASSWORD` - Auto-configured from database
- ✅ `JWT_SECRET` - Auto-generated secure value
- ✅ `AUDIT_HMAC_KEY` - Auto-generated secure value
- ✅ `ML_SERVICE_URL` - Set to `https://bharat-wealth-ml.onrender.com`
- ✅ `SPRING_PROFILES_ACTIVE` - Set to `prod`

**ML Service:**
- ✅ `BACKEND_URL` - Set to `https://bharat-wealth-backend.onrender.com`
- ✅ `PYTHONUNBUFFERED` - Set to `1`

### Step 3: Deploy ML Models

**Option A: Commit Models to Repository (Recommended for Small Models)**

```bash
# If models are in .gitignore, remove them
git add ml-service/models/*.pkl ml-service/models/*.h5
git commit -m "Add ML models for deployment"
git push
```

**Option B: Use External Storage (Recommended for Large Models)**

1. Upload models to cloud storage (AWS S3, Google Cloud Storage, etc.)
2. Add download script to ML service Dockerfile:

```dockerfile
# Add after COPY . .
RUN curl -o models/low.pkl https://your-storage-url/low.pkl
RUN curl -o models/mid.pkl https://your-storage-url/mid.pkl
RUN curl -o models/high_lstm.h5 https://your-storage-url/high_lstm.h5
```

### Step 4: Verify Deployment

Once deployment completes, test the endpoints:

**Backend Health:**
```bash
curl https://bharat-wealth-backend.onrender.com/actuator/health
```

**ML Service Health:**
```bash
curl https://bharat-wealth-ml.onrender.com/health
```

**Market Data:**
```bash
curl https://bharat-wealth-ml.onrender.com/market/indices
```

## Service URLs

After deployment, your services will be available at:

- **Backend API**: `https://bharat-wealth-backend.onrender.com`
- **ML Service API**: `https://bharat-wealth-ml.onrender.com`
- **Database**: Internal connection (accessible by backend only)

## Environment Variables Reference

### Backend Required Variables

| Variable | Description | Source |
|----------|-------------|--------|
| `DATABASE_URL` | PostgreSQL connection string | Auto-configured |
| `DATABASE_USERNAME` | Database username | Auto-configured |
| `DATABASE_PASSWORD` | Database password | Auto-configured |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | Auto-generated |
| `AUDIT_HMAC_KEY` | HMAC key for audit logs | Auto-generated |
| `ML_SERVICE_URL` | ML service URL | Configured in render.yaml |

### ML Service Required Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BACKEND_URL` | Backend service URL | Configured in render.yaml |
| `PYTHONUNBUFFERED` | Python output buffering | 1 |

## Database Setup

The PostgreSQL database is automatically created by Render Blueprint with:
- **Database Name**: `wealthdb`
- **User**: `bharatuser`
- **Plan**: Starter (free tier)

Database migrations are run automatically on backend startup via Flyway.

## Updating Frontend Configuration

After deployment, update frontend environment variables:

**For Vercel/GitHub Pages:**

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://bharat-wealth-backend.onrender.com
NEXT_PUBLIC_ML_SERVICE_URL=https://bharat-wealth-ml.onrender.com
```

## Monitoring & Logs

### View Logs

1. Go to Render Dashboard
2. Select service (backend or ml-service)
3. Click **"Logs"** tab

### Check Service Status

Each service has a health check endpoint:
- Backend: `/actuator/health`
- ML Service: `/health`

## Troubleshooting

### Backend Won't Start

**Check logs for:**
- Database connection errors → Verify `DATABASE_URL` is set
- Flyway migration errors → Check migration scripts in `db/migration`
- Port binding errors → Ensure `server.port=8080` in application.properties

**Solution:**
```bash
# Check environment variables in Render dashboard
# Verify DATABASE_URL format: postgresql://user:password@host:port/database
```

### ML Service Won't Start

**Common Issues:**
- Missing model files → Verify models are in `ml-service/models/`
- Dependency installation timeout → Check requirements.txt versions
- Memory errors → Upgrade to larger Render plan

**Solution:**
```bash
# Check if models exist
ls ml-service/models/
# Should show: low.pkl, mid.pkl, high_lstm.h5
```

### CORS Errors

If frontend can't connect to backend:

1. Verify CORS origins in `application.properties`
2. Add your frontend domain:
```properties
cors.allowed-origins=...,https://your-frontend-domain.com
```
3. Redeploy backend service

### Database Migration Errors

If Flyway fails:

1. Check migration script syntax in `bankend/src/main/resources/db/migration/`
2. Check migration version numbers (must be sequential)
3. If needed, baseline the database:
```properties
spring.flyway.baseline-on-migrate=true
```

## Cost Optimization

**Free Tier Limits:**
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month free compute

**To Keep Services Active:**
- Upgrade to paid plan ($7/month per service)
- Services stay active 24/7
- Zero cold starts

**Alternative:**
- Use UptimeRobot or similar to ping health endpoints every 10 minutes

## Manual Deployment (Alternative)

If not using Blueprint, deploy manually:

### 1. Create PostgreSQL Database
```
New → PostgreSQL → Database Name: wealthdb
```

### 2. Create Backend Service
```
New → Web Service
- Name: bharat-wealth-backend
- Build Command: (auto-detected from Dockerfile)
- Docker Context: ./bankend
- Docker File: ./bankend/Dockerfile
```

### 3. Create ML Service
```
New → Web Service
- Name: bharat-wealth-ml
- Build Command: (auto-detected from Dockerfile)
- Docker Context: ./ml-service
- Docker File: ./ml-service/Dockerfile
```

### 4. Configure Environment Variables
Manually add all environment variables listed in the reference above.

## Security Best Practices

1. ✅ **JWT Secret**: Auto-generated (32+ characters)
2. ✅ **Database Password**: Auto-generated by Render
3. ✅ **CORS**: Restricted to specific origins
4. ⚠️ **API Keys**: If using external APIs, add them as environment variables (never commit to Git)

## Next Steps

1. ✅ Deploy to Render using Blueprint
2. ✅ Verify all health endpoints
3. ✅ Update frontend configuration
4. ✅ Test end-to-end flow
5. 📝 Monitor logs for errors
6. 🚀 Share your deployed app!

## Support

- Render Documentation: https://render.com/docs
- Project Issues: Open issue on GitHub
- Logs: Check Render dashboard for detailed error messages
