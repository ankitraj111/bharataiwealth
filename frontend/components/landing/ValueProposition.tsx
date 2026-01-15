"use client"

import { motion } from "framer-motion"
import { Brain, LineChart, PieChart, Coins } from "lucide-react"

const benefits = [
    {
        title: "AI-Powered Suggestions",
        description: "Get intelligent investment recommendations based on market analysis and your risk profile.",
        icon: Brain,
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30"
    },
    {
        title: "Real-Time Risk Scoring",
        description: "Know your portfolio risk at any moment with dynamic scoring and alerts.",
        icon: LineChart,
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
    },
    {
        title: "Personalized Insights",
        description: "Tailored portfolio analysis and recommendations unique to your financial goals.",
        icon: PieChart,
        gradient: "from-orange-500 to-amber-500",
        bgGradient: "from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30"
    },
    {
        title: "Multi-Asset Support",
        description: "Works seamlessly with stocks, crypto, and mutual funds in one unified view.",
        icon: Coins,
        gradient: "from-emerald-500 to-teal-500",
        bgGradient: "from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30"
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
}

export function ValueProposition() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />

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
                        Why Choose Us
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
                        Everything You Need to
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                            Grow Your Wealth
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                        Our AI-powered platform gives you institutional-grade tools that were once only available to the elite.
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative"
                        >
                            <div className="h-full p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-100">
                                {/* Icon */}
                                <motion.div
                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.bgGradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    whileHover={{ rotate: 5 }}
                                >
                                    <benefit.icon className={`w-8 h-8 bg-gradient-to-r ${benefit.gradient} bg-clip-text`} style={{ color: 'transparent', background: `linear-gradient(to right, var(--tw-gradient-stops))`, WebkitBackgroundClip: 'text' }} />
                                    <benefit.icon className={`w-8 h-8 text-transparent bg-gradient-to-r ${benefit.gradient}`} style={{
                                        background: benefit.gradient.includes('blue') ? 'linear-gradient(to right, #3b82f6, #06b6d4)' :
                                            benefit.gradient.includes('purple') ? 'linear-gradient(to right, #8b5cf6, #ec4899)' :
                                                benefit.gradient.includes('orange') ? 'linear-gradient(to right, #f97316, #f59e0b)' :
                                                    'linear-gradient(to right, #10b981, #14b8a6)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }} />
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-xl font-black text-slate-900 mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {benefit.description}
                                </p>

                                {/* Hover Gradient Border */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
