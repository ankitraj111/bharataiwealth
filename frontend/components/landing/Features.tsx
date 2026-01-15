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
    Activity
} from "lucide-react"

const features = [
    {
        title: "Price Predictions",
        description: "AI-powered forecasting for stocks, crypto, and more.",
        icon: TrendingUp,
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40"
    },
    {
        title: "Risk Score per User",
        description: "Personalized risk assessment based on your portfolio.",
        icon: ShieldAlert,
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40"
    },
    {
        title: "Stop-Loss Alerts",
        description: "Smart advisory alerts to protect your investments.",
        icon: Bell,
        gradient: "from-red-500 to-orange-500",
        bgGradient: "from-red-100 to-orange-100 dark:from-red-900/40 dark:to-orange-900/40"
    },
    {
        title: "Portfolio Rebalance",
        description: "AI suggestions to optimize your asset allocation.",
        icon: RefreshCw,
        gradient: "from-emerald-500 to-teal-500",
        bgGradient: "from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40"
    },
    {
        title: "Mutual Fund Ranking",
        description: "Compare and rank MFs by performance and risk.",
        icon: BarChart3,
        gradient: "from-amber-500 to-yellow-500",
        bgGradient: "from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40"
    },
    {
        title: "Sentiment Engine",
        description: "News and social sentiment analysis for smarter decisions.",
        icon: Brain,
        gradient: "from-indigo-500 to-violet-500",
        bgGradient: "from-indigo-100 to-violet-100 dark:from-indigo-900/40 dark:to-violet-900/40"
    },
    {
        title: "Broker Integration",
        description: "Works with Zerodha & Groww accounts (read-only).",
        icon: Link2,
        gradient: "from-slate-500 to-slate-700",
        bgGradient: "from-slate-100 to-slate-200 dark:from-slate-800/40 dark:to-slate-700/40"
    },
    {
        title: "Tax Optimization",
        description: "Save more with AI-driven tax harvesting and ELSS advice.",
        icon: Calculator,
        gradient: "from-teal-500 to-emerald-500",
        bgGradient: "from-teal-100 to-emerald-100 dark:from-teal-900/40 dark:to-emerald-900/40"
    },
    {
        title: "Goal Planner",
        description: "AI-powered planning for retirement, education, and more.",
        icon: Target,
        gradient: "from-orange-500 to-red-600",
        bgGradient: "from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40"
    },
    {
        title: "SIP Intelligence",
        description: "AI analyzes your SIPs to find higher growth alternatives.",
        icon: TrendingUp,
        gradient: "from-blue-600 to-blue-400",
        bgGradient: "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20"
    },
    {
        title: "Family Portfolio",
        description: "Manage wealth for your entire family in one private vault.",
        icon: Users,
        gradient: "from-purple-600 to-indigo-600",
        bgGradient: "from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30"
    },
    {
        title: "Market Sentiment",
        description: "Real-time fear and greed index for the Indian market.",
        icon: Activity,
        gradient: "from-rose-500 to-pink-500",
        bgGradient: "from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30"
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
}

export function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden bg-white">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200 mb-6 uppercase tracking-[0.2em]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Powerful Features
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
                        Everything You Need,
                        <br />
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                            All in One Place
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        Advanced AI tools designed specifically for Indian investors.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="group relative"
                        >
                            <div className="h-full p-6 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-2xl hover:border-blue-100">
                                {/* Icon */}
                                <motion.div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.bgGradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                                    whileHover={{ rotate: 5 }}
                                >
                                    <feature.icon
                                        className="w-7 h-7"
                                        style={{
                                            background: feature.gradient.includes('blue') ? 'linear-gradient(135deg, #3b82f6, #06b6d4)' :
                                                feature.gradient.includes('purple') ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' :
                                                    feature.gradient.includes('red') ? 'linear-gradient(135deg, #ef4444, #f97316)' :
                                                        feature.gradient.includes('emerald') ? 'linear-gradient(135deg, #10b981, #14b8a6)' :
                                                            feature.gradient.includes('amber') ? 'linear-gradient(135deg, #f59e0b, #eab308)' :
                                                                feature.gradient.includes('indigo') ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' :
                                                                    feature.gradient.includes('teal') ? 'linear-gradient(135deg, #14b8a6, #0d9488)' :
                                                                        feature.gradient.includes('rose') ? 'linear-gradient(135deg, #fb7185, #e11d48)' :
                                                                            'linear-gradient(135deg, #64748b, #475569)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                    />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-lg font-black text-slate-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover Gradient Stripe */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
