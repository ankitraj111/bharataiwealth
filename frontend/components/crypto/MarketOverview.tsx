"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Brain } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { cn } from "@/lib/utils"

const marketData = [
  { label: "Alpha Dominance", value: "52.3%", sub: "BTC Vector" },
  { label: "Neural Engine", value: "₹2.15L", sub: "ETH Protocol" },
  { label: "Structural Cap", value: "₹185.2T", sub: "Total Alpha" },
  { label: "Neural Volume", value: "₹8.5T", sub: "Alpha Flux" },
  { label: "Neural Index", value: "68", sub: "Structural Greed" },
  { label: "Structural Phase", value: "Alpha-On", sub: "V-Bias High" },
]

export function MarketOverview() {
  return (
    <motion.div variants={scrollReveal} className="w-full">
      <h2 className="text-[10px] font-black mb-6 flex items-center gap-2 uppercase tracking-[0.3em] italic text-muted-foreground">
        <Globe className="h-4 w-4 text-primary" />
        Macro Alpha Overview
      </h2>
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group">
        <CardContent className="p-10 relative">
          <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 relative z-10">
            {marketData.map((item, i) => (
              <div key={i} className="text-center group/item">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3 italic group-hover/item:text-primary transition-colors">
                  {item.label}
                </p>
                <p className="text-3xl font-black text-foreground tabular-nums mb-1 italic tracking-tighter group-hover/item:scale-110 transition-transform">{item.value}</p>
                <p className="text-[10px] text-muted-foreground font-medium italic opacity-60">{item.sub}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 backdrop-blur-md relative overflow-hidden group/insight">
            <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-full blur-xl -mr-10 -mt-10 group-hover/insight:bg-primary/20 transition-all" />
            <div className="flex items-start gap-5 relative z-10">
              <div className="p-3 rounded-2xl bg-primary/20 shadow-lg shadow-primary/10">
                <Brain className="h-6 w-6 text-primary flex-shrink-0" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 italic">
                  Neural Market Intelligence Synthesis
                </p>
                <p className="text-[11px] text-muted-foreground font-bold leading-relaxed italic">
                  Structural vectors currently indicate high-velocity alpha expansion. Neural dominance at 52.3%
                  suggests potential liquidity rotation into structural altcoins. Sentiment sync at 68 indicates
                  macro overheating potential. Calibrate position vectors accordingly.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
