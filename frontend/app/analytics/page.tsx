"use client"

import { AppShell } from "@/components/app-shell"
import { AICoachWidget } from "@/components/ai-coach-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts"
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react"

const dailySpendData = [
  { day: "Mon", amount: 2500 },
  { day: "Tue", amount: 1800 },
  { day: "Wed", amount: 3200 },
  { day: "Thu", amount: 2100 },
  { day: "Fri", amount: 4500 },
  { day: "Sat", amount: 5200 },
  { day: "Sun", amount: 1900 },
]

const categoryBreakdown = [
  { name: "Food & Dining", value: 18500, percentage: 35, color: "oklch(0.32 0.08 250)" },
  { name: "Travel", value: 12000, percentage: 23, color: "oklch(0.82 0.1 85)" },
  { name: "Shopping", value: 9500, percentage: 18, color: "oklch(0.55 0.15 150)" },
  { name: "Bills & Utilities", value: 8000, percentage: 15, color: "oklch(0.45 0.08 200)" },
  { name: "Entertainment", value: 4500, percentage: 9, color: "oklch(0.65 0.05 250)" },
]

const creditDebitData = [
  { month: "Jan", credit: 85000, debit: 52000 },
  { month: "Feb", credit: 78000, debit: 48000 },
  { month: "Mar", credit: 92000, debit: 55000 },
  { month: "Apr", credit: 88000, debit: 61000 },
  { month: "May", credit: 95000, debit: 52000 },
  { month: "Jun", credit: 102000, debit: 58000 },
]

const monthlyTrend = [
  { month: "Jan", spending: 52000 },
  { month: "Feb", spending: 48000 },
  { month: "Mar", spending: 55000 },
  { month: "Apr", spending: 61000 },
  { month: "May", spending: 52000 },
  { month: "Jun", spending: 49000 },
]

