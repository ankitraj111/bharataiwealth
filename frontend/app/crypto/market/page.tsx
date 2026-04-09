"use client"

import { useState, useMemo, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    TrendingUp, TrendingDown, Zap, Activity, Globe, Brain,
    Flame, RefreshCw, Wifi, PieChart, Layers, Sparkles,
    ChevronUp, ChevronDown, BarChart3, ArrowUpRight, Cpu,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useCryptoListings, useCryptoGlobal, CoinListing } from "@/lib/useCryptoData"
import { staggerContainer, scrollReveal } from "@/lib/animation-variants"
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart as RePieChart, Pie, Cell,
} from "recharts"

// ─── Formatters ────────────────────────────────────────────────────────────────
function fmt(n: number, d = 2) {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(d)}T`
    if (n >= 1e9) return `$${(n / 1e9).toFixed(d)}B`
    if (n >= 1e6) return `$${(n / 1e6).toFixed(d)}M`
    return `$${n.toLocaleString()}`
}
function fmtINR(usd: number) {
    const inr = usd * 83.5
    if (inr >= 1e7) return `₹${(inr / 1e7).toFixed(2)}Cr`
    if (inr >= 1e5) return `₹${(inr / 1e5).toFixed(2)}L`
    return `₹${inr.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
}
function fmtPct(n: number) {
    return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`
}

// ─── Animated Sparkline ────────────────────────────────────────────────────────
function Sparkline({ positive, height = 32 }: { positive?: boolean; height?: number }) {
    const data = useMemo(() => {
        const pts = Array.from({ length: 12 }, (_, i) => ({
            v: 50 + (positive ? 1 : -1) * i * 2.5 + (Math.random() - 0.5) * 10,
        }))
        // ensure visible trend
        return pts
    }, [])
    const c = positive ? "#10b981" : "#ef4444"
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                <defs>
                    <linearGradient id={`sp-${positive}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={c} stopOpacity={0.35} />
                        <stop offset="95%" stopColor={c} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={c} strokeWidth={1.5}
                    fill={`url(#sp-${positive})`} dot={false} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

// ─── Fear & Greed Arc Gauge ────────────────────────────────────────────────────
function FearGreedGauge({ value, label }: { value: number; label: string }) {
    const pct = Math.min(Math.max(value, 0), 100)
    const col = pct < 25 ? "#ef4444" : pct < 45 ? "#f97316" : pct < 55 ? "#eab308" : pct < 75 ? "#22c55e" : "#10b981"
    // Arc length of a semicircle with r=42 → π*r ≈ 131.9
    const arcLen = 131.9
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative w-32 h-20">
                <svg viewBox="0 0 100 56" className="w-full">
                    <path d="M8 50 A42 42 0 0 1 92 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" strokeLinecap="round" />
                    <path d="M8 50 A42 42 0 0 1 92 50" fill="none" stroke={col} strokeWidth="10" strokeLinecap="round"
                        strokeDasharray={`${(pct / 100) * arcLen} ${arcLen}`}
                        className="transition-all duration-1200" />
                    {/* Needle */}
                    <circle cx={8 + (pct / 100) * 84} cy={50 - Math.sin((pct / 100) * Math.PI) * 42} r="4" fill={col} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-0.5">
                    <span className="text-3xl font-black tabular-nums leading-none" style={{ color: col }}>{value}</span>
                </div>
            </div>
            <div className="text-center">
                <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: col }}>{label}</p>
                <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">Fear & Greed Index</p>
            </div>
        </div>
    )
}

