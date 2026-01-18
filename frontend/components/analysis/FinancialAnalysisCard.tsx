"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Percent, Coins, Calculator } from "lucide-react"
import { motion } from "framer-motion"

interface FinancialAnalysisProps {
    revenueCAGR: number
    profitCAGR: number
    avgROE: number
    avgROCE: number
    debtToEquity: number
    freeCashflowYield: number
}

export function FinancialAnalysisCard({ revenueCAGR, profitCAGR, avgROE, avgROCE, debtToEquity, freeCashflowYield }: FinancialAnalysisProps) {
    const metrics = [
        { label: "10Y Revenue CAGR", value: `${revenueCAGR}%`, icon: TrendingUp, color: "text-blue-500" },
        { label: "10Y Profit CAGR", value: `${profitCAGR}%`, icon: Percent, color: "text-emerald-500" },
        { label: "Avg. ROE (10Y)", value: `${avgROE}%`, icon: BarChart3, color: "text-[#0A66C2]" },
        { label: "Avg. ROCE (10Y)", value: `${avgROCE}%`, icon: Calculator, color: "text-purple-500" },
        { label: "Debt / Equity", value: debtToEquity.toFixed(2), icon: Coins, color: debtToEquity < 0.5 ? "text-emerald-600" : "text-rose-600" },
        { label: "FCF Yield", value: `${freeCashflowYield}%`, icon: TrendingUp, color: "text-emerald-500" }
    ]

    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <BarChart3 className="h-4 w-4 text-[#0A66C2]" />
                    Decade Financial Architecture
                    <Badge className="ml-auto text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-600 border-none">
                        High Quality
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {metrics.map((metric, i) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 hover:border-blue-500/30 transition-all group"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <metric.icon className={`h-3 w-3 ${metric.color}`} />
                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">{metric.label}</span>
                            </div>
                            <p className={`text-xl font-black tracking-tighter ${metric.color} group-hover:scale-110 transition-transform origin-left`}>
                                {metric.value}
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                        Clean Balance Sheet Identified • Robust Cash Conversion Cycle
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
