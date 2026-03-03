"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    PieChart,
    BarChart3,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    History,
    Download,
} from "lucide-react"

const holdings = [
    { name: "Bitcoin", symbol: "BTC", amount: "0.24", value: 15415.54, profit: 3421.20, change: 12.4, theme: "bg-primary text-primary-foreground shadow-primary/20" },
    { name: "Ethereum", symbol: "ETH", amount: "4.2", value: 14499.15, profit: -842.50, change: -5.8, theme: "bg-accent text-accent-foreground shadow-accent/20" },
    { name: "Solana", symbol: "SOL", amount: "45.0", value: 6561.90, profit: 2145.30, change: 48.2, theme: "bg-success text-success-foreground shadow-success/20" },
    { name: "Chainlink", symbol: "LINK", amount: "120.0", value: 2190.00, profit: 450.00, change: 25.9, theme: "bg-primary text-primary-foreground shadow-primary/20" },
]

export default function CryptoPortfolio() {
    const totalValue = holdings.reduce((acc, h) => acc + h.value, 0)
    const totalProfit = holdings.reduce((acc, h) => acc + h.profit, 0)
    const avgChange = 8.4

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-primary shadow-lg shadow-primary/20">
                                <Wallet className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Alpha Portfolio</h1>
                        </div>
                        <p className="text-muted-foreground text-[11px] ml-16 font-black uppercase tracking-[0.2em] italic opacity-60">Neural Asset & Performance Matrix</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest px-6 h-12 shadow-xl shadow-primary/20 border-0 transition-all hover:scale-105">
                            <Plus className="h-5 w-5 mr-3" /> Alpha Sync
                        </Button>
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl border-border bg-card/40 text-muted-foreground hover:text-primary transition-all">
                            <Download className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Portfolio Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2rem] overflow-hidden border group">
                        <CardContent className="p-8 relative">
                            <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 rounded-full blur-xl -mr-8 -mt-8 group-hover:bg-primary/10 transition-all" />
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 italic">Total Alpha Value</p>
                            <div className="flex items-baseline gap-3 relative z-10">
                                <h3 className="text-4xl font-black text-foreground tabular-nums italic tracking-tighter">${totalValue.toLocaleString()}</h3>
                                <Badge className="bg-success/10 text-success border-success/20 font-black px-3 py-1 rounded-lg text-[9px] uppercase tracking-widest italic">Live Sync</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2rem] overflow-hidden border group">
                        <CardContent className="p-8 relative">
                            <div className="absolute top-0 right-0 h-16 w-16 bg-success/5 rounded-full blur-xl -mr-8 -mt-8 group-hover:bg-success/10 transition-all" />
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 italic">Structural Alpha Sync</p>
                            <div className="flex items-baseline gap-3 relative z-10">
                                <h3 className={cn("text-4xl font-black tabular-nums italic tracking-tighter", totalProfit >= 0 ? "text-success" : "text-destructive")}>
                                    {totalProfit >= 0 ? "+" : ""}${Math.abs(totalProfit).toLocaleString()}
                                </h3>
                                <div className={cn("flex items-center gap-1 font-black text-xs uppercase italic tracking-widest", avgChange >= 0 ? "text-success" : "text-destructive")}>
                                    {avgChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                    {avgChange}%
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2rem] overflow-hidden border group">
                        <CardContent className="p-8 relative">
                            <div className="absolute top-0 right-0 h-16 w-16 bg-accent/5 rounded-full blur-xl -mr-8 -mt-8 group-hover:bg-accent/10 transition-all" />
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 italic">Neural Asset Matrix</p>
                            <div className="flex h-2.5 w-full rounded-full bg-muted overflow-hidden border border-border/30 relative z-10 shadow-inner">
                                {holdings.map((h, i) => (
                                    <div
                                        key={i}
                                        className={cn(h.theme.split(' ')[0], "h-full transition-all group-hover:scale-110")}
                                        style={{ width: `${(h.value / totalValue) * 100}%` }}
                                    />
                                ))}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-4 relative z-10">
                                {holdings.map((h, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className={cn("h-2.5 w-2.5 rounded-full", h.theme.split(' ')[0])} />
                                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest italic">{h.symbol}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Holdings List */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] overflow-hidden border group">
                        <CardHeader className="p-8 border-b border-border/30 bg-muted/20 relative">
                            <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                <div>
                                    <CardTitle className="text-2xl font-black text-foreground italic uppercase tracking-tighter">Alpha Positions</CardTitle>
                                    <CardDescription className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Active neural vectors in your portfolio</CardDescription>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-5 h-9 hover:text-primary transition-all">
                                    <PieChart className="h-4 w-4 mr-2" /> Neural Balance
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/30 border-b border-border/30 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                                            <th className="text-left p-6">Asset Vector</th>
                                            <th className="text-left p-6">Neural Load</th>
                                            <th className="text-left p-6">Structural Val</th>
                                            <th className="text-left p-6">Alpha Sync</th>
                                            <th className="text-right p-6">24h Delta</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/30">
                                        {holdings.map((item) => (
                                            <tr key={item.symbol} className="hover:bg-primary/5 transition-all group/row cursor-pointer text-foreground">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-5">
                                                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm italic shadow-lg transition-transform group-hover/row:scale-110", item.theme)}>
                                                            {item.symbol[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-foreground italic uppercase tracking-tighter">{item.name}</div>
                                                            <div className="text-[10px] font-black text-muted-foreground tracking-widest uppercase italic opacity-60">{item.symbol}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <span className="font-black tabular-nums italic text-muted-foreground">{item.amount}</span>
                                                </td>
                                                <td className="p-6">
                                                    <span className="font-black tabular-nums text-foreground italic">${item.value.toLocaleString()}</span>
                                                </td>
                                                <td className="p-6">
                                                    <div className={cn(
                                                        "font-black tabular-nums text-xs italic uppercase tracking-widest",
                                                        item.profit >= 0 ? "text-success" : "text-destructive"
                                                    )}>
                                                        {item.profit >= 0 ? "+" : ""}${Math.abs(item.profit).toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <Badge className={cn("font-black text-[10px] uppercase tracking-widest border-0 py-1.5 px-3.5 rounded-xl shadow-lg transition-transform group-hover/row:scale-110", item.change >= 0 ? "bg-success/10 text-success shadow-success/10" : "bg-destructive/10 text-destructive shadow-destructive/10")}>
                                                        {item.change >= 0 ? "+" : ""}{item.change}%
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-8">
                        <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group">
                            <CardContent className="p-8 relative">
                                <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 rounded-full blur-xl -mr-8 -mt-8 group-hover:bg-primary/10 transition-all" />
                                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6 italic relative z-10">Alpha Transaction Log</h4>
                                <div className="space-y-6 relative z-10">
                                    {[
                                        { type: "Sync", asset: "SOL", amount: "12.0", time: "2h ago", price: "$142" },
                                        { type: "Swap", asset: "BTC › ETH", amount: "0.05", time: "1d ago", price: "$3.4k" },
                                        { type: "Stake", asset: "ETH", amount: "2.4", time: "3d ago", price: "4.2% APY" },
                                    ].map((log, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-primary/10 transition-all group/item shadow-inner border border-transparent hover:border-primary/20 bg-muted/20">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground group-hover/item:text-primary transition-all shadow-sm">
                                                    <History className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-foreground italic uppercase tracking-tighter">{log.type} {log.asset}</p>
                                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">{log.time}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black text-foreground italic">+{log.amount}</p>
                                                <p className="text-[10px] font-black text-primary uppercase tracking-widest italic opacity-80">{log.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="link" className="w-full mt-6 text-[10px] font-black text-primary hover:text-primary/80 transition-all uppercase tracking-widest italic h-auto p-0">
                                    View Structural Archive <ArrowUpRight className="h-3 w-3 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-primary/10 to-accent/20 border-primary/20 backdrop-blur-3xl shadow-2xl rounded-[2.5rem] overflow-hidden border group/intel">
                            <CardContent className="p-8 relative">
                                <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 rounded-full blur-[60px] -mr-16 -mt-16 group-hover/intel:bg-primary/20 transition-all duration-700" />
                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                    <div className="p-2 rounded-xl bg-primary/20">
                                        <BarChart3 className="h-5 w-5 text-primary" />
                                    </div>
                                    <h4 className="text-[10px] font-black text-foreground uppercase tracking-[0.2em] italic">Neural Alpha Synthesis</h4>
                                </div>
                                <p className="text-xs font-black text-muted-foreground leading-relaxed mb-6 italic opacity-80 relative z-10">
                                    Your structural portfolio beta is 1.4x market trajectory. Consider neural hedging with a 5% allocation to stable-alpha pools.
                                </p>
                                <Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] border-0 relative z-10">
                                    Calibrate Allocation
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
