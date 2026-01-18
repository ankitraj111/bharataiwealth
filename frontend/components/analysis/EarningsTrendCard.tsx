"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, CheckCircle2, XCircle } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from "recharts"

interface QuarterResult {
    quarter: string
    revenue: number
    eps: number
    epsEstimate: number
    beat: boolean
    margin: number
}

interface EarningsTrendProps {
    quarters: QuarterResult[]
    epsBeatStreak: number
    revenueGrowthYoY: number
    marginTrend: number
    analystEstimate: string
}

export function EarningsTrendCard({
    quarters,
    epsBeatStreak,
    revenueGrowthYoY,
    marginTrend,
    analystEstimate
}: EarningsTrendProps) {
    const chartData = quarters.map(q => ({
        quarter: q.quarter.replace(' FY', "'"),
        eps: q.eps,
        estimate: q.epsEstimate,
        beat: q.beat,
        margin: q.margin
    }))

    const beatCount = quarters.filter(q => q.beat).length
    const missCount = quarters.length - beatCount

    return (
        <Card className="border-2 border-border/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-[#FF8C00]" />
                    Earnings Trend Analysis
                    <Badge
                        className={`ml-auto text-[10px] ${beatCount >= 6 ? 'bg-emerald-500' : beatCount >= 4 ? 'bg-amber-500' : 'bg-red-500'} text-white`}
                    >
                        {beatCount}/{quarters.length} Beats
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-muted/30 text-center">
                        <p className="text-xs text-muted-foreground">Revenue YoY</p>
                        <div className="flex items-center justify-center gap-1">
                            {revenueGrowthYoY >= 0 ? (
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                            ) : (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`text-lg font-bold ${revenueGrowthYoY >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {revenueGrowthYoY >= 0 ? '+' : ''}{revenueGrowthYoY.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30 text-center">
                        <p className="text-xs text-muted-foreground">EPS Beat Streak</p>
                        <span className="text-lg font-bold text-[#0A66C2]">{epsBeatStreak}Q</span>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30 text-center">
                        <p className="text-xs text-muted-foreground">Margin Trend</p>
                        <div className="flex items-center justify-center gap-1">
                            {marginTrend >= 0 ? (
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                            ) : (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`text-lg font-bold ${marginTrend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {marginTrend >= 0 ? '+' : ''}{marginTrend.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* EPS Chart */}
                <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="quarter" tick={{ fontSize: 9 }} />
                            <YAxis tick={{ fontSize: 9 }} />
                            <Tooltip
                                formatter={(v: number | string | (number | string)[] | undefined, name?: string) => [`₹${Number(v || 0).toFixed(2)}`, name === 'eps' ? 'Actual EPS' : 'Estimate']}
                                contentStyle={{ fontSize: 11 }}
                            />
                            <Bar dataKey="eps" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.beat ? '#16A34A' : '#f43f5e'}
                                    />
                                ))}
                            </Bar>
                            <ReferenceLine y={0} stroke="#666" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Beat/Miss Legend */}
                <div className="flex items-center justify-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                        <span className="text-muted-foreground">Beat ({beatCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <XCircle className="h-3 w-3 text-red-500" />
                        <span className="text-muted-foreground">Miss ({missCount})</span>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-2 italic">
                    {analystEstimate}
                </p>
            </CardContent>
        </Card>
    )
}
