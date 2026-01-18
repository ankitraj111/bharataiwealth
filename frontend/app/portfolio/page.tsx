"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    TrendingUp,
    TrendingDown,
    PieChart,
    LineChart,
    Bell,
    RefreshCw,
    Plus,
    Download,
    Link2,
    FileText,
    AlertTriangle,
    CheckCircle2,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    BarChart3,
    Brain,
    Shield,
    ShieldAlert,
    X,
    Sparkles,
    Clock,
    Target,
    Star,
    Eye,
    Repeat,
    Activity,
    Calendar,
    IndianRupee,
    Zap,
    ShieldCheck,
    ArrowRight
} from "lucide-react"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, LineChart as RechartsLine, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts"
import { staggerContainer, scrollReveal } from "@/lib/animation-variants"

// ============================================
// DUMMY DATA
// ============================================
const stocksData = [
    { symbol: "RELIANCE", name: "Reliance Industries", qty: 50, avgPrice: 2450, currentPrice: 2680, category: "Large Cap", change: 9.4 },
    { symbol: "TCS", name: "Tata Consultancy", qty: 25, avgPrice: 3200, currentPrice: 3450, category: "Large Cap", change: 7.8 },
    { symbol: "HDFC", name: "HDFC Bank", qty: 40, avgPrice: 1550, currentPrice: 1480, category: "Large Cap", change: -4.5 },
    { symbol: "INFY", name: "Infosys", qty: 30, avgPrice: 1400, currentPrice: 1520, category: "Large Cap", change: 8.6 },
    { symbol: "TATAMOTORS", name: "Tata Motors", qty: 100, avgPrice: 580, currentPrice: 720, category: "Mid Cap", change: 24.1 },
]

const mfData = [
    { symbol: "AXIS-BLUECHIP", name: "Axis Bluechip Fund", units: 500, avgNav: 42, currentNav: 48.5, category: "Large Cap", change: 15.5 },
    { symbol: "HDFC-MIDCAP", name: "HDFC Mid-Cap Opp", units: 300, avgNav: 95, currentNav: 108, category: "Mid Cap", change: 13.7 },
    { symbol: "SBI-SMALLCAP", name: "SBI Small Cap", units: 200, avgNav: 120, currentNav: 145, category: "Small Cap", change: 20.8 },
    { symbol: "ICICI-LIQUID", name: "ICICI Prudential Liquid", units: 1000, avgNav: 310, currentNav: 318, category: "Debt", change: 2.6 },
]

const cryptoData = [
    { symbol: "BTC", name: "Bitcoin", qty: 0.5, avgPrice: 3200000, currentPrice: 3850000, category: "Crypto", change: 20.3 },
    { symbol: "ETH", name: "Ethereum", qty: 3, avgPrice: 180000, currentPrice: 215000, category: "Crypto", change: 19.4 },
    { symbol: "SOL", name: "Solana", qty: 25, avgPrice: 8500, currentPrice: 11200, category: "Crypto", change: 31.8 },
]

const pieData = [
    { name: "Large Cap", value: 45, color: "#0A66C2" },
    { name: "Mid Cap", value: 20, color: "#FF8C00" },
    { name: "Small Cap", value: 10, color: "#16A34A" },
    { name: "Debt", value: 15, color: "#6366f1" },
    { name: "Crypto", value: 10, color: "#f43f5e" },
]

const trendData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    value: 2500000 + Math.random() * 300000 - 100000 + i * 8000
}))

const aiInsights = [
    { type: "BUY", asset: "TATAMOTORS", reason: "Relative Strength Index shows bullish divergence. Momentum building.", confidence: 92, timeframe: "Short-term" },
    { type: "SELL", asset: "HDFC BANK", reason: "Sectoral weakness detected. Higher volatility expected near resistance.", confidence: 78, timeframe: "Intraday" },
    { type: "ACCUMULATE", asset: "RELIANCE", reason: "Value zone identified. Long-term accumulation recommended at these levels.", confidence: 85, timeframe: "Long-term" },
]

const stopLossAlerts = [
    { asset: "HDFC", currentPrice: 1480, stopLoss: 1500, triggered: true },
]

const rebalanceSuggestions = {
    overweight: { category: "Large Cap", current: 45, target: 35, action: "Reduce exposure" },
    underweight: { category: "Debt", current: 15, target: 25, action: "Increase allocation" },
}