const summaryStats = [
  { label: "Total Spent", value: "₹52,500", change: "+12%", trend: "up", icon: TrendingUp },
  { label: "Avg Daily", value: "₹7,500", change: "-5%", trend: "down", icon: Activity },
  { label: "Highest Day", value: "Saturday", subValue: "₹5,200", icon: BarChart3 },
  { label: "Categories", value: "5", subValue: "Active", icon: PieChartIcon },
]

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary/40 via-background to-secondary/40 p-6 md:p-8">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20 pointer-events-none" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl">Analytics</h1>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">
                Deep dive into your spending patterns and financial insights
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/40 px-4 py-2.5 backdrop-blur-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <Select defaultValue="30">
                  <SelectTrigger className="h-auto w-[140px] border-0 bg-transparent p-0 text-sm font-medium shadow-none focus:ring-0">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent className="border-border/50 bg-background/95 backdrop-blur-xl">
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 3 months</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/40 p-5 transition-all duration-300 hover:border-primary/20 hover:bg-secondary/40"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />
              <div className="relative flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                  <p className="font-mono text-xl font-bold tracking-tight text-foreground">{stat.value}</p>
                  {stat.change && (
                    <div
                      className={`flex items-center gap-1 text-xs font-semibold ${stat.trend === "up" ? "text-success" : "text-destructive"
                        }`}
                    >
                      {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {stat.change} vs last week
                    </div>
                  )}
                  {stat.subValue && <p className="text-xs text-muted-foreground/80">{stat.subValue}</p>}
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/8">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight */}
        <AICoachWidget
          message="Based on your spending patterns, you can save ₹3,200 this month by reducing Travel and Food expenses by 15%. Your food spending has increased 40% compared to last month."
          action="View detailed breakdown"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Daily Spend Chart */}
          <Card className="group relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent transition-all duration-300 hover:border-white/[0.12]">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl transition-all duration-500 group-hover:bg-blue-500/10" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10">
                    <BarChart3 className="h-3.5 w-3.5 text-blue-400" />
                  </div>
                  Daily Spending
                </CardTitle>
                <p className="text-xs text-muted-foreground">This week overview</p>
              </div>
              <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                Live
              </Badge>
            </CardHeader>
            <CardContent className="relative pt-4">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySpendData} barCategoryGap="20%">
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" vertical={false} />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "oklch(0.45 0.03 250)", fontSize: 11, fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "oklch(0.45 0.03 250)", fontSize: 11 }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                      dx={-10}
                    />
                    <Tooltip
                      cursor={{ fill: "var(--secondary)", opacity: 0.4 }}
                      contentStyle={{
                        backgroundColor: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px oklch(0 0 0 / 0.1)",
                        backdropFilter: "blur(12px)",
                      }}
                      labelStyle={{ color: "var(--foreground)", fontWeight: 600, marginBottom: 4 }}
                      formatter={(value: number | undefined) => [
                        <span key="value" className="font-mono font-bold text-white">
                          ₹{(value?.toLocaleString("en-IN")) ?? "0"}
                        </span>,
                        "Spent",
                      ]}
                    />
                    <Bar dataKey="amount" fill="url(#barGradient)" radius={[8, 8, 0, 0]} maxBarSize={48} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="group relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent transition-all duration-300 hover:border-white/[0.12]">
            <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-yellow-500/5 blur-3xl transition-all duration-500 group-hover:bg-yellow-500/10" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/10">
                    <PieChartIcon className="h-3.5 w-3.5 text-yellow-400" />
                  </div>
                  Category Breakdown
                </CardTitle>
                <p className="text-xs text-muted-foreground">Spending by category</p>
              </div>
              <Badge variant="outline" className="border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                5 Categories
              </Badge>
            </CardHeader>
            <CardContent className="relative pt-4">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                <div className="relative h-[200px] w-full lg:w-1/2">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="font-mono text-xl font-bold text-foreground">₹52.5k</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</p>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(22, 27, 34, 0.95)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                        }}
                        formatter={(value: number | undefined) => [`₹${(value ?? 0).toLocaleString("en-IN")}`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {categoryBreakdown.map((item) => (
                    <div
                      key={item.name}
                      className="group/item flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-3 w-3 rounded-full ring-2 ring-white/10 transition-transform group-hover/item:scale-110"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-muted-foreground transition-colors group-hover/item:text-foreground">
                          {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <span className="font-mono text-sm font-semibold text-foreground">
                          ₹{item.value.toLocaleString("en-IN")}
                        </span>
                        <span className="w-10 rounded-md bg-white/[0.05] px-1.5 py-0.5 text-center text-xs font-medium text-muted-foreground">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit vs Debit */}
          <Card className="group relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent transition-all duration-300 hover:border-white/[0.12]">
            <div className="absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/10" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10">
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  Credit vs Debit
                </CardTitle>
                <p className="text-xs text-muted-foreground">6 months comparison</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-muted-foreground">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="text-xs text-muted-foreground">Expense</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative pt-4">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={creditDebitData} barCategoryGap="25%">
                    <defs>
                      <linearGradient id="creditGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.55 0.15 150)" stopOpacity={1} />
                        <stop offset="100%" stopColor="oklch(0.55 0.15 150)" stopOpacity={0.7} />
                      </linearGradient>
                      <linearGradient id="debitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.55 0.18 25)" stopOpacity={1} />
                        <stop offset="100%" stopColor="oklch(0.55 0.18 25)" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                      dx={-10}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.03)" }}
                      contentStyle={{
                        backgroundColor: "rgba(22, 27, 34, 0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                      }}
                      formatter={(value: number | undefined, name: string | undefined) => [
                        `₹${(value ?? 0).toLocaleString("en-IN")}`,
                        name === "credit" ? "Income" : "Expense",
                      ]}
                    />
                    <Bar dataKey="credit" fill="url(#creditGradient)" radius={[6, 6, 0, 0]} maxBarSize={32} />
                    <Bar dataKey="debit" fill="url(#debitGradient)" radius={[6, 6, 0, 0]} maxBarSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="group relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-transparent transition-all duration-300 hover:border-white/[0.12]">
            <div className="absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl transition-all duration-500 group-hover:bg-purple-500/10" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/10">
                    <Activity className="h-3.5 w-3.5 text-purple-400" />
                  </div>
                  Monthly Trend
                </CardTitle>
                <p className="text-xs text-muted-foreground">Spending over time</p>
              </div>
              <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-400">
                <Sparkles className="mr-1 h-3 w-3" />
                AI Tracked
              </Badge>
            </CardHeader>
            <CardContent className="relative pt-4">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrend}>
                    <defs>
                      <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.65 0.08 200)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="oklch(0.65 0.08 200)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 250)" vertical={false} />
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
                      tick={{ fill: "oklch(0.45 0.03 250)", fontSize: 11 }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px oklch(0 0 0 / 0.1)",
                        backdropFilter: "blur(12px)",
                      }}
                      formatter={(value: number | undefined) => [`₹${(value ?? 0).toLocaleString("en-IN")}`, "Spending"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="spending"
                      stroke="oklch(0.65 0.08 200)"
                      strokeWidth={3}
                      fill="url(#trendGradient)"
                      dot={{ fill: "oklch(0.65 0.08 200)", r: 4 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
