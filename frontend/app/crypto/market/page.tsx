"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    TrendingUp,
    TrendingDown,
    LayoutDashboard,
    ChevronRight,
    Zap,
    Activity,
    Globe,
    BarChart3,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react"

const topCryptos = [
    { rank: 1, name: "Bitcoin", symbol: "BTC", price: 64231.42, change: 2.4, mcap: "1.25T", volume: "32.4B", icon: "₿" },
    { rank: 2, name: "Ethereum", symbol: "ETH", price: 3452.18, change: -0.8, mcap: "415.2B", volume: "12.8B", icon: "Ξ" },
    { rank: 3, name: "Solana", symbol: "SOL", price: 145.82, change: 5.2, mcap: "64.8B", volume: "3.2B", icon: "S" },
    { rank: 4, name: "BNB", symbol: "BNB", price: 582.15, change: 1.2, mcap: "89.4B", volume: "1.5B", icon: "B" },
    { rank: 5, name: "XRP", symbol: "XRP", price: 0.62, change: -1.4, mcap: "34.1B", volume: "1.1B", icon: "X" },
]

export default function MarketOverview() {
    const [fearGreedValue, setFearGreedValue] = useState(72)

    return (
        <AppShell>
            <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                                <LayoutDashboard className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Market Overview</h1>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-medium text-green-600">Live Data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-semibold text-green-700">Live Updates</span>
                        </div>
                        <Button className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                            <Search className="h-4 w-4 mr-2" /> Search Assets
                        </Button>
                    </div>
                </div>

                {/* Global Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-blue-50">
                                    <Globe className="h-5 w-5 text-blue-600" />
                                </div>
                                <Badge className="bg-green-100 text-green-700 border-0 font-semibold">+1.2%</Badge>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mb-1">Global Market Cap</p>
                            <h3 className="text-2xl font-bold text-gray-900">$2.45T</h3>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-purple-50">
                                    <Zap className="h-5 w-5 text-purple-600" />
                                </div>
                                <Badge className="bg-red-100 text-red-700 border-0 font-semibold">-4.8%</Badge>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mb-1">24H Trading Volume</p>
                            <h3 className="text-2xl font-bold text-gray-900">$82.4B</h3>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-orange-50">
                                    <Activity className="h-5 w-5 text-orange-600" />
                                </div>
                                <Badge className="bg-green-100 text-green-700 border-0 font-semibold">+0.5%</Badge>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mb-1">BTC Dominance</p>
                            <h3 className="text-2xl font-bold text-gray-900">52.4%</h3>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-green-50">
                                    <BarChart3 className="h-5 w-5 text-green-600" />
                                </div>
                                <Badge className="bg-green-100 text-green-700 border-0 font-semibold">Greed</Badge>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mb-2">Fear & Greed Index</p>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-gray-900">{fearGreedValue}</h3>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-1000"
                                        style={{ width: `${fearGreedValue}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Market Table Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border border-gray-200 shadow-sm">
                        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                    <CardTitle className="text-lg font-bold text-gray-900">Top 100 Cryptocurrencies</CardTitle>
                                    <CardDescription className="text-sm text-gray-600">Live data ranked by market cap</CardDescription>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-lg border-gray-300">
                                    <Filter className="h-4 w-4 mr-2" /> Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-600">
                                            <th className="text-left p-4"># Name</th>
                                            <th className="text-left p-4">Price</th>
                                            <th className="text-left p-4">24h %</th>
                                            <th className="text-left p-4">Market Cap</th>
                                            <th className="text-left p-4">Volume (24h)</th>
                                            <th className="p-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {topCryptos.map((coin) => (
                                            <tr key={coin.symbol} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-medium text-gray-400 w-4">{coin.rank}</span>
                                                        <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                            {coin.icon}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900">{coin.name}</div>
                                                            <div className="text-xs text-gray-500">{coin.symbol}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-semibold text-gray-900">${coin.price.toLocaleString()}</span>
                                                </td>
                                                <td className="p-4">
                                                    <div className={cn(
                                                        "inline-flex items-center gap-1 font-semibold text-sm px-2 py-1 rounded",
                                                        coin.change >= 0 ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
                                                    )}>
                                                        {coin.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                                        {Math.abs(coin.change)}%
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-gray-600 font-medium">${coin.mcap}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-gray-600 font-medium">${coin.volume}</span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <Button variant="ghost" size="icon" className="rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50">
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-center">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                                    View All Assets <ArrowUpRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card className="border border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-4">Market Insights</h4>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                                        <p className="text-xs text-blue-600 font-semibold mb-1">Dominance Shift</p>
                                        <p className="text-sm text-gray-700">
                                            BTC consolidating near $64K. ETH/BTC rebounding from 2-year lows. Altcoin rotation likely in 72H.
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="text-xs font-medium text-gray-600">Total Liquidations (24H)</span>
                                            <span className="text-xs font-bold text-red-600">$142.4M</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="text-xs font-medium text-gray-600">Open Interest</span>
                                            <span className="text-xs font-bold text-blue-600">$34.1B</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-4">Trending Topics</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["#Layer2", "#BitcoinETFs", "#SolanaSummer", "#DePin", "#RealWorldAssets", "#AIGaming"].map(tag => (
                                        <Badge key={tag} variant="outline" className="bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 border-gray-200 hover:border-blue-200 font-medium cursor-pointer transition-colors">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
