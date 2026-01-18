"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, TrendingUp, AlertTriangle, Gauge, BarChart3 } from "lucide-react"

interface AIScoreProps {
    total: number
    fundamentals: number
    valuation: number
    technicals: number
    capitalFlow: number
    sentiment: number
    verdict: string
    verdictReason: string
}

const VERDICT_CONFIG = {
    STRONG_BUY: { color: "#16A34A", bg: "bg-emerald-500", label: "Strong Buy", icon: TrendingUp },
    ACCUMULATE: { color: "#0A66C2", bg: "bg-blue-500", label: "Accumulate", icon: Sparkles },
    HOLD: { color: "#FF8C00", bg: "bg-amber-500", label: "Hold", icon: Gauge },
    AVOID: { color: "#f43f5e", bg: "bg-red-500", label: "Avoid", icon: AlertTriangle },
}

export function AIScoreCard({
    total,
    fundamentals,
    valuation,
    technicals,
    capitalFlow,
    sentiment,
    verdict,
    verdictReason
}: AIScoreProps) {
    const [animatedScore, setAnimatedScore] = useState(0)
    const config = VERDICT_CONFIG[verdict as keyof typeof VERDICT_CONFIG] || VERDICT_CONFIG.HOLD
    const VerdictIcon = config.icon

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedScore(total), 300)
        return () => clearTimeout(timer)
    }, [total])

    const getScoreColor = (score: number) => {
        if (score >= 80) return "#16A34A"
        if (score >= 60) return "#0A66C2"
        if (score >= 40) return "#FF8C00"
        return "#f43f5e"
    }

    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference

    const scoreBreakdown = [
        { label: "Fundamentals", value: fundamentals, weight: "40%" },
        { label: "Valuation", value: valuation, weight: "20%" },
        { label: "Technicals", value: technicals, weight: "20%" },
        { label: "Capital Flow", value: capitalFlow, weight: "10%" },
        { label: "Sentiment", value: sentiment, weight: "10%" },
    ]

    return (
        <Card className="glass-card border-[#0A66C2]/30 bg-[#0A66C2]/5 overflow-hidden group hover:border-[#0A66C2]/50 transition-all duration-500">
            <CardHeader className="pb-2 border-b border-border/10 bg-muted/5">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Brain className="h-4 w-4 text-[#0A66C2]" />
                    AI Intelligence Score
                    <Badge className="ml-auto text-[9px] font-black uppercase bg-[#0A66C2]/10 text-[#0A66C2] border-none">
                        <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                        AI Verified
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Circular Score Gauge */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative group/gauge">
                            <div className="absolute inset-0 bg-[#0A66C2]/20 blur-3xl rounded-full opacity-0 group-hover/gauge:opacity-100 transition-opacity duration-700" />
                            <svg className="w-40 h-40 -rotate-90 relative z-10">
                                <circle
                                    cx="80"
                                    cy="80"
                                    r="60"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-muted/10"
                                />
                                <motion.circle
                                    cx="80"
                                    cy="80"
                                    r="60"
                                    stroke={getScoreColor(animatedScore)}
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: circumference - (animatedScore / 100) * circumference }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="filter drop-shadow-[0_0_8px_rgba(var(--score-color),0.5)]"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-5xl font-black tracking-tighter"
                                    style={{ color: getScoreColor(animatedScore) }}
                                >
                                    {animatedScore}
                                </motion.span>
                                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest -mt-1">Rank</span>
                            </div>
                        </div>

                        {/* Verdict Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className={`flex items-center gap-2 mt-8 px-6 py-2.5 rounded-2xl shadow-xl ${config.bg} text-white group-hover:scale-105 transition-transform`}
                        >
                            <VerdictIcon className="h-5 w-5" />
                            <span className="font-black uppercase text-xs tracking-widest">{config.label}</span>
                        </motion.div>
                        <p className="text-xs text-muted-foreground text-center mt-4 max-w-[240px] font-medium italic leading-relaxed">
                            "{verdictReason}"
                        </p>
                    </div>

                    {/* Score Breakdown */}
                    <div className="space-y-5">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2 border-b border-border/10 pb-2">
                            <BarChart3 className="h-3 w-3 text-[#0A66C2]" />
                            Weighted Composition
                        </p>
                        <div className="space-y-4">
                            {scoreBreakdown.map((item, i) => (
                                <div key={item.label} className="space-y-1.5 group cursor-default">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-foreground group-hover:text-[#0A66C2] transition-colors">{item.label}</span>
                                            <Badge variant="outline" className="text-[8px] font-black uppercase px-1 border-none bg-muted/50 text-muted-foreground opacity-70">W: {item.weight}</Badge>
                                        </div>
                                        <span className="text-xs font-black tabular-nums" style={{ color: getScoreColor(item.value) }}>
                                            {item.value}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.value}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: getScoreColor(item.value) }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Score Legend */}
                        <div className="pt-6 border-t border-border/10 grid grid-cols-2 gap-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">80-100 STRONG</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">60-80 GOOD</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">40-60 MODERATE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-tighter">&lt;40 WEAK</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
