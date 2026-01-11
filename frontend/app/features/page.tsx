"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
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
    Globe,
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
                description: " proprietary ranking engine for Direct Mutual Funds based on rolling returns and alpha generation.",
                icon: BarChart3,
                gradient: "from-amber-500 to-yellow-500"
            },
            {
                title: "Goal-Based Assets",
                description: "Tailored investment plans for specific milestones like Retirement, House Purchase, or Education.",
                icon: Target,
                gradient: "from-orange-500 to-red-600"
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
                title: "Secure Broker Sync",
                description: "Seamless read-only integration with Zerodha, Groww, and Upstox via encrypted API bridges.",
                icon: Link2,
                gradient: "from-slate-500 to-slate-800"
            }
        ]
    }
]

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-slate-950 selection:bg-primary selection:text-white">
            <Navbar />

            <div className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    {/* Hero Section */}
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span>Explore Unlimited Possibilities</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
                        >
                            Intelligent Features for the <br />
                            <span className="bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent">
                                Modern Indian Investor
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl text-slate-400 leading-relaxed"
                        >
                            From AI-powered price forecasting to automated tax optimization, <br className="hidden md:block" />
                            Bharat AI Wealth provides the most advanced toolkit in Indian fintech.
                        </motion.p>
                    </div>

                    {/* Features Grid */}
                    <div className="space-y-32">
                        {featureGroups.map((group, groupIndex) => (group && group.features && (
                            <div key={groupIndex} className="relative">
                                {/* Group Header */}
                                <div className="flex items-center gap-4 mb-12">
                                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${group.color}`}>
                                        <group.icon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight italic uppercase opacity-80">{group.category}</h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                                </div>

                                {/* Features Row */}
                                <div className="grid md:grid-cols-3 gap-8">
                                    {group.features.map((feature, featureIndex) => (
                                        <motion.div
                                            key={featureIndex}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                                            whileHover={{ y: -8 }}
                                            className="group relative h-full"
                                        >
                                            <div className="h-full p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.06] transition-all duration-500">
                                                {/* Icon */}
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-xl shadow-black/40`}>
                                                    <feature.icon className="w-7 h-7 text-white" />
                                                </div>

                                                {/* Content */}
                                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-slate-400 leading-relaxed text-lg">
                                                    {feature.description}
                                                </p>

                                                {/* Background Decoration */}
                                                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )))}
                    </div>

                    {/* Detailed Bento Grid Section */}
                    <div className="mt-40 grid md:grid-cols-3 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-2 p-10 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-900 border border-white/10 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="relative z-10">
                                <h3 className="text-4xl font-black text-white mb-4">Sentiment Engine 2.0</h3>
                                <p className="text-white/80 text-xl max-w-lg mb-8">
                                    Our AI scans thousands of news sources and social media threads to give you a real-time "Confidence Score" for your favorite stocks.
                                </p>
                                <div className="flex gap-4">
                                    <div className="px-5 py-3 rounded-full bg-white/20 backdrop-blur font-bold text-white">🔥 Bullish Sentiment</div>
                                    <div className="px-5 py-3 rounded-full bg-white/20 backdrop-blur font-bold text-white">92% Precision</div>
                                </div>
                            </div>
                            <Activity className="absolute bottom-[-20%] right-[-10%] w-96 h-96 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-10 rounded-[3rem] bg-gradient-to-br from-orange-500 to-red-700 border border-white/10 shadow-2xl flex flex-col justify-between"
                        >
                            <div>
                                <Zap className="w-12 h-12 text-white mb-6" />
                                <h3 className="text-3xl font-bold text-white mb-4">Real-Time Sync</h3>
                                <p className="text-white/80">Connect Zerodha & Groww to see all assets in one place with zero latency.</p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <div className="text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Active Bridges</div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 rounded bg-white/10" />
                                    <div className="w-8 h-8 rounded bg-white/10" />
                                    <div className="w-8 h-8 rounded bg-white/10" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mt-40 p-12 md:p-20 rounded-[4rem] bg-white text-slate-950 text-center relative overflow-hidden"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">
                            Ready to supercharge <br /> your wealth?
                        </h2>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-orange-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl shadow-orange-500/40 relative z-10"
                        >
                            Explore Now
                        </motion.button>
                        <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] text-slate-100/50 -z-0 animate-spin-slow" />
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
