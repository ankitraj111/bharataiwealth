"use client"

import { motion } from "framer-motion"
import { BarChart3, ShieldCheck, Zap, Target, PieChart, TrendingUp, Brain, LineChart, Award, Sparkles } from "lucide-react"

export function ScientificInvesting() {
    const features = [
        {
            title: "Quantitative Modeling",
            desc: "Institutional-grade algorithms analyzing 10+ years of Indian market cycles to identify high-probability alpha.",
            icon: BarChart3,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-950/30",
            borderColor: "border-blue-200 dark:border-blue-800"
        },
        {
            title: "Risk-First Architecture",
            desc: "Dynamic drawdown protection and volatility clusters to safeguard your capital during market stress.",
            icon: ShieldCheck,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-950/30",
            borderColor: "border-emerald-200 dark:border-emerald-800"
        },
        {
            title: "Automated Rebalancing",
            desc: "Smart suggestions to realign your portfolio when asset weights drift, ensuring consistent performance.",
            icon: Target,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-950/30",
            borderColor: "border-purple-200 dark:border-purple-800"
        },
        {
            title: "Behavioral Analytics",
            desc: "AI insights that help you stay disciplined, preventing emotional decisions during market turbulence.",
            icon: Brain,
            color: "text-orange-600 dark:text-orange-400",
            bg: "bg-orange-50 dark:bg-orange-950/30",
            borderColor: "border-orange-200 dark:border-orange-800"
        }
    ]

    const stats = [
        { label: "Backtested Years", value: "10+", icon: LineChart },
        { label: "Success Rate", value: "94.2%", icon: Award },
        { label: "Avg. Returns", value: "+24.8%", icon: TrendingUp }
    ]

    return (
        <section className="py-32 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div 
                className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
                className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />

            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 4) * 20}%`
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3
                    }}
                />
            ))}

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left Side: Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.span 
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-8 uppercase tracking-[0.2em] shadow-sm"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Sparkles className="w-4 h-4" />
                                The Science of Wealth
                            </motion.span>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-6">
                                Investing is an Art.
                                <br />
                                <span className="relative inline-block mt-2">
                                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent italic">
                                        Wealth Creation
                                    </span>
                                    <motion.div
                                        className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 blur-sm"
                                        animate={{ scaleX: [0.8, 1, 0.8] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                </span>
                                {" "}is a Science.
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                                Bharat AI Wealth leverages <span className="font-semibold text-slate-900 dark:text-white">proprietary machine learning kernels</span> to remove human bias from the investment process, delivering a systematic approach to long-term compounding.
                            </p>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div 
                            className="flex flex-wrap gap-6 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg"
                                    whileHover={{ y: -3, scale: 1.02 }}
                                >
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950/30 dark:to-purple-950/30">
                                        <stat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{stat.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-5">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, type: "spring" }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className={`p-6 rounded-2xl border ${feature.borderColor} ${feature.bg} hover:shadow-2xl transition-all group cursor-pointer`}
                                >
                                    <motion.div 
                                        className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4 shadow-lg border ${feature.borderColor}`}
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                        transition={{ type: "spring" }}
                                    >
                                        <feature.icon size={28} strokeWidth={2.5} />
                                    </motion.div>
                                    <h3 className="font-black text-lg text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Visual Data Card */}
                    <div className="lg:w-1/2 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -inset-6 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-60" />

                            <div className="relative bg-white dark:bg-slate-800 rounded-[3rem] p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border-2 border-slate-100 dark:border-slate-700">
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Performance Alpha</p>
                                        <motion.h3 
                                            className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent"
                                            initial={{ scale: 0.8 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ type: "spring", delay: 0.3 }}
                                        >
                                            +24.80%
                                        </motion.h3>
                                    </div>
                                    <motion.div 
                                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl text-sm font-bold flex items-center gap-2 shadow-lg"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <TrendingUp size={16} />
                                        Beat Index
                                    </motion.div>
                                </div>

                                {/* Abstract Visualization Bars */}
                                <div className="flex items-end gap-2.5 h-56 mb-12 px-4">
                                    {[40, 65, 45, 90, 55, 75, 60, 85, 50, 70].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0, opacity: 0 }}
                                            whileInView={{ height: `${h}%`, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + (i * 0.08), duration: 0.8, ease: "easeOut" }}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className={`flex-1 rounded-t-xl shadow-lg ${
                                                i % 2 === 0 
                                                    ? 'bg-gradient-to-t from-blue-600 to-blue-400' 
                                                    : i % 3 === 0 
                                                    ? 'bg-gradient-to-t from-orange-500 to-orange-400' 
                                                    : 'bg-gradient-to-t from-purple-600 to-purple-400'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-8 pt-10 border-t-2 border-slate-100 dark:border-slate-700">
                                    <motion.div
                                        whileHover={{ y: -3 }}
                                        className="text-center"
                                    >
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Diversification</p>
                                        <p className="text-xl font-black text-blue-600 dark:text-blue-400">Optimal</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ y: -3 }}
                                        className="text-center"
                                    >
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Risk Level</p>
                                        <p className="text-xl font-black text-purple-600 dark:text-purple-400">Balanced</p>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ y: -3 }}
                                        className="text-center"
                                    >
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">AI Confidence</p>
                                        <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">94.2%</p>
                                    </motion.div>
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    className="absolute -top-8 -right-8 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-600 text-white p-7 rounded-3xl shadow-2xl hidden md:block border-2 border-slate-700 dark:border-slate-500"
                                    animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <PieChart className="text-blue-400 mb-3" size={40} strokeWidth={2.5} />
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strategy</p>
                                    <p className="text-lg font-black">Multi-Factor</p>
                                </motion.div>
                            </div>

                            {/* Data Source Partners */}
                            <motion.div 
                                className="mt-16 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 text-center mb-6">Powered by Data From</p>
                                <div className="flex flex-wrap items-center justify-center gap-8">
                                    {["NSE", "BSE", "Bloomberg", "Reuters", "Chainlink"].map((partner, i) => (
                                        <motion.span 
                                            key={partner} 
                                            className="text-xl font-black tracking-tight text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl bg-white dark:bg-slate-700 shadow-sm"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.6 + i * 0.1 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                        >
                                            {partner}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
