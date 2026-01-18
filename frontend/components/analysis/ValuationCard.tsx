"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, TrendingDown, Scale, BarChart2 } from "lucide-react"
import { motion } from "framer-motion"

interface ValuationProps {
    intrinsicValue: number
    marginOfSafety: number
    scenarios: {
        bull: number
        base: number
        bear: number
    }
    multiples: {
        pe: number
        pb: number
        evEbitda: number
    }
}

export function ValuationCard({ intrinsicValue, marginOfSafety, scenarios, multiples }: ValuationProps) {
    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Scale className="h-4 w-4 text-[#0A66C2]" />
                    Intrinsic Value Matrix (DCF)
                    <Badge className="ml-auto text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-600 border-none">
                        Safety: {marginOfSafety}%
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* DCF Target & Scenarios */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-white/40 to-white/10 dark:from-black/20 dark:to-transparent border border-white/50 dark:border-white/10 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                                <Target className="h-16 w-16 text-[#0A66C2]" />
                            </div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Fair Market Value</p>
                            <h2 className="text-4xl font-black text-[#0A66C2] tracking-tighter">₹{intrinsicValue.toLocaleString()}</h2>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="text-center p-2 rounded-xl bg-muted/20">
                                <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">Bear Case</p>
                                <p className="text-xs font-black text-rose-600">₹{scenarios.bear.toLocaleString()}</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/20">
                                <p className="text-[8px] font-black text-[#0A66C2] uppercase mb-1">Base Case</p>
                                <p className="text-xs font-black text-foreground">₹{scenarios.base.toLocaleString()}</p>
                            </div>
                            <div className="text-center p-2 rounded-xl bg-emerald-500/10">
                                <p className="text-[8px] font-black text-emerald-600 uppercase mb-1">Bull Case</p>
                                <p className="text-xs font-black text-emerald-600">₹{scenarios.bull.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Valuation Multiples */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <BarChart2 className="h-3 w-3 text-[#0A66C2]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Relative Multiples</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-muted-foreground uppercase">Trailing P/E</span>
                                    <span className="text-lg font-black">{multiples.pe.toFixed(1)}x</span>
                                </div>
                                <Badge variant="outline" className="text-[8px] font-black bg-amber-500/10 text-amber-600 border-none">Premium</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-muted-foreground uppercase">Price / Book</span>
                                    <span className="text-lg font-black">{multiples.pb.toFixed(1)}x</span>
                                </div>
                                <Badge variant="outline" className="text-[8px] font-black bg-emerald-500/10 text-emerald-600 border-none">Stable</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-muted-foreground uppercase">EV / EBITDA</span>
                                    <span className="text-lg font-black">{multiples.evEbitda.toFixed(1)}x</span>
                                </div>
                                <Badge variant="outline" className="text-[8px] font-black bg-blue-500/10 text-blue-600 border-none">Neutral</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
