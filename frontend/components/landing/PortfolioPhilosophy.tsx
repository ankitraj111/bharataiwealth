"use client"

import { Shield, Scale, Flame } from "lucide-react"
import { motion } from "framer-motion"
import { scrollReveal, staggerContainer, defaultViewport } from "@/lib/animation-variants"

export function PortfolioPhilosophy() {
    const plans = [
        {
            title: "Low Risk",
            subtitle: "Stability-first assets",
            description: "Index-aligned strategies with a capital preservation mindset. Designed for emergency funds, retirement planning, and long-term security.",
            icon: Shield,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            title: "Medium Risk",
            subtitle: "Balanced growth approach",
            description: "Selective opportunities combined with diversified blue-chip exposure. Optimized for sustainable wealth accumulation over time.",
            icon: Scale,
            color: "text-primary",
            bg: "bg-primary/10",
            border: "border-primary/20"
        },
        {
            title: "High Risk",
            subtitle: "High volatility assets",
            description: "Exposure to emerging sectors, digital assets, and high-uncertainty investments. For experienced investors with higher risk tolerance.",
            icon: Flame,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        }
    ]

    return (
        <section className="py-28">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-20 space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    variants={scrollReveal}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Portfolio Philosophy</h2>
                    <p className="text-lg text-muted-foreground">
                        A mature approach to wealth creation, tailored for your risk appetite.
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    variants={staggerContainer}
                >
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            variants={scrollReveal}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            className={`glass-card rounded-3xl p-8 flex flex-col h-full transition-all duration-300 border ${plan.border} cursor-pointer`}
                        >
                            <motion.div
                                className={`w-16 h-16 rounded-2xl ${plan.bg} ${plan.color} flex items-center justify-center mb-8`}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { type: "spring", stiffness: 400 }
                                }}
                            >
                                <plan.icon size={30} />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                            <p className={`text-sm font-semibold uppercase tracking-wider mb-6 ${plan.color}`}>
                                {plan.subtitle}
                            </p>
                            <p className="text-muted-foreground leading-relaxed flex-grow">
                                {plan.description}
                            </p>
                            {plan.title === "High Risk" && (
                                <motion.div
                                    className="mt-8 pt-6 border-t border-border/50"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <p className="text-xs text-amber-500/80 font-medium">
                                        ⚠️ Experienced users only. Potential for significant capital loss.
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
