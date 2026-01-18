"use client"

import { motion } from "framer-motion"
import { Brain, TrendingUp, Shield, Zap, BarChart3, Target } from "lucide-react"

export function AICapabilities() {
    const capabilities = [
        {
            title: "Smart Predictions",
            description: "98%+ accurate AI predictions for stocks, crypto, and mutual funds using advanced ML models",
            icon: Brain,
            color: "from-blue-500 to-cyan-500"
        },
        {
            title: "Portfolio Optimization",
            description: "Automatic rebalancing suggestions based on your risk profile and market conditions",
            icon: BarChart3,
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "Risk Management",
            description: "Real-time risk scoring and stop-loss alerts to protect your investments",
            icon: Shield,
            color: "from-red-500 to-orange-500"
        },
        {
            title: "Tax Planning",
            description: "Smart tax optimization strategies to maximize your returns",
            icon: Target,
            color: "from-emerald-500 to-teal-500"
        },
        {
            title: "Market Insights",
            description: "AI-powered market analysis and sentiment tracking in real-time",
            icon: TrendingUp,
            color: "from-yellow-500 to-orange-500"
        },
        {
            title: "Instant Alerts",
            description: "Get notified instantly about market movements and opportunities",
            icon: Zap,
            color: "from-pink-500 to-rose-500"
        }
    ]

    return (
        <section className="relative py-20 px-4 md:px-8 lg:px-20 bg-gradient-to-b from-background to-slate-50 dark:to-slate-900/50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4">
                        AI-Powered Wealth Management
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Advanced machine learning algorithms work 24/7 to optimize your portfolio and maximize returns
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {capabilities.map((capability, i) => (
                        <motion.div
                            key={i}
                            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.color} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                                <capability.icon className="w-full h-full text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                {capability.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                {capability.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
