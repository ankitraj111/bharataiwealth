"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, CheckCircle2 } from "lucide-react"

const trustPoints = [
    {
        title: "Read-Only Access",
        description: "We never have write access to your broker accounts. Your money stays 100% in your control.",
        icon: Eye,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "SEBI-Friendly Advisory",
        description: "We provide investment advisory only. No auto-trading, no fund management.",
        icon: Shield,
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        title: "No Money Control",
        description: "We can't move, withdraw, or trade your funds. Zero access to your capital.",
        icon: Lock,
        gradient: "from-purple-500 to-pink-500"
    }
]

export function SecurityTrust() {
    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-900 via-slate-50 dark:via-slate-800 to-white dark:to-slate-900" />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Security First</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Your Trust is{" "}
                            <span className="bg-gradient-to-r from-emerald-600 to-blue-500 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
                                Our Priority
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto">
                            We&apos;ve built every feature with your security in mind. Your money, your control — always.
                        </p>
                    </motion.div>

                    {/* Trust Cards */}
                    <motion.div
                        className="grid md:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {trustPoints.map((point, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -6 }}
                                className="group"
                            >
                                <div className="h-full p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40 text-center transition-all duration-300 group-hover:shadow-2xl hover:border-emerald-100 dark:hover:border-emerald-800">
                                    {/* Icon */}
                                    <motion.div
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${point.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <point.icon className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">
                                        {point.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                        {point.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Bottom Trust Strip */}
                    <motion.div
                        className="mt-12 p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            {[
                                "Bank-grade encryption",
                                "No payment info stored",
                                "SOC 2 compliant infrastructure",
                                "Regular security audits"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
