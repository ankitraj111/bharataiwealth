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
                            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400">
                                <LayoutDashboard className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Market Overview</h1>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-medium text-green-600 dark:text-green-400">Live Data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400">Live Updates</span>
                        </div>
                        <Button className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                            <Search className="h-4 w-4 mr-2" /> Search Assets
                        </Button>
                    </div>
                </div>

                {/* Global Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/30">
                                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <Badge className="bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-0 font-semibold">+1.2%</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mb-1">Global Market Cap</p>
                            <h3 className="text-2xl font-bold text-foreground">$2.45T</h3>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                                    <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <Badge className="bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-0 font-semibold">-4.8%</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mb-1">24H Trading Volume</p>
                            <h3 className="text-2xl font-bold text-foreground">$82.4B</h3>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/30">
                                    <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <Badge className="bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-0 font-semibold">+0.5%</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mb-1">BTC Dominance</p>
                            <h3 className="text-2xl font-bold text-foreground">52.4%</h3>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/30">
                                    <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <Badge className="bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-0 font-semibold">Greed</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-medium mb-2">Fear & Greed Index</p>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-foreground">{fearGreedValue}</h3>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
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
                    <Card className="lg:col-span-2 border border-border shadow-sm">
                        <CardHeader className="border-b border-border bg-muted/50">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                    <CardTitle className="text-lg font-bold text-foreground">Top 100 Cryptocurrencies</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground">Live data ranked by market cap</CardDescription>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-lg border-border">
                                    <Filter className="h-4 w-4 mr-2" /> Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground">
                                            <th className="text-left p-4"># Name</th>
                                            <th className="text-left p-4">Price</th>
                                            <th className="text-left p-4">24h %</th>
                                            <th className="text-left p-4">Market Cap</th>
                                            <th className="text-left p-4">Volume (24h)</th>
                                            <th className="p-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {topCryptos.map((coin) => (
                                            <tr key={coin.symbol} className="hover:bg-muted/30 transition-colors group cursor-pointer">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-medium text-muted-foreground w-4">{coin.rank}</span>
                                                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-lg font-semibold text-foreground group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                            {coin.icon}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-foreground">{coin.name}</div>
                                                            <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-semibold text-foreground">${coin.price.toLocaleString()}</span>
                                                </td>
                                                <td className="p-4">
                                                    <div className={cn(
                                                        "inline-flex items-center gap-1 font-semibold text-sm px-2 py-1 rounded",
                                                        coin.change >= 0 ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30" : "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
                                                    )}>
                                                        {coin.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                                                        {Math.abs(coin.change)}%
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-muted-foreground font-medium">${coin.mcap}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-muted-foreground font-medium">${coin.volume}</span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <Button variant="ghost" size="icon" className="rounded-lg text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30">
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-border bg-muted/50 flex justify-center">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
                                    View All Assets <ArrowUpRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card className="border border-border shadow-sm">
                            <CardContent className="p-6">
                                <h4 className="text-sm font-semibold text-foreground mb-4">Market Insights</h4>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-800">
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">Dominance Shift</p>
                                        <p className="text-sm text-foreground">
                                            BTC consolidating near $64K. ETH/BTC rebounding from 2-year lows. Altcoin rotation likely in 72H.
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
                                            <span className="text-xs font-medium text-muted-foreground">Total Liquidations (24H)</span>
                                            <span className="text-xs font-bold text-red-600 dark:text-red-400">$142.4M</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted border border-border">
                                            <span className="text-xs font-medium text-muted-foreground">Open Interest</span>
                                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">$34.1B</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-border shadow-sm">
                            <CardContent className="p-6">
                                <h4 className="text-sm font-semibold text-foreground mb-4">Trending Topics</h4>
                                <div className="flex flex-wrap gap-2">
                                    {["#Layer2", "#BitcoinETFs", "#SolanaSummer", "#DePin", "#RealWorldAssets", "#AIGaming"].map(tag => (
                                        <Badge key={tag} variant="outline" className="bg-muted hover:bg-blue-50 dark:hover:bg-blue-950/30 text-foreground hover:text-blue-700 dark:hover:text-blue-400 border-border hover:border-blue-200 dark:hover:border-blue-800 font-medium cursor-pointer transition-colors">
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