// ─── Heatmap Cell ─────────────────────────────────────────────────────────────
function HeatmapCell({ coin }: { coin: CoinListing }) {
    const pos = coin.change_24h >= 0
    const intensity = Math.min(Math.abs(coin.change_24h) / 10, 1)
    const bg = pos
        ? `rgba(16,185,129,${0.08 + intensity * 0.35})`
        : `rgba(239,68,68,${0.08 + intensity * 0.35})`
    const border = pos ? `rgba(16,185,129,${0.2 + intensity * 0.4})` : `rgba(239,68,68,${0.2 + intensity * 0.4})`
    return (
        <motion.div
            whileHover={{ scale: 1.06, zIndex: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative flex flex-col items-center justify-center rounded-2xl p-3 cursor-pointer text-center overflow-hidden"
            style={{ background: bg, border: `1px solid ${border}` }}
        >
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at 50% 0%, ${pos ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)"}, transparent 70%)` }} />
            <p className="text-[10px] font-black text-foreground uppercase tracking-widest leading-tight">{coin.symbol}</p>
            <p className={`text-[11px] font-black mt-1 ${pos ? "text-emerald-400" : "text-rose-400"}`}>
                {pos ? "+" : ""}{coin.change_24h.toFixed(1)}%
            </p>
            <p className="text-[8px] text-muted-foreground font-medium mt-0.5 tabular-nums leading-tight">
                {fmt(coin.market_cap)}
            </p>
        </motion.div>
    )
}

// ─── Live Ticker Strip ─────────────────────────────────────────────────────────
function TickerStrip({ coins }: { coins: CoinListing[] }) {
    if (!coins.length) return null
    const items = [...coins, ...coins]
    return (
        <div className="relative overflow-hidden bg-card/30 border-y border-border/30 backdrop-blur-md py-2.5">
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="flex gap-0 whitespace-nowrap"
            >
                {items.map((c, i) => {
                    const pos = c.change_24h >= 0
                    return (
                        <span key={i} className="inline-flex items-center gap-1.5 px-5 border-r border-border/20 text-[10px] font-black uppercase tracking-widest">
                            <span className="text-muted-foreground">{c.symbol}</span>
                            <span className="text-foreground tabular-nums">{fmtINR(c.price)}</span>
                            <span className={pos ? "text-emerald-400" : "text-rose-400"}>
                                {pos ? "▲" : "▼"} {Math.abs(c.change_24h).toFixed(2)}%
                            </span>
                        </span>
                    )
                })}
            </motion.div>
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MarketOverviewPage() {
    const { coins, loading: cLoading, refresh } = useCryptoListings(20)
    const { market, fearGreed, loading: gLoading } = useCryptoGlobal()
    const [sortKey, setSortKey] = useState<keyof CoinListing>("rank")
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
    const [tab, setTab] = useState<"all" | "gainers" | "losers">("all")

    const loading = cLoading || gLoading
    const fearValue = fearGreed?.value ?? 0
    const fearLabel = fearGreed?.value_classification ?? "—"

    const sorted = useMemo(() => {
        let list = [...coins]
        if (tab === "gainers") return list.filter(c => c.change_24h > 0).sort((a, b) => b.change_24h - a.change_24h)
        if (tab === "losers") return list.filter(c => c.change_24h < 0).sort((a, b) => a.change_24h - b.change_24h)
        return list.sort((a, b) => {
            const av = Number(a[sortKey] ?? 0), bv = Number(b[sortKey] ?? 0)
            return sortDir === "asc" ? av - bv : bv - av
        })
    }, [coins, sortKey, sortDir, tab])

    const handleSort = (key: keyof CoinListing) => {
        if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc")
        else { setSortKey(key); setSortDir("asc") }
    }

    const SortIcon = ({ k }: { k: keyof CoinListing }) =>
        sortKey === k
            ? sortDir === "asc" ? <ChevronUp className="h-3 w-3 inline ml-0.5" /> : <ChevronDown className="h-3 w-3 inline ml-0.5" />
            : <span className="inline-block w-3" />

    const aiInsight = market
        ? `Crypto market ${market.market_cap_change_24h >= 0 ? "showing bullish structure" : "under bearish pressure"} with a global market cap of ${fmt(market.total_market_cap)}. BTC dominance at ${market.btc_dominance.toFixed(1)}% — ${market.btc_dominance > 50 ? "suggesting capital consolidation in Bitcoin and reduced altcoin momentum" : "below 50%, a signals potential rotation into altcoins"}. Fear & Greed at ${fearValue} (${fearLabel}). Total active assets tracked: ${market.active_cryptocurrencies?.toLocaleString()}.`
        : "Loading live market intelligence from CoinMarketCap…"

    const globalStats = [
        {
            label: "Total Market Cap", icon: Globe,
            val: market ? fmt(market.total_market_cap) : "—",
            badge: market ? fmtPct(market.market_cap_change_24h) : "—",
            positive: market ? market.market_cap_change_24h >= 0 : undefined,
            gradient: "from-indigo-500/20 via-transparent to-transparent",
            glow: "shadow-indigo-500/10",
            iconColor: "text-indigo-400", iconBg: "bg-indigo-500/10 border-indigo-500/20",
        },
        {
            label: "24h Volume", icon: Zap,
            val: market ? fmt(market.total_volume_24h) : "—",
            badge: "Global Traded",
            gradient: "from-amber-500/20 via-transparent to-transparent",
            glow: "shadow-amber-500/10",
            iconColor: "text-amber-400", iconBg: "bg-amber-500/10 border-amber-500/20",
        },
        {
            label: "BTC Dominance", icon: PieChart,
            val: market ? `${market.btc_dominance.toFixed(1)}%` : "—",
            badge: "Bitcoin Share",
            gradient: "from-orange-500/20 via-transparent to-transparent",
            glow: "shadow-orange-500/10",
            iconColor: "text-orange-400", iconBg: "bg-orange-500/10 border-orange-500/20",
        },
        {
            label: "ETH Dominance", icon: Layers,
            val: market ? `${market.eth_dominance?.toFixed(1) ?? "—"}%` : "—",
            badge: "Ethereum Share",
            gradient: "from-violet-500/20 via-transparent to-transparent",
            glow: "shadow-violet-500/10",
            iconColor: "text-violet-400", iconBg: "bg-violet-500/10 border-violet-500/20",
        },
        {
            label: "Active Assets", icon: Activity,
            val: market ? market.active_cryptocurrencies?.toLocaleString() ?? "—" : "—",
            badge: "Live Tracked",
            gradient: "from-cyan-500/20 via-transparent to-transparent",
            glow: "shadow-cyan-500/10",
            iconColor: "text-cyan-400", iconBg: "bg-cyan-500/10 border-cyan-500/20",
        },
        {
            label: "Fear & Greed", icon: Brain,
            val: fearGreed ? `${fearValue}` : "—",
            badge: fearLabel,
            positive: fearValue >= 50,
            gradient: fearValue >= 50 ? "from-emerald-500/20 via-transparent to-transparent" : "from-rose-500/20 via-transparent to-transparent",
            glow: fearValue >= 50 ? "shadow-emerald-500/10" : "shadow-rose-500/10",
            iconColor: fearValue >= 50 ? "text-emerald-400" : "text-rose-400",
            iconBg: fearValue >= 50 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20",
        },
    ]

    const SECTORS = [
        { name: "Layer 1", pct: 52, color: "#6366f1" },
        { name: "DeFi", pct: 18, color: "#8b5cf6" },
        { name: "Layer 2", pct: 12, color: "#06b6d4" },
        { name: "Gaming / NFT", pct: 8, color: "#10b981" },
        { name: "Stablecoins", pct: 6, color: "#f59e0b" },
        { name: "Other", pct: 4, color: "#ec4899" },
    ]

    return (
        <AppShell>
            {/* ── Live Ticker ── */}
            {!cLoading && coins.length > 0 && <TickerStrip coins={coins} />}

            <motion.div
                initial="hidden" animate="visible" variants={staggerContainer}
                className="flex flex-col gap-10 p-6 lg:p-10 max-w-[1700px] mx-auto min-h-screen"
            >
                {/* ── Hero Header ── */}
                <motion.div variants={scrollReveal} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet-500/5 to-transparent rounded-[2.5rem] blur-2xl -z-10" />
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-8 rounded-[2.5rem] bg-card/20 border border-border/30 backdrop-blur-2xl">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-400">
                                    {loading ? "Loading…" : "Live · CoinMarketCap"}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground italic leading-none">
                                Market <span className="text-primary">Overview</span>
                            </h1>
                            <p className="text-muted-foreground text-sm font-medium max-w-lg">
                                Global cryptocurrency market intelligence — real-time data, AI-powered insights, and structural alpha signals.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline" size="sm" onClick={refresh}
                                disabled={loading}
                                className="rounded-2xl border-border/50 bg-card/40 text-muted-foreground hover:text-foreground hover:bg-accent transition-all font-bold"
                            >
                                <RefreshCw className={cn("h-3.5 w-3.5 mr-2", loading && "animate-spin")} />
                                Refresh Data
                            </Button>
                            <div className="px-4 py-2 rounded-2xl bg-primary/5 border border-primary/20">
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Real-Time</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Global Stats ── */}
                <motion.div variants={scrollReveal} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                    {globalStats.map((m, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.04, y: -3 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Card className={cn(
                                "relative overflow-hidden border-border/40 bg-card/30 backdrop-blur-2xl h-full",
                                "hover:border-primary/20 transition-all duration-300 rounded-2xl shadow-xl", m.glow
                            )}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-60`} />
                                <CardContent className="p-5 relative z-10">
                                    <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center border mb-4", m.iconBg)}>
                                        <m.icon className={cn("h-4.5 w-4.5", m.iconColor)} />
                                    </div>
                                    <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.15em] mb-1.5">{m.label}</p>
                                    {loading
                                        ? <div className="h-6 w-20 bg-muted/40 rounded-lg animate-pulse mb-2" />
                                        : <h3 className="text-xl font-black text-foreground italic tabular-nums leading-tight">{m.val}</h3>
                                    }
                                    <p className={cn("text-[9px] font-black mt-2 uppercase tracking-widest",
                                        m.positive === true ? "text-emerald-400" : m.positive === false ? "text-rose-400" : m.iconColor
                                    )}>
                                        {m.badge}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Market Heatmap ── */}
                {coins.length > 0 && (
                    <motion.div variants={scrollReveal}>
                        <div className="flex items-center gap-2 mb-5">
                            <BarChart3 className="h-4 w-4 text-primary" />
                            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">
                                Live Market Heatmap
                            </h2>
                            <div className="flex items-center gap-1 ml-auto text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                                <div className="h-3 w-6 rounded bg-rose-500/30 mr-1" /> Loss
                                <div className="h-3 w-6 rounded bg-emerald-500/30 ml-2 mr-1" /> Gain
                            </div>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
                            {coins.slice(0, 20).map((coin, i) => (
                                <HeatmapCell key={i} coin={coin} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── Main Grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Crypto Table ── */}
                    <motion.div variants={scrollReveal} className="lg:col-span-2">
                        <Card className="bg-card/30 border border-border/40 backdrop-blur-2xl shadow-2xl rounded-[2.5rem] overflow-hidden">
                            <CardHeader className="p-6 pb-0 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-black text-foreground italic">
                                        Top Cryptocurrencies
                                    </CardTitle>
                                    <CardDescription className="text-[9px] font-bold uppercase tracking-widest mt-0.5">
                                        {loading ? "Loading…" : `${coins.length} assets · Live data`}
                                    </CardDescription>
                                </div>
                                {/* Tab Strip */}
                                <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/30 border border-border/30">
                                    {(["all", "gainers", "losers"] as const).map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setTab(t)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                                                tab === t
                                                    ? t === "gainers" ? "bg-emerald-500/20 text-emerald-400"
                                                        : t === "losers" ? "bg-rose-500/20 text-rose-400"
                                                            : "bg-primary/20 text-primary"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {t === "all" ? "All" : t === "gainers" ? "📈 Gainers" : "📉 Losers"}
                                        </button>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 mt-4">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-y border-border/30 bg-muted/20 text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                                                <th className="p-4 pl-6 w-10 cursor-pointer hover:text-foreground" onClick={() => handleSort("rank")}>#<SortIcon k="rank" /></th>
                                                <th className="p-4">Asset</th>
                                                <th className="p-4 cursor-pointer hover:text-foreground" onClick={() => handleSort("price")}>Price<SortIcon k="price" /></th>
                                                <th className="p-4 cursor-pointer hover:text-foreground" onClick={() => handleSort("change_24h")}>24h<SortIcon k="change_24h" /></th>
                                                <th className="p-4 hidden sm:table-cell">7d Trend</th>
                                                <th className="p-4 cursor-pointer hover:text-foreground hidden md:table-cell" onClick={() => handleSort("market_cap")}>Mkt Cap<SortIcon k="market_cap" /></th>
                                                <th className="p-4 cursor-pointer hover:text-foreground hidden lg:table-cell text-right" onClick={() => handleSort("volume_24h")}>Volume<SortIcon k="volume_24h" /></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/20">
                                            <AnimatePresence mode="popLayout">
                                                {loading
                                                    ? Array.from({ length: 10 }).map((_, i) => (
                                                        <tr key={i} className="animate-pulse">
                                                            {[6, 9, 6, 4, 4, 4, 4].map((w, j) => (
                                                                <td key={j} className="p-4"><div className={`h-4 w-${w * 4} bg-muted/30 rounded-lg`} /></td>
                                                            ))}
                                                        </tr>
                                                    ))
                                                    : sorted.map((coin, i) => {
                                                        const pos = coin.change_24h >= 0
                                                        return (
                                                            <motion.tr
                                                                key={coin.symbol}
                                                                layout
                                                                initial={{ opacity: 0, y: 4 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -4 }}
                                                                transition={{ delay: i * 0.025 }}
                                                                className="hover:bg-muted/10 transition-all cursor-pointer group"
                                                            >
                                                                <td className="p-4 pl-6 text-[11px] font-black text-muted-foreground">{coin.rank}</td>
                                                                <td className="p-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-border/40 flex items-center justify-center font-black text-[11px] text-foreground group-hover:scale-110 transition-transform shadow-inner">
                                                                            {coin.symbol.slice(0, 2)}
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm font-black text-foreground leading-tight">{coin.name}</p>
                                                                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{coin.symbol}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="p-4">
                                                                    <p className="text-sm font-black text-foreground tabular-nums">{fmtINR(coin.price)}</p>
                                                                    <p className="text-[9px] text-muted-foreground tabular-nums">{fmt(coin.price)}</p>
                                                                </td>
                                                                <td className="p-4">
                                                                    <span className={cn(
                                                                        "inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-black tabular-nums",
                                                                        pos ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                                                                    )}>
                                                                        {pos ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                                                                        {Math.abs(coin.change_24h).toFixed(2)}%
                                                                    </span>
                                                                </td>
                                                                <td className="p-4 hidden sm:table-cell w-24">
                                                                    <Sparkline positive={coin.change_7d !== undefined ? coin.change_7d >= 0 : pos} />
                                                                </td>
                                                                <td className="p-4 hidden md:table-cell text-sm font-black text-foreground tabular-nums">{fmt(coin.market_cap)}</td>
                                                                <td className="p-4 hidden lg:table-cell text-right text-sm font-medium text-muted-foreground tabular-nums">{fmt(coin.volume_24h)}</td>
                                                            </motion.tr>
                                                        )
                                                    })
                                                }
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* ── Right Panel ── */}
                    <div className="flex flex-col gap-6">

                        {/* Fear & Greed */}
                        <motion.div variants={scrollReveal}>
                            <Card className="bg-card/30 border border-border/40 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5" />
                                <CardContent className="p-8 relative z-10">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6 italic flex items-center gap-2">
                                        <Brain className="h-3.5 w-3.5 text-primary" /> Market Sentiment
                                    </p>
                                    {loading
                                        ? <div className="flex justify-center"><div className="h-28 w-28 rounded-full bg-muted/30 animate-pulse mx-auto" /></div>
                                        : <FearGreedGauge value={fearValue} label={fearLabel} />
                                    }
                                    <div className="mt-6 flex gap-2">
                                        {[
                                            { l: "Fear", range: "0–45", ok: fearValue < 45 },
                                            { l: "Neutral", range: "45–55", ok: fearValue >= 45 && fearValue < 55 },
                                            { l: "Greed", range: "55–100", ok: fearValue >= 55 },
                                        ].map((s, i) => (
                                            <div key={i} className={cn(
                                                "flex-1 p-2 rounded-xl text-center border transition-all",
                                                s.ok ? "bg-primary/10 border-primary/30" : "bg-muted/20 border-border/30"
                                            )}>
                                                <p className={cn("text-[8px] font-black uppercase tracking-widest", s.ok ? "text-primary" : "text-muted-foreground")}>{s.l}</p>
                                                <p className="text-[8px] text-muted-foreground mt-0.5">{s.range}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* BTC/ETH Dominance Donut */}
                        <motion.div variants={scrollReveal}>
                            <Card className="bg-card/30 border border-border/40 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-violet-500/5" />
                                <CardContent className="p-8 relative z-10">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6 italic flex items-center gap-2">
                                        <PieChart className="h-3.5 w-3.5 text-primary" /> Dominance Split
                                    </p>
                                    <div className="flex items-center gap-5">
                                        {loading
                                            ? <div className="h-28 w-28 rounded-full bg-muted/30 animate-pulse flex-shrink-0" />
                                            : (
                                                <div className="relative flex-shrink-0">
                                                    <ResponsiveContainer width={110} height={110}>
                                                        <RePieChart>
                                                            <Pie
                                                                data={[
                                                                    { name: "BTC", value: market?.btc_dominance ?? 50 },
                                                                    { name: "ETH", value: market?.eth_dominance ?? 20 },
                                                                    { name: "Other", value: Math.max(0, 100 - (market?.btc_dominance ?? 50) - (market?.eth_dominance ?? 20)) },
                                                                ]}
                                                                cx="50%" cy="50%"
                                                                innerRadius={34} outerRadius={50}
                                                                paddingAngle={3} dataKey="value" strokeWidth={0}
                                                            >
                                                                <Cell fill="#f97316" />
                                                                <Cell fill="#8b5cf6" />
                                                                <Cell fill="#1e1e30" />
                                                            </Pie>
                                                        </RePieChart>
                                                    </ResponsiveContainer>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Cpu className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className="space-y-3 flex-1">
                                            {[
                                                { name: "Bitcoin", val: market ? `${market.btc_dominance.toFixed(1)}%` : "—", c: "#f97316" },
                                                { name: "Ethereum", val: market ? `${market.eth_dominance?.toFixed(1) ?? "—"}%` : "—", c: "#8b5cf6" },
                                                { name: "Others", val: market ? `${(100 - market.btc_dominance - (market.eth_dominance ?? 0)).toFixed(1)}%` : "—", c: "#3f3f6a" },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: item.c }} />
                                                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{item.name}</span>
                                                    </div>
                                                    <span className="text-[11px] font-black tabular-nums" style={{ color: item.c }}>{item.val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Sector Dominance */}
                        <motion.div variants={scrollReveal}>
                            <Card className="bg-card/30 border border-border/40 backdrop-blur-2xl shadow-xl rounded-[2.5rem]">
                                <CardContent className="p-8">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-6 italic flex items-center gap-2">
                                        <Layers className="h-3.5 w-3.5 text-primary" /> Sector Dominance
                                    </p>
                                    <div className="space-y-3.5">
                                        {SECTORS.map((sec, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between mb-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full" style={{ background: sec.color }} />
                                                        <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{sec.name}</span>
                                                    </div>
                                                    <span className="text-[10px] font-black tabular-nums" style={{ color: sec.color }}>{sec.pct}%</span>
                                                </div>
                                                <div className="h-1.5 rounded-full bg-muted/20 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${sec.pct}%` }}
                                                        transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                                                        className="h-full rounded-full"
                                                        style={{ background: `linear-gradient(90deg, ${sec.color}cc, ${sec.color})` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Trending Tags */}
                        <motion.div variants={scrollReveal}>
                            <Card className="bg-card/30 border border-border/40 backdrop-blur-2xl shadow-xl rounded-[2.5rem]">
                                <CardContent className="p-8">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-5 italic flex items-center gap-2">
                                        <Flame className="h-3.5 w-3.5 text-primary" /> Trending Narratives
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {["#Layer2", "#SolanaSummer", "#BTCETFs", "#DeFi", "#Web3Gaming", "#AITokens", "#RWA", "#Restaking"].map((tag, i) => (
                                            <motion.span
                                                key={i} whileHover={{ scale: 1.06 }}
                                                className="px-3 py-1.5 rounded-xl bg-muted/30 border border-border/30 text-[9px] font-black text-muted-foreground uppercase tracking-widest cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>

                {/* ── AI Intelligence Footer ── */}
                <motion.div variants={scrollReveal}>
                    <div className="relative rounded-[2.5rem] overflow-hidden border border-primary/20">
                        {/* Background glow layer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent" />
                        <div className="absolute top-0 right-0 h-48 w-48 bg-primary/15 rounded-full blur-3xl -mr-24 -mt-24" />
                        <div className="absolute bottom-0 left-0 h-32 w-32 bg-violet-500/10 rounded-full blur-3xl -ml-16 -mb-16" />

                        <div className="relative z-10 p-8">
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* AI Insight */}
                                <div className="flex-1 flex items-start gap-5">
                                    <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30 shadow-lg shadow-primary/20 flex-shrink-0">
                                        <Brain className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-primary uppercase tracking-[0.25em] mb-2.5 italic flex items-center gap-2">
                                            <Sparkles className="h-3 w-3" /> AI Market Intelligence · CoinMarketCap
                                        </p>
                                        {loading
                                            ? <div className="space-y-2">
                                                {[1, 0.75, 0.5].map((w, i) => (
                                                    <div key={i} className="h-3 bg-primary/10 rounded animate-pulse" style={{ width: `${w * 100}%` }} />
                                                ))}
                                            </div>
                                            : <p className="text-[11px] text-muted-foreground font-bold leading-relaxed italic">{aiInsight}</p>
                                        }
                                    </div>
                                </div>

                                {/* Market Signal Indicators */}
                                {market && (
                                    <div className="flex md:flex-col gap-3 md:min-w-[200px]">
                                        <p className="hidden md:block text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Signal Dashboard</p>
                                        {[
                                            { label: "Momentum", val: market.market_cap_change_24h >= 0 ? "Bullish" : "Bearish", ok: market.market_cap_change_24h >= 0 },
                                            { label: "BTC Structure", val: market.btc_dominance > 50 ? "Dominant" : "Distributed", ok: true },
                                            { label: "Sentiment", val: fearLabel, ok: fearValue >= 50 },
                                            { label: "Alt Season", val: market.btc_dominance < 45 ? "Active ✓" : "Inactive", ok: market.btc_dominance < 45 },
                                        ].map((s, i) => (
                                            <div key={i} className={cn(
                                                "flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border flex-1 md:flex-none",
                                                s.ok ? "bg-emerald-500/8 border-emerald-500/20" : "bg-muted/20 border-border/30"
                                            )}>
                                                <div>
                                                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</p>
                                                    <p className={cn("text-[10px] font-black mt-0.5", s.ok ? "text-emerald-400" : "text-muted-foreground")}>{s.val}</p>
                                                </div>
                                                <div className={cn("h-2 w-2 rounded-full flex-shrink-0", s.ok ? "bg-emerald-400 shadow-[0_0_6px_#10b981]" : "bg-muted")} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AppShell>
    )
}
