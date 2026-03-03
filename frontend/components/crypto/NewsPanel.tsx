"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { cn } from "@/lib/utils"

const cryptoNews = [
  { title: "SEC Approves Multiple Alpha Structural ETFs", impact: "Positive", date: "2 hours ago", category: "Regulation" },
  { title: "Neural Network Upgrade Protocol Scheduled", impact: "Neutral", date: "5 hours ago", category: "Neural Tech" },
  { title: "Major Node Cluster Reports Structural Breach", impact: "Negative", date: "1 day ago", category: "Security Alpha" },
  { title: "Institutional Alpha Adoption Reaches New Peak", impact: "Positive", date: "1 day ago", category: "Structural Adoption" },
]

export function NewsPanel() {
  return (
    <motion.div variants={scrollReveal} className="h-full">
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group h-full">
        <CardHeader className="p-8 border-b border-border/50 bg-muted/20 relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
          <CardTitle className="text-sm font-black text-foreground flex items-center gap-4 italic uppercase tracking-tight relative z-10">
            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Newspaper className="h-6 w-6 text-primary-foreground" />
            </div>
            Structural Alpha Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {cryptoNews.map((news, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all cursor-pointer group/news relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/news:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between gap-6 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg italic">{news.category}</Badge>
                      <span className="text-[10px] font-black text-muted-foreground uppercase italic tracking-widest opacity-60">{news.date}</span>
                    </div>
                    <p className="font-black text-sm text-foreground italic uppercase tracking-tight group-hover/news:text-primary transition-colors">{news.title}</p>
                  </div>
                  <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-xl flex items-center gap-2 border shadow-lg transition-transform group-hover/news:scale-105",
                    news.impact === "Positive" ? "bg-success/10 text-success border-success/20 shadow-success/10" :
                      news.impact === "Negative" ? "bg-destructive/10 text-destructive border-destructive/20 shadow-destructive/10" :
                        "bg-muted text-muted-foreground border-border/50 shadow-inner"
                  )}>
                    {news.impact === "Positive" ? <TrendingUp className="h-3.5 w-3.5" /> :
                      news.impact === "Negative" ? <TrendingDown className="h-3.5 w-3.5" /> :
                        <Minus className="h-3.5 w-3.5" />}
                    {news.impact} Alpha
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
