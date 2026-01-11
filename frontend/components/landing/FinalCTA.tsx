"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, CheckCircle2, Loader2 } from "lucide-react"

export function FinalCTA() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSubmitted(true)
        setEmail("")
    }

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Vibrant Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500" />

            {/* Animated Orbs */}
            <motion.div
                className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px'
            }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span className="text-sm font-semibold text-white">Start Your Journey Today</span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        Ready to Transform
                        <br />
                        Your Wealth Journey?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
                    >
                        Join thousands of smart Indian investors using AI to grow their wealth confidently.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="h-14 px-10 text-lg font-bold bg-white text-blue-600 hover:bg-white/90 rounded-2xl shadow-xl shadow-black/20 transition-all duration-300"
                        >
                            <Link href="/dashboard">
                                <motion.div
                                    className="flex items-center"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Try Bharat AI Free
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </motion.div>
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Email Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="max-w-md mx-auto"
                    >
                        <p className="text-white/70 text-sm mb-4">Or join early access for exclusive features</p>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="flex gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 h-12 px-5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                                    required
                                />
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="h-12 px-6 font-semibold bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl transition-all"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        "Join Waitlist"
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30"
                            >
                                <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                                <span className="text-white font-medium">Thanks! We&apos;ll be in touch soon.</span>
                            </motion.div>
                        )}

                        <p className="text-white/50 text-xs mt-4">
                            No spam, ever. We respect your privacy.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
