"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Eye,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Bell,
    Trash2,
    TrendingUp,
    Activity
} from "lucide-react"
import { cn } from "@/lib/utils"

const watchlistItems = [
    { rank: 1, name: "Bitcoin", symbol: "BTC", price: 64231.42, change: 2.4, mcap: "1.25T", status: "Neural Bull", alert: "$65,000", theme: "primary" },
    { rank: 3, name: "Solana", symbol: "SOL", price: 145.82, change: 5.2, mcap: "64.8B", status: "Overbought", alert: "$160", theme: "warning" },
    { rank: 12, name: "Chainlink", symbol: "LINK", price: 18.25, change: -1.2, mcap: "10.4B", status: "Neutral Sync", alert: "$20", theme: "muted" },
    { rank: 54, name: "Render", symbol: "RNDR", price: 10.42, change: 8.5, mcap: "4.2B", status: "Structural Bull", alert: "$12", theme: "success" },
]

export default function WatchlistPage() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50 backdrop-blur-sm">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-primary shadow-lg shadow-primary/20">
                                <Eye className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Alpha Watch</h1>
                        </div>
                        <p className="text-muted-foreground text-[11px] ml-16 font-black uppercase tracking-[0.2em] italic opacity-60">Tracking {watchlistItems.length} neural vectors with price alerts</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest px-8 shadow-xl shadow-primary/20 border-0 transition-all hover:scale-105 active:scale-95">
                            <Search className="h-5 w-5 mr-3" /> Add Alpha Vector
                        </Button>
                    </div>
                </div>

                {/* Watchlist Table */}
                <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-2xl rounded-[3rem] overflow-hidden border group">
                    <CardHeader className="p-10 border-b border-border/30 flex flex-col md:flex-row items-center justify-between bg-muted/20 relative">
                        <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
                        <div className="relative z-10 text-center md:text-left">
                            <CardTitle className="text-2xl font-black text-foreground italic uppercase tracking-tighter">Neural Monitors</CardTitle>
                            <CardDescription className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60 mt-1">Real-time alerts and high-fidelity sentiment sync</CardDescription>
                        </div>
                        <div className="flex gap-4 relative z-10 mt-6 md:mt-0">
                            <Button variant="outline" size="sm" className="rounded-xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-6 h-10 hover:text-primary transition-all">
                                <Filter className="h-4 w-4 mr-3" /> Alpha Sort
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-muted/30 border-b border-border/30 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                                        <th className="p-8">Asset Vector</th>
                                        <th className="p-8">Neural Value</th>
                                        <th className="p-8">24h Alpha Delta</th>
                                        <th className="p-8">Next Structural Alert</th>
                                        <th className="p-8 text-center">Neural Sentiment</th>
                                        <th className="p-8">Alpha Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/30 font-black italic">
                                    {watchlistItems.map((item) => (
                                        <tr key={item.symbol} className="hover:bg-primary/5 transition-all group/row cursor-pointer text-foreground">
                                            <td className="p-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="h-14 w-14 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center font-black text-primary text-lg shadow-inner group-hover/row:scale-110 group-hover/row:bg-primary/10 transition-all italic">
                                                        {item.symbol[0]}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-lg text-foreground uppercase tracking-tighter leading-tight">{item.name}</span>
                                                        <span className="text-[10px] font-black text-muted-foreground tracking-widest uppercase opacity-60">{item.symbol}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <span className="text-xl font-black text-foreground tabular-nums">${item.price.toLocaleString()}</span>
                                            </td>
                                            <td className="p-8">
                                                <div className={cn("flex items-center gap-2 font-black tabular-nums text-sm", item.change >= 0 ? "text-success" : "text-destructive")}>
                                                    {item.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                                    {Math.abs(item.change)}% Alpha
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <Badge className="rounded-xl border-dashed border-primary/30 bg-primary/5 text-primary font-black px-4 py-2 tabular-nums text-[10px] uppercase tracking-widest shadow-lg shadow-primary/5">
                                                    <Bell className="h-3.5 w-3.5 mr-2 opacity-60" /> {item.alert} SYNC
                                                </Badge>
                                            </td>
                                            <td className="p-8 text-center">
                                                <Badge className={cn("font-black text-[9px] uppercase tracking-widest py-2 px-4 rounded-xl border italic shadow-xl transition-transform group-hover/row:scale-110",
                                                    item.theme === 'primary' ? 'bg-primary/10 text-primary border-primary/20 shadow-primary/10' :
                                                        item.theme === 'warning' ? 'bg-warning/10 text-warning border-warning/20 shadow-warning/10' :
                                                            item.theme === 'success' ? 'bg-success/10 text-success border-success/20 shadow-success/10' :
                                                                'bg-muted/30 text-muted-foreground border-border/50'
                                                )}>
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="p-8">
                                                <div className="flex items-center gap-4">
                                                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all shadow-sm border border-transparent hover:border-primary/20">
                                                        <TrendingUp className="h-5 w-5" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all shadow-sm border border-transparent hover:border-destructive/20">
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {watchlistItems.length === 0 && (
                            <div className="p-32 text-center flex flex-col items-center group/empty">
                                <div className="h-24 w-24 rounded-[2rem] bg-muted/40 flex items-center justify-center mb-8 border-2 border-dashed border-border/50 group-hover/empty:scale-110 transition-transform">
                                    <Eye className="h-10 w-10 text-muted-foreground/30" />
                                </div>
                                <h3 className="text-2xl font-black text-foreground italic uppercase tracking-tighter leading-tight">Neural Watch Cache Empty</h3>
                                <p className="text-muted-foreground font-black mt-3 italic text-[11px] uppercase tracking-widest opacity-60">Inject alpha vectors to begin structural monitoring synthesis.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Retention Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-2xl rounded-[3rem] p-10 border group/alert">
                        <div className="flex justify-between items-start mb-8 relative">
                            <div className="absolute inset-0 bg-destructive/5 blur-3xl rounded-full" />
                            <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic opacity-60 relative z-10">Global Structural Variance alert</h4>
                            <div className="p-3 rounded-2xl bg-destructive/10 shadow-inner group-hover/alert:scale-110 transition-transform relative z-10">
                                <Activity className="h-5 w-5 text-destructive" />
                            </div>
                        </div>
                        <p className="text-sm font-black text-muted-foreground leading-relaxed italic opacity-80 mb-10 relative z-10">
                            Watchlist average structural volatility is up 18% in the last 4 hours. Macro cycle is approaching a high-conviction liquidity sweep zone. Calibrate entry vectors.
                        </p>
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="flex -space-x-5">
                                {[1, 2, 3, 4].map(i => <div key={i} className="h-10 w-10 rounded-2xl border-2 border-background bg-muted shadow-xl shadow-black/20" />)}
                            </div>
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] italic opacity-40">12.4k others tracking similar structural assets</span>
                        </div>
                    </Card>
                </div>
            </div>
        </AppShell>
    )
}
