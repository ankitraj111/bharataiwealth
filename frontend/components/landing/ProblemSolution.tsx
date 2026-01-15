"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Sparkles, ArrowRight } from "lucide-react"

export function ProblemSolution() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />

            {/* Animated Orbs */}
            <motion.div
                className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Problem Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-xl">
                            {/* Problem Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
                                <AlertTriangle className="w-4 h-4 text-red-400" />
                                <span className="text-sm font-semibold text-red-400">The Problem</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                                Indians waste time{" "}
                                <span className="text-red-500">guessing</span>{" "}
                                where to invest
                            </h3>

                            <div className="space-y-4">
                                {[
                                    "Overwhelmed by too many investment options",
                                    "Panic selling during market dips",
                                    "No clarity on portfolio health",
                                    "Following tips without understanding risk"
                                ].map((problem, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        <p className="text-slate-600 font-medium">{problem}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Arrow Connector (Desktop) */}
                    <motion.div
                        className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <ArrowRight className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>

                    {/* Solution Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-blue-100 shadow-2xl shadow-blue-500/10">
                            {/* Solution Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-semibold text-emerald-400">Our Solution</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                                AI that{" "}
                                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                                    understands
                                </span>{" "}
                                and guides you
                            </h3>

                            <div className="space-y-4">
                                {[
                                    { text: "Analyses markets in real-time" },
                                    { text: "Calculates your personal risk score" },
                                    { text: "Monitors sentiment & news impact" },
                                    { text: "Tells you exactly what to do" }
                                ].map((solution, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <p className="text-slate-600 font-medium">{solution.text}</p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
