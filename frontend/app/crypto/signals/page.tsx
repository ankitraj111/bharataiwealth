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

export default function CryptoSignals() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Trading Signals</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12">AI-powered buy/sell alerts and trade recommendations</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-lg border-gray-300">
                            <Save className="h-4 w-4 mr-2" /> Saved Signals
                        </Button>
                        <Button className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold">
                            <Bell className="h-4 w-4 mr-2" /> Alert Settings
                        </Button>
                    </div>
                </div>

                {/* Live Signals Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {signals.map((sig) => (
                        <Card key={sig.id} className="bg-card border border-border shadow-sm rounded-xl overflow-hidden hover:border-border/80 transition-colors">
                            <CardHeader className="p-6 border-b border-border flex flex-row items-center justify-between bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold text-xs ${sig.type === 'LONG' ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400'
                                        }`}>
                                        {sig.type}
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-bold text-foreground">{sig.pair}</CardTitle>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Clock className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-xs font-medium text-muted-foreground">{sig.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge className={`font-semibold text-xs px-3 py-1 rounded-full ${sig.status === 'Active' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-green-100 text-green-700 border-green-200'
                                    }`}>
                                    {sig.status}
                                </Badge>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-3 gap-6 mb-6">
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-gray-600">Entry Zone</p>
                                        <p className="text-lg font-bold text-gray-900">{sig.entry}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-gray-600">Stop Loss</p>
                                        <p className="text-lg font-bold text-red-600">{sig.stopLoss}</p>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-xs font-semibold text-gray-600">Confidence</p>
                                        <p className="text-lg font-bold text-green-600">{sig.conviction}%</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-3">
                                    <p className="text-xs font-semibold text-gray-600">Take Profit Targets</p>
                                    <div className="flex flex-wrap gap-2">
                                        {sig.targets.map((t, i) => (
                                            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200">
                                                <span className="text-xs font-semibold text-gray-600">T{i + 1}</span>
                                                <span className="text-sm font-bold text-gray-900">{t}</span>
                                                <div className="h-2 w-2 rounded-full bg-gray-300 border border-gray-400" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-semibold text-gray-600">Risk Level</span>
                                            <Badge variant="outline" className={`rounded-lg px-2.5 py-0.5 font-semibold text-xs ${sig.risk === 'High' ? 'border-red-300 text-red-700' : 'border-amber-300 text-amber-700'
                                                }`}>
                                                {sig.risk} Risk
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"><History className="h-4 w-4" /></Button>
                                        <Button className="rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700">Execute Node</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    <Card className="bg-white border-dashed border-gray-300 shadow-sm rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-gray-400 transition-colors cursor-pointer">
                        <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center mb-6">
                            <Target className="h-8 w-8 text-gray-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Neural Strategy Sync</h3>
                        <p className="text-gray-600 font-medium max-w-xs mt-2">Connect your custom strategy builder to generate personalized alpha alerts.</p>
                    </Card>
                </div>

                {/* Footer Note */}
                <Card className="bg-rose-50 border border-rose-200 rounded-xl p-6 flex items-start gap-4 shadow-sm">
                    <div className="p-2.5 rounded-lg bg-rose-100"><ShieldAlert className="h-5 w-5 text-rose-600" /></div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-rose-700">Execution Protocol Alpha</h4>
                        <p className="text-xs text-rose-600 leading-relaxed">
                            Signals are generated via high-confidence pattern matching. Past performance does not guarantee future results. Liquidation risks are inherent in leverage trading. Use suggested stop-loss levels.
                        </p>
                    </div>
                </Card>
            </div>
        </AppShell>
    )
}
