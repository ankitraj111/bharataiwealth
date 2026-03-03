"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    TrendingUp,
    TrendingDown,
    Zap,
    Activity,
    Globe,
    Search,
    ArrowUpRight,
    PieChart
} from "lucide-react"

const topCryptos = [
    { rank: 1, name: "Bitcoin", symbol: "BTC", price: "$64,231.42", change: "+2.4%", mcap: "1.25T", vol: "32.4B" },
    { rank: 2, name: "Ethereum", symbol: "ETH", price: "$3,452.18", change: "-0.8%", mcap: "415.2B", vol: "12.8B" },
    { rank: 3, name: "Solana", symbol: "SOL", price: "$145.82", change: "+5.2%", mcap: "64.8B", vol: "3.2B" },
    { rank: 4, name: "BNB", symbol: "BNB", price: "$582.15", change: "+1.2%", mcap: "89.4B", vol: "1.5B" },
    { rank: 5, name: "XRP", symbol: "XRP", price: "$0.62", change: "-1.4%", mcap: "34.1B", vol: "1.1B" },
]

export default function MarketOverview() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground tracking-tight">Market Overview</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12 font-medium">Real-time cryptocurrency market data and global insights</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-xl bg-primary/5 border border-primary/20 backdrop-blur-md">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Live Data Tracking</span>
                        </div>
                        <Button variant="outline" className="rounded-xl border-border bg-card/40 text-muted-foreground hover:text-foreground hover:bg-accent transition-all font-bold">
                            <Globe className="h-4 w-4 mr-2" /> All Markets
                        </Button>
                    </div>
                </div>

                {/* Global Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Market Cap", val: "$2.64T", change: "+1.2%", icon: Globe, color: "text-primary", bg: "bg-primary/10" },
                        { label: "24h Volume", val: "$84.2B", change: "-5.4%", icon: Zap, color: "text-warning", bg: "bg-warning/10" },
                        { label: "BTC Dominance", val: "52.4%", change: "+0.4%", icon: PieChart, color: "text-primary", bg: "bg-primary/10" },
                        { label: "Fear & Greed", val: "72", change: "Greed", icon: Activity, color: "text-success", bg: "bg-success/10" },
                    ].map((m, i) => (
                        <Card key={i} className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-2xl p-6 hover:border-primary/20 transition-all relative overflow-hidden group">
                            <div className={`absolute -right-4 -bottom-4 opacity-10 ${m.color} group-hover:scale-110 transition-transform duration-500`}>
                                <m.icon className="h-24 w-24" />
                            </div>
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.15em] mb-1">{m.label}</p>
                            <h3 className="text-2xl font-black text-foreground italic tabular-nums">{m.val}</h3>
                            <Badge className={`mt-2 font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full ${m.bg} ${m.color} border-0`}>
                                {m.change}
                            </Badge>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Top Cryptocurrencies Table */}
                    <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border">
                        <CardHeader className="p-8 border-b border-border/50 flex flex-row items-center justify-between bg-card/[0.01]">
                            <div>
                                <CardTitle className="text-xl font-bold text-foreground italic">Top Cryptocurrencies</CardTitle>
                                <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Live market data by capitalization</CardDescription>
                            </div>
                            <Button variant="ghost" className="rounded-xl text-muted-foreground font-bold hover:text-foreground hover:bg-accent transition-all">
                                <ArrowUpRight className="h-4 w-4 mr-2" /> Full Market
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-muted/50 border-b border-border/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                            <th className="p-6">Asset</th>
                                            <th className="p-6">Price</th>
                                            <th className="p-6">24h Change</th>
                                            <th className="p-6">Market Cap</th>
                                            <th className="p-6 text-right">Volume (24h)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {topCryptos.map((coin, i) => (
                                            <tr key={i} className="hover:bg-muted/20 transition-colors cursor-pointer group font-bold">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-xl bg-card border border-border/50 flex items-center justify-center font-black text-xs text-foreground shadow-inner group-hover:scale-110 transition-all">
                                                            {coin.symbol[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-foreground text-sm">{coin.name}</div>
                                                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{coin.symbol}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6 font-black text-foreground tabular-nums">{coin.price}</td>
                                                <td className="p-6">
                                                    <span className={cn(
                                                        "font-black tabular-nums text-sm",
                                                        coin.change.startsWith('+') ? "text-success" : "text-destructive"
                                                    )}>
                                                        {coin.change}
                                                    </span>
                                                </td>
                                                <td className="p-6 font-black text-foreground text-sm tabular-nums">{coin.mcap}</td>
                                                <td className="p-6 text-right font-black text-foreground text-sm tabular-nums">{coin.vol}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Market Insights */}
                    <div className="space-y-8">
                        <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] p-8 border">
                            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6 italic">Market Insights</h4>
                            <div className="space-y-6">
                                {[
                                    { text: "Institutional accumulation on BTC remains strong despite volatility.", importance: "High", type: "Bullish" },
                                    { text: "Altcoin volume consolidation in Layer 1 sectors.", importance: "Med", type: "Neutral" },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <Badge className={cn(
                                                "rounded-full px-2.5 py-0.5 text-[8px] font-black uppercase tracking-widest border-0",
                                                item.type === "Bullish" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                                            )}>
                                                {item.type}
                                            </Badge>
                                            <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest">Impact: {item.importance}</span>
                                        </div>
                                        <p className="text-xs font-bold text-foreground leading-relaxed italic">"{item.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Trending Topics */}
                        <div className="p-8 rounded-[2.5rem] bg-card/40 border border-border/50 group hover:bg-card transition-all relative z-10">
                            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6">Trending Topics</p>
                            <div className="flex flex-wrap gap-2">
                                {["#Layer2Scaling", "#SolanaSummer", "#BTCETFs", "#DeFiProtocol", "#Web3Gaming"].map((tag, i) => (
                                    <span key={i} className="px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-[10px] font-black text-foreground uppercase tracking-widest cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="px-5 py-3 rounded-2xl bg-success/5 border border-success/20 backdrop-blur-md">
                                <span className="text-[10px] font-black text-success uppercase tracking-[0.2em]">Global Alpha Detected</span>
                            </div>
                            <Button variant="ghost" className="rounded-xl text-muted-foreground font-bold hover:text-foreground">
                                <Search className="h-4 w-4 mr-2" /> All Topics
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
