"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, ShieldCheck, Trophy, UserCheck, Star, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface CompanyDetailsProps {
    model: string
    moat: string
    moatStrength: number
    promoterQuality: {
        score: number
        pledgingPercentage: number
        skinInTheGame: number
    }
    businessModelResilience: string
}

export function CompanyDetailsCard({ model, moat, moatStrength, promoterQuality, businessModelResilience }: CompanyDetailsProps) {
    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <Briefcase className="h-4 w-4 text-[#0A66C2]" />
                    Business & Governance
                    <Badge className="ml-auto text-[9px] font-black uppercase border-none bg-emerald-500/10 text-emerald-600">
                        Top Tier
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Business Model & Moat */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                <Sparkles className="h-3 w-3 text-[#0A66C2]" />
                                Strategic Architecture
                            </p>
                            <div className="p-4 rounded-2xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-inner">
                                <p className="text-sm font-bold leading-relaxed">{model}</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Economic Moat: <span className="text-foreground">{moat}</span></p>
                                <span className="text-[10px] font-black text-[#0A66C2]">{moatStrength}% Strength</span>
                            </div>
                            <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${moatStrength}%` }}
                                    className="h-full bg-gradient-to-r from-[#0A66C2] to-blue-400 rounded-full"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="text-[8px] font-black uppercase border-none bg-blue-500/10 text-blue-600">Competitive Edge</Badge>
                                <Badge variant="outline" className="text-[8px] font-black uppercase border-none bg-emerald-500/10 text-emerald-600">Model Resilience: {businessModelResilience}</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Promoter Quality */}
                    <div className="space-y-6 p-6 rounded-2xl bg-[#0A66C2]/5 border border-[#0A66C2]/10 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <ShieldCheck className="h-24 w-24 text-[#0A66C2]" />
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <UserCheck className="h-4 w-4 text-[#0A66C2]" />
                            <span className="text-xs font-black uppercase tracking-widest">Promoter Integrity</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">Equity Skin</p>
                                <p className="text-xl font-black text-foreground">{promoterQuality.skinInTheGame}%</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-bold text-muted-foreground uppercase">Pledging</p>
                                <p className="text-xl font-black text-rose-600">{promoterQuality.pledgingPercentage}%</p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2 relative z-10">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                                <span className="text-muted-foreground">Governance Score</span>
                                <span className="text-[#0A66C2]">{promoterQuality.score}/100</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${promoterQuality.score}%` }}
                                    className={`h-full rounded-full ${promoterQuality.score > 85 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
