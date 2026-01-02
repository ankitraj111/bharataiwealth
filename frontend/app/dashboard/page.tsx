"use client"

import { AppShell } from "@/components/app-shell"
import { StatCard } from "@/components/stat-card"
import { AICoachWidget } from "@/components/ai-coach-widget"
import { RegulatoryDisclaimer } from "@/components/regulatory-disclaimer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts"
import { ArrowUpRight, Wallet, PiggyBank, TrendingUp, Shield } from "lucide-react"

const spendingData = [
  { month: "Jan", income: 85000, spending: 45000 },
  { month: "Feb", income: 88000, spending: 52000 },
  { month: "Mar", income: 92000, spending: 48000 },
  { month: "Apr", income: 85000, spending: 61000 },
  { month: "May", income: 95000, spending: 55000 },
  { month: "Jun", income: 98000, spending: 49000 },
]

const categoryData = [
  { name: "Food", value: 15000, color: "oklch(0.58 0.22 260)" },
  { name: "Travel", value: 12000, color: "oklch(0.82 0.16 85)" },
  { name: "Shopping", value: 8000, color: "oklch(0.68 0.18 155)" },
  { name: "Bills", value: 10000, color: "oklch(0.60 0.24 25)" },
  { name: "Others", value: 4000, color: "oklch(0.65 0.15 200)" },
]

const sparklineData1 = [{ value: 30 }, { value: 45 }, { value: 35 }, { value: 50 }, { value: 42 }, { value: 55 }]
const sparklineData2 = [{ value: 20 }, { value: 25 }, { value: 30 }, { value: 35 }, { value: 40 }, { value: 45 }]
const sparklineData3 = [{ value: 100 }, { value: 95 }, { value: 110 }, { value: 105 }, { value: 120 }, { value: 125 }]
const sparklineData4 = [{ value: 50 }, { value: 55 }, { value: 45 }, { value: 60 }, { value: 52 }, { value: 48 }]

const statIcons = [Wallet, PiggyBank, TrendingUp, Shield]

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header - Enhanced */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">Good Morning, Rajesh</h1>
            <span className="animate-float">👋</span>
          </div>
          <p className="text-sm text-muted-foreground/80">Here&apos;s your financial overview for today</p>
        </div>

        {/* KPI Cards - Enhanced with staggered animation */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="animate-fade-in opacity-0 stagger-1">
            <StatCard title="Monthly Spend" value="₹49,200" change={-8.2} data={sparklineData1} icon={statIcons[0]} />
          </div>
          <div className="animate-fade-in opacity-0 stagger-2">
            <StatCard
              title="Estimated Savings"
              value="₹48,800"
              change={12.5}
              data={sparklineData2}
              icon={statIcons[1]}
            />
          </div>
          <div className="animate-fade-in opacity-0 stagger-3">
            <StatCard
              title="Investment Value"
              value="₹8,45,000"
              change={5.4}
              data={sparklineData3}
              icon={statIcons[2]}
            />
          </div>
          <div className="animate-fade-in opacity-0 stagger-4">
            <StatCard
              title="Risk Exposure"
              value="Medium"
              change={-2.1}
              changeLabel="risk score"
              data={sparklineData4}
              icon={statIcons[3]}
            />
          </div>
        </div>

        {/* Charts Section - Enhanced */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Spending vs Income Chart */}
          <Card className="glass-card animate-fade-in opacity-0 stagger-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Spending vs Income</CardTitle>
                <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-premium">
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
                        <stop offset="0%" stopColor="oklch(0.58 0.22 260)" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="oklch(0.58 0.22 260)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.82 0.16 85)" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="oklch(0.82 0.16 85)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "oklch(0.60 0.005 250)", fontSize: 11, fontWeight: 500 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "oklch(0.60 0.005 250)", fontSize: 11, fontWeight: 500 }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.14 0.012 250 / 0.95)",
                        border: "1px solid oklch(0.22 0.015 250)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px oklch(0 0 0 / 0.3)",
                        backdropFilter: "blur(10px)",
                      }}
                      labelStyle={{ color: "oklch(0.98 0 0)", fontWeight: 600, marginBottom: 8 }}
                      itemStyle={{ color: "oklch(0.80 0 0)", fontSize: 12 }}
                      formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, ""]}
                    />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stroke="oklch(0.58 0.22 260)"
                      strokeWidth={2.5}
                      fill="url(#incomeGradient)"
                      name="Income"
                    />
                    <Area
                      type="monotone"
                      dataKey="spending"
                      stroke="oklch(0.82 0.16 85)"
                      strokeWidth={2.5}
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

          {/* Category Chart - Enhanced */}
          <Card className="glass-card animate-fade-in opacity-0 stagger-4">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Spending by Category</CardTitle>
                <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-premium">
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
                        backgroundColor: "oklch(0.14 0.012 250 / 0.95)",
                        border: "1px solid oklch(0.22 0.015 250)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px -5px oklch(0 0 0 / 0.3)",
                        backdropFilter: "blur(10px)",
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, ""]}
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

        {/* AI Coach Widget - Enhanced */}
        <div className="animate-fade-in opacity-0 stagger-5">
          <AICoachWidget
            message="You spent 40% more on food last week compared to your monthly average. Try reducing to ₹1,500 this week to stay on track with your savings goal."
            action="Show savings plan"
          />
        </div>

        {/* Regulatory Disclaimer */}
        <RegulatoryDisclaimer />
      </div>
    </AppShell>
  )
}