// NEW DATA FOR ENHANCED SECTIONS
const marketData = [
    { name: "NIFTY 50", value: "22,147.50", change: 1.24, trending: true },
    { name: "SENSEX", value: "72,831.94", change: 1.18, trending: true },
    { name: "GOLD", value: "₹71,250/10g", change: 0.45, trending: true },
    { name: "USD/INR", value: "₹83.12", change: -0.08, trending: false },
]

const watchlistData = [
    { symbol: "BHARTIARTL", name: "Bharti Airtel", price: 1245, change: 2.3 },
    { symbol: "ICICIBANK", name: "ICICI Bank", price: 1089, change: 1.8 },
    { symbol: "LT", name: "Larsen & Toubro", price: 3420, change: -0.5 },
    { symbol: "ASIANPAINT", name: "Asian Paints", price: 2890, change: 0.9 },
]

const sipData = [
    { name: "Axis Bluechip Fund", amount: 10000, nextDate: "15 Jan 2026", status: "Active" },
    { name: "HDFC Mid-Cap Opp", amount: 5000, nextDate: "20 Jan 2026", status: "Active" },
    { name: "SBI Small Cap", amount: 3000, nextDate: "10 Jan 2026", status: "Active" },
]

const dividendData = [
    { stock: "TCS", exDate: "18 Jan 2026", amount: "₹75/share", totalExpected: "₹1,875" },
    { stock: "INFY", exDate: "25 Jan 2026", amount: "₹18/share", totalExpected: "₹540" },
    { stock: "RELIANCE", exDate: "05 Feb 2026", amount: "₹9/share", totalExpected: "₹450" },
]

const transactionsData = [
    { date: "10 Jan 2026", asset: "TATAMOTORS", type: "BUY", qty: 25, price: 710, total: 17750 },
    { date: "08 Jan 2026", asset: "ETH", type: "BUY", qty: 1, price: 210000, total: 210000 },
    { date: "05 Jan 2026", asset: "HDFC", type: "SELL", qty: 10, price: 1520, total: 15200 },
    { date: "02 Jan 2026", asset: "Axis Bluechip", type: "SIP", qty: 50, price: 48, total: 2400 },
    { date: "28 Dec 2025", asset: "RELIANCE", type: "BUY", qty: 10, price: 2650, total: 26500 },
]

