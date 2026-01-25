"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus, Download, BarChart3, Calculator } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import Link from "next/link"

const cryptoHoldings = [
  { symbol: "BTC", name: "Bitcoin", price: 3850000, change24h: 2.4, change7d: 8.2, volatility: 85, risk: "High", signal: "Bullish", confidence: 78 },
  { symbol: "ETH", name: "Ethereum", price: 215000, change24h: 3.1, change7d: 12.5, volatility: 88, risk: "High", signal: "Bullish", confidence: 82 },
  { symbol: "SOL", name: "Solana", price: 11200, change24h: -1.8, change7d: 15.3, volatility: 92, risk: "Extreme", signal: "Neutral", confidence: 65 },
  { symbol: "MATIC", name: "Polygon", price: 68, change24h: 4.2, change7d: 18.7, volatility: 90, risk: "Extreme", signal: "Cautious", confidence: 58 },
]

export function HoldingsTable() {
  return (
    <motion.div variants={scrollReveal}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Eye className="h-5 w-5 text-purple-600" />
          Holdings & Watchlist
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Add to Watchlist
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <Card className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-xs font-bold uppercase tracking-wider">Asset</th>
                <th className="text-right p-4 text-xs font-bold uppercase tracking-wider">Price</th>
                <th className="text-right p-4 text-xs font-bold uppercase tracking-wider">24h</th>
                <th className="text-right p-4 text-xs font-bold uppercase tracking-wider">7d</th>
                <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">Volatility</th>
                <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">Risk</th>
                <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">AI Signal</th>
                <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">Confidence</th>
                <th className="text-center p-4 text-xs font-bold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cryptoHoldings.map((crypto, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                        {crypto.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold">{crypto.symbol}</p>
                        <p className="text-xs text-muted-foreground">{crypto.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right font-bold tabular-nums">
                    ₹{crypto.price.toLocaleString("en-IN")}
                  </td>
                  <td className="p-4 text-right">
                    <span className={`font-bold ${crypto.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {crypto.change24h >= 0 ? "+" : ""}{crypto.change24h}%
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`font-bold ${crypto.change7d >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {crypto.change7d >= 0 ? "+" : ""}{crypto.change7d}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
                          style={{ width: `${crypto.volatility}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold">{crypto.volatility}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <Badge className={crypto.risk === "Extreme" ? "bg-rose-500/10 text-rose-600 border-rose-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}>
                      {crypto.risk}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <Badge className={
                      crypto.signal === "Bullish" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                      crypto.signal === "Cautious" ? "bg-rose-500/10 text-rose-600 border-rose-500/20" :
                      "bg-slate-500/10 text-slate-600 border-slate-500/20"
                    }>
                      {crypto.signal}
                    </Badge>
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-sm">{crypto.confidence}%</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/crypto/analysis?symbol=${crypto.symbol}`}>
                        <Button variant="ghost" size="sm" className="h-8 px-3">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="h-8 px-3">
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
