"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, TrendingUp, Activity } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const priceChartData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  btc: 3500000 + Math.random() * 500000,
  eth: 180000 + Math.random() * 50000,
}))

export function PerformanceChart() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d">("30d")
  const [selectedAsset, setSelectedAsset] = useState<"BTC" | "ETH">("BTC")

  return (
    <motion.div variants={scrollReveal}>
      <Card className="glass-card h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-600" />
              Price Performance
            </CardTitle>
            <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)}>
              <TabsList className="h-8">
                <TabsTrigger value="7d" className="text-xs">7D</TabsTrigger>
                <TabsTrigger value="30d" className="text-xs">30D</TabsTrigger>
                <TabsTrigger value="90d" className="text-xs">90D</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceChartData}>
                <defs>
                  <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="ethGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="currentColor" className="text-muted-foreground" fontSize={10} />
                <YAxis stroke="currentColor" className="text-muted-foreground" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={selectedAsset === "BTC" ? "btc" : "eth"}
                  stroke={selectedAsset === "BTC" ? "#f97316" : "#8b5cf6"}
                  strokeWidth={2}
                  fill={selectedAsset === "BTC" ? "url(#btcGradient)" : "url(#ethGradient)"}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex gap-2">
              <Button
                variant={selectedAsset === "BTC" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAsset("BTC")}
                className="h-8"
              >
                BTC
              </Button>
              <Button
                variant={selectedAsset === "ETH" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAsset("ETH")}
                className="h-8"
              >
                ETH
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                <span className="font-bold">Uptrend</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-600" />
                <span className="font-bold">Strong Momentum</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
