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
    MoreHorizontal,
    Bell,
    Trash2,
    TrendingUp,
    Activity
} from "lucide-react"

const watchlistItems = [
    { rank: 1, name: "Bitcoin", symbol: "BTC", price: 64231.42, change: 2.4, mcap: "1.25T", status: "Bullish", alert: "$65,000" },
    { rank: 3, name: "Solana", symbol: "SOL", price: 145.82, change: 5.2, mcap: "64.8B", status: "Overbought", alert: "$160" },
    { rank: 12, name: "Chainlink", symbol: "LINK", price: 18.25, change: -1.2, mcap: "10.4B", status: "Neutral", alert: "$20" },
    { rank: 54, name: "Render", symbol: "RNDR", price: 10.42, change: 8.5, mcap: "4.2B", status: "Strong Bull", alert: "$12" },
]

export default function WatchlistPage() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
                                <Eye className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">My Watchlist</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12">Tracking {watchlistItems.length} assets with price alerts</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                            <Search className="h-4 w-4 mr-2" /> Add Asset
                        </Button>
                    </div>
                </div>

                {/* Watchlist Table */}
                <Card className="bg-white/90 border-amber-500/20 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden border-2">
                    <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between bg-white/[0.02]">
                        <div>
                            <CardTitle className="text-xl font-black text-slate-900">Active Monitors</CardTitle>
                            <CardDescription className="font-bold text-slate-500">Real-time alerts and sentiment status</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="rounded-xl text-slate-400 hover:text-white font-bold">
                                <Filter className="h-4 w-4 mr-2" /> Sort
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                        <th className="p-6">Asset</th>
                                        <th className="p-6">Price</th>
                                        <th className="p-6">24h Change</th>
                                        <th className="p-6">Next Alert</th>
                                        <th className="p-6">Sentiment</th>
                                        <th className="p-6">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {watchlistItems.map((item) => (
                                        <tr key={item.symbol} className="hover:bg-amber-500/[0.02] transition-colors group">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-2xl bg-slate-800 border border-white/5 flex items-center justify-center font-black text-amber-500 shadow-inner group-hover:scale-110 transition-transform">
                                                        {item.symbol[0]}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-slate-900">{item.name}</span>
                                                        <span className="text-[10px] font-black text-slate-500 tracking-widest">{item.symbol}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="font-black text-slate-900 tabular-nums">${item.price.toLocaleString()}</span>
                                            </td>
                                            <td className="p-6">
                                                <div className={`flex items-center gap-1 font-black tabular-nums text-xs ${item.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                                                    {item.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                                    {Math.abs(item.change)}%
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <Badge variant="outline" className="rounded-full border-amber-500/20 text-amber-500 bg-amber-500/5 font-bold tabular-nums">
                                                    <Bell className="h-3 w-3 mr-1" /> {item.alert}
                                                </Badge>
                                            </td>
                                            <td className="p-6 text-center">
                                                <Badge className={`font-black text-[9px] uppercase tracking-widest py-1 px-3 rounded-full ${item.status.includes('Bull') ? 'bg-emerald-500/10 text-emerald-500' :
                                                    item.status === 'Overbought' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-400'
                                                    }`}>
                                                    {item.status}
                                                </Badge>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-600 hover:text-white hover:bg-white/10">
                                                        <TrendingUp className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-rose-500/10">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {watchlistItems.length === 0 && (
                            <div className="p-20 text-center flex flex-col items-center">
                                <div className="h-16 w-16 rounded-3xl bg-amber-500/10 flex items-center justify-center mb-4">
                                    <Eye className="h-8 w-8 text-amber-500/40" />
                                </div>
                                <h3 className="text-lg font-black text-slate-900">Watchlist Empty</h3>
                                <p className="text-slate-500 font-bold mt-1">Start adding assets to track their technical updates.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Retention Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-white/90 border-amber-500/20 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-8 border-2">
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="text-sm font-black text-amber-500 uppercase tracking-widest">Global Volatility Alert</h4>
                            <div className="p-2 rounded-xl bg-rose-500/10"><Activity className="h-4 w-4 text-rose-500" /></div>
                        </div>
                        <p className="text-sm font-black text-slate-700 leading-relaxed">
                            Watchlist average volatility is up 18% in the last 4 hours. Market is approaching a high-conviction liquidity sweep zone.
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800" />)}
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase">12.4k others tracking similar assets</span>
                        </div>
                    </Card>
                </div>
            </div>
        </AppShell>
    )
}
