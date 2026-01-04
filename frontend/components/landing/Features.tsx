"use client"

import { TrendingUp, Briefcase, Wallet, Target, Bell } from "lucide-react"
import { motion } from "framer-motion"
import { scrollReveal, staggerContainer, defaultViewport } from "@/lib/animation-variants"

export function Features() {
    const features = [
        {
            title: "AI Market Intelligence",
            description: "ML-based trend, range & risk insights powered by ensemble models.",
            icon: TrendingUp,
            accent: "text-primary",
            bg: "bg-primary/10"
        },
        {
            title: "Smart Portfolios",
            description: "Low, Medium & High risk frameworks designed for long-term wealth.",
            icon: Briefcase,
            accent: "text-primary/70",
            bg: "bg-primary/5"
        },
        {
            title: "Wealth & Expense Visibility",
            description: "Clear understanding of your money flow with institutional-grade clarity.",
            icon: Wallet,
            accent: "text-accent",
            bg: "bg-accent/10"
        },
        {
            title: "Goal-Based Planning",
            description: "SIPs, savings targets & emergency fund planning aligned to your life.",
            icon: Target,
            accent: "text-success",
            bg: "bg-success/10"
        },
        {
            title: "Alerts & Signals",
            description: "Meaningful insights delivered at the right time, not noise.",
            icon: Bell,
            accent: "text-muted-foreground",
            bg: "bg-muted"
        }
    ]

    return (
        <section id="features" className="py-28">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-20 space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    variants={scrollReveal}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What the Platform Does</h2>
                    <p className="text-lg text-muted-foreground">
                        A comprehensive suite of intelligence tools for the thoughtful investor.
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    variants={staggerContainer}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={scrollReveal}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            className="group glass-card p-8 rounded-3xl transition-all duration-300 border-primary/5 hover:border-primary/15 cursor-pointer"
                        >
                            <motion.div
                                className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.accent} flex items-center justify-center mb-6`}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { type: "spring", stiffness: 400 }
                                }}
                            >
                                <feature.icon size={26} />
                            </motion.div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
