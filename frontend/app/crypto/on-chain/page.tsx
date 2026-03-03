"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Link2,
    Users,
    Zap,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Wallet,
    History,
    TrendingUp,
    Globe,
    Database,
    RefreshCcw
} from "lucide-react"

const whaleTransactions = [
    { id: 1, type: "Exchange Outflow", asset: "BTC", amount: "1,240 BTC", value: "$79.6M", from: "Binance", to: "Unknown Wallet", time: "12m ago" },
    { id: 2, type: "Transfer", asset: "ETH", amount: "12,000 ETH", value: "$41.4M", from: "Unknown Wallet", to: "Unknown Wallet", time: "45m ago" },
    { id: 3, type: "Exchange Inflow", asset: "SOL", amount: "150,000 SOL", value: "$21.8M", from: "Unknown Wallet", to: "Coinbase", time: "1h ago" },
]

export default function OnChainData() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-success/10 text-success shadow-[0_0_15px_rgba(var(--success),0.2)]">
                                <Link2 className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground tracking-tight">On-Chain Intelligence</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12 font-medium">Real-time network activity, wallet flows, and institutional footprints</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-xl bg-success/5 border border-success/20 backdrop-blur-md">
                            <span className="text-xs font-bold text-success uppercase tracking-widest">Scanning 42 Blockchains</span>
                        </div>
                        <Button variant="outline" className="rounded-xl border-border bg-card/40 text-muted-foreground hover:text-foreground hover:bg-accent transition-all font-bold">
                            <Database className="h-4 w-4 mr-2 text-success" /> RPC Status
                        </Button>
                    </div>
                </div>

                {/* Pro Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Active Wallets (24H)", val: "1.24M", change: "+4.2%", icon: Users, color: "text-primary", bg: "bg-primary/10" },
                        { label: "Network Fees", val: "$12.4M", change: "-12.5%", icon: Zap, color: "text-warning", bg: "bg-warning/10" },
                        { label: "Exchange Reserve", val: "Stable", change: "Decreasing", icon: Wallet, color: "text-primary", bg: "bg-primary/10" },
                        { label: "Hash Rate", val: "640 EH/s", change: "ATH", icon: Activity, color: "text-success", bg: "bg-success/10" },
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

                {/* Whale Transactions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border">
                        <CardHeader className="p-8 border-b border-border/50 flex flex-row items-center justify-between bg-card/[0.01]">
                            <div>
                                <CardTitle className="text-xl font-bold text-foreground italic">Institutional Whale Tracking</CardTitle>
                                <CardDescription className="font-bold text-muted-foreground uppercase tracking-widest text-[10px] mt-1">Real-time detection of high-volume wallet activity</CardDescription>
                            </div>
                            <Button variant="ghost" className="rounded-xl text-muted-foreground font-bold hover:text-foreground hover:bg-accent transition-all">
                                <Globe className="h-4 w-4 mr-2" /> Global Heatmap
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-muted/50 border-b border-border/50 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                            <th className="p-6">Flow Type</th>
                                            <th className="p-6">Asset</th>
                                            <th className="p-6">Amount / Value</th>
                                            <th className="p-6">Entity (From › To)</th>
                                            <th className="p-6 text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {whaleTransactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-success/[0.03] transition-colors group cursor-pointer font-bold">
                                                <td className="p-6">
                                                    <Badge className={`rounded-full px-3 py-1 font-black text-[9px] uppercase tracking-widest border-0 ${tx.type.includes('Inflow') ? 'text-destructive bg-destructive/10' :
                                                        tx.type.includes('Outflow') ? 'text-success bg-success/10' :
                                                            'text-primary bg-primary/10'
                                                        }`}>
                                                        {tx.type}
                                                    </Badge>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-xl bg-card border border-border/50 flex items-center justify-center font-black text-xs text-foreground shadow-inner transition-transform group-hover:scale-110">
                                                            {tx.asset[0]}
                                                        </div>
                                                        <span className="font-black text-foreground uppercase tracking-widest text-xs">{tx.asset}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <p className="font-black text-foreground tabular-nums text-sm">{tx.amount}</p>
                                                    <p className="text-[10px] font-bold text-muted-foreground tabular-nums uppercase tracking-tighter">{tx.value}</p>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-muted-foreground">{tx.from}</span>
                                                        <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                                                        <span className="text-xs font-bold text-muted-foreground">{tx.to}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] tabular-nums">{tx.time}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-8">
                        <Card className="bg-card/40 border-success/20 backdrop-blur-2xl shadow-xl rounded-[2.5rem] p-8 border hover:border-success/30 transition-all relative overflow-hidden group">
                            <div className="absolute top-0 right-0 h-32 w-32 bg-success/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-success/10 transition-all" />
                            <h4 className="text-[10px] font-black text-success uppercase tracking-[0.3em] mb-6 flex items-center gap-2 italic">
                                <History className="h-4 w-4" /> Network Pulse
                            </h4>
                            <div className="space-y-6">
                                <div className="p-5 rounded-[2rem] bg-card/[0.02] border border-border/50 group hover:bg-card/[0.05] transition-all relative z-10">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3">Liquidity Delta</p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-black text-foreground italic">Aggressive Buy</span>
                                            <span className="text-[10px] font-black text-success tabular-nums">78%</span>
                                        </div>
                                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden border border-border/50 shadow-inner">
                                            <div className="h-full bg-success shadow-[0_0_10px_rgba(var(--success),0.5)]" style={{ width: '78%' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 rounded-[2rem] bg-card/[0.02] border border-border/50 group hover:bg-card/[0.05] transition-all relative z-10">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3">Wallet Concentration</p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-black text-foreground italic">Decentralizing</span>
                                            <span className="text-[10px] font-black text-primary tabular-nums">45%</span>
                                        </div>
                                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden border border-border/50 shadow-inner">
                                            <div className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" style={{ width: '45%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-muted-foreground leading-relaxed mt-8 italic text-center px-4">
                                "Whale activity suggests institutional accumulation phase. Low retail participation detected in current buy walls."
                            </p>
                        </Card>

                        <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] p-8 border">
                            <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6 italic">Social Network Rank</h4>
                            <div className="space-y-5">
                                {[
                                    { name: "Solana", rank: 1, score: 92, color: "bg-success" },
                                    { name: "Bitcoin", rank: 2, score: 85, color: "bg-accent" },
                                    { name: "Ethereum", rank: 3, score: 72, color: "bg-primary" },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-foreground">{item.name}</span>
                                            <span className="text-muted-foreground tabular-nums">{item.score}/100</span>
                                        </div>
                                        <Progress value={item.score} className={`h-1.5 bg-muted rounded-full border border-border/50 overflow-hidden`} />
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}

function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
