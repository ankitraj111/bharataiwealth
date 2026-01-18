"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layers, Zap, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import { motion } from "framer-motion"

interface SectorAnalysisProps {
    phase: string
    moneyFlowRank: number
    valueChainPosition: string
    correlations: { nifty: number; usdInr: number }
    momentum: number
    mode?: 'basic' | 'full'
}

export function SectorAnalysisCard({ phase, moneyFlowRank, valueChainPosition, correlations, momentum, mode = 'full' }: SectorAnalysisProps) {
    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Layers className="h-4 w-4 text-[#0A66C2]" />
                    Sector Intelligence
                    <Badge className="ml-auto text-[9px] font-black uppercase bg-[#0A66C2]/10 text-[#0A66C2] border-none">
                        Rank #{moneyFlowRank}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sector Phase & Momentum */}
                    <div className="space-y-6">
                        <div className="relative p-6 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 text-center group">
                            <div className="absolute top-2 right-2">
                                <Activity className="h-4 w-4 text-[#0A66C2] opacity-30" />
                            </div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Lifecycle Phase</p>
                            <h3 className="text-2xl font-black text-[#0A66C2] tracking-tighter uppercase">{phase}</h3>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase text-muted-foreground">
                                    <span>Momentum</span>
                                    <span>{momentum}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${momentum}%` }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-[#0A66C2]/5 border border-[#0A66C2]/10">
                            <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Value Chain Node</p>
                            <p className="text-sm font-bold text-foreground">{valueChainPosition}</p>
                        </div>
                    </div>

                    {/* Correlations & Advanced Stats */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Zap className="h-3 w-3 text-[#0A66C2]" />
                            Alpha Correlations
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/10">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold">NIFTY Correlation</span>
                                </div>
                                <span className={`text-xs font-black ${correlations.nifty > 0.7 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                    {(correlations.nifty * 100).toFixed(0)}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/10">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold">USD/INR Sensitivity</span>
                                </div>
                                <span className={`text-xs font-black ${correlations.usdInr < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                    {(correlations.usdInr * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>
                        {mode === 'full' && (
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 uppercase">
                                    <ArrowUpRight className="h-3 w-3" />
                                    Bullish Inflow
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase opacity-50">
                                    <Zap className="h-3 w-3" />
                                    Smart Money Active
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
