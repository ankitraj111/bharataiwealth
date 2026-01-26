"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    LineChart,
    BrainCircuit,
    TrendingUp,
    TrendingDown,
    Activity,
    Zap,
    Target,
    BarChart3,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    ShieldCheck,
    Scale
} from "lucide-react"

export default function CryptoAnalysis() {
    const [activeToken, setActiveToken] = useState("BTC")

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
                        <div className="px-4 py-2 rounded-lg bg-blue-50 border border-blue-200">
                            <span className="text-xs font-semibold text-blue-700">Analyzing: {activeToken}/USD</span>
                        </div>
                        <Button variant="outline" className="rounded-lg border-gray-300">
                            <Search className="h-4 w-4 mr-2" /> Switch Asset
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="technicals" className="space-y-6">
                    <TabsList className="bg-muted p-1 rounded-lg border border-border">
                        <TabsTrigger value="technicals" className="rounded-md px-4 py-2 text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">
                            Technical Indicators
                        </TabsTrigger>
                        <TabsTrigger value="ai-insights" className="rounded-md px-4 py-2 text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">
                            AI Insights
                        </TabsTrigger>
                        <TabsTrigger value="support-resistance" className="rounded-md px-4 py-2 text-sm font-semibold data-[state=active]:bg-card data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm">
                            Support & Resistance
                        </TabsTrigger>
                    </TabsList>

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
                            <Card className="lg:col-span-2 bg-white/90 border-slate-200/60 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden border-2">
                                <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-blue-500/10"><Activity className="h-6 w-6 text-blue-500" /></div>
                                        <div>
                                            <CardTitle className="text-xl font-black text-slate-900">Advanced Chart View</CardTitle>
                                            <CardDescription className="font-bold text-slate-500 uppercase tracking-widest text-[10px]">Real-time momentum & trend analysis</CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {["1H", "4H", "1D", "1W"].map(tf => (
                                            <Button key={tf} variant="ghost" size="sm" className="rounded-xl text-[10px] font-black text-slate-400 hover:text-white hover:bg-white/5 w-10">
                                                {tf}
                                            </Button>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent className="h-[400px] flex items-center justify-center p-0 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent" />
                                    <div className="text-slate-600 flex flex-col items-center gap-3">
                                        <Scale className="h-12 w-12 opacity-20" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Render Engine: WebGL 3.0</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-8">
                                <Card className="bg-white/90 border-emerald-500/30 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-8 border-2">
                                    <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4" /> Trend Integrity
                                    </h4>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bullish Momentum</span>
                                                <span className="text-xs font-black text-emerald-500">High</span>
                                            </div>
                                            <Progress value={82} className="h-2 bg-slate-800 rounded-full border border-white/5" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Liquidity Depth</span>
                                                <span className="text-xs font-black text-blue-500">$340M</span>
                                            </div>
                                            <Progress value={65} className="h-2 bg-slate-800 rounded-full border border-white/5" />
                                        </div>
                                    </div>
                                    <div className="mt-8 p-5 rounded-2xl bg-white/5 border border-white/5">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Verdict</p>
                                        <p className="text-sm font-black text-white leading-relaxed italic">
                                            "Strong bullish impulse confirmed by volume. Multiple EMA crossovers suggest trend continuation."
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="ai-insights" className="space-y-6 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* AI Momentum Prophecy - Theme Aware Compact Version */}
                            <Card className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 rounded-[1.5rem] p-8 relative overflow-hidden group border">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent dark:from-purple-500/10" />
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">AI Momentum Prophecy</h4>
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest opacity-80">Next 7 Days Forecast</p>
                                    </div>
                                </div>
                                <div className="space-y-4 mb-8 relative z-10">
                                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-emerald-500 text-white font-bold px-3 py-1 rounded-full text-[9px]">92% ACCURACY</Badge>
                                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Price Target 1</span>
                                        </div>
                                        <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">$68,540</span>
                                    </div>
                                    <div className="flex items-center justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-emerald-500/80 text-white font-bold px-3 py-1 rounded-full text-[9px]">74% ACCURACY</Badge>
                                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Price Target 2</span>
                                        </div>
                                        <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">$72,400</span>
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic relative z-10">
                                    "Our LLM-V3 engine has detected institutional accumulation patterns similar to the Q1 2024 breakout. High probability of upward volatility."
                                </p>
                            </Card>

                            {/* Neural Heatmap - Sophisticated Palette */}
                            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg rounded-[1.5rem] p-8 border">
                                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">Neural Heatmap Analytics</h4>
                                <div className="grid grid-cols-4 gap-3">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`aspect-square rounded-xl transition-all hover:scale-105 cursor-pointer border border-white/5 dark:border-black/20 ${i % 3 === 0 ? "bg-emerald-500/20 dark:bg-emerald-500/30" :
                                                    i % 2 === 0 ? "bg-blue-500/10 dark:bg-blue-500/20" :
                                                        "bg-rose-500/10 dark:bg-rose-500/20"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="mt-8 flex justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500/40" /> Bearish Pressure</span>
                                    <span className="flex items-center gap-1.5">Institutional Buy Wall <div className="w-2 h-2 rounded-full bg-emerald-500/40" /></span>
                                </div>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppShell>
    )
}
