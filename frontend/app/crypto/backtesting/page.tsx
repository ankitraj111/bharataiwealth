"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    History,
    Play,
    TrendingUp,
    TrendingDown,
    Activity,
    BarChart3,
    Calendar,
    ArrowUpRight,
    ShieldCheck,
    Zap,
    Target,
    RefreshCcw
} from "lucide-react"

export default function CryptoBacktesting() {
    const [isRunning, setIsRunning] = useState(false)

    const runTest = () => {
        setIsRunning(true)
        setTimeout(() => setIsRunning(false), 3000)
    }

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-muted text-muted-foreground">
                                <History className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Backtesting Engine</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12">Validate custom neural node strategies against historical tick data</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-lg border-gray-300">
                            <Calendar className="h-4 w-4 mr-2 text-gray-600" /> Select Range
                        </Button>
                        <Button
                            onClick={runTest}
                            disabled={isRunning}
                            className="rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800"
                        >
                            {isRunning ? <RefreshCcw className="h-4 w-4 mr-2 animate-spin" /> : <Play className="h-4 w-4 mr-2" />}
                            {isRunning ? "Testing..." : "Execute Backtest"}
                        </Button>
                    </div>
                </div>

                {/* Results Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: "Win Rate", val: "68.4%", change: "Neural Ideal", icon: Target, color: "text-green-600", bg: "bg-green-50" },
                        { label: "Max Drawdown", val: "14.2%", change: "Within Limit", icon: TrendingDown, color: "text-red-600", bg: "bg-red-50" },
                        { label: "Profit Factor", val: "2.4x", change: "Strong Alpha", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
                        { label: "Risk-Reward", val: "1:3.2", change: "Optimized", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
                    ].map((m, i) => (
                        <Card key={i} className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:border-gray-300 transition-colors">
                            <div className={`p-2.5 rounded-lg w-fit mb-3 ${m.bg} ${m.color}`}>
                                <m.icon className="h-5 w-5" />
                            </div>
                            <p className="text-xs text-gray-600 font-semibold mb-1">{m.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{m.val}</h3>
                            <Badge className={`mt-2 font-semibold text-xs px-2.5 py-0.5 rounded-full ${m.bg} ${m.color} border-${m.color.split('-')[1]}-200`}>
                                {m.change}
                            </Badge>
                        </Card>
                    ))}
                </div>

                {/* Performance Chart Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                        <CardHeader className="p-6 border-b border-gray-100 bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-gray-100"><BarChart3 className="h-5 w-5 text-gray-600" /></div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-gray-900">Equity Curve Projection</CardTitle>
                                    <CardDescription className="text-xs text-gray-600">Historical performance vs Buy & Hold strategy</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[400px] flex items-center justify-center p-0 overflow-hidden relative bg-gray-50">
                            <div className="space-y-4 text-center">
                                <Activity className="h-12 w-12 text-gray-400 mx-auto" />
                                <p className="text-xs font-semibold text-gray-600">Backtest Dataset: BTC-USD 2021-2026</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <CardTitle className="text-sm font-bold text-green-600">Test Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {[
                                        { l: "Total Trades", v: "142" },
                                        { l: "Avg Green Trade", v: "+₹4,200" },
                                        { l: "Avg Red Trade", v: "-₹1,100" },
                                        { l: "Consecutive Wins", v: "8" },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                            <span className="text-xs font-semibold text-gray-600">{item.l}</span>
                                            <span className="text-sm font-bold text-gray-900">{item.v}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 text-xs text-green-700 leading-relaxed">
                                    Strategy shows extreme resilience during 2022-23 bear phase with a 8.2% monthly average alpha.
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                            <CardContent className="p-6 text-center">
                                <div className="mx-auto p-3 rounded-lg bg-gray-100 w-fit mb-4">
                                    <Zap className="h-8 w-8 text-gray-600" />
                                </div>
                                <h4 className="text-base font-bold text-gray-900 mb-2">Alpha Generator</h4>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                    Backtest reveals high correlation with Whale activity. Suggesting 15% increase in DCA frequency.
                                </p>
                                <Button className="w-full rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800">
                                    Optimize Parameters
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
