"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
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
    ExternalLink
} from "lucide-react"

const holdings = [
    { name: "Bitcoin", symbol: "BTC", amount: "0.24", value: 15415.54, profit: 3421.20, change: 12.4, color: "bg-orange-500" },
    { name: "Ethereum", symbol: "ETH", amount: "4.2", value: 14499.15, profit: -842.50, change: -5.8, color: "bg-purple-500" },
    { name: "Solana", symbol: "SOL", amount: "45.0", value: 6561.90, profit: 2145.30, change: 48.2, color: "bg-cyan-500" },
    { name: "Chainlink", symbol: "LINK", amount: "120.0", value: 2190.00, profit: 450.00, change: 25.9, color: "bg-blue-600" },
]

export default function CryptoPortfolio() {
    const totalValue = holdings.reduce((acc, h) => acc + h.value, 0)
    const totalProfit = holdings.reduce((acc, h) => acc + h.profit, 0)
    const avgChange = 8.4

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400">
                                <Wallet className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Crypto Portfolio</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12">Track your assets and performance</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button className="rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                            <Plus className="h-4 w-4 mr-2" /> Add Assets
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-lg border-gray-300">
                            <Download className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Portfolio Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border border-border shadow-sm">
                        <CardContent className="p-6">
                            <p className="text-xs text-muted-foreground font-medium mb-2">Total Portfolio Value</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-bold text-foreground">${totalValue.toLocaleString()}</h3>
                                <Badge className="bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-0 font-semibold">Active</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm">
                        <CardContent className="p-6">
                            <p className="text-xs text-muted-foreground font-medium mb-2">Total Profit/Loss</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className={`text-3xl font-bold ${totalProfit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                    {totalProfit >= 0 ? "+" : ""}${Math.abs(totalProfit).toLocaleString()}
                                </h3>
                                <div className={`flex items-center gap-1 font-semibold text-sm ${avgChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                    {avgChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                    {avgChange}%
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border shadow-sm">
                        <CardContent className="p-6">
                            <p className="text-xs text-muted-foreground font-medium mb-3">Asset Allocation</p>
                            <div className="flex h-3 w-full rounded-full bg-muted overflow-hidden border border-border">
                                {holdings.map((h, i) => (
                                    <div
                                        key={i}
                                        className={`${h.color} h-full transition-all`}
                                        style={{ width: `${(h.value / totalValue) * 100}%` }}
                                    />
                                ))}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-3">
                                {holdings.map((h, i) => (
                                    <div key={i} className="flex items-center gap-1.5">
                                        <div className={`h-2 w-2 rounded-full ${h.color}`} />
                                        <span className="text-xs font-medium text-muted-foreground">{h.symbol}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Holdings List */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 border border-border shadow-sm">
                        <CardHeader className="border-b border-border bg-muted/50">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div>
                                    <CardTitle className="text-lg font-bold text-foreground">Your Holdings</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground">Active positions in your portfolio</CardDescription>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-lg border-border">
                                    <PieChart className="h-4 w-4 mr-2" /> Rebalance
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-600">
                                            <th className="text-left p-4">Asset</th>
                                            <th className="text-left p-4">Balance</th>
                                            <th className="text-left p-4">Value</th>
                                            <th className="text-left p-4">Profit/Loss</th>
                                            <th className="text-right p-4">Change</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {holdings.map((item) => (
                                            <tr key={item.symbol} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-10 w-10 rounded-lg ${item.color} bg-opacity-10 flex items-center justify-center font-bold text-gray-700 group-hover:bg-opacity-20 transition-all`}>
                                                            {item.symbol[0]}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900">{item.name}</div>
                                                            <div className="text-xs text-gray-500">{item.symbol}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-medium text-gray-700">{item.amount}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-semibold text-gray-900">${item.value.toLocaleString()}</span>
                                                </td>
                                                <td className="p-4">
                                                    <div className={cn(
                                                        "font-semibold text-sm",
                                                        item.profit >= 0 ? "text-green-600" : "text-red-600"
                                                    )}>
                                                        {item.profit >= 0 ? "+" : ""}${Math.abs(item.profit).toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <Badge className={`font-semibold text-xs border-0 ${item.change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
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

                    <div className="space-y-6">
                        <Card className="border border-gray-200 shadow-sm">
                            <CardContent className="p-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h4>
                                <div className="space-y-4">
                                    {[
                                        { type: "Buy", asset: "SOL", amount: "12.0", time: "2h ago", price: "$142" },
                                        { type: "Swap", asset: "BTC › ETH", amount: "0.05", time: "1d ago", price: "$3.4k" },
                                        { type: "Stake", asset: "ETH", amount: "2.4", time: "3d ago", price: "4.2% APY" },
                                    ].map((log, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-purple-50 group-hover:text-purple-600 transition-all">
                                                    <History className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900">{log.type} {log.asset}</p>
                                                    <p className="text-xs text-gray-500">{log.time}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-gray-900">+{log.amount}</p>
                                                <p className="text-xs text-gray-500">{log.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="link" className="w-full mt-4 text-xs font-semibold text-purple-600 hover:text-purple-700">
                                    View All Transactions <ArrowUpRight className="h-3 w-3 ml-1" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 shadow-sm">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <BarChart3 className="h-4 w-4 text-purple-600" />
                                    <h4 className="text-sm font-semibold text-gray-900">Portfolio Insights</h4>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                    Your portfolio beta is 1.4x market. Consider hedging with a 5% allocation to stablecoin pools.
                                </p>
                                <Button className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                                    Optimize Allocation
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
