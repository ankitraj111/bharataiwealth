"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Landmark, TrendingUp, TrendingDown, Info } from "lucide-react"
import { motion } from "framer-motion"

interface MacroEconomicProps {
    global: {
        gdpGrowth: number
        inflation: number
        centralBankPolicy: string
        moneyFlow: string
        riskSentiment: string
    }
    india: {
        gdpGrowth: number
        inflation: number
        interestRate: number
        forexReserves: number
        fiscalDeficit: number
    }
    status: string
}

export function MacroEconomicCard({ global, india, status }: MacroEconomicProps) {
    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Globe className="h-4 w-4 text-[#0A66C2]" />
                    Macro Intelligence
                    <Badge className={`ml-auto text-[9px] font-black uppercase ${status === 'STABLE' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600 border-none'}`}>
                        {status}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* India Macro */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Landmark className="h-3 w-3 text-[#0A66C2]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Domestic Hub (India)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">GDP Growth</p>
                                <p className="text-xl font-black text-emerald-600 tracking-tighter">{india.gdpGrowth}%</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Inflation</p>
                                <p className="text-xl font-black text-amber-600 tracking-tighter">{india.inflation}%</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Forex</p>
                                <p className="text-xl font-black text-[#0A66C2] tracking-tighter">${india.forexReserves}B</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Fiscal Def</p>
                                <p className="text-xl font-black text-rose-600 tracking-tighter">{india.fiscalDeficit}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Global Macro */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-3 w-3 text-[#0A66C2]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Global Sentiment</span>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Central Bank</span>
                                <Badge variant="outline" className="text-[9px] font-black border-none bg-rose-500/10 text-rose-600">{global.centralBankPolicy}</Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Liquidity Flow</span>
                                <Badge variant="outline" className="text-[9px] font-black border-none bg-amber-500/10 text-amber-600">{global.moneyFlow}</Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Risk Appetite</span>
                                <Badge variant="outline" className="text-[9px] font-black border-none bg-blue-500/10 text-blue-600">{global.riskSentiment}</Badge>
                            </div>
                        </div>
                        <div className="mt-4 p-3 rounded-xl bg-[#0A66C2]/5 border border-[#0A66C2]/10">
                            <p className="text-[10px] text-muted-foreground italic font-medium">
                                <Info className="h-3 w-3 inline mr-1 mb-0.5 opacity-70" />
                                Growth premiums remain strong in India despite global hawkism.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
