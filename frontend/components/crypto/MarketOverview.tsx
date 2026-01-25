"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Brain } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"

const marketData = [
  { label: "Bitcoin (BTC)", value: "₹38.5L", sub: "52.3% dominance" },
  { label: "Ethereum (ETH)", value: "₹2.15L", sub: "Smart contracts" },
  { label: "Market Cap", value: "₹185.2T", sub: "Total crypto" },
  { label: "24h Volume", value: "₹8.5T", sub: "Trading volume" },
  { label: "Fear & Greed", value: "68", sub: "Greed" },
  { label: "Market Phase", value: "Risk-On", sub: "High volatility" },
]

export function MarketOverview() {
  return (
    <motion.div variants={scrollReveal}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Globe className="h-5 w-5 text-blue-600" />
        Global Market Overview
      </h2>
      <Card className="glass-card border-blue-500/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {marketData.map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  {item.label}
                </p>
                <p className="text-2xl font-bold tabular-nums mb-1">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-1">
                  AI Market Insight
                </p>
                <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                  Crypto market currently in a high-volatility risk-on phase. Bitcoin dominance at 52.3% 
                  suggests capital rotation into altcoins. Fear & Greed Index at 68 indicates 
                  potential overheating. Exercise caution with position sizing.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
