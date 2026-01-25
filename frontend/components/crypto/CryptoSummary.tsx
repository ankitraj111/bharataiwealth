"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, TrendingDown, Flame, Brain, Sparkles, Activity } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"

const summaryStats = [
  {
    label: "Total Crypto Exposure",
    value: "₹2.85L",
    subValue: "12.5% of portfolio",
    icon: Zap,
    color: "orange",
  },
  {
    label: "24h Change",
    value: "+2.8%",
    subValue: "Gaining",
    icon: TrendingUp,
    color: "emerald",
  },
  {
    label: "Risk Level",
    value: "Extreme",
    subValue: "Volatility: 88.75%",
    icon: Flame,
    color: "rose",
  },
  {
    label: "Market Sentiment",
    value: "Greed",
    subValue: "Index: 68/100",
    icon: Brain,
    color: "purple",
  },
  {
    label: "AI Confidence",
    value: "70.75%",
    subValue: "Model accuracy",
    icon: Sparkles,
    color: "blue",
  },
]

export function CryptoSummary() {
  return (
    <motion.div variants={scrollReveal}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-orange-600" />
        Portfolio Summary
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryStats.map((stat, i) => (
          <Card key={i} className="glass-card group hover:border-orange-500/30 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`h-10 w-10 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-950/30 flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <Badge variant="outline" className="text-[10px]">LIVE</Badge>
              </div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold tabular-nums mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.subValue}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
