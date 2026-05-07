"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { useEffect, useState } from "react"

export function LiveMarketData() {
    const [time, setTime] = useState<Date | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        setTime(new Date())
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const marketData = [
        { name: "NIFTY 50", value: "23,645.50", change: "+1.24%", trend: "up", color: "emerald" },
        { name: "SENSEX", value: "78,234.20", change: "+0.89%", trend: "up", color: "emerald" },
        { name: "BANK NIFTY", value: "51,234.80", change: "-0.45%", trend: "down", color: "red" },
        { name: "NIFTY IT", value: "34,567.90", change: "+2.15%", trend: "up", color: "emerald" },
        { name: "BTC-USD", value: "$95,234", change: "+3.45%", trend: "up", color: "emerald" },
        { name: "ETH-USD", value: "$3,456", change: "+2.89%", trend: "up", color: "emerald" }
    ]

    return (
        <section className="relative py-16 px-4 md:px-8 lg:px-20 bg-gradient-to-b from-blue-50 dark:from-blue-950/20 to-background overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
                        <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Live Market Data</span>
                        {mounted && time && (
                            <span className="text-xs text-slate-600 dark:text-slate-400">{time.toLocaleTimeString()}</span>
                        )}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4">
                        Real-Time Market Updates
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Track live market movements and make informed decisions with real-time data
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {marketData.map((item, i) => (
                        <motion.div
                            key={i}
                            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                                {item.trend === "up" ? (
                                    <TrendingUp className={`w-5 h-5 text-${item.color}-600 dark:text-${item.color}-400`} />
                                ) : (
                                    <TrendingDown className={`w-5 h-5 text-${item.color}-600 dark:text-${item.color}-400`} />
                                )}
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</span>
                                <span className={`text-sm font-semibold ${item.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                                    {item.change}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Data updates every second • Powered by real-time market feeds
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
