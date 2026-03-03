"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Smile,
    Frown,
    Meh,
    Activity,
    TrendingUp,
    TrendingDown,
    MessageSquare,
    Newspaper,
    Twitter,
    Search,
    Zap,
    Sparkles,
    BarChart3,
    FileText
} from "lucide-react"

export default function MarketSentiment() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-warning/10 text-warning shadow-[0_0_15px_rgba(var(--warning),0.2)]">
                                <Smile className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground tracking-tight">Market Sentiment</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12 font-medium">Social signals and crowd psychology analysis</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-xl bg-warning/5 border border-warning/20 backdrop-blur-md">
                            <span className="text-xs font-bold text-warning uppercase tracking-widest">Processing 1.2M Headlines/HR</span>
                        </div>
                        <Button variant="outline" className="rounded-xl border-border bg-card/40 text-muted-foreground hover:text-foreground hover:bg-accent transition-all font-bold">
                            <Search className="h-4 w-4 mr-2" /> Filter Sources
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sentiment Pulse */}
                    <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border">
                        <CardHeader className="p-8 border-b border-border/50 bg-card/[0.01]">
                            <CardTitle className="text-[10px] font-black text-warning uppercase tracking-[0.3em] flex items-center gap-2 italic">
                                <Activity className="h-4 w-4" /> Global Sentiment Pulse
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] overflow-hidden group">
                                    <CardContent className="p-8 flex flex-col items-center text-center">
                                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-8">Social Media Sentiment</p>
                                        <div className="relative h-48 w-48 flex items-center justify-center mb-8">
                                            <svg className="h-full w-full -rotate-90 drop-shadow-[0_0_15px_rgba(var(--success),0.2)]">
                                                <circle cx="96" cy="96" r="82" className="stroke-muted fill-none" strokeWidth="16" />
                                                <circle
                                                    cx="96" cy="96" r="82"
                                                    className="stroke-success fill-none transition-all duration-1000"
                                                    strokeWidth="16"
                                                    strokeLinecap="round"
                                                    strokeDasharray="515"
                                                    strokeDashoffset={515 - (515 * 82) / 100}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-5xl font-black text-foreground italic tabular-nums">82%</span>
                                                <span className="text-[10px] font-black text-success uppercase tracking-[0.2em] mt-1">Bullish</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                                                <Twitter className="h-3.5 w-3.5 text-blue-500" />
                                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Extreme</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-warning/10 border border-warning/20">
                                                <MessageSquare className="h-3.5 w-3.5 text-warning" />
                                                <span className="text-[10px] font-black text-warning uppercase tracking-widest">Neutral</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-6 text-center">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">News Impact Score</p>
                                    <div className="relative h-56 w-56 mx-auto">
                                        <svg className="h-full w-full -rotate-90">
                                            <circle
                                                cx="112"
                                                cy="112"
                                                r="100"
                                                stroke="currentColor"
                                                strokeWidth="16"
                                                fill="transparent"
                                                className="text-muted"
                                            />
                                            <circle
                                                cx="112"
                                                cy="112"
                                                r="100"
                                                stroke="currentColor"
                                                strokeWidth="16"
                                                fill="transparent"
                                                strokeDasharray={2 * Math.PI * 100}
                                                strokeDashoffset={2 * Math.PI * 100 * (1 - 0.64)}
                                                strokeLinecap="round"
                                                className="text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-5xl font-black text-foreground italic tabular-nums">64</span>
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Positive</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center flex-col px-10">
                                        <Badge className="bg-muted text-muted-foreground border-0 rounded-lg px-4 py-2 font-black text-[9px] uppercase tracking-widest block mx-auto">
                                            <FileText className="h-3 w-3 mr-2 inline" /> High Volume
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Market Psychology */}
                    <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] overflow-hidden">
                        <CardContent className="p-8">
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-8 text-center">Market Psychology</p>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">FOMO Levels</span>
                                        <span className="text-[10px] font-black text-destructive uppercase tracking-widest">Intense</span>
                                    </div>
                                    <Progress value={85} className="h-1.5 bg-muted rounded-full border border-border/5" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">Panic Index</span>
                                        <span className="text-[10px] font-black text-success uppercase tracking-widest">Low</span>
                                    </div>
                                    <Progress value={12} className="h-1.5 bg-muted rounded-full border border-border/5" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">Retail Excitement</span>
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Very High</span>
                                    </div>
                                    <Progress value={92} className="h-1.5 bg-muted rounded-full border border-border/5" />
                                </div>
                            </div>
                        </CardContent>
                        <div className="p-6 rounded-2xl bg-warning/10 border border-warning/20 text-[11px] text-warning font-bold leading-relaxed italic">
                            Crowd sentiment is diverging from price action, suggesting a potential short-term volatility spike.
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Sentiment Feed */}
                    {[
                        { title: "Whale Alert", time: "2M AGO", type: "Bullish", impact: "High", content: "Large accumulation detected on BTC exchanges" },
                        { title: "News Flash", time: "15M AGO", type: "Neutral", impact: "Medium", content: "Regulatory discussions in EU show progress on MiCA" },
                        { title: "Social Pulse", time: "45M AGO", type: "Bearish", impact: "Low", content: "Sentiment dip on Layer 2 tokens following mainnet delays" },
                    ].map((item, i) => (
                        <Card key={i} className="bg-card/40 border-border/50 backdrop-blur-xl shadow-lg rounded-3xl p-6 border hover:border-border transition-all group overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center">
                                        {item.type === "Bullish" ? <TrendingUp className="h-5 w-5 text-success" /> : <TrendingDown className="h-5 w-5 text-destructive" />}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-foreground uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-[9px] text-muted-foreground font-bold tracking-widest">{item.time}</p>
                                    </div>
                                </div>
                                <Badge className={cn(
                                    "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-[0.2em] border-0",
                                    item.type === "Bullish" ? "bg-success/10 text-success" :
                                        item.type === "Bearish" ? "bg-destructive/10 text-destructive" :
                                            "bg-primary/10 text-primary"
                                )}>
                                    {item.type}
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-bold leading-relaxed italic mb-4">
                                {item.content}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest italic">Impact Strength</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map((s) => (
                                        <div key={s} className={cn(
                                            "h-1 w-4 rounded-full",
                                            s <= (item.impact === "High" ? 3 : item.impact === "Medium" ? 2 : 1)
                                                ? "bg-warning"
                                                : "bg-muted"
                                        )} />
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Detailed Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border">
                        <CardHeader className="p-8 border-b border-border/50 bg-card/[0.01]">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-warning/10 text-warning">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black text-foreground italic">AI Crowd Intelligence</CardTitle>
                                    <CardDescription className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1">Neural Pattern Matching</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="space-y-6">
                                {[
                                    { title: "ETF Approval Rumors", impact: "High", sentiment: "Positive", text: "Growing consensus on social media regarding upcoming Spot Solana ETF filings. Volume is spiking on keyword detection.", source: "Twitter Clusters" },
                                    { title: "Macro Regulation Update", impact: "Medium", sentiment: "Neutral", text: "New guidelines from SEC regarding staking protocols. Market reacting with cautious optimism at the clarity.", source: "Mainstream News" },
                                    { title: "Whale Wallet Discovery", impact: "High", sentiment: "Hyper-Bullish", text: "Identification of a new wallet holding 2% of total supply moving funds into long-term cold storage.", source: "On-Chain Feed" },
                                ].map((insight, i) => (
                                    <div key={i} className="p-6 rounded-[2rem] bg-card/[0.02] border border-border/50 hover:bg-card/[0.04] hover:border-border transition-all group">
                                        <div className="flex items-center justify-between mb-4">
                                            <h5 className="text-sm font-black text-foreground uppercase tracking-tight">{insight.title}</h5>
                                            <Badge className={`rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest border-0 ${insight.sentiment.includes('Positive') || insight.sentiment.includes('Bullish') ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                                                }`}>
                                                {insight.sentiment}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{insight.text}"</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Zap className="h-3.5 w-3.5 text-warning" />
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Impact: {insight.impact}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">{insight.source}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-8">
                        <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border">
                            <CardHeader className="p-8 border-b border-border/50 bg-card/[0.01]">
                                <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic">Fear & Greed Clock</CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="text-center mb-8">
                                    <h3 className="text-7xl font-black text-foreground italic mb-4 tabular-nums drop-shadow-[0_0_20px_rgba(var(--foreground),0.1)]">72</h3>
                                    <p className="text-[10px] font-black text-success uppercase tracking-[0.3em]">Greed Intensity</p>
                                    <p className="text-[10px] font-bold text-muted-foreground mt-6 italic">Historical average for Bull Cycle Phase 2: 68-75.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-card/[0.02] border border-border/50 text-center">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2">Yesterday</p>
                                        <p className="text-xl font-black text-foreground tabular-nums">68</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-card/[0.02] border border-border/50 text-center">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2">Last Week</p>
                                        <p className="text-xl font-black text-foreground tabular-nums">42</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/40 border-warning/20 backdrop-blur-2xl shadow-xl rounded-[2.5rem] p-8 border hover:border-warning/30 transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 h-32 w-32 bg-warning/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-warning/10 transition-all" />
                            <div className="relative z-10 text-center">
                                <div className="mx-auto p-4 rounded-2xl bg-warning/10 w-fit mb-6 shadow-lg shadow-warning/5">
                                    <Activity className="h-8 w-8 text-warning" />
                                </div>
                                <h4 className="text-lg font-black text-foreground uppercase tracking-tight mb-3">Neural Buzz Alert</h4>
                                <p className="text-[11px] text-muted-foreground font-bold leading-relaxed mb-8 italic">
                                    AI detection identifies a 350% spike in keyword '#SolanaSummer' across Reddit and Telegram cluster nodes.
                                </p>
                                <Button className="w-full h-12 rounded-xl bg-warning text-warning-foreground font-black uppercase tracking-widest hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(var(--warning),0.2)] border-0">
                                    Drill Down Analytics
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
