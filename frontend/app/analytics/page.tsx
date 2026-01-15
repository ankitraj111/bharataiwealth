"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
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
  Sparkles,
  Filter,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react"
import { authService } from "@/lib/auth"
import { toast } from "sonner"
import { BACKEND_URL } from "@/lib/api"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { DateRange } from "react-day-picker"
import { isWithinInterval, parseISO, subDays } from "date-fns"

interface Expense {
  id: number
  description: string
  amount: number
  category: string
  date: string
  paymentSource: string
  isAutoSynced: boolean
  merchantName?: string
}

export default function AnalyticsPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const fetchExpenses = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${BACKEND_URL}/expenses`, {
        headers: {
          "Authorization": `Bearer ${authService.getToken()}`
        }
      })
      if (response.ok) {
        setExpenses(await response.json())
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error)
      toast.error("Failed to load analytics data")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses])

  const analyticsData = useMemo(() => {
    const filteredExpenses = expenses.filter(e => {
      if (!dateRange?.from) return true
      const expenseDate = parseISO(e.date)
      const end = dateRange.to || dateRange.from
      return isWithinInterval(expenseDate, { start: dateRange.from, end })
    })

    const totalSpent = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0)

    // Calculate effective period in days
    const diffTime = dateRange?.to && dateRange?.from
      ? Math.abs(dateRange.to.getTime() - dateRange.from.getTime())
      : 30 * 24 * 60 * 60 * 1000
    const activeDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
    const avgDaily = totalSpent / activeDays

    // Category Breakdown
    const categoryMap: Record<string, number> = {}
    filteredExpenses.forEach(e => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount
    })

    const categoryColors: Record<string, string> = {
      FOOD: "var(--chart-1)",
      TRANSPORT: "var(--chart-2)",
      SHOPPING: "var(--chart-3)",
      BILLS: "var(--chart-4)",
      ENTERTAINMENT: "var(--chart-5)",
      HEALTH: "var(--success)",
      EDUCATION: "var(--primary)",
      OTHER: "var(--muted-foreground)"
    }

    const breakdown = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value: Math.round(value),
      percentage: Math.round((value / (totalSpent || 1)) * 100),
      color: categoryColors[name] || "var(--muted-foreground)"
    })).sort((a, b) => b.value - a.value)

    // Daily Spend Data (Last 7 days)
    const dailySpend: Record<string, number> = {}
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dailySpend[dayNames[d.getDay()]] = 0
    }

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    filteredExpenses.filter(e => new Date(e.date) >= sevenDaysAgo).forEach(e => {
      const dayName = dayNames[new Date(e.date).getDay()]
      if (dailySpend[dayName] !== undefined) {
        dailySpend[dayName] += e.amount
      }
    })

    const dailySpendArray = Object.entries(dailySpend).map(([day, amount]) => ({ day, amount }))

    // Monthly Trend (Last 6 months)
    const monthlyTrendMap: Record<string, number> = {}
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      monthlyTrendMap[months[d.getMonth()]] = 0
    }

    filteredExpenses.forEach(e => {
      const d = new Date(e.date)
      const monthName = months[d.getMonth()]
      if (monthlyTrendMap[monthName] !== undefined) {
        monthlyTrendMap[monthName] += e.amount
      }
    })

    const monthlyTrendArray = Object.entries(monthlyTrendMap).map(([month, spending]) => ({ month, spending }))

    // Highest Day
    let highestDayAmount = 0
    let highestDayName = "N/A"
    Object.entries(dailySpend).forEach(([day, amount]) => {
      if (amount > highestDayAmount) {
        highestDayAmount = amount
        highestDayName = day
      }
    })

    const stats = [
      { label: "Total Spent", value: `₹${totalSpent.toLocaleString("en-IN")}`, icon: TrendingUp },
      { label: "Avg Daily", value: `₹${Math.round(avgDaily).toLocaleString("en-IN")}`, icon: Activity },
      { label: "Highest Day", value: highestDayName, subValue: `₹${highestDayAmount.toLocaleString("en-IN")}`, icon: BarChart3 },
      { label: "Categories", value: Object.keys(categoryMap).length.toString(), subValue: "Active", icon: PieChartIcon },
    ]

    return {
      stats,
      dailySpendData: dailySpendArray,
      categoryBreakdown: breakdown,
      monthlyTrend: monthlyTrendArray,
      totalSpent
    }
  }, [expenses, dateRange])

  const { stats, dailySpendData, categoryBreakdown, monthlyTrend, totalSpent } = analyticsData

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Analytics
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                Deep dive into your spending patterns and financial insights
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-md border text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Period</span>
              </div>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/50 shadow-sm transition-all hover:border-primary/20">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                    <p className="font-mono text-xl font-bold tracking-tight text-foreground">{stat.value}</p>
                    {stat.subValue && <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-wider font-mono">{stat.subValue}</p>}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Insight */}
        <AICoachWidget
          message={`Based on your spending patterns, you've spent ₹${totalSpent.toLocaleString("en-IN")} in the selected period. Your highest spending category is ${categoryBreakdown[0]?.name || "N/A"}.`}
          action="View detailed breakdown"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Daily Spending Card */}
          <Card className="border-border/50 shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="border-b border-border/50 bg-muted/20 py-4 px-6 flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Daily Spending
                </CardTitle>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider opacity-60">Last 7 Days Activity</p>
              </div>
              <Badge variant="outline" className="bg-success/5 text-success border-success/20 text-[9px] font-bold uppercase tracking-widest px-2 h-5">
                Live Analysis
              </Badge>
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <div className="h-[280px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySpendData} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.5} />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 700 }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                      dx={-10}
                    />
                    <Tooltip
                      cursor={{ fill: "var(--muted)", opacity: 0.3 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border/50 shadow-xl rounded-xl p-3">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{payload[0].payload.day}</p>
                              <p className="text-sm font-bold font-mono">₹{payload[0].value?.toLocaleString("en-IN")}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar
                      dataKey="amount"
                      fill="var(--primary)"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown Card */}
          <Card className="border-border/50 shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="border-b border-border/50 bg-muted/20 py-4 px-6 flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4 text-primary" />
                  Category Split
                </CardTitle>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider opacity-60">Total Expenditure View</p>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[9px] font-bold uppercase tracking-widest px-2 h-5">
                {categoryBreakdown.length} Categories
              </Badge>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col md:flex-row items-center gap-8">
              <div className="relative h-[220px] w-full md:w-1/2 flex items-center justify-center">
                <div className="absolute flex flex-col items-center justify-center">
                  <p className="font-mono text-xl font-bold text-foreground">₹{(totalSpent / 1000).toFixed(1)}k</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-60">Total Spent</p>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className="hover:scale-105 transition-transform duration-300 origin-center"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border/50 shadow-xl rounded-xl p-3">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{payload[0].name}</p>
                              <p className="text-sm font-bold font-mono">₹{payload[0].value?.toLocaleString("en-IN")}</p>
                              <p className="text-[9px] font-bold text-primary mt-1">{payload[0].payload.percentage}% of total</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex-1 w-full space-y-4 pt-2">
                {categoryBreakdown.slice(0, 5).map((item) => (
                  <div key={item.name} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item.name}</span>
                      </div>
                      <span className="font-mono">₹{item.value.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                          opacity: 0.8
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend Section */}
          <Card className="lg:col-span-2 border-border/50 shadow-sm overflow-hidden flex flex-col">
            <CardHeader className="border-b border-border/50 bg-muted/20 py-4 px-6 flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Monthly Spending Trend
                </CardTitle>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider opacity-60">Yearly Comparison</p>
              </div>
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-widest px-2 h-5">
                Historical View
              </Badge>
            </CardHeader>
            <CardContent className="p-6 pt-10">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrend}>
                    <defs>
                      <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.5} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 700 }}
                      tickFormatter={(value) => `₹${value / 1000}k`}
                      dx={-10}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border/50 shadow-xl rounded-xl p-3">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{payload[0].payload.month}</p>
                              <p className="text-sm font-bold font-mono">₹{payload[0].value?.toLocaleString("en-IN")}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="spending"
                      stroke="var(--primary)"
                      strokeWidth={3}
                      fill="url(#spendingGradient)"
                      dot={{ fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                      animationDuration={2000}
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
