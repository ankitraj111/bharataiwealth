"use client"

import { useState, useEffect } from "react"
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
    X,
    Sparkles
} from "lucide-react"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, LineChart as RechartsLine, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts"

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
    { type: "BUY", asset: "TATAMOTORS", reason: "Strong momentum, AI confidence 87%", risk: "Medium" },
    { type: "SELL", asset: "HDFC", reason: "Weakening fundamentals, stop-loss triggered", risk: "High" },
    { type: "HOLD", asset: "TCS", reason: "Stable position, wait for earnings", risk: "Low" },
]

const stopLossAlerts = [
    { asset: "HDFC", currentPrice: 1480, stopLoss: 1500, triggered: true },
]

const rebalanceSuggestions = {
    overweight: { category: "Large Cap", current: 45, target: 35, action: "Reduce exposure" },
    underweight: { category: "Debt", current: 15, target: 25, action: "Increase allocation" },
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
            <div className="space-y-6">

                {/* ========== 1. HEADER ========== */}
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Portfolio</h1>
                    <p className="text-muted-foreground">Track your wealth across stocks, crypto, and mutual funds.</p>
                </div>

                {/* Total Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-2 border-border/50">
                        <CardContent className="p-4">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Invested</p>
                            <p className="text-2xl font-bold text-foreground">₹{(totalInvested / 100000).toFixed(1)}L</p>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-border/50">
                        <CardContent className="p-4">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Current Value</p>
                            <p className="text-2xl font-bold text-foreground">₹{(currentValue / 100000).toFixed(1)}L</p>
                        </CardContent>
                    </Card>
                    <Card className={`border-2 ${isProfit ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                        <CardContent className="p-4">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Gain/Loss %</p>
                            <div className="flex items-center gap-2">
                                {isProfit ? <TrendingUp className="h-5 w-5 text-emerald-500" /> : <TrendingDown className="h-5 w-5 text-red-500" />}
                                <p className={`text-2xl font-bold ${isProfit ? "text-emerald-500" : "text-red-500"}`}>
                                    {isProfit ? "+" : ""}{profitPercent}%
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={`border-2 ${isProfit ? "border-emerald-500/30 bg-emerald-500/5" : "border-red-500/30 bg-red-500/5"}`}>
                        <CardContent className="p-4">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Net Profit</p>
                            <p className={`text-2xl font-bold ${isProfit ? "text-emerald-500" : "text-red-500"}`}>
                                {isProfit ? "+" : ""}₹{(profit / 1000).toFixed(0)}K
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* ========== 2. ASSET BREAKDOWN TABS ========== */}
                <Card className="border-2 border-border/50">
                    <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <CardTitle className="text-lg font-bold">Holdings</CardTitle>
                            <div className="flex gap-2">
                                {(["stocks", "mf", "crypto"] as const).map((tab) => (
                                    <Button
                                        key={tab}
                                        variant={activeTab === tab ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setActiveTab(tab)}
                                        className={activeTab === tab ? "bg-[#0A66C2] hover:bg-[#0855a1]" : ""}
                                    >
                                        {tab === "stocks" ? "Stocks" : tab === "mf" ? "Mutual Funds" : "Crypto"}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr className="text-xs uppercase text-muted-foreground">
                                        <th className="text-left p-4 font-medium">Asset</th>
                                        <th className="text-right p-4 font-medium hidden sm:table-cell">Qty/Units</th>
                                        <th className="text-right p-4 font-medium hidden md:table-cell">Avg Price</th>
                                        <th className="text-right p-4 font-medium">Current</th>
                                        <th className="text-right p-4 font-medium">P/L %</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {currentData.map((asset, i) => (
                                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-bold text-foreground">{asset.symbol}</p>
                                                    <p className="text-xs text-muted-foreground truncate max-w-[150px]">{asset.name}</p>
                                                    <Badge variant="secondary" className="text-[10px] mt-1">{asset.category}</Badge>
                                                </div>
                                            </td>
                                            <td className="text-right p-4 font-mono hidden sm:table-cell">
                                                {"qty" in asset ? asset.qty : asset.units}
                                            </td>
                                            <td className="text-right p-4 font-mono hidden md:table-cell">
                                                ₹{"avgPrice" in asset ? asset.avgPrice.toLocaleString() : asset.avgNav.toLocaleString()}
                                            </td>
                                            <td className="text-right p-4 font-mono font-bold">
                                                ₹{"currentPrice" in asset ? asset.currentPrice.toLocaleString() : asset.currentNav.toLocaleString()}
                                            </td>
                                            <td className="text-right p-4">
                                                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold ${asset.change >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
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

                {/* ========== 3. CHARTS BLOCK ========== */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <Card className="border-2 border-border/50">
                        <CardHeader>
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <PieChart className="h-4 w-4 text-[#0A66C2]" />
                                Asset Allocation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPie>
                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={2}>
                                            {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                        </Pie>
                                        <Tooltip />
                                    </RechartsPie>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                {pieData.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-xs text-muted-foreground">{item.name} ({item.value}%)</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Line Chart */}
                    <Card className="border-2 border-border/50">
                        <CardHeader>
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <LineChart className="h-4 w-4 text-[#FF8C00]" />
                                Portfolio Trend (30 Days)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData}>
                                        <defs>
                                            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#0A66C2" stopOpacity={0.3} />
                                                <stop offset="100%" stopColor="#0A66C2" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} />
                                        <Tooltip formatter={(v: number) => `₹${(v / 100000).toFixed(2)}L`} />
                                        <Area type="monotone" dataKey="value" stroke="#0A66C2" strokeWidth={2} fill="url(#trendGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ========== 4. RISK BUCKET SUMMARY ========== */}
                <Card className="border-2 border-border/50">
                    <CardHeader>
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Shield className="h-4 w-4 text-[#16A34A]" />
                            Risk Exposure
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {[
                                { label: "Low Risk", value: 40, color: "#16A34A" },
                                { label: "Medium Risk", value: 45, color: "#FF8C00" },
                                { label: "High Risk", value: 15, color: "#f43f5e" },
                            ].map((risk, i) => (
                                <div key={i} className="text-center p-4 rounded-xl" style={{ backgroundColor: `${risk.color}10` }}>
                                    <p className="text-3xl font-black" style={{ color: risk.color }}>{risk.value}%</p>
                                    <p className="text-xs text-muted-foreground font-medium">{risk.label}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            <Brain className="h-3 w-3 inline mr-1" />
                            Based on AI classification of your assets
                        </p>
                    </CardContent>
                </Card>

                {/* ========== 5. AI RECOMMENDATION ALERT BOX ========== */}
                <Card className="border-2 border-[#0A66C2]/30 bg-[#0A66C2]/5">
                    <CardHeader>
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#0A66C2]" />
                            AI Insights for You
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {aiInsights.map((insight, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-background rounded-xl border border-border">
                                    <div className={`p-2 rounded-lg ${insight.type === "BUY" ? "bg-emerald-500/10" :
                                            insight.type === "SELL" ? "bg-red-500/10" : "bg-gray-500/10"
                                        }`}>
                                        {insight.type === "BUY" ? (
                                            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                                        ) : insight.type === "SELL" ? (
                                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                                        ) : (
                                            <BarChart3 className="h-4 w-4 text-gray-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge className={
                                                insight.type === "BUY" ? "bg-emerald-500" :
                                                    insight.type === "SELL" ? "bg-red-500" : "bg-gray-500"
                                            }>{insight.type}</Badge>
                                            <span className="font-bold text-foreground">{insight.asset}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{insight.reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4 border-[#0A66C2] text-[#0A66C2]">
                            View Detailed Advisory
                        </Button>
                    </CardContent>
                </Card>

                {/* ========== 6. STOP LOSS WARNING ========== */}
                {stopLossAlerts.length > 0 ? (
                    <Card className="border-2 border-red-500/30 bg-red-500/5">
                        <CardHeader>
                            <CardTitle className="text-base font-bold flex items-center gap-2 text-red-500">
                                <AlertTriangle className="h-4 w-4" />
                                Stop Loss Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {stopLossAlerts.map((alert, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-background rounded-xl border border-red-500/20">
                                    <div className="flex items-center gap-3">
                                        <Bell className="h-5 w-5 text-red-500 animate-pulse" />
                                        <div>
                                            <p className="font-bold text-foreground">{alert.asset}</p>
                                            <p className="text-xs text-muted-foreground">Stop Loss: ₹{alert.stopLoss}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-red-500">₹{alert.currentPrice}</p>
                                        <Badge variant="destructive" className="text-[10px]">TRIGGERED</Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-2 border-emerald-500/30 bg-emerald-500/5">
                        <CardContent className="p-6 text-center">
                            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                            <p className="font-medium text-emerald-700">No risk events detected</p>
                            <p className="text-xs text-muted-foreground">All your positions are within safe limits</p>
                        </CardContent>
                    </Card>
                )}

                {/* ========== 7. REBALANCE SUGGESTION ========== */}
                <Card className="border-2 border-[#FF8C00]/30 bg-[#FF8C00]/5">
                    <CardHeader>
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-[#FF8C00]" />
                            Rebalance Suggestions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                                <p className="text-xs font-medium text-red-500 uppercase mb-1">Overweight</p>
                                <p className="font-bold text-foreground">{rebalanceSuggestions.overweight.category}</p>
                                <p className="text-sm text-muted-foreground">
                                    {rebalanceSuggestions.overweight.current}% → {rebalanceSuggestions.overweight.target}%
                                </p>
                                <p className="text-xs text-red-600 mt-1">{rebalanceSuggestions.overweight.action}</p>
                            </div>
                            <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <p className="text-xs font-medium text-emerald-500 uppercase mb-1">Underweight</p>
                                <p className="font-bold text-foreground">{rebalanceSuggestions.underweight.category}</p>
                                <p className="text-sm text-muted-foreground">
                                    {rebalanceSuggestions.underweight.current}% → {rebalanceSuggestions.underweight.target}%
                                </p>
                                <p className="text-xs text-emerald-600 mt-1">{rebalanceSuggestions.underweight.action}</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-4 border-[#FF8C00] text-[#FF8C00]">
                            See Rebalance Plan
                        </Button>
                    </CardContent>
                </Card>

                {/* ========== 8. ADD HOLDINGS BUTTON ========== */}
                <Button
                    onClick={() => setShowAddModal(true)}
                    className="w-full bg-[#0A66C2] hover:bg-[#0855a1] h-12"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Holding
                </Button>

                {/* ========== 10. FOOTER CTA ========== */}
                <div className="grid sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-12 gap-2">
                        <Link2 className="h-4 w-4" />
                        Connect Broker
                    </Button>
                    <Button variant="outline" className="h-12 gap-2">
                        <FileText className="h-4 w-4" />
                        Full Advisory Report
                    </Button>
                    <Button variant="outline" className="h-12 gap-2">
                        <Download className="h-4 w-4" />
                        Export CSV
                    </Button>
                </div>

                {/* ========== ADD HOLDING MODAL ========== */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-md">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Add New Holding</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setShowAddModal(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Asset Type</label>
                                    <select className="w-full p-3 rounded-lg border border-border bg-background">
                                        <option>Stock</option>
                                        <option>Mutual Fund</option>
                                        <option>Crypto</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Symbol / Name</label>
                                    <Input placeholder="e.g. RELIANCE or Bitcoin" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Quantity</label>
                                        <Input type="number" placeholder="50" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Buy Price</label>
                                        <Input type="number" placeholder="₹2500" />
                                    </div>
                                </div>
                                <Button className="w-full bg-[#0A66C2]" onClick={() => setShowAddModal(false)}>
                                    Save Holding
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

            </div>
        </AppShell>
    )
}
