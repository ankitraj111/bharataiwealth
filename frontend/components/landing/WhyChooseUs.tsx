"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Award, Users, Zap, Lock, TrendingUp } from "lucide-react"

export function WhyChooseUs() {
    const reasons = [
        {
            icon: Award,
            title: "Industry Leading",
            description: "Built by fintech experts with 50+ years combined experience"
        },
        {
            icon: TrendingUp,
            title: "Proven Results",
            description: "Average portfolio growth of 24.8% YoY for our users"
        },
        {
            icon: Lock,
            title: "Bank-Level Security",
            description: "256-bit encryption and full compliance with RBI regulations"
        },
        {
            icon: Users,
            title: "10,000+ Users",
            description: "Trusted by thousands of Indians managing ₹50Cr+ in assets"
        },
        {
            icon: Zap,
            title: "Lightning Fast",
            description: "Real-time data updates and instant trade execution"
        },
        {
            icon: CheckCircle2,
            title: "24/7 Support",
            description: "Expert support team available round the clock"
        }
    ]

    return (
        <section className="relative py-20 px-4 md:px-8 lg:px-20 bg-white dark:bg-slate-800">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4">
                        Why Choose Bharat AI Wealth?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        We're not just another investment app. We're your personal wealth advisor powered by AI.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            className="flex gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                    <reason.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                                    {reason.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">
                                    {reason.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
