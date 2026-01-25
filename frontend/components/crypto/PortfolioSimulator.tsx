"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator, TrendingUp, Shield, PieChart } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"

export function PortfolioSimulator() {
  const [amount, setAmount] = useState("50000")
  const [simulated, setSimulated] = useState(false)

  const handleSimulate = () => {
    setSimulated(true)
  }

  return (
    <motion.div variants={scrollReveal}>
      <Card className="glass-card border-blue-500/20">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-b border-border">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            Portfolio Impact Simulator
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
                  Simulate Adding Crypto (₹)
                </label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 text-lg font-bold"
                  placeholder="50000"
                />
              </div>
              <Button onClick={handleSimulate} className="w-full h-12 bg-blue-600 hover:bg-blue-700">
                <Calculator className="h-4 w-4 mr-2" />
                Simulate Impact
              </Button>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                  <span className="font-bold">Note:</span> This is a simulation only. No real investment or execution occurs.
                </p>
              </div>
            </div>

            {simulated && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <PieChart className="h-5 w-5 text-blue-600" />
                    <p className="font-bold text-sm">Portfolio Allocation</p>
                  </div>
                  <p className="text-2xl font-bold tabular-nums mb-1">15.8%</p>
                  <p className="text-xs text-muted-foreground">Crypto exposure (was 12.5%)</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-rose-600" />
                    <p className="font-bold text-sm">Risk Level</p>
                  </div>
                  <p className="text-2xl font-bold tabular-nums mb-1 text-rose-600">High → Extreme</p>
                  <p className="text-xs text-muted-foreground">Volatility increased by 12%</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <p className="font-bold text-sm">Expected Return</p>
                  </div>
                  <p className="text-2xl font-bold tabular-nums mb-1 text-emerald-600">+18.5%</p>
                  <p className="text-xs text-muted-foreground">Annual (high uncertainty)</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
