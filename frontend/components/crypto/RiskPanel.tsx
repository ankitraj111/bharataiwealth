"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { cn } from "@/lib/utils"

const riskFactors = [
  { factor: "Regulatory Bias", level: "High", score: 8, color: "text-destructive bg-destructive/10 border-destructive/20" },
  { factor: "Market Velocity", level: "Extreme", score: 9, color: "text-destructive bg-destructive/10 border-destructive/20" },
  { factor: "Structural Liquidity", level: "Medium", score: 6, color: "text-warning bg-warning/10 border-warning/20" },
  { factor: "Neural Systemic Risk", level: "Medium", score: 5, color: "text-warning bg-warning/10 border-warning/20" },
]

export function RiskPanel() {
  return (
    <motion.div variants={scrollReveal} className="h-full">
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group h-full">
        <CardHeader className="p-8 border-b border-border/50 bg-muted/20 relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-destructive/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-destructive/10 transition-all" />
          <CardTitle className="text-sm font-black text-foreground flex items-center gap-4 italic uppercase tracking-tight relative z-10">
            <div className="p-2.5 rounded-xl bg-destructive shadow-lg shadow-destructive/20">
              <Shield className="h-6 w-6 text-destructive-foreground" />
            </div>
            Structural Risk Matrix
            <Badge className="bg-destructive/10 text-destructive border border-destructive/20 ml-auto font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-xl">
              Extreme Bias
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {riskFactors.map((risk, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-muted/30 border border-border/50 group/item hover:bg-muted/50 transition-all shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-black text-[11px] text-foreground uppercase tracking-widest mb-2 italic">{risk.factor}</p>
                    <Badge className={cn("font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-lg border", risk.color)}>
                      {risk.level}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-foreground italic tabular-nums">{risk.score}<span className="text-xs opacity-40 ml-1">/10</span></p>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden border border-border/50">
                  <div
                    className={cn("h-full transition-all duration-1000", risk.color.split(' ')[0].replace('text-', 'bg-'))}
                    style={{ width: `${risk.score * 10}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="p-6 rounded-[2rem] bg-warning/10 border border-warning/20 mt-8 relative overflow-hidden group/warning">
              <div className="absolute top-0 right-0 h-16 w-16 bg-warning/5 rounded-full blur-xl -mr-8 -mt-8 group-hover/warning:bg-warning/10 transition-all" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-2 rounded-xl bg-warning/20">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-warning uppercase tracking-[0.2em] mb-2 italic">
                    Structural Safety Directive
                  </p>
                  <p className="text-xs text-muted-foreground font-bold leading-relaxed italic">
                    Digital assets are inherently volatile. Suggested max structural allocation: 5-10%.
                    Historical max drawdown vectors exceed 80%. Protect principal value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
