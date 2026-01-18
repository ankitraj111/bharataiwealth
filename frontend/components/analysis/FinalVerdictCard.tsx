"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, ShieldCheck, TrendingUp, Calendar, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface FinalVerdictProps {
    action: string
    buyZone: string
    stopLoss: string
    target: string
    horizon: string
}

export function FinalVerdictCard({ action, buyZone, stopLoss, target, horizon }: FinalVerdictProps) {
    const isStrong = action.includes('STRONG') || action === 'BUY'
    const isWeak = action === 'REDUCE' || action === 'SELL'

    return (
        <Card className="glass-card border-[#0A66C2]/40 bg-[#0A66C2]/10 overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/20 via-transparent to-transparent pointer-events-none" />

            <CardHeader className="pb-4 border-b border-[#0A66C2]/20 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-black flex items-center gap-2 uppercase tracking-tight text-[#0A66C2]">
                            <Trophy className="h-5 w-5" />
                            INTELLIGENCE ENGINE VERDICT
                        </CardTitle>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">Coordinated Alpha Analysis v4.2</p>
                    </div>
                    <div className={`px-8 py-3 rounded-2xl border-2 flex flex-col items-center justify-center ${isStrong ? 'bg-emerald-500/10 border-emerald-500/30' : isWeak ? 'bg-rose-500/10 border-rose-500/30' : 'bg-blue-500/10 border-blue-500/30'}`}>
                        <span className="text-[10px] font-black uppercase text-muted-foreground mb-0.5">Recommendation</span>
                        <span className={`text-2xl font-black tracking-tighter ${isStrong ? 'text-emerald-600' : isWeak ? 'text-rose-600' : 'text-[#0A66C2]'}`}>{action.replace('_', ' ')}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {/* Zones */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                            <Target className="h-3 w-3 text-emerald-500" /> Accumulation Zone
                        </div>
                        <p className="text-2xl font-black text-foreground tracking-tighter">₹{buyZone}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                            <TrendingUp className="h-3 w-3 text-[#0A66C2]" /> Tactical Target
                        </div>
                        <p className="text-2xl font-black text-[#0A66C2] tracking-tighter">₹{target}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                            <AlertCircle className="h-3 w-3 text-rose-500" /> Structural Exit
                        </div>
                        <p className="text-2xl font-black text-rose-600 tracking-tighter">₹{stopLoss}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                            <Calendar className="h-3 w-3 text-purple-500" /> Holding Horizon
                        </div>
                        <p className="text-2xl font-black text-foreground tracking-tighter leading-none">{horizon}</p>
                    </div>
                </div>

                <div className="mt-10 p-5 rounded-3xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-10 w-10 rounded-full border-2 border-white dark:border-black bg-muted flex items-center justify-center bg-gradient-to-br from-[#0A66C2]/20 to-transparent">
                                <ShieldCheck className="h-5 w-5 text-[#0A66C2]" />
                            </div>
                        ))}
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <p className="text-xs font-bold leading-relaxed">
                            "Verdict synthesized from 1.2M data points across macro, fundamental, and derivative channels. High conviction in structural entry zones with protected downside."
                        </p>
                    </div>
                    <Badge className="bg-emerald-500 text-white font-black px-4 py-1.5 uppercase tracking-widest">92% Confidence</Badge>
                </div>
            </CardContent>
        </Card>
    )
}
