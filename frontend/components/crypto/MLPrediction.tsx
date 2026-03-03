"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, Info } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { cn } from "@/lib/utils"

const predictionData = {
  asset: "BTC",
  currentPrice: 3850000,
  prediction1d: { low: 3750000, high: 3950000, probability: 72 },
  prediction7d: { low: 3600000, high: 4100000, probability: 65 },
  trend: "Up",
  model: "Neural Ensemble v4.2",
}

export function MLPrediction() {
  return (
    <motion.div variants={scrollReveal} className="h-full">
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group h-full">
        <CardHeader className="p-8 border-b border-border/50 bg-muted/20 relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
          <CardTitle className="text-sm font-black text-foreground flex items-center gap-4 italic uppercase tracking-tight relative z-10">
            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            Neural Alpha Projection
            <Badge className="bg-primary/10 text-primary border border-primary/20 ml-auto font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-xl">
              Model v4.2 Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-8">
            <div className="text-center relative">
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-3 italic relative z-10">
                Structural Alpha Value ({predictionData.asset})
              </p>
              <p className="text-5xl font-black text-foreground tabular-nums tracking-tighter italic relative z-10">
                ₹{(predictionData.currentPrice / 100000).toFixed(2)}L
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-[2rem] bg-muted/30 border border-border/50 group/item hover:bg-muted/50 transition-all shadow-inner">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-4 italic">
                  24h Alpha Forecast
                </p>
                <p className="text-sm font-black text-foreground mb-4 italic tabular-nums">
                  ₹{(predictionData.prediction1d.low / 100000).toFixed(2)}L - ₹{(predictionData.prediction1d.high / 100000).toFixed(2)}L
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden border border-border/50">
                    <div
                      className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                      style={{ width: `${predictionData.prediction1d.probability}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-primary italic">{predictionData.prediction1d.probability}%</span>
                </div>
              </div>

              <div className="p-6 rounded-[2rem] bg-muted/30 border border-border/50 group/item hover:bg-muted/50 transition-all shadow-inner">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-4 italic">
                  7d Structural Forecast
                </p>
                <p className="text-sm font-black text-foreground mb-4 italic tabular-nums">
                  ₹{(predictionData.prediction7d.low / 100000).toFixed(2)}L - ₹{(predictionData.prediction7d.high / 100000).toFixed(2)}L
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden border border-border/50">
                    <div
                      className="h-full bg-accent shadow-[0_0_10px_rgba(var(--accent),0.5)]"
                      style={{ width: `${predictionData.prediction7d.probability}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-accent italic">{predictionData.prediction7d.probability}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 rounded-[2rem] bg-gradient-to-br from-primary/10 to-accent border border-primary/20 backdrop-blur-xl relative overflow-hidden group/bias">
              <div className="absolute top-0 right-0 h-16 w-16 bg-primary/10 rounded-full blur-xl -mr-8 -mt-8 group-hover/bias:bg-primary/20 transition-all" />
              <div className="relative z-10">
                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2 italic">
                  Structural Bias
                </p>
                <p className="text-xl font-black text-success flex items-center gap-3 italic">
                  <TrendingUp className="h-6 w-6" />
                  {predictionData.trend} Alpha
                </p>
              </div>
              <div className="text-right relative z-10">
                <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2 italic">
                  Neural Sync Model
                </p>
                <p className="text-[11px] font-black text-foreground uppercase italic tracking-tighter bg-card/60 px-3 py-1 rounded-lg border border-border/50 inline-block">{predictionData.model}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-destructive/10 border border-destructive/20 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <Info className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground font-bold leading-relaxed italic">
                  <span className="text-destructive uppercase font-black tracking-widest mr-2">Directive:</span>
                  Neural projections are probabilistic and feature inherent structural uncertainty.
                  Digital asset volatility is extreme. Use for strategic validation only.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
