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
      className="space-y-10 pb-20 bg-background/50 transition-colors duration-500"
    >
      {/* Header */}
      <motion.div variants={scrollReveal} className="space-y-6">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-primary shadow-[0_10px_30px_rgba(var(--primary),0.3)] flex items-center justify-center animate-pulse-slow">
            <Zap className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-foreground italic uppercase">
              Neural <span className="text-primary italic">Alpha</span> Dashboard
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">
              <Flame className="h-3.5 w-3.5 text-primary" />
              Institutional-Grade ML Intelligence
            </p>
          </div>
        </div>

        {/* Critical Risk Warning Banner */}
        <Card className="border-2 border-destructive/20 bg-destructive/5 backdrop-blur-xl rounded-[2rem] overflow-hidden group">
          <CardContent className="p-6 relative">
            <div className="absolute top-0 right-0 h-32 w-32 bg-destructive/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-destructive/10 transition-all duration-700" />
            <div className="flex items-start gap-5 relative z-10">
              <div className="p-3 rounded-2xl bg-destructive/10">
                <ShieldAlert className="h-6 w-6 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-destructive mb-1 uppercase tracking-tight italic">
                  EXECUTION PROTOCOL DIRECTIVE
                </p>
                <p className="text-xs text-muted-foreground font-bold leading-relaxed italic">
                  Bharat AI Wealth provides informational analysis only.
                  Digital assets are subject to high-velocity volatility and extreme market risk.
                  All neural insights are for strategic validation and structural education only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <CryptoSummary />
      <MarketOverview />
      <HoldingsTable />

      <div className="grid lg:grid-cols-2 gap-8">
        <PerformanceChart />
        <MLPrediction />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <RiskPanel />
        <ExplainableAI />
      </div>

      <PortfolioSimulator />
      <NewsPanel />
    </motion.div>
  )
}
