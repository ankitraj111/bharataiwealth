"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  Brain,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  Target,
  Activity,
  Clock,
  Calendar,
  LineChart,
  PieChart,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
} from "lucide-react"
import Link from "next/link"
import { staggerContainer, scrollReveal } from "@/lib/animation-variants"

const portfolioSections = [
  {
    title: "Portfolio Management",
    description: "Track and manage all your investments in one place",
    href: "/portfolio",
    icon: Wallet,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    stats: { value: "₹12.5L", change: "+12.5%", label: "Total Value" }
  },
  {
    title: "Short-Term Forecast",
    description: "1-7 days predictions with ML confidence bands",
    href: "/portfolios/low-risk",
    icon: Clock,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    stats: { value: "87%", change: "High", label: "Accuracy" }
  },
  {
    title: "Mid-Term Forecast",
    description: "30-90 days trend analysis with ensemble models",
    href: "/portfolios/medium-risk",
    icon: BarChart3,
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
    stats: { value: "15.2%", change: "Bullish", label: "Expected Return" }
  },
  {
    title: "Long-Term Forecast",
    description: "6 months - 3 years projections with scenario analysis",
    href: "/portfolios/high-risk",
    icon: TrendingUp,
    color: "rose",
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30",
    stats: { value: "42.5%", change: "3Y CAGR", label: "Projection" }
  },
  {
    title: "AI Predictions",
    description: "Advanced ML insights and market intelligence",
    href: "/predictions",
    icon: Brain,
    color: "purple",
    gradient: "from-purple-500 to-fuchsia-500",
    bgGradient: "from-purple-50 to-fuchsia-50 dark:from-purple-950/30 dark:to-fuchsia-950/30",
    stats: { value: "92%", change: "Active", label: "AI Confidence" }
  },
]

const quickStats = [
  { label: "Total Portfolio Value", value: "₹12,50,000", icon: Wallet, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { label: "Overall Return", value: "+12.5%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { label: "Active Predictions", value: "24", icon: Brain, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30" },
  { label: "Risk Score", value: "Medium", icon: Shield, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
]

export default function PortfoliosPage() {
  return (
    <ProtectedRoute>
      <PortfoliosContent />
    </ProtectedRoute>
  )
}

function PortfoliosContent() {
  return (
    <AppShell>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-10 pb-20"
      >
        {/* Header Section */}
        <motion.div variants={scrollReveal} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                <span className="text-emerald-600">Portfolios</span> Dashboard
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 text-sm mt-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                AI-Powered Investment Intelligence & Forecasting Hub
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, i) => (
              <motion.div key={i} variants={scrollReveal}>
                <Card className="glass-card group hover:border-emerald-500/30 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <Badge variant="outline" className="text-[10px] border-border/50">
                        LIVE
                      </Badge>
                    </div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Portfolio Sections Grid */}
        <motion.div variants={scrollReveal} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Portfolio Modules</h2>
              <p className="text-sm text-muted-foreground">
                Access comprehensive investment analysis and forecasting tools
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolioSections.map((section, i) => (
              <motion.div
                key={i}
                variants={scrollReveal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={section.href}>
                  <Card className={`group relative overflow-hidden border-2 hover:border-${section.color}-500/50 transition-all duration-300 cursor-pointer h-full`}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity`} />
                    
                    {/* Animated Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                    <CardHeader className="relative z-10 pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <section.icon className="h-7 w-7 text-white" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                      </div>
                      <CardTitle className="text-xl font-bold group-hover:text-foreground transition-colors">
                        {section.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.description}
                      </p>
                    </CardHeader>

                    <CardContent className="relative z-10 pt-0">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                            {section.stats.label}
                          </p>
                          <p className="text-2xl font-bold tabular-nums">{section.stats.value}</p>
                        </div>
                        <Badge className={`bg-${section.color}-500/10 text-${section.color}-600 border-${section.color}-500/20`}>
                          {section.stats.change}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights Section */}
        <motion.div variants={scrollReveal}>
          <Card className="border-2 border-purple-500/30 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-xl">AI-Powered Portfolio Intelligence</h3>
                    <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">
                      PREMIUM
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Our advanced ML models analyze 50+ technical indicators, market sentiment, and macroeconomic factors to provide you with institutional-grade investment insights. Get real-time predictions with confidence scores and explainable AI reasoning.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/predictions">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20">
                        <Brain className="h-4 w-4 mr-2" />
                        View AI Predictions
                      </Button>
                    </Link>
                    <Link href="/portfolio">
                      <Button variant="outline" className="border-purple-500/30 hover:bg-purple-50 dark:hover:bg-purple-950/30">
                        <Activity className="h-4 w-4 mr-2" />
                        Manage Portfolio
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={scrollReveal} className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Key Features</h2>
            <p className="text-sm text-muted-foreground">
              Everything you need for intelligent portfolio management
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: LineChart,
                title: "Technical Analysis",
                description: "RSI, MACD, Moving Averages, and 20+ indicators",
                color: "blue"
              },
              {
                icon: Brain,
                title: "ML Predictions",
                description: "XGBoost, LSTM, and ensemble model forecasts",
                color: "purple"
              },
              {
                icon: Shield,
                title: "Risk Analysis",
                description: "VaR, volatility scoring, and drawdown analysis",
                color: "emerald"
              },
              {
                icon: Target,
                title: "Accuracy Reports",
                description: "Rolling accuracy with MAE, RMSE metrics",
                color: "amber"
              },
              {
                icon: Sparkles,
                title: "Explainable AI",
                description: "Understand why models make predictions",
                color: "pink"
              },
              {
                icon: Activity,
                title: "Real-time Signals",
                description: "Buy/Sell/Hold signals with confidence scores",
                color: "cyan"
              },
            ].map((feature, i) => (
              <Card key={i} className="glass-card group hover:border-emerald-500/30 transition-all">
                <CardContent className="p-5">
                  <div className={`h-12 w-12 rounded-xl bg-${feature.color}-50 dark:bg-${feature.color}-950/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="font-bold text-base mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div variants={scrollReveal}>
          <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
                    Investment Advisory Disclaimer
                  </p>
                  <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                    Bharat AI Wealth does not provide trading or execution services. All insights are for informational and educational purposes only. Market investments involve risk. Past performance does not guarantee future results. Please consult with a certified financial advisor before making investment decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AppShell>
  )
}
