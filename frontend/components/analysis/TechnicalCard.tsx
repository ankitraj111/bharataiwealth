"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, TrendingDown, Zap, BarChart3, Binary } from "lucide-react"
import { motion } from "framer-motion"

interface TechnicalProps {
    trend: string
    indicators: {
        rsi: number
        macd: string
        vwap: number
    }
    dmas: {
        d20: number
        d50: number
        d200: number
    }
    support: number[]
    resistance: number[]
    mode?: 'basic' | 'full' | 'full_intraday'
}

export function TechnicalCard({ trend, indicators, dmas, support, resistance, mode = 'full' }: TechnicalProps) {
    const isBullish = trend === 'BULLISH'

    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Zap className={`h-4 w-4 ${isBullish ? 'text-emerald-500' : 'text-blue-500'}`} />
                    Momentum Architecture
                    <Badge className={`ml-auto text-[9px] font-black uppercase border-none ${isBullish ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'}`}>
                        {trend} TREND
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* DMA Levels */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Activity className="h-3 w-3 text-[#0A66C2]" />
                            Moving Averages
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">20 DMA (Short)</span>
                                <span className="text-sm font-black text-foreground">₹{dmas.d20.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">50 DMA (Medium)</span>
                                <span className="text-sm font-black text-foreground">₹{dmas.d50.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">200 DMA (Long)</span>
                                <span className="text-sm font-black text-[#0A66C2]">₹{dmas.d200.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Indicators & SR */}
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0A66C2]/10 to-transparent border border-[#0A66C2]/20">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">RSI (14)</p>
                                <p className={`text-2xl font-black ${indicators.rsi > 70 ? 'text-rose-600' : indicators.rsi < 30 ? 'text-emerald-600' : 'text-foreground'}`}>
                                    {indicators.rsi.toFixed(1)}
                                </p>
                                <Badge variant="outline" className="text-[7px] font-black border-none uppercase p-0">
                                    {indicators.rsi > 70 ? 'Overbought' : indicators.rsi < 30 ? 'Oversold' : 'Neutral'}
                                </Badge>
                            </div>
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">MACD</p>
                                <p className="text-lg font-black text-purple-600 leading-tight">{indicators.macd.split(' ')[0]}</p>
                                <p className="text-[8px] font-bold text-muted-foreground uppercase">{indicators.macd.split(' ')[1]}</p>
                            </div>
                        </div>

                        {/* Support / Resistance */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[10px] font-black text-muted-foreground uppercase">Support Zone</span>
                                <span className="text-xs font-black text-emerald-600">₹{support[0]}</span>
                            </div>
                            <div className="h-1 bg-muted/20 rounded-full flex overflow-hidden">
                                <div className="w-1/3 h-full bg-emerald-500/30" />
                                <div className="w-1/3 h-full bg-blue-500/10" />
                                <div className="w-1/3 h-full bg-rose-500/30" />
                            </div>
                            <div className="flex justify-between items-center px-1">
                                <span className="text-[10px] font-black text-muted-foreground uppercase">Resistance Hub</span>
                                <span className="text-xs font-black text-rose-600">₹{resistance[0]}</span>
                            </div>
                        </div>

                        {(mode === 'full' || mode === 'full_intraday') && (
                            <div className="p-3 rounded-xl bg-white/30 dark:bg-black/20 border border-border/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-[9px] font-black uppercase text-muted-foreground flex items-center gap-1">
                                        <Binary className="h-3 w-3" /> VWAP Signal
                                    </span>
                                    <span className="text-xs font-black">₹{indicators.vwap.toLocaleString()}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
