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
        <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-20 shadow-2xl shadow-blue-500/20 dark:shadow-blue-900/20">
                    {/* Vibrant Background Card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 dark:from-blue-700 dark:via-blue-800 dark:to-purple-900" />

                    {/* Animated Orbs */}
                    <motion.div
                        className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[100px]"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 10, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[100px]"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
                    />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 mb-10"
                        >
                            <Sparkles className="w-4 h-4 text-sky-300 dark:text-sky-200" />
                            <span className="text-xs font-black text-white uppercase tracking-[0.2em]">Start Your Wealth Journey</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tight"
                        >
                            Ready to Transform
                            <br />
                            Your <span className="italic bg-gradient-to-r from-sky-300 to-indigo-200 dark:from-sky-200 dark:to-indigo-100 bg-clip-text text-transparent">Wealth Journey?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-sky-100/80 dark:text-sky-100/70 mb-12 max-w-2xl mx-auto font-medium"
                        >
                            Join thousands of smart Indian investors using AI to grow their wealth confidently with institutional-grade insights.
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
                                className="h-16 px-12 text-lg font-black bg-white text-blue-700 hover:scale-[1.03] transition-all rounded-[1.25rem] shadow-2xl shadow-black/30 uppercase tracking-widest"
                            >
                                <Link href="/dashboard">
                                    <motion.div
                                        className="flex items-center"
                                    >
                                        Try Bharat AI Free
                                        <ArrowRight className="ml-3 h-5 w-5" />
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
                                        className="flex-1 h-14 px-6 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-white placeholder:text-white/40 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-white/30 transition-all"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="h-14 px-8 font-black bg-sky-400 hover:bg-sky-300 dark:bg-sky-500 dark:hover:bg-sky-400 text-slate-900 dark:text-slate-950 rounded-2xl transition-all uppercase tracking-widest text-xs"
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
                                    className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-emerald-300 dark:text-emerald-200" />
                                    <span className="text-white font-medium">Thanks! We&apos;ll be in touch soon.</span>
                                </motion.div>
                            )}

                            <p className="text-white/50 dark:text-white/40 text-xs mt-4">
                                No spam, ever. We respect your privacy.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
