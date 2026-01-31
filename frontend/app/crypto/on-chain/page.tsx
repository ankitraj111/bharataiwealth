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
    Database
} from "lucide-react"

const whaleTransactions = [
    { id: 1, type: "Exchange Outflow", asset: "BTC", amount: "1,240 BTC", value: "$79.6M", from: "Binance", to: "Unknown Wallet", time: "12m ago" },
    { id: 2, type: "Transfer", asset: "ETH", amount: "12,000 ETH", value: "$41.4M", from: "Unknown Wallet", to: "Unknown Wallet", time: "45m ago" },
    { id: 3, type: "Exchange Inflow", asset: "SOL", amount: "150,000 SOL", value: "$21.8M", from: "Unknown Wallet", to: "Coinbase", time: "1h ago" },
]

export default function OnChainData() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400">
                                <Link2 className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">On-Chain Intelligence</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12">Real-time network activity, wallet flows, and institutional footprints</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-lg bg-green-50 border border-green-200">
                            <span className="text-xs font-semibold text-green-700">Scanning 42 Blockchains</span>
                        </div>
                        <Button variant="outline" className="rounded-lg border-gray-300">
                            <Database className="h-4 w-4 mr-2 text-green-600" /> RPC Status
                        </Button>
                    </div>
                </div>

                {/* Pro Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Active Wallets (24H)", val: "1.24M", change: "+4.2%", icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/30" },
                        { label: "Network Fees", val: "$12.4M", change: "-12.5%", icon: Zap, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30" },
                        { label: "Exchange Reserve", val: "Stable", change: "Decreasing", icon: Wallet, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-950/30" },
                        { label: "Hash Rate", val: "640 EH/s", change: "ATH", icon: Activity, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/30" },
                    ].map((m, i) => (
                        <Card key={i} className="bg-card border border-border shadow-sm rounded-xl p-6 hover:border-border/80 transition-colors relative overflow-hidden">
                            <div className={`absolute -right-4 -bottom-4 opacity-5 ${m.color}`}>
                                <m.icon className="h-24 w-24" />
                            </div>
                            <p className="text-xs text-muted-foreground font-semibold mb-1">{m.label}</p>
                            <h3 className="text-2xl font-bold text-foreground">{m.val}</h3>
                            <Badge className={`mt-2 font-semibold text-xs px-2.5 py-0.5 rounded-full ${m.bg} ${m.color} border-border`}>
                                {m.change}
                            </Badge>
                        </Card>
                    ))}
                </div>

                {/* Whale Transactions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 bg-white/90 border-slate-200/60 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden border-2">
                        <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between bg-white/[0.02]">
                            <div>
                                <CardTitle className="text-xl font-black text-white">Institutional Whale Tracking</CardTitle>
                                <CardDescription className="font-bold text-slate-500 uppercase tracking-widest text-[10px]">Real-time detection of high-volume wallet activity</CardDescription>
                            </div>
                            <Button variant="ghost" className="rounded-xl text-slate-400 font-bold hover:text-white hover:bg-white/5">
                                <Globe className="h-4 w-4 mr-2" /> Global Heatmap
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white/5 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                            <th className="p-6">Flow Type</th>
                                            <th className="p-6">Asset</th>
                                            <th className="p-6">Amount / Value</th>
                                            <th className="p-6">Entity (From › To)</th>
                                            <th className="p-6 text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {whaleTransactions.map((tx) => (
                                            <tr key={tx.id} className="hover:bg-emerald-500/[0.02] transition-colors group cursor-pointer">
                                                <td className="p-6">
                                                    <Badge variant="outline" className={`rounded-full px-3 py-1 font-black text-[9px] uppercase ${tx.type.includes('Inflow') ? 'border-rose-500/30 text-rose-500 bg-rose-500/5' :
                                                        tx.type.includes('Outflow') ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5' :
                                                            'border-blue-500/30 text-blue-500 bg-blue-500/5'
                                                        }`}>
                                                        {tx.type}
                                                    </Badge>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center font-black text-xs text-slate-300">
                                                            {tx.asset[0]}
                                                        </div>
                                                        <span className="font-black text-white">{tx.asset}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <p className="font-black text-white tabular-nums text-sm">{tx.amount}</p>
                                                    <p className="text-[10px] font-bold text-slate-500">{tx.value}</p>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold text-slate-300">{tx.from}</span>
                                                        <ChevronRight className="h-3 w-3 text-slate-600" />
                                                        <span className="text-xs font-bold text-slate-300">{tx.to}</span>
                                                    </div>
                                                </td>
                                                <td className="p-6 text-right">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{tx.time}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-8">
                        <Card className="bg-white/90 border-emerald-500/30 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-8 border-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/10 rounded-full blur-2xl -mr-12 -mt-12" />
                            <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <History className="h-4 w-4" /> Network Pulse
                            </h4>
                            <div className="space-y-6">
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Liquidity Delta</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-black text-white">Aggressive Buy</span>
                                        <div className="h-2 w-24 rounded-full bg-slate-800 overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '78%' }} /></div>
                                    </div>
                                </div>
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Wallet Concentration</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-black text-white">Decentralizing</span>
                                        <div className="h-2 w-24 rounded-full bg-slate-800 overflow-hidden"><div className="h-full bg-blue-500" style={{ width: '45%' }} /></div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-slate-500 leading-relaxed mt-6 italic">
                                "Whale activity suggests institutional accumulation phase. Low retail participation detected in current buy walls."
                            </p>
                        </Card>

                        <Card className="bg-card border-border backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-8 border-2">
                            <h4 className="text-sm font-black text-foreground uppercase tracking-widest mb-6">Social Network Rank</h4>
                            <div className="space-y-4">
                                {[
                                    { name: "Solana", rank: 1, score: 92 },
                                    { name: "Bitcoin", rank: 2, score: 85 },
                                    { name: "Ethereum", rank: 3, score: 72 },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground">
                                            <span>{item.name}</span>
                                            <span>Score: {item.score}</span>
                                        </div>
                                        <Progress value={item.score} className="h-1.5 bg-muted rounded-full border border-border" />
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
