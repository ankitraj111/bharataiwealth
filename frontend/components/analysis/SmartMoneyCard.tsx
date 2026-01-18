"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserCheck, TrendingUp, Search, Compass } from "lucide-react"
import { motion } from "framer-motion"

interface SmartMoneyProps {
    fiiHolding: number
    diiHolding: number
    mfCount: number
    insiderTrend: string
    whaleActivity: string
}

export function SmartMoneyCard({ fiiHolding, diiHolding, mfCount, insiderTrend, whaleActivity }: SmartMoneyProps) {
    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Compass className="h-4 w-4 text-[#0A66C2]" />
                    Institutional Intelligence
                    <Badge className="ml-auto text-[9px] font-black uppercase bg-blue-500/10 text-blue-600 border-none">
                        Money Flow
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shareholding Breakdown */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Users className="h-3 w-3 text-[#0A66C2]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Ownership Matrix</span>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span>Foreign Institutions (FII)</span>
                                    <span>{fiiHolding}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${fiiHolding}%` }}
                                        className="h-full bg-[#0A66C2] rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span>Domestic Institutions (DII)</span>
                                    <span>{diiHolding}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${diiHolding}%` }}
                                        className="h-full bg-emerald-500 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Insider & Whale Signals */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Search className="h-3 w-3 text-[#0A66C2]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Silent Signals</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-inner">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Mutual Funds</p>
                                <p className="text-xl font-black text-foreground tracking-tighter">{mfCount}</p>
                                <Badge className="mt-1 text-[8px] font-black bg-blue-500/10 text-blue-600 border-none uppercase">Schemes</Badge>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-inner">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase mb-1">Insider Trend</p>
                                <p className={`text-xl font-black ${insiderTrend === 'BUYING' ? 'text-emerald-600' : 'text-foreground'} tracking-tighter`}>{insiderTrend}</p>
                                <Badge className={`mt-1 text-[8px] font-black ${insiderTrend === 'BUYING' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground'} border-none uppercase`}>Last Q</Badge>
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 flex items-center justify-between">
                            <span className="text-[10px] font-black text-orange-600 uppercase">Whale Tracking</span>
                            <span className="text-[10px] font-black uppercase">{whaleActivity}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
