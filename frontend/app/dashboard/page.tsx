"use client"

import { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { AppShell } from "@/components/app-shell"
import { StatCard } from "@/components/stat-card"
import { AICoachWidget } from "@/components/ai-coach-widget"
import { RegulatoryDisclaimer } from "@/components/regulatory-disclaimer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Lazy load Recharts for performance
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false })
const AreaChart = dynamic(() => import("recharts").then(m => m.AreaChart), { ssr: false })
const Area = dynamic(() => import("recharts").then(m => m.Area), { ssr: false })
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then(m => m.YAxis), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false })
const PieChart = dynamic(() => import("recharts").then(m => m.PieChart), { ssr: false })
const Pie = dynamic(() => import("recharts").then(m => m.Pie), { ssr: false })
const Cell = dynamic(() => import("recharts").then(m => m.Cell), { ssr: false })
import { ArrowUpRight, Wallet, PiggyBank, TrendingUp, Shield, Sparkles, ChevronRight, ChevronDown, BarChart3, Target, AlertTriangle, Scale, Flame, Zap, LayoutDashboard, Calculator, Users, FlaskConical } from "lucide-react"
import { KiteConnector } from "@/components/kite-connector"
import { fetchDashboardSummary, fetcher, BACKEND_URL } from "@/lib/api"
import useSWR from "swr"
import Link from "next/link"

// Move static data outside component to prevent re-creation
const spendingData = [
  { month: "Jan", income: 85000, spending: 45000 },
  { month: "Feb", income: 88000, spending: 52000 },
  { month: "Mar", income: 92000, spending: 48000 },
  { month: "Apr", income: 85000, spending: 61000 },
  { month: "May", income: 95000, spending: 55000 },
  { month: "Jun", income: 98000, spending: 49000 },
]

const categoryData = [
  { name: "Food", value: 15000, color: "#f97316" },
  { name: "Travel", value: 12000, color: "#eab308" },
  { name: "Shopping", value: 8000, color: "#22c55e" },
  { name: "Bills", value: 10000, color: "#3b82f6" },
  { name: "Others", value: 4000, color: "#a855f7" },
]

const sparklineData1 = [{ value: 30 }, { value: 45 }, { value: 35 }, { value: 50 }, { value: 42 }, { value: 55 }]
const sparklineData2 = [{ value: 20 }, { value: 25 }, { value: 30 }, { value: 35 }, { value: 40 }, { value: 45 }]
const sparklineData3 = [{ value: 100 }, { value: 95 }, { value: 110 }, { value: 105 }, { value: 120 }, { value: 125 }]
const sparklineData4 = [{ value: 50 }, { value: 55 }, { value: 45 }, { value: 60 }, { value: 52 }, { value: 48 }]

const statIcons = [Wallet, PiggyBank, TrendingUp, Shield]

// Default data for instant render
const defaultSummary = {
  userName: "Investor",
  monthlyExpense: 45000,
  totalNetWorth: 1250000,
  portfolioGain: 12.5,
  aiConfidence: 87
}

import { MarketTicker } from "@/components/dashboard/MarketTicker"
import { UpcomingSIPs } from "@/components/dashboard/UpcomingSIPs"

