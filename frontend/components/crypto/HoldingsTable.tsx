"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Plus, Download, BarChart3, Calculator, RefreshCw, Wifi } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCryptoListings, CoinListing } from "@/lib/useCryptoData"

// Target symbols to highlight and their AI signals (static for now, ML can enrich later)
const SIGNAL_MAP: Record<string, { signal: string; confidence: number; volatility: number; risk: string }> = {
  BTC: { signal: "Bullish", confidence: 78, volatility: 72, risk: "High" },
  ETH: { signal: "Bullish", confidence: 82, volatility: 78, risk: "High" },
  SOL: { signal: "Neutral", confidence: 65, volatility: 88, risk: "Extreme" },
  MATIC: { signal: "Cautious", confidence: 58, volatility: 90, risk: "Extreme" },
  BNB: { signal: "Neutral", confidence: 70, volatility: 65, risk: "High" },
  XRP: { signal: "Cautious", confidence: 60, volatility: 75, risk: "High" },
}

const WATCH_SYMBOLS = ["BTC", "ETH", "SOL", "MATIC", "BNB", "XRP"]

function fmtINR(usd: number) {
  const inr = usd * 83.5
  if (inr >= 1e7) return `₹${(inr / 1e7).toFixed(2)}Cr`
  if (inr >= 1e5) return `₹${(inr / 1e5).toFixed(2)}L`
  if (inr >= 1000) return `₹${inr.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
  return `₹${inr.toFixed(4)}`
}

export function HoldingsTable() {
  const { coins, loading, refresh } = useCryptoListings(50)

  const watchlist: CoinListing[] = coins
    .filter((c) => WATCH_SYMBOLS.includes(c.symbol))
    .sort((a, b) => WATCH_SYMBOLS.indexOf(a.symbol) - WATCH_SYMBOLS.indexOf(b.symbol))

  return (
    <motion.div variants={scrollReveal} className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[10px] font-black flex items-center gap-2 uppercase tracking-[0.3em] italic text-muted-foreground">
          <Eye className="h-4 w-4 text-primary" />
          Live Crypto Watchlist
        </h2>
        <div className="flex items-center gap-3">
          {loading
            ? <RefreshCw className="h-3 w-3 text-muted-foreground animate-spin" />
            : <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-500">
              <Wifi className="h-3 w-3" /> Live · CoinGecko
            </span>
          }
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            className="rounded-xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-4 py-2 h-auto hover:text-primary transition-all"
          >
            <RefreshCw className="h-3 w-3 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-4 py-2 h-auto hover:text-primary transition-all">
            <Download className="h-3 w-3 mr-2" />
            Export
          </Button>
        </div>
      </div>
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border/50">
                <th className="text-left p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Asset</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Price (INR)</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">24h %</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">7d %</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Market Cap</th>
                <th className="text-right p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Volume 24h</th>
                <th className="text-center p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Risk</th>
                <th className="text-center p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">AI Signal</th>
                <th className="text-center p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Confidence</th>
                <th className="text-center p-6 text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/30">
                    {Array.from({ length: 10 }).map((_, j) => (
                      <td key={j} className="p-6">
                        <div className="h-4 bg-muted/40 rounded-lg animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
                : watchlist.map((crypto) => {
                  const meta = SIGNAL_MAP[crypto.symbol] ?? { signal: "Neutral", confidence: 65, volatility: 70, risk: "High" }
                  const mcap = crypto.market_cap >= 1e12
                    ? `$${(crypto.market_cap / 1e12).toFixed(2)}T`
                    : crypto.market_cap >= 1e9
                      ? `$${(crypto.market_cap / 1e9).toFixed(2)}B`
                      : `$${(crypto.market_cap / 1e6).toFixed(2)}M`
                  const vol = crypto.volume_24h >= 1e9
                    ? `$${(crypto.volume_24h / 1e9).toFixed(2)}B`
                    : `$${(crypto.volume_24h / 1e6).toFixed(2)}M`

                  return (
                    <tr key={crypto.symbol} className="border-b border-border/30 hover:bg-muted/20 transition-all group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-primary-foreground font-black text-sm italic group-hover:scale-110 transition-transform">
                            {crypto.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-black text-foreground italic uppercase tracking-tighter">{crypto.symbol}</p>
                            <p className="text-[10px] text-muted-foreground font-medium italic opacity-60">#{crypto.rank} · {crypto.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-right font-black text-foreground italic tabular-nums text-sm">
                        {fmtINR(crypto.price)}
                        <p className="text-[9px] opacity-50 font-medium">${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                      </td>
                      <td className="p-6 text-right">
                        <span className={cn("font-black italic tabular-nums", crypto.change_24h >= 0 ? "text-emerald-500" : "text-rose-500")}>
                          {crypto.change_24h >= 0 ? "+" : ""}{crypto.change_24h}%
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <span className={cn("font-black italic tabular-nums", (crypto.change_7d ?? 0) >= 0 ? "text-emerald-500" : "text-rose-500")}>
                          {crypto.change_7d !== undefined ? (crypto.change_7d >= 0 ? "+" : "") : ""}{crypto.change_7d ?? 0}%
                        </span>
                      </td>
                      <td className="p-6 text-right font-bold text-foreground tabular-nums text-sm">{mcap}</td>
                      <td className="p-6 text-right font-bold text-muted-foreground tabular-nums text-sm">{vol}</td>
                      <td className="p-6 text-center">
                        <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg border", meta.risk === "Extreme" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-warning/10 text-warning border-warning/20")}>
                          {meta.risk}
                        </Badge>
                      </td>
                      <td className="p-6 text-center">
                        <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg border",
                          meta.signal === "Bullish" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                            meta.signal === "Cautious" ? "bg-destructive/10 text-destructive border-destructive/20" :
                              "bg-muted text-muted-foreground border-border/50"
                        )}>
                          {meta.signal}
                        </Badge>
                      </td>
                      <td className="p-6 text-center">
                        <span className="font-black text-sm text-foreground italic tabular-nums">{meta.confidence}%</span>
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
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}
