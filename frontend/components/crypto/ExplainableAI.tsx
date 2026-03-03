"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Brain, TrendingUp, Activity, BarChart3, Users } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { cn } from "@/lib/utils"

const aiFactors = [
  { factor: "Momentum Alpha", impact: 85, icon: TrendingUp, description: "Strong structural momentum detected" },
  { factor: "Structural Volume", impact: 78, icon: Activity, description: "High-fidelity volume confirms trend" },
  { factor: "Dominance Vector", impact: 72, icon: BarChart3, description: "Structural stability supports alts" },
  { factor: "Neural Sentiment", impact: 68, icon: Users, description: "Market greed index supports optimism" },
]

export function ExplainableAI() {
  return (
    <motion.div variants={scrollReveal} className="h-full">
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group h-full">
        <CardHeader className="p-8 border-b border-border/50 bg-muted/20 relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
          <CardTitle className="text-sm font-black text-foreground flex items-center gap-4 italic uppercase tracking-tight relative z-10">
            <div className="p-2.5 rounded-xl bg-primary shadow-lg shadow-primary/20">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            Neural Alpha Explanation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="p-6 rounded-[2rem] bg-success/10 border border-success/20 relative overflow-hidden group/prediction">
              <div className="absolute top-0 right-0 h-16 w-16 bg-success/5 rounded-full blur-xl -mr-8 -mt-8 group-hover/prediction:bg-success/10 transition-all" />
              <p className="text-[10px] font-black text-success uppercase tracking-[0.2em] mb-2 italic relative z-10">
                Structural Alpha Bias: Bullish
              </p>
              <p className="text-xs text-muted-foreground font-bold leading-relaxed italic relative z-10">
                Our neural ensemble (NeuralSync v4.2) predicts upward trajectory based on
                structural momentum, volume fidelity, and macro sentiment vectors. Alpha Confidence: 78%.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4 italic">
                Neural Alpha Drivers
              </p>
              {aiFactors.map((factor, i) => (
                <div key={i} className="p-5 rounded-[2rem] bg-muted/30 border border-border/50 group/item hover:bg-muted/50 transition-all shadow-inner">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-10 w-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <factor.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-black text-[11px] text-foreground uppercase tracking-widest italic">{factor.factor}</p>
                        <span className="text-[10px] font-black text-primary italic tabular-nums">{factor.impact}% Sync</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-medium italic opacity-60">{factor.description}</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden border border-border/50">
                    <div
                      className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all duration-1000"
                      style={{ width: `${factor.impact}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.1em] mb-2 italic">Neural Summary</p>
              <p className="text-[11px] text-muted-foreground font-bold leading-relaxed italic">
                The neural engine observes high-fidelity buying pressure across macro vectors.
                These clusters historically precede structural price expansion. Use for strategic positioning only.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
