"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, TrendingUp, Shield, Brain, BarChart3, Wallet } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative min-h-screen pt-20 pb-16 overflow-hidden">
            {/* Clean White Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/30" />

            {/* Subtle Colored Orbs */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.1),transparent_50%)]" />
            </div>

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[90vh] max-w-[1800px] mx-auto">
                    
                    {/* Left Content */}
                    <motion.div
                        className="space-y-6 lg:pr-12"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 shadow-sm"
                        >
                            <div className="flex -space-x-2">
                                {['bg-blue-500', 'bg-purple-500', 'bg-orange-500'].map((color, i) => (
                                    <div key={i} className={`w-6 h-6 rounded-full ${color} border-2 border-white flex items-center justify-center text-[8px] font-bold text-white`}>
                                        {['R', 'A', 'K'][i]}
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm text-slate-600">
                                <span className="font-bold text-slate-900">10,000+</span> Indians trust us
                            </span>
                            <Sparkles className="w-4 h-4 text-amber-400" />
                        </motion.div>

                        {/* Main Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15]">
                                <span className="text-slate-900">
                                    Aage badho{' '}
                                </span>
                                <span className="relative inline-block">
                                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                                        Bharat
                                    </span>
                                    <motion.span
                                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ delay: 1, duration: 0.6 }}
                                    />
                                </span>
                                <span className="text-slate-900">,</span>
                                <br />
                                <span className="text-blue-600 italic">
                                    AI Wealth{' '}
                                </span>
                                <span className="text-slate-900">
                                    ke saath.
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl"
                        >
                            Your personal AI advisor that learns your goals, predicts markets,
                            and builds portfolios designed for <span className="text-slate-900 font-semibold">long-term wealth creation</span>.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center gap-4 pt-4"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group h-14 px-8 text-base font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 border-0"
                            >
                                <Link href="/dashboard">
                                    <div className="flex items-center">
                                        Start Free
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                className="group h-14 px-6 text-base font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all"
                            >
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3 group-hover:bg-slate-200 transition-colors">
                                    <Play className="w-4 h-4 text-slate-600 fill-slate-600" />
                                </div>
                                Watch Demo
                            </Button>
                        </motion.div>

                        {/* Trust Metrics */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-8 pt-8 border-t border-slate-200"
                        >
                            {[
                                { value: '₹50Cr+', label: 'Assets Tracked' },
                                { value: '99.9%', label: 'Uptime' },
                                { value: '4.9★', label: 'User Rating' }
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Premium Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 60, rotateY: -10 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative perspective-1000"
                    >
                        {/* Floating Glow */}
                        <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 blur-3xl rounded-full" />

                        {/* Main Dashboard Card */}
                        <motion.div
                            className="relative bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-2xl shadow-slate-200/50"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Header Row */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                        <Brain className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-bold">AI Portfolio</p>
                                        <p className="text-slate-500 text-sm">Real-time insights</p>
                                    </div>
                                </div>
                                <motion.div
                                    className="px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <span className="text-emerald-600 text-sm font-bold">● Live</span>
                                </motion.div>
                            </div>

                            <div className="mb-8">
                                <p className="text-slate-500 text-sm mb-1">Total Portfolio Value</p>
                                <div className="flex items-baseline gap-4">
                                    <motion.span
                                        className="text-5xl font-black text-slate-900"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8, type: "spring" }}
                                    >
                                        ₹18,45,230
                                    </motion.span>
                                    <motion.div
                                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100"
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                                        <span className="text-emerald-600 font-bold text-sm">+24.8%</span>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Asset Allocation Cards */}
                            <div className="grid grid-cols-3 gap-4 mb-8">
                                {[
                                    { name: 'Stocks', value: '₹8.2L', change: '+18%', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
                                    { name: 'Mutual Funds', value: '₹6.1L', change: '+12%', icon: Wallet, color: 'from-purple-500 to-purple-600' },
                                    { name: 'Crypto', value: '₹4.1L', change: '+42%', icon: Sparkles, color: 'from-orange-500 to-amber-500' }
                                ].map((asset, i) => (
                                    <motion.div
                                        key={i}
                                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer group"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${asset.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                            <asset.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="text-slate-500 text-xs">{asset.name}</p>
                                        <p className="text-slate-900 font-bold">{asset.value}</p>
                                        <p className="text-emerald-600 text-xs font-bold">{asset.change}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* AI Insight Bar */}
                            <motion.div
                                className="p-4 rounded-2xl bg-blue-50 border border-blue-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-900 text-sm font-semibold">AI Recommendation</p>
                                        <p className="text-slate-500 text-xs">Diversify 15% into mid-cap funds for optimal growth</p>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-blue-100 border border-blue-200">
                                        <span className="text-blue-600 text-xs font-bold">98% Confidence</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Floating Mini Cards */}
                        <motion.div
                            className="absolute -left-4 top-1/4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xl z-20"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-slate-900 text-xs font-bold">NIFTY 50</p>
                                    <p className="text-emerald-600 text-[10px] font-bold">+1.24%</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute -right-4 bottom-1/4 p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 shadow-xl shadow-orange-500/30 z-20"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <p className="text-white text-xs font-black">🔥 HOT TIP</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
