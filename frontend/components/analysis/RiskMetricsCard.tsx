"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingDown, Activity, AlertTriangle } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts"

interface DrawdownHistory {
    period: string
    drawdownPercent: number
    recoveryDays: number
}

interface RiskMetricsProps {
    beta: number
    sharpeRatio: number
    sortinoRatio: number
    maxDrawdown: number
    volatility: number
    riskLevel: string
    drawdownHistory?: DrawdownHistory[]
    focusMode?: 'stability' | 'full' // For risk-based filtering
}

export function RiskMetricsCard({
    beta,
    sharpeRatio,
    sortinoRatio,
    maxDrawdown,
    volatility,
    riskLevel,
    drawdownHistory,
    focusMode = 'full'
}: RiskMetricsProps) {
    const getRiskColor = (level: string) => {
        if (level === "LOW") return "#16A34A"
        if (level === "MODERATE") return "#FF8C00"
        return "#f43f5e"
    }

    const getBetaColor = (b: number) => {
        if (b < 0.8) return "#16A34A"
        if (b < 1.2) return "#FF8C00"
        return "#f43f5e"
    }

    const getSharpeColor = (s: number) => {
        if (s >= 1.5) return "#16A34A"
        if (s >= 1.0) return "#0A66C2"
        if (s >= 0.5) return "#FF8C00"
        return "#f43f5e"
    }

    const chartData = drawdownHistory?.map(d => ({
        period: d.period,
        drawdown: d.drawdownPercent,
        recovery: d.recoveryDays
    })) || []

    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
            <CardHeader className="pb-2 border-b border-border/10 bg-muted/5">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Shield className="h-4 w-4 text-[#0A66C2]" />
                    Risk Matrix Command
                    <Badge
                        className="ml-auto text-[10px] font-black uppercase border-none"
                        style={{ backgroundColor: `${getRiskColor(riskLevel)}20`, color: getRiskColor(riskLevel) }}
                    >
                        {riskLevel} PROTOCOL
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                {/* Primary Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Beta */}
                    <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-inner group/metric">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-[#0A66C2] transition-colors text-center">Beta / Market</p>
                        <p className="text-3xl font-black tracking-tighter text-center" style={{ color: getBetaColor(beta) }}>
                            {beta.toFixed(2)}
                        </p>
                        <div className="mt-2 text-center">
                            <Badge variant="outline" className="text-[8px] font-black uppercase border-none bg-muted/50 text-muted-foreground">
                                {beta < 1 ? "STABLE" : beta > 1 ? "AGRESSIVE" : "NEUTRAL"}
                            </Badge>
                        </div>
                    </div>

                    {/* Sharpe Ratio */}
                    <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-inner group/metric">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-[#0A66C2] transition-colors text-center">Efficiency / Sharpe</p>
                        <p className="text-3xl font-black tracking-tighter text-center" style={{ color: getSharpeColor(sharpeRatio) }}>
                            {sharpeRatio.toFixed(2)}
                        </p>
                        <div className="mt-2 text-center">
                            <Badge variant="outline" className="text-[8px] font-black uppercase border-none bg-muted/50 text-muted-foreground">
                                {sharpeRatio >= 1.5 ? "PRIME" : sharpeRatio >= 1 ? "SOLID" : "FAIR"}
                            </Badge>
                        </div>
                    </div>

                    {/* Sortino Ratio */}
                    <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-inner group/metric">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-[#0A66C2] transition-colors text-center">Downside / Sortino</p>
                        <p className="text-3xl font-black tracking-tighter text-center" style={{ color: getSharpeColor(sortinoRatio) }}>
                            {sortinoRatio.toFixed(2)}
                        </p>
                        <div className="mt-2 text-center">
                            <Badge variant="outline" className="text-[8px] font-black uppercase border-none bg-muted/50 text-muted-foreground">
                                ADJUSTED
                            </Badge>
                        </div>
                    </div>

                    {/* Volatility */}
                    <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-inner group/metric">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 group-hover:text-[#0A66C2] transition-colors text-center">Chaos / Volatility</p>
                        <p className="text-3xl font-black tracking-tighter text-center text-foreground">
                            {volatility.toFixed(1)}%
                        </p>
                        <div className="mt-2 text-center">
                            <Badge variant="outline" className="text-[8px] font-black uppercase border-none bg-muted/50 text-muted-foreground">
                                ANNUALIZED
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Max Drawdown Alert */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`p-5 rounded-2xl flex items-center gap-4 transition-all ${maxDrawdown < -20
                        ? 'bg-rose-500/10 border border-rose-500/30'
                        : 'bg-amber-500/10 border border-amber-500/30'
                        }`}
                >
                    <div className={`p-3 rounded-xl ${maxDrawdown < -20 ? 'bg-rose-500/20' : 'bg-amber-500/20'}`}>
                        <TrendingDown className={`h-6 w-6 ${maxDrawdown < -20 ? 'text-rose-500' : 'text-amber-500'}`} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Maximum Structural Drawdown</p>
                        <p className={`text-2xl font-black tracking-tighter ${maxDrawdown < -20 ? 'text-rose-500' : 'text-amber-500'}`}>
                            {maxDrawdown.toFixed(1)}%
                        </p>
                    </div>
                    {focusMode === 'full' && (
                        <p className="text-[9px] font-black uppercase text-muted-foreground ml-auto tracking-widest opacity-70 hidden sm:block">
                            Extreme Peak-to-Trough Delta
                        </p>
                    )}
                </motion.div>

                {/* Drawdown History Chart (only in full mode) */}
                {focusMode === 'full' && chartData.length > 0 && (
                    <div className="mt-8">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Activity className="h-3 w-3 text-rose-500" />
                            Historical Pressure Analysis
                        </p>
                        <div className="h-32 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="drawdownGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="period"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 9, fontWeight: 700, fill: 'hsl(var(--muted-foreground))' }}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(var(--background), 0.8)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(var(--border), 0.3)',
                                            backdropFilter: 'blur(8px)'
                                        }}
                                        formatter={(v: any, name?: string) => [
                                            name === 'drawdown' ? `${Number(v || 0)}%` : `${Number(v || 0)} days`,
                                            name === 'drawdown' ? 'Pressure' : 'Recovery'
                                        ]}
                                    />
                                    <ReferenceLine y={0} stroke="rgba(var(--foreground), 0.1)" strokeDasharray="3 3" />
                                    <Area
                                        type="monotone"
                                        dataKey="drawdown"
                                        stroke="#f43f5e"
                                        strokeWidth={3}
                                        fill="url(#drawdownGrad)"
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Stability Focus Info (for LOW risk mode) */}
                {focusMode === 'stability' && (
                    <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-inner">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/20 rounded-xl">
                                <Shield className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Capital Protection Guard</p>
                                <p className="text-xs text-muted-foreground font-medium italic">
                                    {beta < 0.8 && sharpeRatio > 1
                                        ? "Intelligence Engine confirms stable capital structure with optimized volatility."
                                        : "Asset shows abnormal variance. Recommend shifting to lower beta architectures."
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
