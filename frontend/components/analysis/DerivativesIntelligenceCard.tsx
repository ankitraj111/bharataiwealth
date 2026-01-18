"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Activity, TrendingUp, Target, Hexagon, Binary } from "lucide-react"
import { motion } from "framer-motion"

interface DerivativesProps {
    openInterest: number
    oiChange: number
    putCallRatio: number
    maxPain: number
    oiTrend: string
    mode?: 'basic' | 'full'
}

export function DerivativesIntelligenceCard({ openInterest, oiChange, putCallRatio, maxPain, oiTrend, mode = 'full' }: DerivativesProps) {
    const isBullishTrend = oiTrend === 'LONG_BUILDUP' || oiTrend === 'SHORT_COVERING'

    return (
        <Card className="glass-card border-amber-500/20 bg-amber-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Hexagon className="h-4 w-4 text-amber-600" />
                    Derivatives Intelligence
                    <Badge className="ml-auto text-[9px] font-black uppercase bg-amber-500 text-white border-none">
                        Risk Mode: {mode}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Primary Derivatives Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-inner group">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Total OI</p>
                            <p className="text-xl font-black text-amber-600 tracking-tighter">
                                {(openInterest / 1000000).toFixed(1)}M
                            </p>
                            <div className={`text-[8px] font-black uppercase mt-1 ${oiChange >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {oiChange >= 0 ? '+' : ''}{oiChange.toFixed(1)}% Active
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-inner group">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Put-Call Ratio</p>
                            <p className="text-xl font-black text-[#0A66C2] tracking-tighter">
                                {putCallRatio.toFixed(2)}
                            </p>
                            <div className="text-[8px] font-black uppercase mt-1 text-muted-foreground">
                                {putCallRatio > 1.2 ? 'Bullish' : putCallRatio < 0.7 ? 'Bearish' : 'Neutral'}
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-inner group">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Max Pain</p>
                            <p className="text-xl font-black text-rose-600 tracking-tighter">
                                ₹{maxPain.toLocaleString()}
                            </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-inner group">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">OI Signal</p>
                            <p className={`text-sm font-black tracking-tight leading-tight ${isBullishTrend ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {oiTrend.replace('_', ' ')}
                            </p>
                        </div>
                    </div>

                    {/* OI Dynamics Visualization */}
                    <div className="space-y-6 flex flex-col justify-center">
                        <div className="relative h-24 w-full bg-muted/20 rounded-2xl overflow-hidden flex items-end">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                <Binary className="h-16 w-16" />
                            </div>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${30 + Math.random() * 60}%` }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`flex-1 mx-0.5 rounded-t-sm ${i % 3 === 0 ? 'bg-amber-500' : 'bg-muted-foreground/30'}`}
                                />
                            ))}
                        </div>
                        <div className="p-4 rounded-xl bg-background border border-border/10">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#0A66C2] mb-1">OI Interpretation</h4>
                            <p className="text-xs font-medium text-muted-foreground italic leading-relaxed">
                                {isBullishTrend
                                    ? "Smart money accumulating long positions. Probability of upward breakout remains elevated."
                                    : "Heavy call writing detected at resistance. Expect volatility near current supply zones."}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
