"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Repeat,
    Search,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Zap,
    BarChart3,
    Scale,
    Target,
    Globe,
    Plus
} from "lucide-react"

const comparisonData = {
    metrics: [
        { label: "Market Cap", btc: "$1.25T", eth: "$415.2B" },
        { label: "Circulating Supply", btc: "19.6M BTC", eth: "120.1M ETH" },
        { label: "Max Supply", btc: "21.0M BTC", eth: "∞ (Deflationary)" },
        { label: "All-Time High", btc: "$73,750", eth: "$4,891" },
        { label: "Transaction Speed", btc: "7 TPS", eth: "30+ TPS (L2 Scaled)" },
        { label: "Consensus", btc: "Proof-of-Work", eth: "Proof-of-Stake" },
    ],
    performance: [
        { period: "1 Month", btc: 12.4, eth: 8.2 },
        { period: "3 Months", btc: 45.8, eth: 32.4 },
        { period: "1 Year", btc: 142.1, eth: 110.5 },
    ]
}

export default function CompareCoins() {
    const [tokenA, setTokenA] = useState("BTC")
    const [tokenB, setTokenB] = useState("ETH")

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                                <Repeat className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Asset Comparison</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12">Compare cryptocurrencies side-by-side</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-lg border-gray-300">
                            <Plus className="h-4 w-4 mr-2" /> Add More
                        </Button>
                    </div>
                </div>

                {/* Comparison Selector Bar */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-8 bg-white rounded-2xl border-2 border-gray-200 shadow-sm px-10">
                    <div className="flex-1 flex items-center gap-4 justify-end">
                        <div className="text-right">
                            <h4 className="text-xl font-bold text-gray-900">Bitcoin</h4>
                            <p className="text-xs text-gray-500">Digital Gold</p>
                        </div>
                        <div className="h-14 w-14 rounded-xl bg-orange-50 border-2 border-orange-200 flex items-center justify-center text-2xl">₿</div>
                    </div>

                    <div className="px-4 py-2 rounded-full bg-indigo-100 border-2 border-indigo-200 text-indigo-700 font-bold text-sm">VS</div>

                    <div className="flex-1 flex items-center gap-4 justify-start">
                        <div className="h-14 w-14 rounded-xl bg-purple-50 border-2 border-purple-200 flex items-center justify-center text-2xl">Ξ</div>
                        <div className="text-left">
                            <h4 className="text-xl font-bold text-gray-900">Ethereum</h4>
                            <p className="text-xs text-gray-500">Smart Contracts</p>
                        </div>
                    </div>
                </div>

                {/* Main Comparison Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border border-gray-200 shadow-sm">
                        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-bold text-gray-900">Core Fundamentals</CardTitle>
                                    <CardDescription className="text-sm text-gray-600">Network specifications comparison</CardDescription>
                                </div>
                                <Badge className="bg-indigo-100 text-indigo-700 border-0 font-semibold text-xs">Verified Data</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {comparisonData.metrics.map((m, i) => (
                                    <div key={i} className="grid grid-cols-3 p-5 hover:bg-gray-50 transition-all">
                                        <div className="text-xs font-semibold text-gray-600 flex items-center">{m.label}</div>
                                        <div className="text-center font-semibold text-gray-900">{m.btc}</div>
                                        <div className="text-center font-semibold text-gray-900">{m.eth}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <Target className="h-4 w-4 text-indigo-600" />
                                    <h4 className="text-sm font-semibold text-gray-900">Correlation Index</h4>
                                </div>
                                <div className="text-center space-y-3">
                                    <h3 className="text-5xl font-bold text-gray-900">0.82</h3>
                                    <p className="text-xs font-semibold text-green-600">High Positive Correlation</p>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        Assets moving in high synchronization. Diversification benefit is low in current market.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-6">ROI Comparison</h4>
                                <div className="space-y-6">
                                    {comparisonData.performance.map((p, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-xs font-medium text-gray-600">
                                                <span>{p.period}</span>
                                                <span className="text-indigo-600">Δ {(p.btc - p.eth).toFixed(1)}%</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-medium text-gray-500 w-10">BTC</span>
                                                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-orange-500" style={{ width: `${(p.btc / 150) * 100}%` }} />
                                                    </div>
                                                    <span className="text-xs font-bold text-green-600">+{p.btc}%</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-medium text-gray-500 w-10">ETH</span>
                                                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-purple-500" style={{ width: `${(p.eth / 150) * 100}%` }} />
                                                    </div>
                                                    <span className="text-xs font-bold text-green-600">+{p.eth}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Market Influence Section */}
                <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-xl bg-indigo-50">
                                <Globe className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">Market Influence</h4>
                                <p className="text-sm text-gray-600">Comparative analysis metrics</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: "Price Efficiency", btc: "High", eth: "Moderate", diff: "BTC Wins" },
                                { label: "Institutional Inflow", btc: "$1.2B", eth: "$450M", diff: "3x Ratio" },
                                { label: "Dev Activity", btc: "Stable", eth: "Hyper-Growth", diff: "ETH Wins" },
                                { label: "Market Sentiment", btc: "Bullish", eth: "Neutral", diff: "Divergence" },
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-3 hover:bg-gray-100 transition-all">
                                    <p className="text-xs font-semibold text-gray-600">{item.label}</p>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-sm font-semibold text-gray-900">
                                            <span>BTC</span>
                                            <span>{item.btc}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-semibold text-gray-900">
                                            <span>ETH</span>
                                            <span>{item.eth}</span>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-gray-200 text-xs font-semibold text-indigo-600">{item.diff}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    )
}
