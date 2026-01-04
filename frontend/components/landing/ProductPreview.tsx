"use client"

import { LayoutDashboard, LineChart, PieChart } from "lucide-react"
import { motion } from "framer-motion"
import { scrollReveal, staggerContainer, defaultViewport } from "@/lib/animation-variants"

export function ProductPreview() {
    const previews = [
        {
            title: "Dashboard",
            description: "Complete financial overview at a glance",
            icon: LayoutDashboard
        },
        {
            title: "ML Predictions",
            description: "AI-powered market trend analysis",
            icon: LineChart
        },
        {
            title: "Portfolio Overview",
            description: "Risk-stratified asset visualization",
            icon: PieChart
        }
    ]

    return (
        <section className="py-28">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                        variants={scrollReveal}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Product Preview</h2>
                        <p className="text-lg text-muted-foreground">
                            Designed for clarity. Built for confidence.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                        variants={staggerContainer}
                    >
                        {previews.map((preview, index) => (
                            <motion.div
                                key={index}
                                className="group"
                                variants={scrollReveal}
                            >
                                <motion.div
                                    className="glass-card rounded-3xl p-8 h-64 flex flex-col items-center justify-center text-center border-primary/5 hover:border-primary/15 transition-all duration-300 cursor-pointer"
                                    whileHover={{
                                        y: -8,
                                        scale: 1.02,
                                        transition: { type: "spring", stiffness: 300, damping: 20 }
                                    }}
                                >
                                    <motion.div
                                        className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6 text-primary/60 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300"
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 5,
                                            transition: { type: "spring", stiffness: 400 }
                                        }}
                                    >
                                        <preview.icon size={32} />
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-2">{preview.title}</h3>
                                    <p className="text-sm text-muted-foreground">{preview.description}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-12 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                        variants={scrollReveal}
                    >
                        <p className="text-sm text-muted-foreground/60 italic">
                            Preview displays are representative. Actual interface may vary.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
