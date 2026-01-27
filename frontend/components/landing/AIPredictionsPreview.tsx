"use client"

import { motion } from "framer-motion"
import { TrendingUp, BrainCircuit, Target, ShieldAlert, Sparkles, Activity } from "lucide-react"
import Link from "next/link"

export function AIPredictionsPreview() {
    return (
        <section className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800 mb-6 shadow-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <BrainCircuit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">AI-Powered Predictions</span>
                        </motion.div>

                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                            AI Asset Insights
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            ML predictions with technical analysis and sentiment scoring
                        </p>
                    </motion.div>

                    {/* Main Preview Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Browser Window */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                            {/* Browser Header */}
                            <div className="bg-slate-100 dark:bg-slate-800 px-6 py-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-700">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-lg">
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">bharatai.com/predictions</span>
                                </div>
                            </div>

                            {/* Content - Live Predictions Page */}
                            <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
                                <div className="relative w-full h-[600px]">
                                    <iframe
                                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/predictions?search=RELIANCE.NS`}
                                        className="absolute inset-0 w-full h-full border-0"
                                        title="AI Asset Insights Preview"
                                        style={{
                                            pointerEvents: 'none'
                                        }}
                                    />
                                    {/* Overlay to prevent interaction */}
                                    <div className="absolute inset-0 bg-transparent" style={{ pointerEvents: 'auto' }} />
                                </div>

                                {/* Floating Feature Cards */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="absolute top-8 -left-4 md:left-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 max-w-[200px]"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white">ML Predictions</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">LSTM Neural Network</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className="absolute top-8 -right-4 md:right-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 max-w-[200px]"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                            <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white">Real-time Data</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">Live Market Updates</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                                            <ShieldAlert className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white">Risk Analysis</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">Smart Risk Scoring</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-center mt-12"
                        >
                            <Link href="/predictions">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Try AI Predictions Now
                                    <Target className="w-5 h-5" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