// ============================================
// PORTFOLIO HEALTH SCORE COMPONENT
// ============================================
function PortfolioHealthScore({ score }: { score: number }) {
    const [animatedScore, setAnimatedScore] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedScore(score)
        }, 500)
        return () => clearTimeout(timer)
    }, [score])

    const getScoreColor = (s: number) => {
        if (s >= 80) return "text-emerald-500"
        if (s >= 60) return "text-amber-500"
        return "text-rose-500"
    }

    const getScoreBg = (s: number) => {
        if (s >= 80) return "bg-emerald-500/10"
        if (s >= 60) return "bg-amber-500/10"
        return "bg-rose-500/10"
    }

    const getScoreStroke = (s: number) => {
        if (s >= 80) return "hsl(var(--emerald-500))"
        if (s >= 60) return "hsl(var(--amber-500))"
        return "hsl(var(--rose-500))"
    }

    const getScoreLabel = (s: number) => {
        if (s >= 80) return "Optimal Performance"
        if (s >= 60) return "Good Diversity"
        if (s >= 40) return "Needs Balancing"
        return "High Risk Exposure"
    }

    const circumference = 2 * Math.PI * 40
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference

    return (
        <Card className="glass-card overflow-hidden group hover:border-[#0A66C2]/30 transition-all duration-500">
            <CardHeader className="pb-2 border-b border-border/10 bg-muted/5">
                <CardTitle className="text-base font-bold flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[#0A66C2]" />
                        Portfolio Health Index
                    </div>
                    <Badge variant="outline" className="border-[#0A66C2]/30 text-[#0A66C2] bg-[#0A66C2]/5">
                        <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                        AI Verified
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Circular Gauge */}
                    <div className="relative group/gauge">
                        <div className="absolute inset-0 bg-[#0A66C2]/20 blur-3xl rounded-full opacity-0 group-hover/gauge:opacity-100 transition-opacity duration-700" />
                        <svg className="w-32 h-32 -rotate-90 relative z-10">
                            <circle
                                cx="64"
                                cy="64"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-muted/10"
                            />
                            <motion.circle
                                cx="64"
                                cy="64"
                                r="40"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={getScoreColor(score)}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`text-3xl font-black ${getScoreColor(score)}`}
                            >
                                {animatedScore}
                            </motion.span>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Score</span>
                        </div>
                    </div>

                    {/* Score Breakdown */}
                    <div className="flex-1 w-full space-y-4">
                        <div>
                            <p className={`text-lg font-bold mb-1 ${getScoreColor(score)}`}>
                                {getScoreLabel(score)}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Your portfolio is currently {score}% optimized for long-term wealth creation according to our AI models.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { label: "Diversification", value: 85, icon: PieChart },
                                { label: "Volatility Control", value: 72, icon: ShieldCheck },
                                { label: "Yield Yield", value: 78, icon: TrendingUp },
                            ].map((metric) => (
                                <div key={metric.label} className="p-3 rounded-xl bg-muted/30 border border-border/50 group-hover:border-[#0A66C2]/20 transition-all">
                                    <div className="flex items-center justify-between mb-2">
                                        <metric.icon className="h-3 w-3 text-[#0A66C2]" />
                                        <span className="text-[10px] font-bold text-[#0A66C2]">{metric.value}%</span>
                                    </div>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-2">{metric.label}</p>
                                    <div className="h-1 bg-background rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${metric.value}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-[#0A66C2] rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// ============================================
// MAIN PORTFOLIO PAGE
// ============================================
export default function PortfolioPage() {
    const [activeTab, setActiveTab] = useState<"stocks" | "mf" | "crypto">("stocks")
    const [showAddModal, setShowAddModal] = useState(false)

    // Calculate totals
    const stocksTotal = stocksData.reduce((sum, s) => sum + s.qty * s.currentPrice, 0)
    const stocksInvested = stocksData.reduce((sum, s) => sum + s.qty * s.avgPrice, 0)
    const mfTotal = mfData.reduce((sum, s) => sum + s.units * s.currentNav, 0)
    const mfInvested = mfData.reduce((sum, s) => sum + s.units * s.avgNav, 0)
    const cryptoTotal = cryptoData.reduce((sum, s) => sum + s.qty * s.currentPrice, 0)
    const cryptoInvested = cryptoData.reduce((sum, s) => sum + s.qty * s.avgPrice, 0)

    const totalInvested = stocksInvested + mfInvested + cryptoInvested
    const currentValue = stocksTotal + mfTotal + cryptoTotal
    const profit = currentValue - totalInvested
    const profitPercent = ((profit / totalInvested) * 100).toFixed(2)
    const isProfit = profit >= 0

    const currentData = activeTab === "stocks" ? stocksData : activeTab === "mf" ? mfData : cryptoData

    return (
        <AppShell>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-10 pb-20"
            >
                {/* ========== 1. HEADER SECTION ========== */}
                <motion.div variants={scrollReveal} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center border border-[#0A66C2]/20 shadow-lg shadow-[#0A66C2]/10">
                                <Wallet className="h-6 w-6 text-[#0A66C2]" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                                    Your <span className="text-[#0A66C2]">Portfolio</span>
                                </h1>
                                <p className="text-muted-foreground flex items-center gap-2">
                                    <Sparkles className="h-3 w-3 text-amber-500" /> Complete Portfolio Overview
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={() => setShowAddModal(true)}
                            className="rounded-xl bg-[#0A66C2] hover:bg-[#0855a1] text-white shadow-lg shadow-[#0A66C2]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add New Asset
                        </Button>
                        <Button variant="outline" className="rounded-xl border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-all">
                            <Download className="h-4 w-4 mr-2" /> Export Report
                        </Button>
                    </div>
                </motion.div>

                {/* ========== 2. MARKET PULSE ========== */}
                <motion.div variants={scrollReveal} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {marketData.map((market, i) => (
                        <div key={i} className="glass-card p-4 flex items-center justify-between group hover:border-[#0A66C2]/30 transition-all">
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{market.name}</p>
                                <p className="text-lg font-bold tabular-nums">{market.value}</p>
                            </div>
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${market.change >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                                }`}>
                                {market.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                {market.change >= 0 ? "+" : ""}{market.change}%
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* ========== 3. CORE ANALYTICS GRID (TOP) ========== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Total Invested", value: `₹${(totalInvested / 100000).toFixed(2)}L`, icon: IndianRupee, color: "text-blue-500", bg: "bg-blue-500/10" },
                        { label: "Current Portfolio Value", value: `₹${(currentValue / 100000).toFixed(2)}L`, icon: TrendingUp, color: "text-[#0A66C2]", bg: "bg-[#0A66C2]/10" },
                        { label: "Net Gain/Loss", value: `₹${(profit / 1000).toFixed(1)}K`, icon: Zap, color: isProfit ? "text-emerald-500" : "text-rose-500", bg: isProfit ? "bg-emerald-500/10" : "bg-rose-500/10", suffix: `${isProfit ? "+" : ""}${profitPercent}%` },
                        { label: "Monthly AI Yield", value: "₹42,500", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/10" },
                    ].map((stat, i) => (
                        <motion.div key={i} variants={scrollReveal}>
                            <Card className="glass-card group hover:border-[#0A66C2]/30 transition-all relative overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                            <div className="flex items-center gap-3">
                                                <p className="text-2xl font-black tabular-nums">{stat.value}</p>
                                                {stat.suffix && (
                                                    <Badge className={isProfit ? "bg-emerald-500/10 text-emerald-500 border-none px-1" : "bg-rose-500/10 text-rose-500 border-none px-1"}>
                                                        {stat.suffix}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                            <stat.icon className="h-5 w-5" />
                                        </div>
                                    </div>
                                    {/* Decorative background element */}
                                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <stat.icon className="h-24 w-24" />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* ========== 4. CORE ANALYTICS GRID (MIDDLE) ========== */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Health & Momentum */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div variants={scrollReveal}>
                            <PortfolioHealthScore score={78} />
                        </motion.div>

                        <motion.div variants={scrollReveal}>
                            <Card className="glass-card">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-base font-bold flex items-center gap-2">
                                        <Activity className="h-4 w-4 text-[#0A66C2]" />
                                        Portfolio Value Momentum (30D)
                                    </CardTitle>
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold">
                                        <div className="h-2 w-2 rounded-full bg-[#0A66C2]" /> AI TRENDING POSITIVE
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[280px] w-full mt-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={trendData}>
                                                <defs>
                                                    <linearGradient id="mainTrend" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#0A66C2" stopOpacity={0.2} />
                                                        <stop offset="100%" stopColor="#0A66C2" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis
                                                    dataKey="day"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                                                />
                                                <YAxis
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                                                    tickFormatter={(v) => `₹${(Number(v) / 100000).toFixed(0)}L`}
                                                />
                                                <Tooltip
                                                    cursor={{ stroke: '#0855a1', strokeWidth: 1, strokeDasharray: '4 4' }}
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(var(--background), 0.8)',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(var(--border), 0.3)',
                                                        backdropFilter: 'blur(8px)'
                                                    }}
                                                    formatter={(v: any) => [`₹${(Number(v) / 100000).toFixed(2)}L`, 'Portfolio Value']}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="#0A66C2"
                                                    strokeWidth={3}
                                                    fill="url(#mainTrend)"
                                                    animationDuration={2000}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column: Allocation & Insights */}
                    <div className="space-y-8">
                        <motion.div variants={scrollReveal}>
                            <Card className="glass-card flex flex-col h-[400px]">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base font-bold flex items-center gap-2">
                                        <PieChart className="h-4 w-4 text-emerald-500" />
                                        Asset Distribution
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 min-h-0 flex flex-col">
                                    <div className="flex-1">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RechartsPie>
                                                <Pie
                                                    data={pieData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={65}
                                                    outerRadius={95}
                                                    dataKey="value"
                                                    paddingAngle={5}
                                                    stroke="none"
                                                >
                                                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'rgba(var(--background), 0.8)',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(var(--border), 0.3)',
                                                        backdropFilter: 'blur(8px)'
                                                    }}
                                                />
                                            </RechartsPie>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-3 mt-4">
                                        {pieData.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 group cursor-default">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                                    {item.name} <span className="text-[10px] font-bold">({item.value}%)</span>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={scrollReveal}>
                            <Card className="glass-card border-blue-500/20 bg-blue-500/5 h-full">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                                            <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
                                            AI Asset Insights
                                        </CardTitle>
                                        <Badge className="bg-blue-600/10 text-blue-600 border-none text-[9px] font-black uppercase">Engine v4.2</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {aiInsights.map((insight, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/50 dark:border-white/10 hover:border-blue-500/30 transition-all flex flex-col gap-3 group">
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-3">
                                                    <div className={`p-2 h-10 w-10 shrink-0 rounded-xl flex items-center justify-center shadow-inner ${insight.type === "BUY" ? "bg-emerald-500/20 text-emerald-600" :
                                                        insight.type === "SELL" ? "bg-rose-500/20 text-rose-600" : "bg-blue-500/20 text-blue-600"
                                                        }`}>
                                                        {insight.type === "BUY" ? <TrendingUp className="h-5 w-5" /> :
                                                            insight.type === "SELL" ? <TrendingDown className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${insight.type === "BUY" ? "bg-emerald-500 text-white" :
                                                                insight.type === "SELL" ? "bg-rose-500 text-white" : "bg-blue-500 text-white"
                                                                }`}>
                                                                {insight.type}
                                                            </span>
                                                            <p className="font-black text-sm tracking-tight uppercase">{insight.asset}</p>
                                                        </div>
                                                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{insight.timeframe}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">{insight.confidence}%</p>
                                                    <p className="text-[8px] text-muted-foreground font-bold uppercase">Confidence</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-xs text-muted-foreground leading-snug italic font-medium">"{insight.reason}"</p>
                                                <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${insight.confidence}%` }}
                                                        transition={{ duration: 1, delay: i * 0.2 }}
                                                        className={`h-full rounded-full ${insight.type === "BUY" ? "bg-emerald-500" :
                                                            insight.type === "SELL" ? "bg-rose-500" : "bg-blue-500"
                                                            }`}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button variant="outline" className="w-full h-11 rounded-xl border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest gap-2 mt-2">
                                        View Full Intelligence Feed <ArrowRight className="h-3 w-3" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* ========== 5. DETAILED HOLDINGS TABLE ========== */}
                <motion.div variants={scrollReveal}>
                    <Card className="glass-card overflow-hidden">
                        <CardHeader className="bg-muted/5 border-b border-border/10">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <CardTitle className="text-xl font-black tracking-tight">Portfolio Asset List</CardTitle>
                                    <p className="text-xs text-muted-foreground mt-1 font-medium tracking-wide">DETAILED BREAKDOWN OVER ALL CLASSES</p>
                                </div>
                                <div className="flex bg-muted/30 p-1 rounded-xl backdrop-blur-md border border-border/50 overflow-x-auto scroller-hide">
                                    {(["stocks", "mf", "crypto"] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${activeTab === tab
                                                ? "bg-[#0A66C2] text-white shadow-md"
                                                : "text-muted-foreground hover:bg-muted/50"
                                                }`}
                                        >
                                            {tab === "stocks" ? "Stocks" : tab === "mf" ? "Funds" : "Crypto"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/20 text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border/10">
                                            <th className="text-left p-6 font-bold">Asset Entity</th>
                                            <th className="text-right p-6 font-bold hidden sm:table-cell">Composition</th>
                                            <th className="text-right p-6 font-bold hidden md:table-cell">Avg Entry</th>
                                            <th className="text-right p-6 font-bold">Live Value</th>
                                            <th className="text-right p-6 font-bold">PNL (Rel)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/5">
                                        {currentData.map((asset, i) => (
                                            <tr key={i} className="group hover:bg-muted/30 transition-all duration-300">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-10 w-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center font-bold text-xs">
                                                            {asset.symbol.slice(0, 2)}
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-foreground group-hover:text-[#0A66C2] transition-colors uppercase tracking-tight">{asset.symbol}</p>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter truncate max-w-[120px]">{asset.name}</span>
                                                                <Badge variant="outline" className="text-[8px] h-3 px-1 border-none bg-muted font-bold text-muted-foreground">
                                                                    {asset.category}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-right p-6 text-sm font-mono text-muted-foreground hidden sm:table-cell">
                                                    {"qty" in asset ? asset.qty : asset.units} <span className="text-[10px] opacity-70">units</span>
                                                </td>
                                                <td className="text-right p-6 font-mono text-xs hidden md:table-cell text-muted-foreground">
                                                    ₹{"avgPrice" in asset ? asset.avgPrice.toLocaleString() : asset.avgNav.toLocaleString()}
                                                </td>
                                                <td className="text-right p-6 font-black tabular-nums tracking-tighter text-foreground">
                                                    ₹{"currentPrice" in asset ? asset.currentPrice.toLocaleString() : asset.currentNav.toLocaleString()}
                                                </td>
                                                <td className="text-right p-6">
                                                    <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black transition-all ${asset.change >= 0
                                                        ? "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500/20"
                                                        : "bg-rose-500/10 text-rose-600 group-hover:bg-rose-500/20"
                                                        }`}>
                                                        {asset.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                                        {asset.change >= 0 ? "+" : ""}{asset.change}%
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* ========== 6. TACTICAL OVERVIEW (SIP & DIVIDENDS) ========== */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* SIP Tracker */}
                    <motion.div variants={scrollReveal}>
                        <Card className="glass-card border-blue-500/20 bg-blue-500/5 h-full">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-bold flex items-center gap-2">
                                        <Repeat className="h-4 w-4 text-blue-500" />
                                        Systematic Wealth (SIP)
                                    </CardTitle>
                                    <Badge className="bg-blue-600 text-white border-none px-2 py-0.5 text-[10px] font-black">{sipData.length} ACTIVE ENGINES</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-3">
                                    {sipData.map((sip, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-background/40 backdrop-blur-md rounded-2xl border border-border/50 group hover:border-blue-500/30 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                                    <Clock className="h-5 w-5 text-blue-500" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{sip.name}</p>
                                                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">DEBIT DATE: {sip.nextDate}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-[#0A66C2] tabular-nums text-sm">₹{sip.amount.toLocaleString()}</p>
                                                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">{sip.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-blue-600/10 rounded-2xl flex items-center justify-between border border-blue-600/20">
                                    <span className="text-xs font-black text-blue-700 uppercase tracking-widest">Monthly Fuel</span>
                                    <span className="text-xl font-black text-blue-700 tabular-nums">₹{sipData.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Dividend Calendar */}
                    <motion.div variants={scrollReveal}>
                        <Card className="glass-card border-emerald-500/20 bg-emerald-500/5 h-full">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-emerald-500" />
                                    Passive Yield Calendar
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-3">
                                    {dividendData.map((div, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-background/40 backdrop-blur-md rounded-2xl border border-border/50 group hover:border-emerald-500/30 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                                    <Target className="h-5 w-5 text-emerald-500" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm tracking-tight">{div.stock}</p>
                                                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">EX-DATE: {div.exDate}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-muted-foreground font-bold uppercase">{div.amount}</p>
                                                <p className="font-black text-emerald-600 tabular-nums text-sm">{div.totalExpected}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-emerald-600/10 rounded-2xl flex items-center justify-between border border-emerald-600/20">
                                    <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">Expected Harvest</span>
                                    <span className="text-xl font-black text-emerald-700 tabular-nums">₹2,865</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* ========== 7. WATCHLIST QUICK VIEW ========== */}
                <motion.div variants={scrollReveal}>
                    <Card className="glass-card border-amber-500/20 bg-amber-500/5">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <Star className="h-4 w-4 text-amber-500" />
                                    Active Watchlist
                                </CardTitle>
                                <Button variant="ghost" size="sm" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50">
                                    Analyze All Assets <Eye className="h-3 w-3 ml-2" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {watchlistData.map((stock, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-background/40 backdrop-blur-md border border-border/50 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 transition-all group">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="font-black text-sm tracking-tight group-hover:text-amber-600 transition-colors uppercase">{stock.symbol}</p>
                                            <div className={`flex items-center gap-1 text-[10px] font-black ${stock.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                                                {stock.change >= 0 ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                                                {stock.change >= 0 ? "+" : ""}{stock.change}%
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground font-medium truncate mb-4 uppercase tracking-tighter">{stock.name}</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <p className="font-black tabular-nums text-sm">₹{stock.price.toLocaleString()}</p>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* ========== 8. REGISTRY OF OPERATIONS (RECENT ACTIVITY) ========== */}
                <motion.div variants={scrollReveal}>
                    <Card className="glass-card overflow-hidden">
                        <CardHeader className="bg-muted/5 border-b border-border/10 pb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                        <Zap className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-black tracking-tight uppercase">Registry of Operations</CardTitle>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">REAL-TIME TRANSACTION LOG</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-xl border-border/50 text-[10px] font-black uppercase tracking-widest hover:bg-muted/50">
                                    Full Ledger
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto scroller-hide">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/20 text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border/10">
                                            <th className="text-left p-6 font-bold">Execution Date</th>
                                            <th className="text-left p-6 font-bold">Asset Entity</th>
                                            <th className="text-center p-6 font-bold">Action</th>
                                            <th className="text-right p-6 font-bold hidden sm:table-cell">Vol</th>
                                            <th className="text-right p-6 font-bold hidden sm:table-cell">Price (Unit)</th>
                                            <th className="text-right p-6 font-bold">Total (Nominal)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/5">
                                        {transactionsData.map((tx, i) => (
                                            <tr key={i} className="group hover:bg-muted/20 transition-all duration-300">
                                                <td className="p-6 text-xs text-muted-foreground font-medium uppercase">{tx.date}</td>
                                                <td className="p-6">
                                                    <p className="font-black text-sm tracking-tight group-hover:text-[#0A66C2] transition-colors">{tx.asset}</p>
                                                </td>
                                                <td className="p-6 text-center">
                                                    <Badge className={`text-[9px] font-black px-2 py-0.5 rounded border-none shadow-sm ${tx.type === "BUY" ? "bg-emerald-500 text-white" :
                                                        tx.type === "SELL" ? "bg-rose-500 text-white" : "bg-blue-600 text-white"
                                                        }`}>{tx.type}</Badge>
                                                </td>
                                                <td className="p-6 text-right font-mono text-xs text-muted-foreground hidden sm:table-cell">{tx.qty}</td>
                                                <td className="p-6 text-right font-mono text-xs text-muted-foreground hidden sm:table-cell">₹{tx.price.toLocaleString()}</td>
                                                <td className="p-6 text-right font-black tabular-nums tracking-tighter text-foreground">₹{tx.total.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* ========== 9. STRATEGIC POSITIONING (RISK & REBALANCE) ========== */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Risk Exposure & Health Guard */}
                    <motion.div variants={scrollReveal}>
                        <Card className="glass-card h-full border-rose-500/20 bg-rose-500/5">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4 text-rose-500" />
                                    Risk Exposure & Health Guard
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: "Stability", value: "40%", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                                        { label: "Medium", value: "45%", color: "text-amber-500", bg: "bg-amber-500/10" },
                                        { label: "Aggressive", value: "15%", color: "text-rose-500", bg: "bg-rose-500/10" },
                                    ].map((risk, i) => (
                                        <div key={i} className={`text-center p-4 rounded-2xl ${risk.bg} backdrop-blur-sm border border-white/10 group hover:scale-[1.02] transition-all`}>
                                            <p className={`text-xl font-black ${risk.color}`}>{risk.value}</p>
                                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">{risk.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {stopLossAlerts.length > 0 ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-rose-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2 px-1">
                                            <Bell className="h-3 w-3 animate-pulse" /> Critical Breaches Detected
                                        </div>
                                        {stopLossAlerts.map((alert, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-background/60 backdrop-blur-md rounded-2xl border border-rose-500/30 shadow-lg shadow-rose-500/5 group hover:bg-background/80 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                                                        <AlertTriangle className="h-5 w-5 text-rose-500" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-sm uppercase">{alert.asset}</p>
                                                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">STOP LOSS: ₹{alert.stopLoss}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-black text-rose-600 tabular-nums text-sm">₹{alert.currentPrice}</p>
                                                    <Badge className="bg-rose-600 text-white text-[9px] font-black border-none px-1.5 leading-none h-4 uppercase">TRIGGERED</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-6 text-center bg-emerald-500/5 rounded-2xl border border-emerald-500/20">
                                        <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                                        <p className="font-black text-emerald-700 text-sm uppercase">Position Shield Active</p>
                                        <p className="text-[10px] text-muted-foreground font-medium">ALL ASSETS ARE TRADING ABOVE STOP-LOSS LIMITS</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Rebalance Suggester */}
                    <motion.div variants={scrollReveal}>
                        <Card className="glass-card h-full border-amber-500/20 bg-amber-500/5">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base font-bold flex items-center gap-2">
                                    <RefreshCw className="h-4 w-4 text-amber-500" />
                                    Dynamic Rebalance Matrix
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 group hover:bg-rose-500/15 transition-all">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Efficiency Leak (Overweight)</span>
                                            <ArrowDownRight className="h-4 w-4 text-rose-600" />
                                        </div>
                                        <p className="text-lg font-black tracking-tight">{rebalanceSuggestions.overweight.category}</p>
                                        <div className="flex items-center gap-3 my-2">
                                            <div className="flex-1 h-2 bg-rose-500/20 rounded-full overflow-hidden">
                                                <div className="h-full bg-rose-500 w-[70%]" />
                                            </div>
                                            <span className="text-xs font-black text-rose-700">{rebalanceSuggestions.overweight.current}% → {rebalanceSuggestions.overweight.target}%</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-rose-800/70 uppercase">{rebalanceSuggestions.overweight.action}</p>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group hover:bg-emerald-500/15 transition-all">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Growth Engine (Underweight)</span>
                                            <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                                        </div>
                                        <p className="text-lg font-black tracking-tight">{rebalanceSuggestions.underweight.category}</p>
                                        <div className="flex items-center gap-3 my-2">
                                            <div className="flex-1 h-2 bg-emerald-500/20 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 w-[40%]" />
                                            </div>
                                            <span className="text-xs font-black text-emerald-700">{rebalanceSuggestions.underweight.current}% → {rebalanceSuggestions.underweight.target}%</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-emerald-800/70 uppercase">{rebalanceSuggestions.underweight.action}</p>
                                    </div>
                                </div>
                                <Button className="w-full h-12 rounded-xl bg-amber-600 hover:bg-amber-700 text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-600/20">
                                    Execute Rebalance Plan
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* ========== 10. GLOBAL ACTIONS & FOOTER ========== */}
                <motion.div variants={scrollReveal} className="pt-10 border-t border-border/10">
                    <div className="grid sm:grid-cols-3 gap-6">
                        <Button variant="outline" className="h-16 rounded-2xl gap-3 border-border/50 bg-background/50 backdrop-blur-md hover:bg-muted/50 hover:border-[#0A66C2]/30 transition-all group">
                            <div className="h-10 w-10 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Link2 className="h-5 w-5 text-[#0A66C2]" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Data Bridge</p>
                                <p className="font-bold text-sm">Connect Broker</p>
                            </div>
                        </Button>
                        <Button variant="outline" className="h-16 rounded-2xl gap-3 border-border/50 bg-background/50 backdrop-blur-md hover:bg-muted/50 hover:border-emerald-600/30 transition-all group">
                            <div className="h-10 w-10 rounded-xl bg-emerald-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileText className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Intelligence</p>
                                <p className="font-bold text-sm">Full Advisory Report</p>
                            </div>
                        </Button>
                        <Button variant="outline" className="h-16 rounded-2xl gap-3 border-border/50 bg-background/50 backdrop-blur-md hover:bg-muted/50 hover:border-amber-600/30 transition-all group">
                            <div className="h-10 w-10 rounded-xl bg-amber-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Download className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Extraction</p>
                                <p className="font-bold text-sm">Export Financials (CSV)</p>
                            </div>
                        </Button>
                    </div>
                </motion.div>

                {/* ========== MODALS ========== */}
                <AnimatePresence>
                    {showAddModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowAddModal(false)}
                                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-md relative"
                            >
                                <Card className="glass-card shadow-2xl border-[#0A66C2]/20">
                                    <div className="absolute top-4 right-4">
                                        <Button variant="ghost" size="icon" onClick={() => setShowAddModal(false)} className="rounded-full hover:bg-muted/50 text-muted-foreground">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <CardHeader className="pt-8 text-center">
                                        <div className="h-16 w-16 rounded-2xl bg-[#0A66C2]/10 flex items-center justify-center mx-auto mb-4 border border-[#0A66C2]/20">
                                            <Plus className="h-8 w-8 text-[#0A66C2]" />
                                        </div>
                                        <CardTitle className="text-2xl font-black tracking-tight">Expand Portfolio</CardTitle>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mt-1">NEW ASSET REGISTRATION</p>
                                    </CardHeader>
                                    <CardContent className="space-y-6 pb-10">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Asset Class</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {["Stock", "MF", "Crypto"].map((type) => (
                                                    <button key={type} className="h-10 rounded-xl border border-border/50 text-[10px] font-black uppercase hover:border-[#0A66C2] hover:bg-[#0A66C2]/5 transition-all">
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Symbol / Name</label>
                                            <Input placeholder="e.g. RELIANCE or BTC" className="h-12 rounded-xl border-border/50 bg-muted/20 font-bold focus:ring-[#0A66C2]/20" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Volume</label>
                                                <Input type="number" placeholder="0.00" className="h-12 rounded-xl border-border/50 bg-muted/20 font-bold" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Unit Price</label>
                                                <Input type="number" placeholder="₹0.00" className="h-12 rounded-xl border-border/50 bg-muted/20 font-bold" />
                                            </div>
                                        </div>
                                        <Button className="w-full h-14 rounded-2xl bg-[#0A66C2] hover:bg-[#0855a1] font-black uppercase tracking-widest shadow-xl shadow-[#0A66C2]/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                            Commit to Portfolio
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </motion.div>
        </AppShell>
    )
}
