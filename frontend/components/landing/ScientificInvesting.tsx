"use client"

import { motion } from "framer-motion"
import { BarChart3, ShieldCheck, Zap, Target, PieChart, TrendingUp } from "lucide-react"

export function ScientificInvesting() {
    const features = [
        {
            title: "Quantitative Modeling",
            desc: "Institutional-grade algorithms analyzing 10+ years of Indian market cycles to identify high-probability alpha.",
            icon: BarChart3,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Risk-First Architecture",
            desc: "Dynamic drawdown protection and volatility clusters to safeguard your capital during market stress.",
            icon: ShieldCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Automated Rebalancing",
            desc: "Smart suggestions to realign your portfolio when asset weights drift, ensuring consistent performance.",
            icon: Target,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "Behavioral Analytics",
            desc: "AI insights that help you stay disciplined, preventing emotional decisions during market turbulence.",
            icon: TrendingUp,
            color: "text-orange-600",
            bg: "bg-orange-50"
        }
    ]

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left Side: Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200 mb-6 uppercase tracking-[0.2em]">
                                The Science of Wealth
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                                Investing is an Art.<br />
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent italic">Wealth Creation</span> is a Science.
                            </h2>
                            <p className="text-lg text-slate-600 mt-6 max-w-xl leading-relaxed font-medium">
                                Bharat AI Wealth leverages proprietary machine learning kernels to remove human bias from the investment process, delivering a systematic approach to long-term compounding.
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 className="font-black text-slate-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
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
                            className="relative"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-purple-500/10 blur-3xl opacity-50" />

                            <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Performance Alpha</p>
                                        <h3 className="text-3xl font-black text-slate-900 mt-1">+24.80%</h3>
                                    </div>
                                    <div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold flex items-center gap-1">
                                        <TrendingUp size={12} />
                                        Beat Index
                                    </div>
                                </div>

                                {/* Abstract Visualization Bars */}
                                <div className="flex items-end gap-3 h-48 mb-10">
                                    {[40, 65, 45, 90, 55, 75, 60, 85, 50, 70].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + (i * 0.05), duration: 1, ease: "easeOut" }}
                                            className={`flex-1 rounded-full ${i % 2 === 0 ? 'bg-primary' : i % 3 === 0 ? 'bg-orange-400' : 'bg-indigo-400 opacity-60'}`}
                                        />
                                    ))}
                                </div>

                                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-50">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">Diversification</p>
                                        <p className="text-lg font-black text-slate-900">Optimal</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">Risk Level</p>
                                        <p className="text-lg font-black text-slate-900">Balanced</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">AI Confidence</p>
                                        <p className="text-lg font-black text-slate-900 text-primary">94.2%</p>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    className="absolute -top-6 -right-6 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl hidden md:block"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <PieChart className="text-primary mb-2" size={32} />
                                    <p className="text-xs font-bold text-slate-400">Strategy</p>
                                    <p className="text-sm font-black">Multi-Factor</p>
                                </motion.div>
                            </div>

                            {/* Institutional Partner Logos (Dummy) */}
                            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-full text-center mb-2">Powered by Data From</span>
                                {["NSE", "BSE", "Bloomberg", "Reuters", "Chainlink"].map((partner) => (
                                    <span key={partner} className="text-lg font-black tracking-tighter text-slate-800">{partner}</span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
