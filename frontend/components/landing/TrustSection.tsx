"use client"

import { Code2, MapPin, Home, Scale } from "lucide-react"
import { motion } from "framer-motion"
import { scrollReveal, staggerContainer, defaultViewport } from "@/lib/animation-variants"

export function TrustSection() {
    const trustPoints = [
        {
            text: "Built by Indian engineers",
            icon: Code2
        },
        {
            text: "Designed for Indian markets (NIFTY, NSE, BSE, Crypto)",
            icon: MapPin
        },
        {
            text: "Focused on Indian households & long-term wealth",
            icon: Home
        },
        {
            text: "Compliance-first and ethics-driven design",
            icon: Scale
        }
    ]

    return (
        <section className="py-24 border-y border-border/50 bg-muted/20">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            className="space-y-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                            variants={scrollReveal}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                                Crafted in Bharat.<br />
                                <span className="text-primary/80">Designed for Trust.</span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                A platform that reflects India's growing strength in technology, finance,
                                and responsible innovation. Built with the nuances of Indian markets
                                and the aspirations of Indian families in mind.
                            </p>
                        </motion.div>

                        <motion.div
                            className="glass-card p-10 space-y-8 rounded-3xl border-primary/10"
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                            variants={staggerContainer}
                        >
                            <ul className="space-y-6">
                                {trustPoints.map((point, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex items-start gap-4"
                                        variants={scrollReveal}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <motion.div
                                            className="mt-0.5 p-2 rounded-xl bg-success/10 text-success"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <point.icon size={18} />
                                        </motion.div>
                                        <span className="text-base font-medium text-foreground/90 leading-relaxed">
                                            {point.text}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
