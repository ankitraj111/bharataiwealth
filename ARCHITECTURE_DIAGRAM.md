# 🏗️ Portfolios Module - Architecture Diagram

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     BHARAT AI WEALTH                             │
│                   Frontend Application                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APP ROUTER (Next.js 14)                     │
├─────────────────────────────────────────────────────────────────┤
│  /                    → Landing Page                             │
│  /dashboard           → Main Dashboard                           │
│  /portfolios          → Portfolios Dashboard ◄── NEW            │
│  /portfolio           → Portfolio Management                     │
│  /portfolios/low-risk → Short-Term Forecast                     │
│  /portfolios/medium-risk → Mid-Term Forecast                    │
│  /portfolios/high-risk → Long-Term Forecast                     │
│  /predictions         → AI Predictions                           │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Component Hierarchy

```
App
│
├── Layout
│   ├── Sidebar ◄── UPDATED
│   │   ├── Main Nav
│   │   ├── Portfolios Section
│   │   │   ├── Portfolios Dashboard ◄── NEW
│   │   │   ├── Portfolio Management
│   │   │   ├── Short-Term Forecast
│   │   │   ├── Mid-Term Forecast
│   │   │   ├── Long-Term Forecast
│   │   │   └── AI Predictions
│   │   └── Bottom Nav
│   └── Topbar
│
├── Dashboard ◄── UPDATED
│   ├── Quick Actions
│   │   └── Portfolios ◄── UPDATED LINK
│   └── Portfolio Risk Overview
│
└── Portfolios Dashboard ◄── NEW PAGE
    ├── Header Section
    ├── Quick Stats (4 cards)
    ├── Portfolio Modules (5 cards)
    ├── AI Insights Banner
    ├── Key Features (6 cards)
    └── Disclaimer
```

## 🎯 Data Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│     Frontend (Next.js)              │
│  ┌───────────────────────────────┐  │
│  │  Portfolios Dashboard         │  │
│  │  /portfolios                  │  │
│  └───────────┬───────────────────┘  │
│              │                       │
│              ▼                       │
│  ┌───────────────────────────────┐  │
│  │  State Management             │  │
│  │  - useState                   │  │
│  │  - useEffect                  │  │
│  │  - SWR (ready)                │  │
│  └───────────┬───────────────────┘  │
└──────────────┼───────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Backend API (Spring Boot)       │
│  ┌───────────────────────────────┐  │
│  │  /dashboard/summary           │  │
│  │  /portfolio/items             │  │
│  │  /ml/predict                  │  │
│  │  /ml/analysis                 │  │
│  │  /market/indices              │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     ML Service (Python)             │
│  ┌───────────────────────────────┐  │
│  │  XGBoost Models               │  │
│  │  LSTM Models                  │  │
│  │  Ensemble Models              │  │
│  │  Technical Analysis           │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## 🗂️ File Structure

```
bharat-ai-wealth/
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Landing)
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx ◄── UPDATED
│   │   │
│   │   ├── portfolios/ ◄── NEW FOLDER
│   │   │   ├── page.tsx ◄── NEW (Main Dashboard)
│   │   │   ├── low-risk/
│   │   │   │   └── page.tsx
│   │   │   ├── medium-risk/
│   │   │   │   └── page.tsx
│   │   │   └── high-risk/
│   │   │       └── page.tsx
│   │   │
│   │   ├── portfolio/
│   │   │   └── page.tsx
│   │   │
│   │   └── predictions/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── sidebar.tsx ◄── UPDATED
│   │   ├── app-shell.tsx
│   │   ├── protected-route.tsx
│   │   └── ui/
│   │       ├── card.tsx
│   │       ├── button.tsx
│   │       └── badge.tsx
│   │
│   └── lib/
│       ├── api.ts
│       ├── utils.ts
│       └── animation-variants.ts
│
├── bankend/ (Spring Boot)
│   └── src/main/java/com/bharatai/wealth/
│       ├── controller/
│       ├── service/
│       └── repository/
│
└── ml-service/ (Python)
    ├── ml_engine.py
    ├── feature_pipeline.py
    └── models/
```

