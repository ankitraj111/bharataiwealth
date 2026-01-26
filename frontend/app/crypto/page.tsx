"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  Shield,
  Zap,
  Activity,
  BarChart3,
  LineChart,
  Eye,
  Plus,
  Download,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Target,
  Clock,
  Globe,
  Newspaper,
  Calculator,
  ShieldAlert,
  Info,
  ChevronRight,
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Dummy data for crypto holdings
const cryptoHoldings = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 3850000,
    change24h: 2.4,
    change7d: 8.2,
    volatility: 85,
    risk: "High",
    signal: "Bullish",
    confidence: 78,
    holdings: 0.5,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 215000,
    change24h: 3.1,
    change7d: 12.5,
    volatility: 88,
    risk: "High",
    signal: "Bullish",
    confidence: 82,
    holdings: 3,
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 11200,
    change24h: -1.8,
    change7d: 15.3,
    volatility: 92,
    risk: "Extreme",
    signal: "Neutral",
    confidence: 65,
    holdings: 25,
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    price: 68,
    change24h: 4.2,
    change7d: 18.7,
    volatility: 90,
    risk: "Extreme",
    signal: "Cautious",
    confidence: 58,
    holdings: 500,
  },
]

// Market overview data
const marketOverview = {
  btcPrice: 3850000,
  btcDominance: 52.3,
  ethPrice: 215000,
  totalMarketCap: "₹185.2T",
  volume24h: "₹8.5T",
  fearGreedIndex: 68,
  fearGreedLabel: "Greed",
}

// Chart data
const priceChartData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  btc: 3500000 + Math.random() * 500000,
  eth: 180000 + Math.random() * 50000,
}))

// Prediction data
const predictionData = {
  asset: "BTC",
  currentPrice: 3850000,
  prediction1d: { low: 3750000, high: 3950000, probability: 72 },
  prediction7d: { low: 3600000, high: 4100000, probability: 65 },
  trend: "Up",
  model: "LSTM + XGBoost Ensemble",
}

// News data
const cryptoNews = [
  {
    title: "SEC Approves Multiple Bitcoin ETFs",
    impact: "Positive",
    date: "2 hours ago",
    category: "Regulation",
  },
  {
    title: "Ethereum Network Upgrade Scheduled",
    impact: "Neutral",
    date: "5 hours ago",
    category: "Technology",
  },
  {
    title: "Major Exchange Reports Security Breach",
    impact: "Negative",
    date: "1 day ago",
    category: "Security",
  },
]

// Risk factors
const riskFactors = [
  { factor: "Regulatory Uncertainty", level: "High", score: 8 },
  { factor: "Market Volatility", level: "Extreme", score: 9 },
  { factor: "Liquidity Risk", level: "Medium", score: 6 },
  { factor: "Technology Risk", level: "Medium", score: 5 },
]

export default function CryptoHubPage() {
  return (
    <ProtectedRoute>
      <CryptoHubContent />
    </ProtectedRoute>
  )
}

