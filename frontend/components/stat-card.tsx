"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

interface StatCardProps {
  title: string
  value: string
  change: number
  changeLabel?: string
  data: { value: number }[]
  className?: string
  icon?: LucideIcon
  color?: "orange" | "green" | "blue" | "purple"
}

const colorMap = {
  orange: {
    bg: "from-orange-500/10 to-amber-500/10",
    border: "border-orange-500/20",
    icon: "text-orange-500",
    chart: "#f97316"
  },
  green: {
    bg: "from-emerald-500/10 to-green-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-500",
    chart: "#10b981"
  },
  blue: {
    bg: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-500",
    chart: "#3b82f6"
  },
  purple: {
    bg: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-500/20",
    icon: "text-purple-500",
    chart: "#a855f7"
  }
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  data,
  className,
  icon: Icon,
  color = "orange"
}: StatCardProps) {
  const isPositive = change >= 0
  const colors = colorMap[color]

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-2 hover:scale-[1.01] transition-all duration-300 shadow-sm hover:shadow-md",
        "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800",
        className,
      )}
    >
      <CardContent className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-1.5">
              {Icon && <Icon className={cn("h-3.5 w-3.5", colors.icon)} />}
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{title}</p>
            </div>
            <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">{value}</p>
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5",
                  isPositive ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100",
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-2.5 w-2.5" />
                ) : (
                  <TrendingDown className="h-2.5 w-2.5" />
                )}
                <span
                  className="text-[10px] font-bold tabular-nums"
                >
                  {isPositive ? "+" : ""}
                  {change}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{changeLabel}</span>
            </div>
          </div>
          <div className="h-12 w-20 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`statGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.chart} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={colors.chart} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={colors.chart}
                  strokeWidth={2}
                  fill={`url(#statGradient-${title})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
