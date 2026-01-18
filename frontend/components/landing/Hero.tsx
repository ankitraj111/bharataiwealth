"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, TrendingUp, Shield, Brain, BarChart3, Wallet } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
    return (
        <section className="relative min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden bg-background">
            {/* Background - Light/Dark Mode Aware */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

            {/* Subtle Colored Orbs */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_50%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.1),transparent_50%)]" />
            </div>

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center min-h-[85vh] sm:min-h-[90vh] max-w-[1800px] mx-auto">
                    
                    {/* Left Content */}
                    <motion.div
                        className="space-y-4 sm:space-y-6 lg:pr-12"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Main Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.15]">
                                <span className="text-slate-900 dark:text-white">
                                    Aage badho Bharat,
                                </span>
                                <br />
                                <span className="text-blue-600 dark:text-blue-400">
                                    AI Wealth ke saath
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
                        >
                            Track your investments, get AI-powered recommendations, and manage your portfolio with confidence.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl sm:rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 border-0"
                            >
                                <Link href="/dashboard">
                                    <div className="flex items-center justify-center">
                                        Start Free
                                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                className="group h-12 sm:h-14 px-4 sm:px-6 text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl transition-all"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-2 sm:mr-3 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600 dark:text-slate-300 fill-slate-600 dark:fill-slate-300" />
                                </div>
                                Watch Demo
                            </Button>
                        </motion.div>

                        {/* Trust Metrics */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-wrap gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700"
                        >
                            {[
                                { value: '₹50Cr+', label: 'Assets Tracked' },
                                { value: '99.9%', label: 'Uptime' },
                                { value: '4.9★', label: 'User Rating' }
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">{stat.value}</p>
                                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Premium Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 60, rotateY: -10 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative perspective-1000 lg:block hidden"
                    >
                        {/* Floating Glow */}
                        <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 blur-3xl rounded-full" />

                        {/* Main Dashboard Card */}
                        <motion.div
                            className="relative bg-white dark:bg-slate-800 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 dark:border-slate-700 p-4 sm:p-6 md:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Header Row - AI Portfolio with NIFTY 50 Badge */}
                            <div className="flex items-center justify-between mb-6 sm:mb-8">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                        <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">AI Portfolio</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Real-time insights</p>
                                    </div>
                                </div>
                                <motion.div
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-900/30 border border-emerald-500/20 dark:border-emerald-800"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <TrendingUp className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white text-xs font-bold">NIFTY 50</p>
                                        <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">+1.24%</p>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="mb-6 sm:mb-8">
                                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-1">Total Portfolio Value</p>
                                <div className="flex items-baseline gap-2 sm:gap-4 flex-wrap">
                                    <motion.span
                                        className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8, type: "spring" }}
                                    >
                                        ₹18,45,230
                                    </motion.span>
                                    <motion.div
                                        className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30"
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm">+24.8%</span>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Asset Allocation Cards */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                                {[
                                    { name: 'Stocks', value: '₹8.2L', change: '+18%', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
                                    { name: 'Mutual Funds', value: '₹6.1L', change: '+12%', icon: Wallet, color: 'from-purple-500 to-purple-600' },
                                    { name: 'Crypto', value: '₹4.1L', change: '+42%', icon: Sparkles, color: 'from-orange-500 to-amber-500' }
                                ].map((asset, i) => (
                                    <motion.div
                                        key={i}
                                        className="p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-600 hover:shadow-lg transition-all cursor-pointer group"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${asset.color} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}>
                                            <asset.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs">{asset.name}</p>
                                        <p className="text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">{asset.value}</p>
                                        <p className="text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-xs font-semibold">{asset.change}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* AI Insight Bar */}
                            <motion.div
                                className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 }}
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">AI Recommendation</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs truncate">Diversify 15% into mid-cap funds</p>
                                    </div>
                                    <div className="px-2 sm:px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 flex-shrink-0">
                                        <span className="text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs font-semibold">98%</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Floating Mini Cards - Hidden on mobile */}
                        <motion.div
                            className="absolute -right-4 bottom-2 p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 shadow-xl shadow-orange-500/30 z-20 hidden lg:block"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <p className="text-white text-xs font-semibold">🔥 HOT TIP</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
