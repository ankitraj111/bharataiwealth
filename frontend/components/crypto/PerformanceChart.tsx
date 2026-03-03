"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, TrendingUp, Activity } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

const priceChartData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  btc: 3500000 + Math.random() * 500000,
  eth: 180000 + Math.random() * 50000,
}))

export function PerformanceChart() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d">("30d")
  const [selectedAsset, setSelectedAsset] = useState<"BTC" | "ETH">("BTC")

  return (
    <motion.div variants={scrollReveal} className="h-full">
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group h-full">
        <CardHeader className="p-8 border-b border-border/50 bg-muted/20 relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="text-sm font-black text-foreground flex items-center gap-4 italic uppercase tracking-tight">
              <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
                <LineChart className="h-6 w-6 text-primary-foreground" />
              </div>
              Alpha Trajectory mapping
            </CardTitle>
            <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)} className="bg-card/40 rounded-xl p-1 border border-border/50">
              <TabsList className="h-9 bg-transparent border-0 gap-2">
                {["7d", "30d", "90d"].map((t) => (
                  <TabsTrigger key={t} value={t} className="text-[10px] font-black uppercase tracking-widest h-7 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all">{t}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="h-[300px] w-full relative">
            <div className="absolute inset-0 bg-primary/2 blur-[100px] rounded-full" />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceChartData}>
                <defs>
                  <linearGradient id="alphaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card/90 backdrop-blur-xl border border-border/50 p-4 rounded-2xl shadow-2xl">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 italic">Structural Value</p>
                          <p className="text-lg font-black text-primary italic">₹{(payload[0].value as number / 100000).toFixed(2)}L</p>
                        </div>
                      )
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={selectedAsset === "BTC" ? "btc" : "eth"}
                  stroke="var(--primary)"
                  strokeWidth={3}
                  fill="url(#alphaGradient)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mt-8 pt-8 border-t border-border/50 gap-6">
            <div className="flex gap-3 bg-muted/30 p-1.5 rounded-2xl border border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAsset("BTC")}
                className={cn("h-9 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", selectedAsset === "BTC" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground")}
              >
                BTC ALPHA
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAsset("ETH")}
                className={cn("h-9 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", selectedAsset === "ETH" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground")}
              >
                ETH ALPHA
              </Button>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <TrendingUp className="h-4 w-4 text-success" />
                </div>
                <span className="text-[10px] font-black text-foreground uppercase tracking-widest italic">Alpha Uptrend</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <span className="text-[10px] font-black text-foreground uppercase tracking-widest italic">Neural Momentum</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
