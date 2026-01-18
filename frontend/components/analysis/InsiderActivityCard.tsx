"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface InsiderTransaction {
    date: string
    insiderName: string
    role: string
    type: string
    quantity: number
    value: number
}

interface InsiderActivityProps {
    promoterHolding: number
    promoterChange: number
    trend: string
    recentTransactions: InsiderTransaction[]
    isBullish: boolean
}

export function InsiderActivityCard({
    promoterHolding,
    promoterChange,
    trend,
    recentTransactions,
    isBullish
}: InsiderActivityProps) {
    const formatValue = (value: number) => {
        if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
        return `₹${value.toLocaleString()}`
    }

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
    }

    return (
        <Card className="border-2 border-border/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    Insider & Promoter Activity
                    <Badge
                        className={`ml-auto text-[10px] ${isBullish ? 'bg-emerald-500' : 'bg-red-500'} text-white`}
                    >
                        {isBullish ? '🟢 Bullish' : '🔴 Bearish'}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Promoter Holding Summary */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20">
                        <p className="text-xs text-muted-foreground mb-1">Promoter Holding</p>
                        <p className="text-2xl font-bold text-purple-600">{promoterHolding.toFixed(1)}%</p>
                    </div>
                    <div className={`p-3 rounded-xl ${promoterChange >= 0 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'} border`}>
                        <p className="text-xs text-muted-foreground mb-1">Quarterly Change</p>
                        <div className="flex items-center gap-1">
                            {promoterChange >= 0 ? (
                                <TrendingUp className="h-5 w-5 text-emerald-500" />
                            ) : (
                                <TrendingDown className="h-5 w-5 text-red-500" />
                            )}
                            <p className={`text-2xl font-bold ${promoterChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {promoterChange >= 0 ? '+' : ''}{promoterChange.toFixed(2)}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Trend Badge */}
                <div className="flex justify-center mb-4">
                    <Badge
                        variant="outline"
                        className={`
              ${trend === 'INCREASING' ? 'border-emerald-500 text-emerald-500' : ''}
              ${trend === 'STABLE' ? 'border-gray-500 text-gray-500' : ''}
              ${trend === 'DECREASING' ? 'border-red-500 text-red-500' : ''}
            `}
                    >
                        {trend === 'INCREASING' && '📈 Promoters Accumulating'}
                        {trend === 'STABLE' && '➡️ Stable Holding'}
                        {trend === 'DECREASING' && '📉 Promoters Reducing'}
                    </Badge>
                </div>

                {/* Recent Transactions */}
                <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Recent Transactions</p>
                    {recentTransactions.slice(0, 3).map((tx, i) => (
                        <div
                            key={i}
                            className={`flex items-center justify-between p-2 rounded-lg ${tx.type === 'BUY' ? 'bg-emerald-500/5' : 'bg-red-500/5'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-full ${tx.type === 'BUY' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                                    {tx.type === 'BUY' ? (
                                        <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                                    ) : (
                                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-xs font-medium">{tx.insiderName}</p>
                                    <p className="text-[10px] text-muted-foreground">{formatDate(tx.date)} • {tx.role}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge
                                    variant="secondary"
                                    className={`text-[10px] ${tx.type === 'BUY' ? 'text-emerald-600' : 'text-red-600'}`}
                                >
                                    {tx.type}
                                </Badge>
                                <p className="text-xs font-bold mt-0.5">{formatValue(tx.value)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
