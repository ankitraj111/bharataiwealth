"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ShieldCheck, ShieldAlert, ZapOff, Scale } from "lucide-react"
import { motion } from "framer-motion"

interface RiskFactor {
    category: string
    impact: string
    description: string
}

interface RiskFactorsProps {
    factors: RiskFactor[]
}

export function RiskFactorsCard({ factors }: RiskFactorsProps) {
    return (
        <Card className="glass-card border-rose-500/20 bg-rose-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <ShieldAlert className="h-4 w-4 text-rose-600" />
                    Structural Threat Assessment
                    <Badge className="ml-auto text-[9px] font-black uppercase bg-rose-500 text-white border-none">
                        Alpha Risks
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {factors.map((factor, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-[8px] font-black border-none bg-muted/50 text-muted-foreground uppercase">
                                        {factor.category}
                                    </Badge>
                                    <AlertTriangle className={`h-3 w-3 ${factor.impact === 'HIGH' ? 'text-rose-600' : 'text-amber-600'}`} />
                                </div>
                                <p className="text-sm font-bold leading-tight">{factor.description}</p>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-border/5 pt-3">
                                <span className="text-[9px] font-black uppercase text-muted-foreground">Threat Level</span>
                                <span className={`text-[9px] font-black uppercase ${factor.impact === 'HIGH' ? 'text-rose-600' : 'text-amber-600'}`}>{factor.impact}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-xs font-black text-rose-700 uppercase tracking-widest mb-1">Risk Mitigation Protocol</p>
                        <p className="text-[10px] text-rose-900 font-medium italic leading-relaxed">
                            Engine detects high sensitivity to interest rate cycles. Capital allocation should be phased to minimize entry-point volatility.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
