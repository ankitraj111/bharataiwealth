"use client"

import { motion } from "framer-motion"
import { Link2, Brain, TrendingUp, ArrowRight } from "lucide-react"

const steps = [
    {
        number: "01",
        title: "Connect Your Broker",
        description: "Link your Zerodha or Groww account with read-only access. Your credentials stay safe.",
        icon: Link2,
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30",
        optional: true
    },
    {
        number: "02",
        title: "Get AI Recommendations",
        description: "Our AI analyzes markets, calculates risk, and provides personalized investment insights.",
        icon: Brain,
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30",
        optional: false
    },
    {
        number: "03",
        title: "Grow Wealth Confidently",
        description: "Make informed decisions with AI-backed confidence. Track, optimize, and watch your wealth grow.",
        icon: TrendingUp,
        gradient: "from-emerald-500 to-teal-500",
        bgGradient: "from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30",
        optional: false
    }
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-300 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Simple Process
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                            How It
                        </span>{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Get started in minutes with our simple 3-step process.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid lg:grid-cols-3 gap-8 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-32 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-30" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            {/* Arrow between steps (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:flex absolute -right-4 top-32 z-10">
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                                    </motion.div>
                                </div>
                            )}

                            <motion.div
                                whileHover={{ y: -8 }}
                                className="h-full p-8 rounded-3xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/30 dark:shadow-none text-center transition-all duration-300"
                            >
                                {/* Step Number */}
                                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.bgGradient} mb-6 relative`}>
                                    <span className={`text-3xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                                        {step.number}
                                    </span>
                                    {/* Pulse Ring */}
                                    <motion.div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-20`}
                                        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>

                                {/* Title with Optional Badge */}
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {step.title}
                                    </h3>
                                    {step.optional && (
                                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                                            Optional
                                        </span>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Icon at bottom */}
                                <motion.div
                                    className={`mt-6 w-12 h-12 rounded-xl bg-gradient-to-r ${step.gradient} flex items-center justify-center mx-auto`}
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                >
                                    <step.icon className="w-6 h-6 text-white" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
