"use client"

import { motion } from "framer-motion"
import {
    TrendingUp,
    ShieldAlert,
    Bell,
    RefreshCw,
    BarChart3,
    Brain,
    Link2,
    Target,
    Calculator,
    Users,
    Activity,
    Zap,
    PieChart,
    Layers,
    Sparkles
} from "lucide-react"

const featureGroups = [
    {
        category: "AI & Predictions",
        icon: Brain,
        color: "text-purple-500",
        features: [
            {
                title: "Advanced Price Prediction",
                description: "LSTM and Transformer models providing real-time forecasts for 500+ Indian stocks and major cryptos.",
                icon: TrendingUp,
                gradient: "from-blue-500 to-cyan-500"
            },
            {
                title: "Sentiment Intelligence",
                description: "Analysis of 10,000+ daily news articles and social signals to gauge market mood for Nifty 50.",
                icon: Activity,
                gradient: "from-indigo-500 to-violet-500"
            },
            {
                title: "AI Risk Assessment",
                description: "Dynamic risk scoring that evolves with market volatility and your individual portfolio behavior.",
                icon: ShieldAlert,
                gradient: "from-purple-500 to-pink-500"
            },
            {
                title: "Stop-Loss Alerts",
                description: "Smart advisory alerts to protect your investments with real-time notifications.",
                icon: Bell,
                gradient: "from-red-500 to-orange-500"
            }
        ]
    },
    {
        category: "Wealth Management",
        icon: PieChart,
        color: "text-emerald-500",
        features: [
            {
                title: "Smart Rebalancing",
                description: "One-click suggestions to bring your portfolio back to its target asset allocation based on AI insights.",
                icon: RefreshCw,
                gradient: "from-emerald-500 to-teal-500"
            },
            {
                title: "MF Intelligence",
                description: "Proprietary ranking engine for Direct Mutual Funds based on rolling returns and alpha generation.",
                icon: BarChart3,
                gradient: "from-amber-500 to-yellow-500"
            },
            {
                title: "Goal-Based Assets",
                description: "Tailored investment plans for specific milestones like Retirement, House Purchase, or Education.",
                icon: Target,
                gradient: "from-orange-500 to-red-600"
            },
            {
                title: "SIP Intelligence",
                description: "AI analyzes your SIPs to find higher growth alternatives and optimize returns.",
                icon: Zap,
                gradient: "from-blue-600 to-blue-400"
            }
        ]
    },
    {
        category: "Tax & Compliance",
        icon: Layers,
        color: "text-blue-500",
        features: [
            {
                title: "Tax Loss Harvesting",
                description: "Identify opportunities to offset capital gains and save up to ₹1.5L in taxes annually.",
                icon: Calculator,
                gradient: "from-teal-500 to-blue-500"
            },
            {
                title: "Unified Family Vault",
                description: "Consolidate and track wealth for up to 5 family members with deep-dive analytics for each.",
                icon: Users,
                gradient: "from-fuchsia-500 to-purple-600"
            },
            {
                title: "Secure Portfolio Sync",
                description: "Seamless portfolio import via CSV or secure API integration with bank-grade encryption.",
                icon: Link2,
                gradient: "from-slate-500 to-slate-800"
            }
        ]
    }
]

export function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span className="uppercase tracking-wider">Intelligent Features</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                        Everything You Need for <br />
                        <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Smart Wealth Management
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                        From AI-powered price forecasting to automated tax optimization, <br className="hidden md:block" />
                        advanced toolkit designed specifically for Indian investors.
                    </p>
                </motion.div>

                {/* Feature Groups */}
                <div className="space-y-24">
                    {featureGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="relative">
                            {/* Group Header */}
                            <div className="flex items-center gap-4 mb-10">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-600 ${group.color}`}>
                                    <group.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    {group.category}
                                </h3>
                                <div className="flex-1 h-px bg-gradient-to-r from-slate-300 dark:from-slate-700 to-transparent" />
                            </div>

                            {/* Features Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {group.features.map((feature, featureIndex) => (
                                    <motion.div
                                        key={featureIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="group relative h-full"
                                    >
                                        <div className="h-full p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500">
                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                                                <feature.icon className="w-7 h-7 text-white" />
                                            </div>

                                            {/* Content */}
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                                                {feature.title}
                                            </h4>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {feature.description}
                                            </p>

                                            {/* Hover Gradient Stripe */}
                                            <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Highlight Cards */}
                <div className="mt-32 grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="md:col-span-2 p-10 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-900 dark:from-blue-700 dark:to-indigo-950 border border-blue-400/20 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Sentiment Engine 2.0</h3>
                            <p className="text-white/90 text-lg max-w-lg mb-8">
                                Our AI scans thousands of news sources and social media threads to give you a real-time "Confidence Score" for your favorite stocks.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="px-5 py-3 rounded-full bg-white/20 backdrop-blur font-bold text-white text-sm">
                                    🔥 Bullish Sentiment
                                </div>
                                <div className="px-5 py-3 rounded-full bg-white/20 backdrop-blur font-bold text-white text-sm">
                                    92% Precision
                                </div>
                            </div>
                        </div>
                        <Activity className="absolute bottom-[-20%] right-[-10%] w-80 h-80 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        className="p-10 rounded-[3rem] bg-gradient-to-br from-orange-500 to-red-700 dark:from-orange-600 dark:to-red-800 border border-orange-400/20 shadow-2xl flex flex-col justify-between"
                    >
                        <div>
                            <Zap className="w-12 h-12 text-white mb-6" />
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Real-Time Sync</h3>
                            <p className="text-white/90">Import your portfolio to see all assets in one place with comprehensive analysis.</p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/20">
                            <div className="text-xs font-medium text-white/70 mb-3 uppercase tracking-widest">Active Bridges</div>
                            <div className="flex gap-2">
                                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur" />
                                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur" />
                                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
