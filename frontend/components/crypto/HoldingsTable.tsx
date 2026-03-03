"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus, Download, BarChart3, Calculator } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import Link from "next/link"
import { cn } from "@/lib/utils"

const cryptoHoldings = [
  { symbol: "BTC", name: "Bitcoin", price: 3850000, change24h: 2.4, change7d: 8.2, volatility: 85, risk: "High", signal: "Bullish", confidence: 78 },
  { symbol: "ETH", name: "Ethereum", price: 215000, change24h: 3.1, change7d: 12.5, volatility: 88, risk: "High", signal: "Bullish", confidence: 82 },
  { symbol: "SOL", name: "Solana", price: 11200, change24h: -1.8, change7d: 15.3, volatility: 92, risk: "Extreme", signal: "Neutral", confidence: 65 },
  { symbol: "MATIC", name: "Polygon", price: 68, change24h: 4.2, change7d: 18.7, volatility: 90, risk: "Extreme", signal: "Cautious", confidence: 58 },
]

export function HoldingsTable() {
  return (
    <motion.div variants={scrollReveal} className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[10px] font-black flex items-center gap-2 uppercase tracking-[0.3em] italic text-muted-foreground">
          <Eye className="h-4 w-4 text-primary" />
          Structural Alpha Holdings
        </h2>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="rounded-xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-4 py-2 h-auto hover:text-primary transition-all">
            <Plus className="h-3 w-3 mr-2" />
            Neural Watch
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-4 py-2 h-auto hover:text-primary transition-all">
            <Download className="h-3 w-3 mr-2" />
            Neural Export
          </Button>
        </div>
      </div>
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border/50">
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Asset Vector</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Neural Value</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">24h Alpha</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">7d Alpha</th>
                <th className="text-center p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Volatility Matrix</th>
                <th className="text-center p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Structural Risk</th>
                <th className="text-center p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Neural Signal</th>
                <th className="text-center p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Alpha Sync</th>
                <th className="text-center p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Alpha Tools</th>
              </tr>
            </thead>
            <tbody>
              {cryptoHoldings.map((crypto, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/20 transition-all group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-primary-foreground font-black text-sm italic group-hover:scale-110 transition-transform">
                        {crypto.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-black text-foreground italic uppercase tracking-tighter">{crypto.symbol}</p>
                        <p className="text-[10px] text-muted-foreground font-medium italic opacity-60">{crypto.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-right font-black text-foreground italic tabular-nums">
                    ₹{crypto.price.toLocaleString("en-IN")}
                  </td>
                  <td className="p-6 text-right">
                    <span className={cn("font-black italic tabular-nums", crypto.change24h >= 0 ? "text-success" : "text-destructive")}>
                      {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h}%
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <span className={cn("font-black italic tabular-nums", crypto.change7d >= 0 ? "text-success" : "text-destructive")}>
                      {crypto.change7d >= 0 ? "+" : ""}{crypto.change7d}%
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden border border-border/50">
                        <div
                          className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all duration-1000"
                          style={{ width: `${crypto.volatility}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-black text-primary italic tabular-nums">{crypto.volatility}%</span>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg border", crypto.risk === "Extreme" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-warning/10 text-warning border-warning/20")}>
                      {crypto.risk}
                    </Badge>
                  </td>
                  <td className="p-6 text-center">
                    <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg border",
                      crypto.signal === "Bullish" ? "bg-success/10 text-success border-success/20" :
                        crypto.signal === "Cautious" ? "bg-destructive/10 text-destructive border-destructive/20" :
                          "bg-muted text-muted-foreground border-border/50"
                    )}>
                      {crypto.signal}
                    </Badge>
                  </td>
                  <td className="p-6 text-center">
                    <span className="font-black text-sm text-foreground italic tabular-nums">{crypto.confidence}%</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-3">
                      <Link href={`/crypto/analysis?symbol=${crypto.symbol}`}>
                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl hover:bg-primary/10 hover:text-primary transition-all">
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}
