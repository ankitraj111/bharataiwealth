"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, Flame, Brain, Sparkles, Activity } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { cn } from "@/lib/utils"

const summaryStats = [
  {
    label: "Exposure Alpha",
    value: "₹2.85L",
    subValue: "12.5% structural",
    icon: Zap,
    theme: "text-primary bg-primary/10 border-primary/20",
  },
  {
    label: "24h Trajectory",
    value: "+2.8%",
    subValue: "Bullish Sync",
    icon: TrendingUp,
    theme: "text-success bg-success/10 border-success/20",
  },
  {
    label: "Volatility Bias",
    value: "Extreme",
    subValue: "Index: 88.75%",
    icon: Flame,
    theme: "text-destructive bg-destructive/10 border-destructive/20",
  },
  {
    label: "Neural Sentiment",
    value: "Greed",
    subValue: "Index: 68/100",
    icon: Brain,
    theme: "text-primary bg-primary/10 border-primary/20",
  },
  {
    label: "AI Reliability",
    value: "70.75%",
    subValue: "Alpha accuracy",
    icon: Sparkles,
    theme: "text-primary bg-primary/10 border-primary/20",
  },
]

export function CryptoSummary() {
  return (
    <motion.div variants={scrollReveal} className="w-full">
      <h2 className="text-[10px] font-black mb-6 flex items-center gap-2 uppercase tracking-[0.3em] italic text-muted-foreground">
        <Activity className="h-4 w-4 text-primary" />
        Structural Alpha Summary
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {summaryStats.map((stat, i) => (
          <Card key={i} className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2rem] group hover:border-primary/30 transition-all overflow-hidden relative">
            <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 rounded-full blur-xl -mr-8 -mt-8 group-hover:bg-primary/10 transition-all" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center border shadow-inner", stat.theme)}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Alpha</Badge>
              </div>
              <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2 italic">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-foreground tabular-nums mb-1 italic tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium italic opacity-60">{stat.subValue}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