function CryptoHubContent() {
  const [timeframe, setTimeframe] = useState<"7d" | "30d" | "90d">("30d")
  const [selectedAsset, setSelectedAsset] = useState<"BTC" | "ETH">("BTC")

  // Calculate portfolio metrics
  const totalExposure = cryptoHoldings.reduce(
    (sum, h) => sum + h.price * h.holdings,
    0
  )
  const portfolioChange24h = 2.8 // Weighted average
  const avgVolatility = 88.75
  const avgConfidence = 70.75

  return (
    <AppShell>
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
                <span className="text-orange-600">Crypto</span> Hub
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
                <ShieldAlert className="h-5 w-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-rose-900 dark:text-rose-100 mb-1">
                    ⚠️ High-Risk Asset Class - Advice Only
                  </p>
                  <p className="text-xs text-rose-800 dark:text-rose-200 leading-relaxed">
                    Bharat AI Wealth does not provide crypto trading, wallet, or execution services.
                    Cryptocurrencies are highly volatile and suitable only for high-risk investors.
                    All insights are for educational and informational purposes only. Invest at your own risk.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 1. Crypto Summary Section */}
        <motion.div variants={scrollReveal}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-600" />
            Portfolio Summary
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                label: "Total Crypto Exposure",
                value: `₹${(totalExposure / 100000).toFixed(2)}L`,
                subValue: "12.5% of portfolio",
                icon: Zap,
                color: "orange",
              },
              {
                label: "24h Change",
                value: `${portfolioChange24h >= 0 ? "+" : ""}${portfolioChange24h}%`,
                subValue: portfolioChange24h >= 0 ? "Gaining" : "Declining",
                icon: portfolioChange24h >= 0 ? TrendingUp : TrendingDown,
                color: portfolioChange24h >= 0 ? "emerald" : "rose",
              },
              {
                label: "Risk Level",
                value: "Extreme",
                subValue: `Volatility: ${avgVolatility}%`,
                icon: Flame,
                color: "rose",
              },
              {
                label: "Market Sentiment",
                value: marketOverview.fearGreedLabel,
                subValue: `Index: ${marketOverview.fearGreedIndex}/100`,
                icon: Brain,
                color: "purple",
              },
              {
                label: "AI Confidence",
                value: `${avgConfidence}%`,
                subValue: "Model accuracy",
                icon: Sparkles,
                color: "blue",
              },
            ].map((stat, i) => (
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

        {/* 2. Global Crypto Market Overview */}
        <motion.div variants={scrollReveal}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Global Market Overview
          </h2>
          <Card className="glass-card border-blue-500/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { label: "Bitcoin (BTC)", value: `₹${(marketOverview.btcPrice / 100000).toFixed(2)}L`, sub: `${marketOverview.btcDominance}% dominance` },
                  { label: "Ethereum (ETH)", value: `₹${(marketOverview.ethPrice / 1000).toFixed(1)}K`, sub: "Smart contracts" },
                  { label: "Market Cap", value: marketOverview.totalMarketCap, sub: "Total crypto" },
                  { label: "24h Volume", value: marketOverview.volume24h, sub: "Trading volume" },
                  { label: "Fear & Greed", value: marketOverview.fearGreedIndex, sub: marketOverview.fearGreedLabel },
                  { label: "Market Phase", value: "Risk-On", sub: "High volatility" },
                ].map((item, i) => (
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
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-1">
                      AI Market Insight
                    </p>
                    <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                      Crypto market currently in a high-volatility risk-on phase. Bitcoin dominance at {marketOverview.btcDominance}%
                      suggests capital rotation into altcoins. Fear & Greed Index at {marketOverview.fearGreedIndex} indicates
                      potential overheating. Exercise caution with position sizing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3. Holdings / Watchlist Table */}
        <motion.div variants={scrollReveal}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Eye className="h-5 w-5 text-purple-600" />
              Holdings & Watchlist
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add to Watchlist
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <Card className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider">Asset</th>
                    <th className="text-right p-4 text-xs font-bold uppercase tracking-wider">Price</th>
                    <th className="text-right p-4 text-xs font-bold uppercase tracking-wider">24h</th>
                    <th className="text-right p-4 text-xs font-bold uppercase tracking-wider">7d</th>
                    <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">Volatility</th>
                    <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">Risk</th>
                    <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">AI Signal</th>
                    <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">Confidence</th>
                    <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoHoldings.map((crypto, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 dark:from-orange-600 dark:to-rose-600 flex items-center justify-center text-white font-bold text-sm">
                            {crypto.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{crypto.symbol}</p>
                            <p className="text-xs text-muted-foreground">{crypto.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-bold tabular-nums text-foreground">
                        ₹{crypto.price.toLocaleString("en-IN")}
                      </td>
                      <td className="p-4 text-right">
                        <span className={`font-bold ${crypto.change24h >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h}%
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`font-bold ${crypto.change7d >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {crypto.change7d >= 0 ? "+" : ""}{crypto.change7d}%
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
                              style={{ width: `${crypto.volatility}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold">{crypto.volatility}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <Badge
                          className={`${crypto.risk === "Extreme"
                              ? "bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/20 dark:border-rose-500/30"
                              : "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20 dark:border-amber-500/30"
                            }`}
                        >
                          {crypto.risk}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <Badge
                          className={`${crypto.signal === "Bullish"
                              ? "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30"
                              : crypto.signal === "Cautious"
                                ? "bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/20 dark:border-rose-500/30"
                                : "bg-slate-500/10 dark:bg-slate-500/20 text-slate-600 dark:text-slate-400 border-slate-500/20 dark:border-slate-500/30"
                            }`}
                        >
                          {crypto.signal}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <span className="font-bold text-sm text-foreground">{crypto.confidence}%</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link href={`/crypto/analysis?symbol=${crypto.symbol}`}>
                            <Button variant="ghost" size="sm" className="h-8 px-3">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="h-8 px-3">
                            <Calculator className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* 4. Performance & Trend Analysis + 5. ML Prediction */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
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

          {/* ML Prediction */}
          <motion.div variants={scrollReveal}>
            <Card className="glass-card border-purple-500/20 h-full">
              <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-border">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  ML Price Prediction
                  <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 ml-auto">
                    AI-Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      Current Price ({predictionData.asset})
                    </p>
                    <p className="text-4xl font-bold tabular-nums">
                      ₹{(predictionData.currentPrice / 100000).toFixed(2)}L
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        1-Day Forecast
                      </p>
                      <p className="text-sm font-bold mb-1">
                        ₹{(predictionData.prediction1d.low / 100000).toFixed(2)}L - ₹{(predictionData.prediction1d.high / 100000).toFixed(2)}L
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${predictionData.prediction1d.probability}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold">{predictionData.prediction1d.probability}%</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        7-Day Forecast
                      </p>
                      <p className="text-sm font-bold mb-1">
                        ₹{(predictionData.prediction7d.low / 100000).toFixed(2)}L - ₹{(predictionData.prediction7d.high / 100000).toFixed(2)}L
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${predictionData.prediction7d.probability}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold">{predictionData.prediction7d.probability}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        Trend Bias
                      </p>
                      <p className="text-lg font-bold text-emerald-600 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        {predictionData.trend}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                        Model Used
                      </p>
                      <p className="text-xs font-bold">{predictionData.model}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                        <span className="font-bold">Disclaimer:</span> Predictions are probabilistic and not guaranteed.
                        Crypto markets are highly volatile. Use for educational purposes only.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AppShell>
  )
}
