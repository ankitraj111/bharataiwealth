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
}

export function StatCard({ title, value, change, changeLabel = "vs last month", data, className, icon: Icon }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <Card
      className={cn(
        "group relative overflow-hidden glass-card hover:glass-card-elevated transition-premium hover:scale-[1.01]",
        className,
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] pointer-events-none" />

      <CardContent className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-3.5 w-3.5 text-primary/70" />}
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80">{title}</p>
            </div>
            <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums">{value}</p>
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5",
                  isPositive ? "bg-success/10" : "bg-destructive/10",
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                )}
                <span
                  className={cn("text-xs font-semibold tabular-nums", isPositive ? "text-success" : "text-destructive")}
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
                  <linearGradient
                    id={`statGradient-${isPositive ? "up" : "down"}-${title}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={isPositive ? "oklch(0.55 0.15 150)" : "oklch(0.55 0.18 25)"}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="100%"
                      stopColor={isPositive ? "oklch(0.55 0.15 150)" : "oklch(0.55 0.18 25)"}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "oklch(0.55 0.15 150)" : "oklch(0.55 0.18 25)"}
                  strokeWidth={2}
                  fill={`url(#statGradient-${isPositive ? "up" : "down"}-${title})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
