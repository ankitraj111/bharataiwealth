"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"

const cryptoNews = [
  { title: "SEC Approves Multiple Bitcoin ETFs", impact: "Positive", date: "2 hours ago", category: "Regulation" },
  { title: "Ethereum Network Upgrade Scheduled", impact: "Neutral", date: "5 hours ago", category: "Technology" },
  { title: "Major Exchange Reports Security Breach", impact: "Negative", date: "1 day ago", category: "Security" },
  { title: "Institutional Adoption Reaches New High", impact: "Positive", date: "1 day ago", category: "Adoption" },
]

export function NewsPanel() {
  return (
    <motion.div variants={scrollReveal}>
      <Card className="glass-card">
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Newspaper className="h-5 w-5 text-blue-600" />
            News & Event Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {cryptoNews.map((news, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-[10px]">{news.category}</Badge>
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                    </div>
                    <p className="font-bold text-sm mb-1">{news.title}</p>
                  </div>
                  <Badge className={
                    news.impact === "Positive" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 flex items-center gap-1" :
                    news.impact === "Negative" ? "bg-rose-500/10 text-rose-600 border-rose-500/20 flex items-center gap-1" :
                    "bg-slate-500/10 text-slate-600 border-slate-500/20 flex items-center gap-1"
                  }>
                    {news.impact === "Positive" ? <TrendingUp className="h-3 w-3" /> :
                     news.impact === "Negative" ? <TrendingDown className="h-3 w-3" /> :
                     <Minus className="h-3 w-3" />}
                    {news.impact}
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
