"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  Zap,
  Activity,
  BarChart3,
  LineChart,
  Eye,
  Plus,
  Download,
  Sparkles,
  Flame,
  Globe,
  ShieldAlert,
  Info,
  Calculator,
} from "lucide-react"
import Link from "next/link"
import { staggerContainer, scrollReveal } from "@/lib/animation-variants"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { CryptoSummary } from "./CryptoSummary"
import { MarketOverview } from "./MarketOverview"
import { HoldingsTable } from "./HoldingsTable"
import { PerformanceChart } from "./PerformanceChart"
import { MLPrediction } from "./MLPrediction"
import { RiskPanel } from "./RiskPanel"
import { ExplainableAI } from "./ExplainableAI"
import { PortfolioSimulator } from "./PortfolioSimulator"
import { NewsPanel } from "./NewsPanel"

export function CryptoDashboardContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-8 pb-20"
    >
      {/* Header */}
      <motion.div variants={scrollReveal} className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              <span className="text-orange-600">Crypto</span> Hub Dashboard
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 text-sm mt-1">
              <Flame className="h-3 w-3 text-rose-500" />
              High-Risk Asset Analysis & ML Intelligence
            </p>
          </div>
        </div>

        {/* Critical Risk Warning Banner */}
        <Card className="border-2 border-rose-500/50 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-rose-900 dark:text-rose-100 mb-1">
                  ⚠️ High-Risk Asset Class - Advice Only
                </p>
                <p className="text-xs text-rose-800 dark:text-rose-200 leading-relaxed">
                  Bharat AI Wealth does not provide crypto trading, wallet, or execution services. 
                  Cryptocurrencies are highly volatile and suitable only for high-risk investors. 
                  All insights are for educational and informational purposes only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <CryptoSummary />
      <MarketOverview />
      <HoldingsTable />
      
      <div className="grid lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <MLPrediction />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RiskPanel />
        <ExplainableAI />
      </div>

      <PortfolioSimulator />
      <NewsPanel />
    </motion.div>
  )
}