// Helper function for dynamic greeting
function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Welcome")

  const { data: summaryData, error } = useSWR(`${BACKEND_URL}/dashboard/summary`, fetcher, {
    fallbackData: defaultSummary,
    revalidateOnFocus: false,
    refreshInterval: 30000,
  })

  // Merge summaryData with defaultSummary if needed, but fallbackData handles it
  const summary = summaryData || defaultSummary

  useEffect(() => {
    setGreeting(getGreeting())
  }, [])

  const quickActions = [
    { name: "Portfolio", desc: "View holdings", href: "/portfolios/medium-risk", color: "blue", icon: Wallet },
    { name: "Family", desc: "Manage vault", href: "/family", color: "purple", icon: Target },
    { name: "AI Predict", desc: "Market edge", href: "/predictions", color: "orange", icon: Sparkles },
    { name: "Support", desc: "Expert help", href: "/support", color: "green", icon: Shield },
  ]

  return (
    <AppShell noPadding>
      <MarketTicker />
      <div className="p-6 md:p-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-lg shadow-primary/20 text-white font-semibold text-xl">
                {summary?.userName?.[0] || "I"}
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  {greeting}, {summary?.userName || "Investor"}
                </h1>
                <p className="text-sm text-muted-foreground font-semibold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Portfolio is active and growing today.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <Link key={action.name} href={action.href}>
                <div className="group h-16 w-full sm:w-32 bg-secondary/30 hover:bg-white dark:hover:bg-slate-800 border border-border/50 hover:border-primary/30 rounded-2xl p-3 px-4 flex items-center gap-3 transition-all cursor-pointer shadow-sm hover:shadow-md">
                  <div className={`p-1.5 rounded-lg bg-${action.color}-500/10 text-${action.color}-500 group-hover:bg-${action.color}-500 group-hover:text-white transition-colors`}>
                    <action.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-none">{action.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{action.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Portfolio Health & Key Metrics Group */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Kite Integration Widget Inline */}
            <KiteConnector />
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-[2rem] p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Portfolio Health</p>
              <h3 className="text-2xl font-semibold">{summary?.aiConfidence || 0} / 100</h3>
              <p className="text-[11px] font-medium text-muted-foreground">
                {summary?.aiConfidence > 90 ? "Excellent condition" : summary?.aiConfidence > 75 ? "Good condition" : "Needs attention"}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full border-[6px] border-primary/20 border-t-primary flex items-center justify-center font-semibold text-primary">
              {summary?.aiConfidence || 0}%
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Monthly Spend"
            value={`₹${summary?.monthlyExpense?.toLocaleString("en-IN")}`}
            change={-8.2}
            data={sparklineData1}
            icon={statIcons[0]}
            color="orange"
          />
          <StatCard
            title="Estimated Savings"
            value={`₹${(85000 - (summary?.monthlyExpense || 0)).toLocaleString("en-IN")}`}
            change={12.5}
            data={sparklineData2}
            icon={statIcons[1]}
            color="green"
          />
          <StatCard
            title="Investment Value"
            value={`₹${summary?.totalNetWorth?.toLocaleString("en-IN")}`}
            change={5.4}
            data={sparklineData3}
            icon={statIcons[2]}
            color="blue"
          />
          <StatCard
            title="AI Risk Score"
            value={summary?.totalNetWorth > 500000 ? "Medium" : "Low"}
            change={-2.1}
            changeLabel="risk score"
            data={sparklineData4}
            icon={statIcons[3]}
            color="purple"
          />
        </div>

        {/* Portfolio Risk Overview */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/portfolios/low-risk">
            <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-transparent hover:shadow-lg hover:border-emerald-500/50 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                    <Shield className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-emerald-600 transition-transform rotate-180" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">Low Risk Portfolio</h3>
                <p className="text-sm text-muted-foreground mb-3">Capital protection • 6-8% returns</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600">Risk Score: 2/10</span>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-bold">+7.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/portfolios/medium-risk">
            <Card className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent hover:shadow-lg hover:border-amber-500/50 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                    <Scale className="h-6 w-6 text-amber-600 group-hover:text-white transition-colors" />
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-amber-600 transition-transform rotate-180" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">Medium Risk Portfolio</h3>
                <p className="text-sm text-muted-foreground mb-3">Balanced growth • 12-15% returns</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-amber-600">Risk Score: 5/10</span>
                  <div className="flex items-center gap-1 text-amber-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-bold">+13.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/portfolios/high-risk">
            <Card className="border-2 border-red-500/30 bg-gradient-to-br from-red-500/5 to-transparent hover:shadow-lg hover:border-red-500/50 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                    <Flame className="h-6 w-6 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-red-600 transition-transform rotate-180" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">High Risk Portfolio</h3>
                <p className="text-sm text-muted-foreground mb-3">Aggressive growth • 30-50% returns</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-red-600">Risk Score: 8/10</span>
                  <div className="flex items-center gap-1 text-red-600">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm font-bold">+42.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Tools Section */}
        <Card className="border-border/50 shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base font-bold uppercase tracking-widest">
                <FlaskConical className="h-5 w-5 text-blue-600" />
                Financial Tools
              </CardTitle>
              <Link href="/goals">
                <Button variant="ghost" size="sm" className="gap-1 text-xs font-bold">
                  View All
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link href="/goals">
                <div className="group p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/50 dark:border-emerald-800/50 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer hover:shadow-md">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <Target className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Goal Tracker</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Track goals</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/emergency-fund">
                <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer hover:shadow-md">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <Shield className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Emergency</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Safety fund</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/sandbox">
                <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/30 dark:to-fuchsia-950/30 border border-purple-200/50 dark:border-purple-800/50 hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer hover:shadow-md">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                      <FlaskConical className="h-6 w-6 text-purple-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Sandbox</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Simulate risk</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/tax">
                <div className="group p-4 rounded-xl bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-950/30 dark:to-green-950/30 border border-teal-200/50 dark:border-teal-800/50 hover:border-teal-400 dark:hover:border-teal-600 transition-all cursor-pointer hover:shadow-md">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                      <Calculator className="h-6 w-6 text-teal-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Tax & Insurance</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Optimize tax</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/family">
                <div className="group p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-200/50 dark:border-indigo-800/50 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer hover:shadow-md">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                      <Users className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Family</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Manage vault</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Spending Chart */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Spending vs Income</CardTitle>
                <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-all">
                  View Details <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendingData}>
                    <defs>
                      <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "oklch(0.45 0.03 250)", fontSize: 11, fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "oklch(0.60 0.005 250)", fontSize: 11, fontWeight: 500 }}
                      tickFormatter={(value: any) => `₹${Number(value || 0) / 1000}k`}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px oklch(0 0 0 / 0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                      labelStyle={{ color: "var(--foreground)", fontWeight: 600, marginBottom: 8 }}
                      itemStyle={{ color: "var(--muted-foreground)", fontSize: 12 }}
                      formatter={(value: number | string | any) => [`₹${Number(value ?? 0).toLocaleString("en-IN")}`, ""]}
                    />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill="url(#incomeGradient)"
                      name="Income"
                    />
                    <Area
                      type="monotone"
                      dataKey="spending"
                      stroke="#f97316"
                      strokeWidth={3}
                      fill="url(#spendingGradient)"
                      name="Spending"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-lg shadow-primary/30" />
                  <span className="text-xs font-medium text-muted-foreground">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-lg shadow-accent/30" />
                  <span className="text-xs font-medium text-muted-foreground">Spending</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Chart */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Spending by Category</CardTitle>
                <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-all">
                  View All <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={105}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px oklch(0 0 0 / 0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                      formatter={(value: number | string | any) => [`₹${Number(value ?? 0).toLocaleString("en-IN")}`, ""]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full shadow-lg"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}40` }}
                    />
                    <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <UpcomingSIPs />
          </div>
          <div className="lg:col-span-2">
            {/* AI Coach Widget */}
            <AICoachWidget
              message="You spent 40% more on food last week compared to your monthly average. Try reducing to ₹1,500 this week to stay on track with your savings goal."
              action="Show savings plan"
            />
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <RegulatoryDisclaimer />
      </div>
    </AppShell>
  )
}
