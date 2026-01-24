"use client"

import { useState, useEffect, useMemo } from "react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  TrendingUp, Zap, ArrowUpRight, ArrowDownRight, AlertTriangle, Target, Brain,
  Sparkles, Info, Plus, Eye, Flame, Activity, X, BarChart3, ShieldAlert,
  Dna, Cpu, Search, RefreshCw, Layers
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { fetchPortfolioAssets } from "@/lib/api"
import { motion, AnimatePresence } from "framer-motion"

const defaultAssets = [
  { name: "Adani Enterprises", type: "Growth Stock", value: 120000, return: 45.2, confidence: 55, risk: "Very High", change: 8.5, greeks: { delta: 0.85, gamma: 0.04 } },
  { name: "Suzlon Energy", type: "Penny Stock", value: 80000, return: 38.5, confidence: 58, risk: "Very High", change: 6.2, greeks: { delta: 0.92, gamma: 0.08 } },
  { name: "NIFTY JAN 22000 CE", type: "F&O / Options", value: 50000, return: 52.8, confidence: 48, risk: "Very High", change: -12.3, greeks: { delta: 0.65, gamma: 0.12 } },
  { name: "SBI Small Cap Fund", type: "Small Cap MF", value: 40000, return: 28.5, confidence: 65, risk: "High", change: 4.1, greeks: null },
  { name: "Zomato Ltd", type: "Growth Stock", value: 25000, return: 22.3, confidence: 52, risk: "Very High", change: -5.8, greeks: { delta: 0.78, gamma: 0.06 } },
  { name: "Tata Motors DVR", type: "Equity", value: 20000, return: 35.0, confidence: 45, risk: "High", change: 15.2, greeks: null },
]

const allocationData = [
  { name: "Growth Stocks", value: 46, color: "#f43f5e" },
  { name: "Speculative Ops", value: 16, color: "#f97316" },
  { name: "Small Cap MF", value: 13, color: "#6366f1" },
  { name: "F&O Positions", value: 8, color: "#16A34A" },
  { name: "Other", value: 17, color: "#64748b" },
]

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  value: 250000 + (i * 30000) + (Math.random() * 80000 - 40000)
}))

const marketSentiment = [
  { stock: "RELIANCE", sentiment: "Bullish", trend: "up", predicted: "+5.5%" },
  { stock: "ADANIENT", sentiment: "Bullish", trend: "up", predicted: "+8.2%" },
  { stock: "ZOMATO", sentiment: "Neutral", trend: "down", predicted: "-3.4%" },
]

const scannerData = [
  { symbol: "JBM AUTO", price: "2,145.00", change: 18.5, volume: "10.2x", signal: "Breakout" },
  { symbol: "VADILAL IND", price: "4,890.00", change: 12.2, volume: "8.5x", signal: "Upper Circuit" },
  { symbol: "NBCC", price: "185.20", change: 9.8, volume: "15.1x", signal: "Volume Spike" },
  { symbol: "SUZLON", price: "45.10", change: 6.2, volume: "5.4x", signal: "Trend Cont." },
]

export default function HighRiskPortfolioPage() {
  return (
    <ProtectedRoute>
      <HighRiskPortfolioContent />
    </ProtectedRoute>
  )
}

