"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { scrollReveal, buttonHover, buttonTap, defaultViewport } from "@/lib/animation-variants"

export function FinalCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background glow */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            />

            <motion.div
                className="container mx-auto px-6 relative z-10 text-center space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                variants={scrollReveal}
            >
                <motion.h2
                    className="text-4xl md:text-6xl font-bold tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    A calmer, smarter way to<br />understand wealth.
                </motion.h2>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link href="/auth/register" className="w-full sm:w-auto">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                            className="w-full"
                        >
                            <Button size="lg" className="h-14 px-10 text-lg font-medium w-full">
                                Create an Account
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </Link>
                    <Link href="/auth/login" className="w-full sm:w-auto">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring" as const, stiffness: 400, damping: 10 }}
                            className="w-full"
                        >
                            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-medium glass-card border-primary/20 w-full">
                                Explore Platform
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                <motion.p
                    className="text-sm text-muted-foreground font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    Demo access available for evaluation. No credit card required.
                </motion.p>
            </motion.div>
        </section>
    )
}
