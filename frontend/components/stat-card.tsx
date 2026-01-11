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
        "group relative overflow-hidden border-2 hover:scale-[1.02] transition-all duration-300",
        `bg-gradient-to-br ${colors.bg} ${colors.border}`,
        className,
      )}
    >
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              {Icon && <Icon className={cn("h-4 w-4", colors.icon)} />}
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
            </div>
            <p className="text-2xl font-black tracking-tight text-foreground tabular-nums">{value}</p>
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5",
                  isPositive ? "bg-emerald-500/20" : "bg-red-500/20",
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={cn("text-xs font-bold tabular-nums", isPositive ? "text-emerald-500" : "text-red-500")}
                >
                  {isPositive ? "+" : ""}
                  {change}%
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground/70">{changeLabel}</span>
            </div>
          </div>
          <div className="h-14 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`statGradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.chart} stopOpacity={0.4} />
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