function HighRiskPortfolioContent() {
  const [assets, setAssets] = useState(defaultAssets)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isBlackSwanActive, setIsBlackSwanActive] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    fetchPortfolioAssets("high").then(data => {
      if (data?.assets?.length > 0) setAssets(data.assets)
    })
  }, [])

  const currentAssets = useMemo(() => {
    if (!isBlackSwanActive) return assets
    return assets.map(a => ({
      ...a,
      value: a.value * (1 - (Math.random() * 0.4 + 0.3)), // 30-70% drop
      change: a.change - (Math.random() * 50 + 20)
    }))
  }, [assets, isBlackSwanActive])

  const totalValue = currentAssets.reduce((sum, asset) => sum + asset.value, 0)
  const avgReturn = currentAssets.reduce((sum, asset) => sum + asset.return, 0) / currentAssets.length

  return (
    <AppShell>
      <div className="relative isolate">
        {/* Advanced Background Grid Effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5" />
        </div>

        <div className="space-y-8 pb-20">
          {/* Header with Scan Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                  <Flame className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                    High Risk Engine
                  </h1>
                  <p className="text-sm text-muted-foreground font-medium">Speculative Alpha & Leveraged Expansion</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-secondary/30 p-1.5 rounded-2xl border border-border/50 backdrop-blur-md">
              <Button
                variant={isBlackSwanActive ? "destructive" : "ghost"}
                size="sm"
                className="rounded-xl h-10 px-4 font-bold transition-all"
                onClick={() => setIsBlackSwanActive(!isBlackSwanActive)}
              >
                <ShieldAlert className="h-4 w-4 mr-2" />
                {isBlackSwanActive ? "CRASH MODE ACTIVE" : "STRESS TEST"}
              </Button>
              <div className="h-6 w-[1px] bg-border/50 mx-1" />
              <Button
                variant="outline"
                size="sm"
                className={`rounded-xl h-10 px-4 font-bold transition-all border-cyan-500/30 ${isScanning ? 'animate-pulse bg-cyan-500/20 text-cyan-600 border-cyan-500' : 'text-cyan-600 hover:bg-cyan-500/10'}`}
                onClick={() => {
                  setIsScanning(true)
                  setTimeout(() => setIsScanning(false), 3000)
                }}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isScanning ? 'animate-spin' : ''}`} />
                {isScanning ? "SCANNING SECTORS..." : "SCAN VOLATILITY"}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {isBlackSwanActive && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Alert className="border-red-600 bg-red-600/10 text-red-600 animate-pulse border-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <AlertTitle className="font-black text-lg">⚠️ BLACK SWAN SCENARIO ACTIVE</AlertTitle>
                  <AlertDescription className="font-medium">
                    Simulating a 40% market drawdown. View your portfolio's resilience and liquidity under extreme stress conditions.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Alpha Dashboard Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/50 bg-secondary/20 backdrop-blur-xl group hover:border-red-500/30 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold border-primary/20 bg-primary/5">ALPHA ENGINE</Badge>
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Assets</p>
                <h3 className="text-3xl font-black tabular-nums">₹{(totalValue / 100000).toFixed(2)}L</h3>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-secondary/20 backdrop-blur-xl group hover:border-emerald-500/30 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                    <Zap className="h-5 w-5 text-emerald-500" />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold border-emerald-500/20 bg-emerald-500/5">GROWTH</Badge>
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Target Return</p>
                <h3 className={`text-3xl font-black tabular-nums ${isBlackSwanActive ? 'text-red-500' : 'text-emerald-500'}`}>
                  {isBlackSwanActive ? '-' : '+'}{Math.abs(avgReturn).toFixed(1)}%
                </h3>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-secondary/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Portfolio Beta</p>
                  <Dna className="h-4 w-4 text-rose-500" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">1.85</span>
                  <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-1.5 rounded-full">Aggressive</span>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                  <span>MARKET CORR: 0.92</span>
                  <span>VAR: 12.5%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-secondary/20 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sharpe Ratio</p>
                  <Cpu className="h-4 w-4 text-cyan-500" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">2.14</span>
                  <span className="text-[10px] font-bold text-cyan-500 bg-cyan-500/10 px-1.5 rounded-full">Excellent</span>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-muted-foreground mb-1">
                    <span>Alpha Scrutiny</span>
                    <span>High</span>
                  </div>
                  <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Volatility Scanner Component */}
            <Card className="border-border/50 shadow-xl overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
              <CardHeader className="border-b border-border/50 bg-secondary/10">
                <CardTitle className="text-sm font-bold flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-cyan-600" />
                    Momentum Scanner
                  </div>
                  <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-600 border-cyan-500/20 text-[10px]">REAL-TIME</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {scannerData.map((item, i) => (
                    <motion.div
                      key={item.symbol}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 hover:bg-cyan-500/5 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-sm group-hover:text-cyan-600 transition-colors">{item.symbol}</span>
                        <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                          <ArrowUpRight className="h-3 w-3" />
                          {item.change}%
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground">
                        <span className="bg-secondary/50 px-2 py-0.5 rounded-full">Price: ₹{item.price}</span>
                        <span>Vol: {item.volume} Avg</span>
                        <span className="text-cyan-600">{item.signal}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="p-4 bg-secondary/10 border-t border-border/50">
                  <Button variant="ghost" size="sm" className="w-full text-xs font-bold uppercase tracking-widest h-9">
                    Expand Scanner View
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-border/50 shadow-xl bg-orange-500/5 border-orange-500/10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Brain className="h-32 w-32 border-none" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                  AI Alpha Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {marketSentiment.map((item, i) => (
                    <div key={i} className="p-4 rounded-3xl bg-background/50 border border-orange-500/20 hover:border-orange-500 transition-all group/item shadow-inner">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center group-hover/item:bg-orange-500/20 transition-colors">
                          <TrendingUp className="h-4 w-4 text-orange-600" />
                        </div>
                        <Badge variant="outline" className="text-[9px] border-orange-200 text-orange-700 font-black">{item.sentiment}</Badge>
                      </div>
                      <p className="text-sm font-black mb-1">{item.stock}</p>
                      <div className="flex items-center gap-1">
                        <span className={`text-lg font-black ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>{item.predicted}</span>
                        {item.trend === 'up' ? <ArrowUpRight className="h-4 w-4 text-emerald-500" /> : <ArrowDownRight className="h-4 w-4 text-rose-500" />}
                      </div>
                      <div className="mt-4 flex gap-1 h-1.5">
                        <div className="flex-1 bg-orange-200/50 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-2xl bg-secondary/20 border border-border/50 text-xs text-muted-foreground flex gap-3">
                  <Info className="h-4 w-4 mt-1 flex-shrink-0 text-orange-600" />
                  <p className="leading-relaxed font-medium">
                    Our AI models utilize long-tailed sentiment analysis and order-flow scanning to detect institutional accumulation zones in high-alpha stocks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 shadow-xl overflow-hidden">
            <CardHeader className="pb-4"><CardTitle className="text-xl font-black flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-red-600" />
              Strategic Holdings & Advanced Metrics
            </CardTitle></CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/20 text-[10px] font-black uppercase text-muted-foreground border-y border-border/50">
                    <tr>
                      <th className="text-left p-6">Asset Intelligence</th>
                      <th className="text-right p-6 hidden md:table-cell">Greeks Analysis</th>
                      <th className="text-right p-6">Valuation</th>
                      <th className="text-right p-6">ML Confidence</th>
                      <th className="text-right p-6">24H Flux</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {currentAssets.map((asset, i) => (
                      <motion.tr
                        key={i}
                        whileHover={{ backgroundColor: "rgba(244, 63, 94, 0.05)" }}
                        className="transition-colors group"
                      >
                        <td className="p-6">
                          <div>
                            <p className="font-extrabold text-sm group-hover:text-red-600 transition-colors">{asset.name}</p>
                            <div className="flex gap-2 mt-1.5">
                              <Badge variant="secondary" className="text-[10px] font-bold bg-secondary/80 text-muted-foreground uppercase">{asset.type}</Badge>
                              <Badge variant="outline" className={`text-[10px] font-black uppercase ${asset.risk === 'Very High' ? 'border-red-500/30 text-red-600 bg-red-50' : 'border-amber-500/30 text-amber-600'}`}>
                                {asset.risk}
                              </Badge>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-right hidden md:table-cell">
                          {asset.greeks ? (
                            <div className="flex flex-col items-end gap-1.5">
                              <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                                <span>Δ: <span className="text-foreground">{asset.greeks.delta}</span></span>
                                <span>Γ: <span className="text-foreground">{asset.greeks.gamma}</span></span>
                              </div>
                              <div className="flex gap-1">
                                <div className="h-1 w-8 bg-red-100 dark:bg-red-900/30 rounded-full overflow-hidden">
                                  <div className="h-full bg-red-500" style={{ width: `${asset.greeks.delta * 100}%` }} />
                                </div>
                                <div className="h-1 w-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500" style={{ width: `${asset.greeks.gamma * 1000}%` }} />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">N/A (Equity)</span>
                          )}
                        </td>
                        <td className="p-6 text-right font-black tabular-nums">
                          <p className="text-sm">₹{asset.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          <p className="text-[10px] text-muted-foreground font-bold">Qty: 240</p>
                        </td>
                        <td className="p-6 text-right font-bold text-xs">
                          <div className="inline-flex flex-col items-end">
                            <span>{asset.confidence}%</span>
                            <div className="h-1 w-16 bg-secondary rounded-full overflow-hidden mt-1">
                              <div className="h-full bg-primary" style={{ width: `${asset.confidence}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black shadow-sm ${asset.change >= 0 ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-red-500/10 text-red-600 border border-red-500/20"}`}>
                            {asset.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {asset.change >= 0 ? "+" : ""}{asset.change.toFixed(1)}%
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-4">
            <Button onClick={() => setShowAddModal(true)} className="h-14 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black rounded-2xl shadow-xl shadow-red-500/20 transition-all hover:scale-[1.02] active:scale-95">
              <Plus className="h-5 w-5 mr-3" />
              ADD HIGH-SPECULATION ASSET
            </Button>
            <Button variant="outline" className="h-14 font-black rounded-2xl border-2 hover:bg-secondary/50 transition-all active:scale-95" onClick={() => window.open('/portfolio', '_self')}>
              <Eye className="h-5 w-5 mr-3" />
              VIEW COMPREHENSIVE ENGINE
            </Button>
          </div>

          <div className="p-8 rounded-3xl bg-secondary/20 border border-border/50 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 h-full w-1.5 bg-red-600" />
            <div className="flex items-start gap-6">
              <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-black text-red-600 uppercase tracking-tight">Financial Hazard Protocols</h4>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-3xl">
                  By operating the High Risk Engine, you acknowledge that capital drawdown can exceed 50% in bearish cycles. This portfolio utilizes F&O and penny stock filters which are fundamentally speculative. Never allocate more than 10-15% of your total net worth to this specific engine.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-600 bg-red-500/5 px-3 py-1.5 rounded-full border border-red-500/10">
                    <ShieldAlert className="h-3 w-3" />
                    Strict Stop-Loss Required
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-600 bg-amber-500/5 px-3 py-1.5 rounded-full border border-amber-500/10">
                    <Activity className="h-3 w-3" />
                    Manual Intervention Protocol
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="w-full max-w-md border-border/50 shadow-2xl relative bg-background/80 backdrop-blur-2xl">
              <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-6">
                <CardTitle className="text-xl font-black">Speculative Entry</CardTitle>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowAddModal(false)}><X className="h-4 w-4" /></Button>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Execution Type</label>
                  <select className="w-full p-4 rounded-2xl border border-border/50 bg-secondary/50 font-bold text-sm focus:ring-2 focus:ring-red-500 transition-all outline-none appearance-none">
                    <option>Speculative Growth Stocks</option>
                    <option>F&O Contracts (Options)</option>
                    <option>Pre-Breakout Penny Stocks</option>
                    <option>Small Cap Concentration</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Ticker Symbol</label>
                  <Input placeholder="e.g. ADANIENT" className="h-12 rounded-2xl bg-secondary/50 border-border/50 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-muted-foreground tracking-widest">Allocation (₹)</label>
                  <Input type="number" placeholder="50,000" className="h-12 rounded-2xl bg-secondary/50 border-border/50 font-bold" />
                </div>
                <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 flex gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                  <p className="text-[10px] text-red-600 font-bold leading-relaxed uppercase">
                    Warning: Speculative entry points are high-gamma and require immediate monitoring.
                  </p>
                </div>
                <Button className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-red-500/20" onClick={() => setShowAddModal(false)}>
                  EXECUTE SPECULATIVE POSITION
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AppShell>
  )
}

function TrendingDown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  )
}
