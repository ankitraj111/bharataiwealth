"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Zap,
    Target,
    ShieldAlert,
    Bell,
    Clock,
    ArrowUpRight,
    ChevronRight,
    TrendingUp,
    TrendingDown,
    Activity,
    History,
    Save,
    Trash2
} from "lucide-react"

const signals = [
    {
        id: 1,
        pair: "BTC/USDT",
        type: "LONG",
        entry: "$64,200",
        targets: ["$65,800", "$67,200", "$68,500"],
        stopLoss: "$62,800",
        risk: "High",
        time: "10m ago",
        status: "Active",
        conviction: 92
    },
    {
        id: 2,
        pair: "ETH/USDT",
        type: "SHORT",
        entry: "$3,450",
        targets: ["$3,320", "$3,250", "$3,180"],
        stopLoss: "$3,580",
        risk: "Medium",
        time: "2h ago",
        status: "Take Profit Hit",
        conviction: 78
    },
    {
        id: 3,
        pair: "SOL/USDT",
        type: "LONG",
        entry: "$145.2",
        targets: ["$158.0", "$165.5"],
        stopLoss: "$138.2",
        risk: "High",
        time: "4h ago",
        status: "Active",
        conviction: 85
    },
]

export default function TradingSignals() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50 transition-colors duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                                <Zap className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h1 className="text-3xl font-black text-foreground tracking-tight italic">Trading Alpha Signals</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12 font-medium italic">Neural network pattern matching and institutional tape reading</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center px-4 py-2 rounded-xl bg-card/40 border border-border/50 backdrop-blur-md">
                            <span className="text-[10px] font-black text-primary tracking-widest uppercase italic">Real-time Alpha Analysis</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Active Signals Grid */}
                    {[
                        { asset: "BTC", type: "Bullish Divergence", timeframe: "4H", strength: 84, trend: "Buy", color: "text-success", bg: "bg-success/5" },
                        { asset: "ETH", type: "Institutional Sweep", timeframe: "1H", strength: 92, trend: "Strong Buy", color: "text-primary", bg: "bg-primary/5" },
                        { asset: "SOL", type: "Liquidity Grab", timeframe: "15M", strength: 65, trend: "Scalp Long", color: "text-warning", bg: "bg-warning/5" },
                        { asset: "XRP", type: "Trend Reversal", timeframe: "Daily", strength: 42, trend: "Neutral", color: "text-muted-foreground", bg: "bg-muted" },
                        { asset: "ADA", type: "Breakout Pattern", timeframe: "1H", strength: 78, trend: "Buy", color: "text-success", bg: "bg-success/5" },
                        { asset: "DOT", type: "Whale Accumulation", timeframe: "4H", strength: 88, trend: "Strong Buy", color: "text-primary", bg: "bg-primary/5" },
                    ].map((signal, i) => (
                        <Card key={i} className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-8 border hover:border-primary/20 transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-all" />
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center font-black text-xl text-foreground shadow-inner transition-transform group-hover:scale-110 italic">
                                            {signal.asset[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-foreground italic tracking-tight">{signal.asset}/USDT</h3>
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">{signal.timeframe} Neural Scan</span>
                                        </div>
                                    </div>
                                    <Badge className={`${cn(
                                        "rounded-xl border-0 font-black text-[9px] uppercase tracking-widest px-4 py-1.5",
                                        signal.trend.includes('Buy') ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                                    )}`}>
                                        {signal.trend}
                                    </Badge>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border/50">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 italic">Scan Result</p>
                                        <p className="text-sm font-black text-foreground italic line-clamp-1">{signal.type}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic">
                                            <span className="text-muted-foreground">Neural Confidence</span>
                                            <span className={signal.color}>{signal.strength}%</span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden border border-border/5">
                                            <div className={cn("h-full transition-all duration-1000", signal.color.replace('text-', 'bg-'))} style={{ width: `${signal.strength}%` }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <Button className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] transition-all shadow-lg border-0 group/btn">
                                        Deploy Capital <ArrowUpRight className="h-4 w-4 ml-1.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                    </Button>
                                    <Button variant="outline" className="h-11 w-11 rounded-xl border-border bg-card/40 text-muted-foreground p-0 hover:text-foreground transition-all">
                                        <TrendingUp className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}

                    <Card className="bg-card/20 border-2 border-dashed border-border/50 shadow-inner rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center hover:border-primary/20 transition-all cursor-pointer group">
                        <div className="h-20 w-20 rounded-[2rem] bg-card border border-border/50 flex items-center justify-center mb-8 shadow-xl transition-transform group-hover:scale-110">
                            <Target className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-xl font-black text-foreground uppercase tracking-tight italic">Neural Alpha Sync</h3>
                        <p className="text-muted-foreground font-bold text-sm max-w-xs mt-3 leading-relaxed">Connect your custom strategy builder to generate personalized alpha alerts.</p>
                    </Card>
                </div>

                {/* Footer Note */}
                <Card className="bg-destructive/5 border border-destructive/10 backdrop-blur-md rounded-[2rem] p-8 flex items-start gap-6 shadow-xl">
                    <div className="p-4 rounded-2xl bg-destructive/10 shadow-inner">
                        <ShieldAlert className="h-6 w-6 text-destructive" />
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm font-black text-destructive uppercase tracking-[0.2em] italic">Risk Protocol Directive</h4>
                        <p className="text-xs text-muted-foreground font-bold leading-relaxed max-w-4xl italic">
                            Alpha signals are generated via high-velocity neural pattern matching. Past performance is not an indicator of future results. Liquidation risks are inherent in algorithmic trading. Deploy capital responsibly.
                        </p>
                    </div>
                </Card>
            </div>
        </AppShell>
    )
}
