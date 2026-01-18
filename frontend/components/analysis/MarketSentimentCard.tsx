"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, MessageSquare, AlertCircle, TrendingUp, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface SentimentProps {
    vix: number
    sentimentScore: number
    news: { title: string; impact: string }[]
    socialActivity: string
}

export function MarketSentimentCard({ vix, sentimentScore, news, socialActivity }: SentimentProps) {
    return (
        <Card className="glass-card border-blue-500/20 bg-blue-500/5 overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/10">
                <CardTitle className="text-base font-black flex items-center gap-2 uppercase tracking-tight">
                    <MessageSquare className="h-4 w-4 text-[#0A66C2]" />
                    Crowd & Sentiment Radar
                    <Badge className="ml-auto text-[9px] font-black uppercase bg-[#0A66C2]/10 text-[#0A66C2] border-none">
                        VIX: {vix}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sentiment Score */}
                    <div className="flex flex-col items-center justify-center p-6 border-r border-border/10">
                        <div className="relative h-24 w-24 mb-4">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/10" />
                                <motion.circle
                                    cx="48" cy="48" r="40" stroke="#0A66C2" strokeWidth="8" fill="transparent"
                                    strokeDasharray={251}
                                    initial={{ strokeDashoffset: 251 }}
                                    animate={{ strokeDashoffset: 251 - (sentimentScore / 100) * 251 }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black">{sentimentScore}</span>
                                <span className="text-[8px] font-black uppercase text-muted-foreground">Pulse</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#0A66C2]">Optimism Weighted</p>
                    </div>

                    {/* News Feed */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Newspaper className="h-3 w-3 text-[#0A66C2]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Catalyst Feed</span>
                        </div>
                        <div className="space-y-3">
                            {news.map((item, i) => (
                                <div key={i} className="p-3 rounded-xl bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 group">
                                    <div className="flex justify-between items-start gap-3">
                                        <p className="text-xs font-bold leading-tight group-hover:text-[#0A66C2] transition-colors">{item.title}</p>
                                        <Badge className={`text-[8px] font-black border-none uppercase ${item.impact === 'HIGH' ? 'bg-rose-500/10 text-rose-600' : 'bg-blue-500/10 text-blue-600'}`}>
                                            {item.impact}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5 px-1">
                            <div className={`h-1.5 w-1.5 rounded-full ${socialActivity === 'HIGH' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            <span className="text-[9px] font-black text-muted-foreground uppercase">{socialActivity} Social Retail Activity</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
