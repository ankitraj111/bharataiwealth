"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const tickers = [
    { name: "NIFTY 50", value: "24,321.45", change: "+1.2%", status: "up" },
    { name: "SENSEX", value: "79,842.10", change: "+0.8%", status: "up" },
    { name: "NIFTY IT", value: "38,540.20", change: "-0.4%", status: "down" },
    { name: "USD/INR", value: "84.12", change: "+0.05%", status: "up" },
    { name: "GOLD (24K)", value: "76,430", change: "0.0%", status: "flat" },
]

export function MarketTicker() {
    return (
        <div className="w-full bg-slate-100/50 dark:bg-slate-900/50 border-y border-border/50 py-2 overflow-hidden relative">
            <motion.div
                className="flex gap-12 whitespace-nowrap min-w-full"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {[...tickers, ...tickers].map((ticker, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase">{ticker.name}</span>
                        <span className="text-sm font-black tabular-nums">{ticker.value}</span>
                        <div className={`flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-full ${ticker.status === "up" ? "bg-emerald-500/10 text-emerald-500" :
                                ticker.status === "down" ? "bg-red-500/10 text-red-500" :
                                    "bg-slate-500/10 text-slate-500"
                            }`}>
                            {ticker.status === "up" ? <TrendingUp className="w-3 h-3" /> :
                                ticker.status === "down" ? <TrendingDown className="w-3 h-3" /> :
                                    <Minus className="w-3 h-3" />}
                            {ticker.change}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
