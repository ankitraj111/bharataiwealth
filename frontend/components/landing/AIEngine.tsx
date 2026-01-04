"use client"

import { Database, Cpu, MessageSquareText } from "lucide-react"
import { motion } from "framer-motion"
import { scrollReveal, staggerContainer, defaultViewport } from "@/lib/animation-variants"

export function AIEngine() {
    const steps = [
        {
            step: "01",
            title: "Indian Market & Financial Data",
            description: "Aggregating historical prices, indices, macro indicators, and real-time market signals from NSE, BSE, and global crypto markets.",
            icon: Database
        },
        {
            step: "02",
            title: "Multiple AI/ML Models",
            description: "Processing data through LSTM neural networks, XGBoost, Random Forest, and Prophet models for comprehensive analysis.",
            icon: Cpu
        },
        {
            step: "03",
            title: "Explainable Predictions",
            description: "Clear insights with confidence scores and risk assessments. Every prediction comes with transparent reasoning.",
            icon: MessageSquareText
        }
    ]

    return (
        <section id="how-it-works" className="py-28 bg-primary/[0.02]">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                        variants={scrollReveal}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How the AI Works</h2>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Transparency builds trust. We don't believe in black boxes.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Connection Line (Desktop) */}
                        <div className="hidden md:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                        <motion.div
                            className="grid md:grid-cols-3 gap-12 relative z-10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                            variants={staggerContainer}
                        >
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center space-y-6"
                                    variants={scrollReveal}
                                >
                                    <motion.div
                                        className="mx-auto w-20 h-20 rounded-3xl glass-card border border-primary/20 shadow-lg flex items-center justify-center text-primary"
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 5,
                                            borderColor: "var(--primary)",
                                            transition: { type: "spring", stiffness: 400 }
                                        }}
                                    >
                                        <step.icon size={32} />
                                    </motion.div>
                                    <div className="space-y-3">
                                        <span className="text-xs font-bold tracking-[0.2em] text-primary/60 uppercase">
                                            Step {step.step}
                                        </span>
                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        className="mt-20 p-8 rounded-2xl glass-card border-amber-500/20 bg-amber-500/[0.02] text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                        variants={scrollReveal}
                    >
                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                            "Predictions are probabilistic and for understanding purposes only.
                            They are not investment advice and should not be the sole basis for financial decisions."
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
