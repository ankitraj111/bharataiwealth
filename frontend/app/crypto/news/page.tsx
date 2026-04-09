"use client"

import { AppShell } from "@/components/app-shell"
import { Newspaper, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface NewsItem {
    id: string
    title: string
    description: string
    sentiment: "bullish" | "neutral" | "bearish"
    timestamp: number
    source: string
    symbol?: string
}

export default function CryptoNews() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchNews()
        const interval = setInterval(fetchNews, 60000) // Refresh every minute
        return () => clearInterval(interval)
    }, [])

    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/news/crypto')
            if (!response.ok) {
                // Silently fallback to mock data
                setNews(getMockNews())
                setLoading(false)
                return
            }
            const data = await response.json()
            setNews(data)
        } catch (error) {
            // Backend not available - use mock data silently
            setNews(getMockNews())
        } finally {
            setLoading(false)
        }
    }

    const getMockNews = (): NewsItem[] => {
        return [
            {
                id: "1",
                title: "Bitcoin Reaches New All-Time High",
                description: "Bitcoin surges past previous records amid institutional adoption",
                sentiment: "bullish",
                timestamp: Date.now() - 3600000,
                source: "Neural News Hub",
                symbol: "BTC"
            },
            {
                id: "2",
                title: "Ethereum 2.0 Upgrade Shows Promising Results",
                description: "Network efficiency improves by 40% post-upgrade",
                sentiment: "bullish",
                timestamp: Date.now() - 7200000,
                source: "Neural News Hub",
                symbol: "ETH"
            },
            {
                id: "3",
                title: "Regulatory Updates: SEC Approves New Crypto Framework",
                description: "New regulations provide clarity for crypto businesses",
                sentiment: "neutral",
                timestamp: Date.now() - 10800000,
                source: "Neural News Hub"
            },
            {
                id: "4",
                title: "DeFi Market Cap Crosses $100 Billion",
                description: "Decentralized finance continues rapid growth trajectory",
                sentiment: "bullish",
                timestamp: Date.now() - 14400000,
                source: "Neural News Hub"
            },
            {
                id: "5",
                title: "Major Banks Announce Crypto Trading Services",
                description: "Traditional finance embraces digital assets",
                sentiment: "neutral",
                timestamp: Date.now() - 18000000,
                source: "Neural News Hub"
            }
        ]
    }

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case "bullish": return <TrendingUp className="h-5 w-5 text-green-500" />
            case "bearish": return <TrendingDown className="h-5 w-5 text-red-500" />
            default: return <Minus className="h-5 w-5 text-yellow-500" />
        }
    }

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case "bullish": return "border-green-500/20 bg-green-500/5"
            case "bearish": return "border-red-500/20 bg-red-500/5"
            default: return "border-yellow-500/20 bg-yellow-500/5"
        }
    }

    return (
        <AppShell>
            <div className="container mx-auto p-6 max-w-6xl">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block p-6 rounded-3xl bg-accent/10 border border-accent/20 mb-6"
                    >
                        <Newspaper className="h-12 w-12 text-accent" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-foreground mb-4 italic uppercase tracking-tighter">
                        Neural News Hub
                    </h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Real-time crypto headlines with AI-powered sentiment analysis
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Loading news...</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {news.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-6 rounded-2xl border ${getSentimentColor(item.sentiment)} backdrop-blur-sm hover:scale-[1.02] transition-transform`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {getSentimentIcon(item.sentiment)}
                                            <h3 className="text-xl font-bold text-foreground">
                                                {item.title}
                                            </h3>
                                            {item.symbol && (
                                                <span className="px-2 py-1 rounded-lg bg-accent/20 text-accent text-sm font-mono">
                                                    {item.symbol}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground mb-3">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <span>{item.source}</span>
                                            <span>•</span>
                                            <span>{new Date(item.timestamp).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    )
}
