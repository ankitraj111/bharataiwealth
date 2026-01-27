"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BrainCircuit,
    TrendingUp,
    TrendingDown,
    Activity,
    Zap,
    Target,
    BarChart3,
    Search,
    ArrowUpRight,
    ShieldCheck,
    Scale
} from "lucide-react"

export default function CryptoAnalysis() {
    const [activeToken] = useState("BTC")

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                                <BrainCircuit className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Crypto Analysis</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12">Technical indicators and AI-driven market insights</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                            <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Analyzing: {activeToken}/USD</span>
                        </div>
                        <Button variant="outline" className="rounded-lg">
                            <Search className="h-4 w-4 mr-2" /> Switch Asset
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="technicals" className="space-y-6">
                    <TabsList className="bg-muted p-1 rounded-lg border border-border">
                        <TabsTrigger value="technicals" className="rounded-md px-4 py-2 text-sm font-semibold">
                            Technical Indicators
                        </TabsTrigger>
                        <TabsTrigger value="ai-insights" className="rounded-md px-4 py-2 text-sm font-semibold">
                            AI Insights
                        </TabsTrigger>
                        <TabsTrigger value="support-resistance" className="rounded-md px-4 py-2 text-sm font-semibold">
                            Support & Resistance
                        </TabsTrigger>
                    </TabsList>

                    {/* Technical Indicators Tab */}
                    <TabsContent value="technicals" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { name: "RSI (14)", val: "62.4", signal: "Neutral", color: "text-gray-600 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-900" },
                                { name: "MACD", val: "Bullish Cross", signal: "Buy Signal", color: "text-green-700 dark:text-green-400", bg: "bg-green-100 dark:bg-green-950/30" },
                                { name: "EMA (20/50)", val: "Golden Cross", signal: "Strong Buy", color: "text-green-700 dark:text-green-400", bg: "bg-green-100 dark:bg-green-950/30" },
                                { name: "Bollinger", val: "Mid-Band", signal: "Neutral", color: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-950/30" },
                            ].map((ind, i) => (
                                <Card key={i} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-5">
                                        <p className="text-xs text-muted-foreground font-medium mb-1">{ind.name}</p>
                                        <h4 className="text-xl font-bold text-foreground mb-3">{ind.val}</h4>
                                        <Badge className={`border-0 font-semibold text-xs ${ind.bg} ${ind.color}`}>
                                            {ind.signal}
                                        </Badge>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 shadow-lg rounded-2xl overflow-hidden border-2">
                                <CardHeader className="p-8 border-b border-border flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-blue-500/10"><Activity className="h-6 w-6 text-blue-500" /></div>
                                        <div>
                                            <CardTitle className="text-xl font-bold">Advanced Chart View</CardTitle>
                                            <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Real-time momentum & trend analysis</CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {["1H", "4H", "1D", "1W"].map(tf => (
                                            <Button key={tf} variant="ghost" size="sm" className="rounded-xl text-[10px] font-bold w-10">
                                                {tf}
                                            </Button>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent className="h-[400px] flex items-center justify-center p-0 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent" />
                                    <div className="text-muted-foreground flex flex-col items-center gap-3">
                                        <Scale className="h-12 w-12 opacity-20" />
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">Chart Rendering Engine</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-8">
                                <Card className="border-emerald-500/30 shadow-lg rounded-2xl p-8 border-2">
                                    <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4" /> Trend Integrity
                                    </h4>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Bullish Momentum</span>
                                                <span className="text-xs font-bold text-emerald-500">High</span>
                                            </div>
                                            <Progress value={82} className="h-2" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Liquidity Depth</span>
                                                <span className="text-xs font-bold text-blue-500">$340M</span>
                                            </div>
                                            <Progress value={65} className="h-2" />
                                        </div>
                                    </div>
                                    <div className="mt-8 p-5 rounded-2xl bg-muted border border-border">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Verdict</p>
                                        <p className="text-sm font-bold leading-relaxed italic">
                                            &quot;Strong bullish impulse confirmed by volume. Multiple EMA crossovers suggest trend continuation.&quot;
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* AI Insights Tab */}
                    <TabsContent value="ai-insights" className="space-y-6 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-8 relative overflow-hidden border">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent dark:from-purple-500/10" />
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold">AI Momentum Prophecy</h4>
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-80">Next 7 Days Forecast</p>
                                    </div>
                                </div>
                                <div className="space-y-4 mb-8 relative z-10">
                                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-emerald-500 text-white font-bold px-3 py-1 rounded-full text-[9px]">92% ACCURACY</Badge>
                                            <span className="text-xs font-bold text-muted-foreground">Price Target 1</span>
                                        </div>
                                        <span className="text-xl font-bold tabular-nums">$68,540</span>
                                    </div>
                                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-emerald-500/80 text-white font-bold px-3 py-1 rounded-full text-[9px]">74% ACCURACY</Badge>
                                            <span className="text-xs font-bold text-muted-foreground">Price Target 2</span>
                                        </div>
                                        <span className="text-xl font-bold tabular-nums">$72,400</span>
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-muted-foreground leading-relaxed italic relative z-10">
                                    &quot;Our LLM-V3 engine has detected institutional accumulation patterns similar to the Q1 2024 breakout. High probability of upward volatility.&quot;
                                </p>
                            </Card>

                            <Card className="border-slate-200 dark:border-slate-800 shadow-lg rounded-2xl p-8 border">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">Neural Heatmap Analytics</h4>
                                <div className="grid grid-cols-4 gap-3">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`aspect-square rounded-xl transition-all hover:scale-105 cursor-pointer border ${i % 3 === 0 ? "bg-emerald-500/20 dark:bg-emerald-500/30 border-emerald-500/20" :
                                                    i % 2 === 0 ? "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/20" :
                                                        "bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/20"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-between text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500/40" /> Bearish Pressure</span>
                                    <span className="flex items-center gap-1.5">Institutional Buy <div className="w-2 h-2 rounded-full bg-emerald-500/40" /></span>
                                </div>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Support & Resistance Tab */}
                    <TabsContent value="support-resistance" className="space-y-6 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Current Price Card */}
                            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 shadow-lg rounded-2xl p-6 border-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/20">
                                        <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100 uppercase tracking-widest">Current Price</h4>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-4xl font-black text-blue-900 dark:text-white tabular-nums">$65,420</p>
                                    <div className="flex items-center gap-2">
                                        <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">+2.4% (24h)</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Resistance Levels */}
                            <Card className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30 border-rose-200 dark:border-rose-800 shadow-lg rounded-2xl p-6 border-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 rounded-xl bg-rose-500/10 dark:bg-rose-500/20">
                                        <TrendingUp className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                                    </div>
                                    <h4 className="text-sm font-bold text-rose-900 dark:text-rose-100 uppercase tracking-widest">Resistance Levels</h4>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { level: "R3", price: "$72,800", strength: "Strong", percent: 85 },
                                        { level: "R2", price: "$69,500", strength: "Medium", percent: 65 },
                                        { level: "R1", price: "$67,200", strength: "Weak", percent: 45 }
                                    ].map((r, i) => (
                                        <div key={i} className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Badge className="bg-rose-500 text-white font-bold text-[9px] px-2 py-0.5">{r.level}</Badge>
                                                    <span className="text-xs font-bold text-rose-900 dark:text-rose-100">{r.price}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">{r.strength}</span>
                                            </div>
                                            <Progress value={r.percent} className="h-1.5 bg-rose-200 dark:bg-rose-900" />
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Support Levels */}
                            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-emerald-200 dark:border-emerald-800 shadow-lg rounded-2xl p-6 border-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20">
                                        <TrendingDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100 uppercase tracking-widest">Support Levels</h4>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { level: "S1", price: "$63,800", strength: "Weak", percent: 40 },
                                        { level: "S2", price: "$61,200", strength: "Medium", percent: 70 },
                                        { level: "S3", price: "$58,500", strength: "Strong", percent: 90 }
                                    ].map((s, i) => (
                                        <div key={i} className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Badge className="bg-emerald-500 text-white font-bold text-[9px] px-2 py-0.5">{s.level}</Badge>
                                                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-100">{s.price}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">{s.strength}</span>
                                            </div>
                                            <Progress value={s.percent} className="h-1.5 bg-emerald-200 dark:bg-emerald-900" />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Price Action Zones */}
                        <Card className="border-slate-200 dark:border-slate-800 shadow-lg rounded-2xl p-8 border">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-500/20">
                                        <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h4 className="text-lg font-bold">Price Action Zones</h4>
                                </div>
                                <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold text-xs px-3 py-1">
                                    Live Analysis
                                </Badge>
                            </div>

                            <div className="relative h-80 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
                                {/* Resistance Zone */}
                                <div className="absolute top-6 left-6 right-6 h-16 bg-rose-500/10 dark:bg-rose-500/20 rounded-lg border-2 border-rose-300 dark:border-rose-700 border-dashed flex items-center justify-between px-4">
                                    <span className="text-xs font-bold text-rose-700 dark:text-rose-300">RESISTANCE ZONE</span>
                                    <span className="text-sm font-black text-rose-900 dark:text-rose-100 tabular-nums">$67,200 - $72,800</span>
                                </div>

                                {/* Current Price Line */}
                                <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 flex items-center">
                                    <div className="flex-1 h-0.5 bg-blue-500 dark:bg-blue-400" />
                                    <div className="px-4 py-2 bg-blue-500 dark:bg-blue-600 rounded-lg shadow-lg">
                                        <span className="text-xs font-black text-white tabular-nums">$65,420</span>
                                    </div>
                                    <div className="flex-1 h-0.5 bg-blue-500 dark:bg-blue-400" />
                                </div>

                                {/* Support Zone */}
                                <div className="absolute bottom-6 left-6 right-6 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg border-2 border-emerald-300 dark:border-emerald-700 border-dashed flex items-center justify-between px-4">
                                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">SUPPORT ZONE</span>
                                    <span className="text-sm font-black text-emerald-900 dark:text-emerald-100 tabular-nums">$58,500 - $63,800</span>
                                </div>
                            </div>

                            {/* Key Insights */}
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                                    <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Distance to R1</p>
                                    <p className="text-xl font-black text-blue-900 dark:text-blue-100">+2.7%</p>
                                </div>
                                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Distance to S1</p>
                                    <p className="text-xl font-black text-emerald-900 dark:text-emerald-100">-2.5%</p>
                                </div>
                                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                                    <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">Risk/Reward</p>
                                    <p className="text-xl font-black text-purple-900 dark:text-purple-100">1:1.08</p>
                                </div>
                            </div>
                        </Card>

                        {/* AI Recommendation */}
                        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800 shadow-xl rounded-2xl p-8 border-2">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 flex-shrink-0">
                                    <BrainCircuit className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-2">AI Trading Recommendation</h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                                        Current price is trading in the middle zone between strong support at $61,200 and resistance at $67,200. 
                                        The risk/reward ratio favors a long position with tight stop-loss below S1. Watch for breakout above R1 for continuation.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge className="bg-emerald-500 text-white font-bold text-xs px-3 py-1">
                                            Entry: $65,000 - $65,500
                                        </Badge>
                                        <Badge className="bg-blue-500 text-white font-bold text-xs px-3 py-1">
                                            Target: $67,200
                                        </Badge>
                                        <Badge className="bg-rose-500 text-white font-bold text-xs px-3 py-1">
                                            Stop Loss: $63,500
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppShell>
    )
}
