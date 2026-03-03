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
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                                <BrainCircuit className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground tracking-tight">Crypto Analysis</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12 font-medium">Technical indicators and AI-driven market insights</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-md">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Analyzing: {activeToken}/USD</span>
                        </div>
                        <Button variant="outline" className="rounded-xl border-border bg-card/40 text-muted-foreground hover:text-foreground">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: "RSI (14)", val: "62.4", signal: "Neutral", color: "text-muted-foreground", bg: "bg-muted" },
                                { name: "MACD", val: "Bullish Cross", signal: "Buy Signal", color: "text-success", bg: "bg-success/10" },
                                { name: "EMA (20/50)", val: "Golden Cross", signal: "Strong Buy", color: "text-success", bg: "bg-success/10" },
                                { name: "Bollinger", val: "Mid-Band", signal: "Neutral", color: "text-warning", bg: "bg-warning/10" },
                            ].map((ind, i) => (
                                <Card key={i} className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-2xl p-6 border group hover:border-primary/20 transition-all">
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1 italic">{ind.name}</p>
                                    <h4 className="text-2xl font-black text-foreground mb-4 italic tabular-nums">{ind.val}</h4>
                                    <Badge className={`border-0 font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full ${ind.bg} ${ind.color}`}>
                                        {ind.signal}
                                    </Badge>
                                </Card>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border">
                                <CardHeader className="p-8 border-b border-border/50 flex flex-row items-center justify-between bg-card/[0.01]">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-2xl bg-primary/10 flex items-center justify-center"><Activity className="h-6 w-6 text-primary" /></div>
                                        <div>
                                            <CardTitle className="text-xl font-bold text-foreground italic">Advanced Chart View</CardTitle>
                                            <CardDescription className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Real-time momentum & trend analysis</CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {["1H", "4H", "1D", "1W"].map(tf => (
                                            <Button key={tf} variant="ghost" size="sm" className="rounded-xl text-[10px] font-black w-10 text-muted-foreground hover:text-foreground">
                                                {tf}
                                            </Button>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent className="h-[400px] flex items-center justify-center p-0 overflow-hidden relative bg-muted/5">
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                                    <div className="text-muted-foreground flex flex-col items-center gap-3 relative z-10">
                                        <div className="p-4 rounded-full bg-muted/20 backdrop-blur-sm border border-border/50">
                                            <Scale className="h-10 w-10 opacity-30 text-primary" />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Neural Chart Rendering Engine</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-8">
                                <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-8 border hover:border-success/30 transition-all group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 h-32 w-32 bg-success/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-success/10 transition-all" />
                                    <h4 className="text-[10px] font-black text-success uppercase tracking-[0.3em] mb-8 italic flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4" /> Trend Integrity
                                    </h4>
                                    <div className="space-y-8 relative z-10">
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Bullish Momentum</span>
                                                <span className="text-[10px] font-black text-success uppercase tracking-widest">High</span>
                                            </div>
                                            <Progress value={82} className="h-1.5 bg-muted rounded-full border border-border/5" />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Liquidity Depth</span>
                                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">$340M</span>
                                            </div>
                                            <Progress value={65} className="h-1.5 bg-muted rounded-full border border-border/5" />
                                        </div>
                                    </div>
                                    <div className="mt-10 p-6 rounded-2xl bg-muted/40 border border-border/50 backdrop-blur-sm relative z-10">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3">AI Verdict</p>
                                        <p className="text-xs font-bold text-foreground leading-relaxed italic">
                                            &quot;Strong bullish impulse confirmed by high-frequency volume clusters. Multiple EMA structural crossovers suggest a powerful trend continuation pattern.&quot;
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* AI Insights Tab */}
                    <TabsContent value="ai-insights" className="space-y-6 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-10 relative overflow-hidden border group">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
                                <div className="flex items-center gap-5 mb-8 relative z-10">
                                    <div className="p-4 rounded-2xl bg-primary shadow-[0_10px_30px_rgba(var(--primary),0.3)]">
                                        <Zap className="h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black text-foreground italic uppercase tracking-tight">AI Momentum Prophecy</h4>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">Proprietary Predictive Intelligence</p>
                                    </div>
                                </div>
                                <div className="space-y-6 mb-10 relative z-10">
                                    <div className="flex items-center justify-between p-6 rounded-2xl bg-muted/40 border border-border/50 backdrop-blur-md group-hover:bg-muted/60 transition-all">
                                        <div className="flex items-center gap-4">
                                            <Badge className="bg-success text-success-foreground font-black px-3 py-1 rounded-full text-[9px] uppercase tracking-widest shadow-lg shadow-success/20">92% ACCURACY</Badge>
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">Target Alpha 1</span>
                                        </div>
                                        <span className="text-2xl font-black text-foreground tabular-nums italic">$68,540</span>
                                    </div>
                                    <div className="flex items-center justify-between p-6 rounded-2xl bg-muted/40 border border-border/50 backdrop-blur-md group-hover:bg-muted/60 transition-all">
                                        <div className="flex items-center gap-4">
                                            <Badge className="bg-success/80 text-success-foreground font-black px-3 py-1 rounded-full text-[9px] uppercase tracking-widest shadow-lg shadow-success/20">74% ACCURACY</Badge>
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">Target Alpha 2</span>
                                        </div>
                                        <span className="text-2xl font-black text-foreground tabular-nums italic">$72,400</span>
                                    </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 relative z-10">
                                    <p className="text-xs font-bold text-muted-foreground leading-relaxed italic">
                                        &quot;Our neural-architect-V3 engine has synthesized high-probability accumulation zones. Deep institutional footprint detected in fragmented liquidity pools.&quot;
                                    </p>
                                </div>
                            </Card>

                            <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-10 border hover:border-primary/20 transition-all flex flex-col">
                                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-10 italic">Neural Heatmap Pulse</h4>
                                <div className="grid grid-cols-4 gap-4 flex-1">
                                    {Array.from({ length: 16 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`aspect-square rounded-2xl transition-all duration-500 hover:scale-110 cursor-pointer border shadow-inner ${i % 3 === 0 ? "bg-success/20 border-success/30 shadow-success/10" :
                                                i % 2 === 0 ? "bg-primary/10 border-primary/20 shadow-primary/5" :
                                                    "bg-destructive/20 border-destructive/30 shadow-destructive/10"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="mt-10 flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground italic border-t border-border/50 pt-6">
                                    <span className="flex items-center gap-2.5"><div className="w-2.5 h-2.5 rounded-full bg-destructive/60 animate-pulse" /> Signal Void</span>
                                    <span className="flex items-center gap-2.5">Neural Flux <div className="w-2.5 h-2.5 rounded-full bg-success/60 shadow-[0_0_10px_rgba(var(--success),0.5)]" /></span>
                                </div>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Support & Resistance Tab */}
                    <TabsContent value="support-resistance" className="space-y-6 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Current Price Card */}
                            <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-8 border-2 border-primary/20 group hover:bg-card/60 transition-all">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-2xl bg-primary shadow-[0_10px_30px_rgba(var(--primary),0.3)]">
                                        <Target className="h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic">Current Price</h4>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-5xl font-black text-foreground tabular-nums tracking-tighter italic origin-left group-hover:scale-105 transition-transform">$65,420</p>
                                    <div className="flex items-center gap-3">
                                        <div className="p-1 rounded-full bg-success/20"><ArrowUpRight className="h-4 w-4 text-success" /></div>
                                        <span className="text-xs font-black text-success uppercase tracking-widest italic">+2.4% (24h)</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Resistance Levels */}
                            <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-8 border-2 border-destructive/20 group hover:bg-card/60 transition-all">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-destructive shadow-[0_10px_30px_rgba(var(--destructive),0.3)]">
                                        <TrendingUp className="h-6 w-6 text-destructive-foreground" />
                                    </div>
                                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic">Resistance Zones</h4>
                                </div>
                                <div className="space-y-8">
                                    {[
                                        { level: "MAX ALPHA", price: "$72,800", strength: "CRITICAL", percent: 85, color: "text-destructive", bg: "bg-destructive/10" },
                                        { level: "MID RANGE", price: "$69,500", strength: "VOLATILE", percent: 65, color: "text-destructive/80", bg: "bg-destructive/5" },
                                        { level: "LOCAL TOP", price: "$67,200", strength: "LIQUID", percent: 35, color: "text-destructive/60", bg: "bg-destructive/5" }
                                    ].map((r, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Badge className="bg-destructive text-destructive-foreground font-black text-[8px] px-2 py-0.5 rounded-full tracking-tighter">{r.level}</Badge>
                                                    <span className="text-sm font-black text-foreground italic tabular-nums">{r.price}</span>
                                                </div>
                                                <span className="text-[9px] font-black text-destructive uppercase tracking-widest italic">{r.strength}</span>
                                            </div>
                                            <Progress value={r.percent} className="h-1.5 bg-muted rounded-full overflow-hidden" />
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Support Levels */}
                            <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-8 border-2 border-success/20 group hover:bg-card/60 transition-all">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 rounded-2xl bg-success shadow-[0_10px_30px_rgba(var(--success),0.3)]">
                                        <TrendingDown className="h-6 w-6 text-success-foreground" />
                                    </div>
                                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic">Support Bases</h4>
                                </div>
                                <div className="space-y-8">
                                    {[
                                        { level: "LOCAL LOW", price: "$63,800", strength: "LIQUID", percent: 40 },
                                        { level: "MID FLOOR", price: "$61,200", strength: "STABLE", percent: 60 },
                                        { level: "HARD FLOOR", price: "$58,500", strength: "CRITICAL", percent: 90 }
                                    ].map((s, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Badge className="bg-success text-success-foreground font-black text-[8px] px-2 py-0.5 rounded-full tracking-tighter">{s.level}</Badge>
                                                    <span className="text-sm font-black text-foreground italic tabular-nums">{s.price}</span>
                                                </div>
                                                <span className="text-[9px] font-black text-success uppercase tracking-widest italic">{s.strength}</span>
                                            </div>
                                            <Progress value={s.percent} className="h-1.5 bg-muted rounded-full overflow-hidden" />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* Price Action Zones */}
                        <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-10 border overflow-hidden group">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-primary shadow-[0_10px_30px_rgba(var(--primary),0.3)]">
                                        <BarChart3 className="h-6 w-6 text-primary-foreground" />
                                    </div>
                                    <h4 className="text-2xl font-black text-foreground italic uppercase tracking-tight">Price Action Zones</h4>
                                </div>
                                <Badge className="bg-primary/10 text-primary border border-primary/20 font-black text-[9px] px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">
                                    Real-time Neural Analysis
                                </Badge>
                            </div>

                            <div className="relative h-[450px] bg-muted/20 rounded-[2rem] border border-border/50 p-10 overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(var(--background),0.5)_100%)]" />
                                {/* Resistance Zone */}
                                <div className="absolute top-10 left-10 right-10 h-24 bg-destructive/10 dark:bg-destructive/20 rounded-2xl border-2 border-destructive/30 border-dashed flex items-center justify-between px-8 backdrop-blur-sm group-hover:bg-destructive/[0.15] transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-destructive uppercase tracking-[0.4em] mb-1 italic">Resistance Alpha</span>
                                        <span className="text-xs font-bold text-muted-foreground italic uppercase tracking-widest">Liquid Supply Cluster</span>
                                    </div>
                                    <span className="text-2xl font-black text-foreground tabular-nums italic">$67,200 — $72,800</span>
                                </div>

                                {/* Current Price Line */}
                                <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 flex items-center gap-4 group-hover:scale-[1.02] transition-transform duration-700">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                                    <div className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl shadow-[0_10px_40px_rgba(var(--primary),0.5)] border border-primary-foreground/20">
                                        <span className="text-xl font-black tabular-nums tracking-widest">$65,420</span>
                                    </div>
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                                </div>

                                {/* Support Zone */}
                                <div className="absolute bottom-10 left-10 right-10 h-24 bg-success/10 dark:bg-success/20 rounded-2xl border-2 border-success/30 border-dashed flex items-center justify-between px-8 backdrop-blur-sm group-hover:bg-success/[0.15] transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-success uppercase tracking-[0.4em] mb-1 italic">Support Delta</span>
                                        <span className="text-xs font-bold text-muted-foreground italic uppercase tracking-widest">Institutional Absorption Zone</span>
                                    </div>
                                    <span className="text-2xl font-black text-foreground tabular-nums italic">$58,500 — $63,800</span>
                                </div>
                            </div>

                            {/* Key Insights */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 rounded-[1.5rem] bg-card/60 border border-border/50 group-hover:border-primary/20 transition-all shadow-inner">
                                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-2 italic">Delta to R-Alpha 1</p>
                                    <p className="text-2xl font-black text-foreground italic tabular-nums">+2.7%</p>
                                </div>
                                <div className="p-6 rounded-[1.5rem] bg-card/60 border border-border/50 group-hover:border-success/20 transition-all shadow-inner">
                                    <p className="text-[9px] font-black text-success uppercase tracking-widest mb-2 italic">Delta to S-Delta 1</p>
                                    <p className="text-2xl font-black text-foreground italic tabular-nums">-2.5%</p>
                                </div>
                                <div className="p-6 rounded-[1.5rem] bg-card/60 border border-border/50 group-hover:border-primary/20 transition-all shadow-inner">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2 italic">Neural Risk Ratio</p>
                                    <p className="text-2xl font-black text-foreground italic tabular-nums">1:1.08</p>
                                </div>
                            </div>
                        </Card>

                        {/* AI Recommendation */}
                        <Card className="bg-gradient-to-br from-primary/10 to-accent border-2 border-primary/20 shadow-[0_20px_50px_rgba(var(--primary),0.1)] rounded-[3rem] p-12 mt-10 border overflow-hidden relative group">
                            <div className="absolute top-0 right-0 h-96 w-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:bg-primary/20 transition-all duration-1000" />
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
                                <div className="p-6 rounded-[2rem] bg-primary shadow-[0_20px_40px_rgba(var(--primary),0.4)] flex-shrink-0 animate-bounce-slow">
                                    <BrainCircuit className="h-10 w-10 text-primary-foreground" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="text-3xl font-black text-foreground mb-4 italic uppercase tracking-tight">Neural Alpha Directive</h4>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-medium italic">
                                        Current structural formation indicates a mid-range equilibrium between high-density support at $61,200 and peak resistance at $67,200.
                                        Neural risk-modeling favors a strategic accumulation directive with high-integrity protection below S-Delta 1.
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                        <Badge className="bg-success text-success-foreground font-black text-[10px] px-5 py-2 rounded-xl shadow-lg shadow-success/20 uppercase tracking-widest italic">
                                            ALPHA ENTRY: $65,000 — $65,500
                                        </Badge>
                                        <Badge className="bg-primary text-primary-foreground font-black text-[10px] px-5 py-2 rounded-xl shadow-lg shadow-primary/20 uppercase tracking-widest italic">
                                            NEURAL TARGET: $67,200
                                        </Badge>
                                        <Badge className="bg-destructive text-destructive-foreground font-black text-[10px] px-5 py-2 rounded-xl shadow-lg shadow-destructive/20 uppercase tracking-widest italic">
                                            ALPHA EXIT: $63,500
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
