"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"

const riskFactors = [
  { factor: "Regulatory Uncertainty", level: "High", score: 8, color: "rose" },
  { factor: "Market Volatility", level: "Extreme", score: 9, color: "rose" },
  { factor: "Liquidity Risk", level: "Medium", score: 6, color: "amber" },
  { factor: "Technology Risk", level: "Medium", score: 5, color: "amber" },
]

export function RiskPanel() {
  return (
    <motion.div variants={scrollReveal}>
      <Card className="glass-card border-rose-500/20 h-full">
        <CardHeader className="pb-3 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30 border-b border-border">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Shield className="h-5 w-5 text-rose-600" />
            Risk & Volatility Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {riskFactors.map((risk, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-sm mb-1">{risk.factor}</p>
                    <Badge className={`bg-${risk.color}-500/10 text-${risk.color}-600 border-${risk.color}-500/20`}>
                      {risk.level}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold tabular-nums">{risk.score}/10</p>
                  </div>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${risk.color}-500 to-${risk.color}-600`}
                    style={{ width: `${risk.score * 10}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-900 dark:text-amber-100 mb-1">
                    Risk Warning
                  </p>
                  <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                    Crypto assets are highly volatile and suitable only for high-risk investors. 
                    Suggested max allocation: 5-10% of total portfolio. Historical max drawdown: 80%+.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