## 🎨 Design System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DESIGN SYSTEM                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Colors                                                      │
│  ├── Primary: Emerald-600                                   │
│  ├── Success: Emerald-500                                   │
│  ├── Warning: Amber-500                                     │
│  ├── Error: Rose-500                                        │
│  └── Info: Blue-500                                         │
│                                                              │
│  Typography                                                  │
│  ├── Headings: Font-bold, tracking-tight                   │
│  ├── Body: Font-medium                                      │
│  └── Labels: Font-bold, uppercase                          │
│                                                              │
│  Spacing                                                     │
│  ├── xs: 4px                                                │
│  ├── sm: 8px                                                │
│  ├── md: 16px                                               │
│  ├── lg: 24px                                               │
│  └── xl: 32px                                               │
│                                                              │
│  Components                                                  │
│  ├── Card (glass-morphism)                                 │
│  ├── Button (gradient hover)                               │
│  ├── Badge (status indicators)                             │
│  └── Motion (Framer Motion)                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Authentication                                           │
│     ├── JWT Token                                           │
│     ├── Protected Routes                                    │
│     └── Session Management                                  │
│                                                              │
│  2. Authorization                                            │
│     ├── Role-based Access                                   │
│     └── Resource Permissions                                │
│                                                              │
│  3. Data Protection                                          │
│     ├── HTTPS Only                                          │
│     ├── Encrypted Storage                                   │
│     └── No PII in URLs                                      │
│                                                              │
│  4. Compliance                                               │
│     ├── SEBI Guidelines                                     │
│     ├── Advice-Only Disclaimers                            │
│     └── Risk Warnings                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📊 State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  STATE MANAGEMENT                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Local State (useState)                                      │
│  ├── UI State (modals, tabs)                               │
│  ├── Form State                                             │
│  └── Temporary Data                                         │
│                                                              │
│  Server State (SWR)                                          │
│  ├── Portfolio Data                                         │
│  ├── Market Data                                            │
│  ├── Predictions                                            │
│  └── User Profile                                           │
│                                                              │
│  Global State (Context)                                      │
│  ├── Auth State                                             │
│  ├── Theme (Dark/Light)                                     │
│  └── User Preferences                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT FLOW                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Development                                                 │
│  ├── Local Dev Server (npm run dev)                        │
│  ├── Hot Module Replacement                                 │
│  └── TypeScript Watch                                       │
│                                                              │
│  Build                                                       │
│  ├── TypeScript Compilation                                 │
│  ├── Next.js Build (npm run build)                         │
│  ├── Static Generation                                      │
│  └── Optimization                                           │
│                                                              │
│  Production                                                  │
│  ├── Vercel / Netlify / AWS                                │
│  ├── CDN Distribution                                       │
│  ├── Edge Functions                                         │
│  └── Analytics                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 User Journey Map

```
┌─────────────────────────────────────────────────────────────┐
│                    USER JOURNEY                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Entry Point                                              │
│     ├── Landing Page                                        │
│     ├── Login/Signup                                        │
│     └── Authentication                                      │
│                                                              │
│  2. Dashboard                                                │
│     ├── Overview                                            │
│     ├── Quick Actions                                       │
│     └── Click "Portfolios" ◄── ENTRY TO NEW MODULE        │
│                                                              │
│  3. Portfolios Dashboard ◄── NEW                           │
│     ├── View All Modules                                    │
│     ├── Quick Stats                                         │
│     ├── AI Insights                                         │
│     └── Select Module                                       │
│                                                              │
│  4. Detailed Analysis                                        │
│     ├── Short-Term Forecast                                 │
│     ├── Mid-Term Forecast                                   │
│     ├── Long-Term Forecast                                  │
│     └── AI Predictions                                      │
│                                                              │
│  5. Action                                                   │
│     ├── View Insights                                       │
│     ├── Export Reports                                      │
│     └── Set Alerts                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📱 Responsive Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  RESPONSIVE DESIGN                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Mobile (< 640px)                                            │
│  ├── Single Column                                          │
│  ├── Stacked Cards                                          │
│  ├── Mobile Drawer                                          │
│  └── Touch Optimized                                        │
│                                                              │
│  Tablet (640px - 1024px)                                     │
│  ├── 2 Column Grid                                          │
│  ├── Collapsible Sidebar                                    │
│  └── Optimized Spacing                                      │
│                                                              │
│  Desktop (> 1024px)                                          │
│  ├── 3 Column Grid                                          │
│  ├── Fixed Sidebar                                          │
│  └── Full Features                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Performance Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  PERFORMANCE OPTIMIZATION                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Build Time                                                  │
│  ├── Static Generation                                      │
│  ├── Code Splitting                                         │
│  └── Tree Shaking                                           │
│                                                              │
│  Runtime                                                     │
│  ├── Lazy Loading                                           │
│  ├── Image Optimization                                     │
│  ├── Font Optimization                                      │
│  └── GPU Acceleration                                       │
│                                                              │
│  Caching                                                     │
│  ├── SWR Cache                                              │
│  ├── Browser Cache                                          │
│  └── CDN Cache                                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔍 Monitoring Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MONITORING & ANALYTICS                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Performance Monitoring                                      │
│  ├── Page Load Time                                         │
│  ├── Time to Interactive                                    │
│  └── Core Web Vitals                                        │
│                                                              │
│  User Analytics                                              │
│  ├── Page Views                                             │
│  ├── Click Events                                           │
│  ├── User Flow                                              │
│  └── Conversion Tracking                                    │
│                                                              │
│  Error Tracking                                              │
│  ├── JavaScript Errors                                      │
│  ├── API Failures                                           │
│  └── User Reports                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Module Integration Map

```
                    ┌─────────────────┐
                    │   Dashboard     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Portfolios    │ ◄── NEW HUB
                    │   Dashboard     │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  Portfolio    │    │  Short-Term   │    │  Mid-Term     │
│  Management   │    │  Forecast     │    │  Forecast     │
└───────────────┘    └───────────────┘    └───────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐
│  Long-Term    │    │      AI       │
│  Forecast     │    │  Predictions  │
└───────────────┘    └───────────────┘
```

---

**Architecture Documentation Complete** ✅

*This diagram shows the complete system architecture of the Portfolios Module and its integration with the Bharat AI Wealth platform.*
