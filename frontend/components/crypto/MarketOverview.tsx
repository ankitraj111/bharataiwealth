"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Brain, RefreshCw, Wifi } from "lucide-react"
import { scrollReveal } from "@/lib/animation-variants"
import { useCryptoGlobal, useCryptoQuotes } from "@/lib/useCryptoData"

function fmt(n: number, decimals = 2) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(decimals)}T`
  if (n >= 1e9) return `$${(n / 1e9).toFixed(decimals)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(decimals)}M`
  return `$${n.toLocaleString()}`
}

function fmtINR(usd: number) {
  const inr = usd * 83.5
  if (inr >= 1e7) return `₹${(inr / 1e7).toFixed(2)}Cr`
  if (inr >= 1e5) return `₹${(inr / 1e5).toFixed(2)}L`
  return `₹${inr.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
}

export function MarketOverview() {
  const { market, fearGreed, loading: gLoading } = useCryptoGlobal()
  const { quotes, loading: qLoading } = useCryptoQuotes(["BTC", "ETH"])

  const loading = gLoading || qLoading

  const btc = quotes["BTC"]
  const eth = quotes["ETH"]

  const fearLabel = fearGreed?.value_classification ?? "—"
  const fearValue = fearGreed?.value ?? 0

  const marketItems = [
    {
      label: "BTC Dominance",
      value: market ? `${market.btc_dominance}%` : "—",
      sub: "Bitcoin Share",
    },
    {
      label: "BTC Price",
      value: btc ? fmtINR(btc.price) : "—",
      sub: btc ? `${btc.change_24h >= 0 ? "+" : ""}${btc.change_24h}% (24h)` : "BTC/INR",
      positive: btc ? btc.change_24h >= 0 : undefined,
    },
    {
      label: "ETH Price",
      value: eth ? fmtINR(eth.price) : "—",
      sub: eth ? `${eth.change_24h >= 0 ? "+" : ""}${eth.change_24h}% (24h)` : "ETH/INR",
      positive: eth ? eth.change_24h >= 0 : undefined,
    },
    {
      label: "Total Market Cap",
      value: market ? fmt(market.total_market_cap) : "—",
      sub: market ? `${market.market_cap_change_24h >= 0 ? "+" : ""}${market.market_cap_change_24h}% 24h` : "Global",
    },
    {
      label: "24h Volume",
      value: market ? fmt(market.total_volume_24h) : "—",
      sub: "Global Traded",
    },
    {
      label: "Fear & Greed",
      value: fearGreed ? `${fearValue}` : "—",
      sub: fearLabel,
    },
  ]

  const aiInsight = market
    ? `Crypto market showing ${market.market_cap_change_24h >= 0 ? "bullish" : "bearish"} momentum. BTC dominance at ${market.btc_dominance}% — ${market.btc_dominance > 50 ? "capital concentrated in Bitcoin, altcoin season unlikely" : "altcoin rotation potential detected"}. Fear & Greed at ${fearValue} (${fearLabel}). Active cryptocurrencies: ${market.active_cryptocurrencies?.toLocaleString()}. Exercise caution with position sizing.`
    : "Loading live market intelligence from CoinGecko..."

  return (
    <motion.div variants={scrollReveal} className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[10px] font-black flex items-center gap-2 uppercase tracking-[0.3em] italic text-muted-foreground">
          <Globe className="h-4 w-4 text-primary" />
          Live Market Overview
        </h2>
        <div className="flex items-center gap-2">
          {loading && <RefreshCw className="h-3 w-3 text-muted-foreground animate-spin" />}
          {!loading && (
            <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-500">
              <Wifi className="h-3 w-3" />
              Live · CoinGecko
            </span>
          )}
        </div>
      </div>
      <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group">
        <CardContent className="p-10 relative">
          <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 relative z-10">
            {marketItems.map((item, i) => (
              <div key={i} className="text-center group/item">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3 italic group-hover/item:text-primary transition-colors">
                  {item.label}
                </p>
                {loading ? (
                  <div className="h-8 w-20 mx-auto bg-muted/40 rounded-lg animate-pulse mb-1" />
                ) : (
                  <p className={`text-3xl font-black tabular-nums mb-1 italic tracking-tighter group-hover/item:scale-110 transition-transform ${item.positive === true ? "text-emerald-500" :
                      item.positive === false ? "text-rose-500" :
                        "text-foreground"
                    }`}>
                    {item.value}
                  </p>
                )}
                <p className={`text-[10px] font-medium italic opacity-60 ${item.positive === true ? "text-emerald-400" :
                    item.positive === false ? "text-rose-400" :
                      "text-muted-foreground"
                  }`}>{item.sub}</p>
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
                  AI Market Intelligence · Powered by CoinGecko
                </p>
                <p className="text-[11px] text-muted-foreground font-bold leading-relaxed italic">
                  {aiInsight}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
