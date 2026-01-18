"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, CheckCircle2, Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setEmail("")
        }
    }

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 dark:from-slate-950 to-indigo-950 dark:to-slate-900" />
            <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5 bg-[radial-gradient(circle_at_20%_30%,#818cf8,transparent_50%),radial-gradient(circle_at_80%_70%,#c084fc,transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto rounded-[3rem] p-8 md:p-16 border border-white/10 dark:border-white/5 bg-white/5 dark:bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                    {/* Floating icons for decoration */}
                    <motion.div
                        className="absolute -top-10 -right-10 text-white/5"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles size={200} />
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 dark:bg-primary/10 text-primary-foreground dark:text-primary border border-primary/30 dark:border-primary/20 text-sm font-bold mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    Bharat Wealth Insights
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                                    Master Your Money with <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 dark:from-emerald-300 dark:to-cyan-300 bg-clip-text text-transparent italic">AI-Powered</span> Insights
                                </h2>
                                <p className="text-lg text-slate-300 dark:text-slate-400 mt-6 leading-relaxed">
                                    Join 50,000+ Indians receiving weekly market analysis, personalized stock alerts, and wealth-building strategies directly in their inbox.
                                </p>
                            </motion.div>

                            <motion.ul
                                className="space-y-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                {[
                                    "Weekly Market Summary (Nifty & Global)",
                                    "AI-Picked Stocks for Growth & Value",
                                    "Exclusive Tax-Saving Strategies",
                                    "Early Access to New Platform Features"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-200 dark:text-slate-300 font-medium">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 dark:border-emerald-500/20">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-300" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </motion.ul>
                        </div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-purple-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                            <div className="relative p-1 rounded-3xl bg-slate-800/50 dark:bg-slate-900/50 border border-white/10 dark:border-white/5 backdrop-blur-xl">
                                {subscribed ? (
                                    <motion.div
                                        className="py-12 px-8 text-center"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                    >
                                        <div className="w-16 h-16 bg-emerald-500 dark:bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20 dark:shadow-emerald-600/20">
                                            <Send className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Welcome to Bharat Wealth!</h3>
                                        <p className="text-slate-300 dark:text-slate-400">
                                            We've sent a welcome guide to your inbox. Let's build your financial future together.
                                        </p>
                                        <Button
                                            variant="secondary"
                                            className="mt-8"
                                            onClick={() => setSubscribed(false)}
                                        >
                                            Got it
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubscribe} className="p-8 space-y-6">
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                                                <Input
                                                    type="email"
                                                    placeholder="Enter your best email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="pl-12 h-14 bg-slate-900/50 dark:bg-slate-950/50 border-white/10 dark:border-white/5 text-white placeholder:text-slate-500 dark:placeholder:text-slate-600 focus:border-primary/50 text-lg transition-all rounded-xl"
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full h-14 text-lg font-bold group rounded-xl bg-gradient-to-r from-primary to-indigo-600 dark:from-primary dark:to-indigo-700 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10 transition-all border-none"
                                            >
                                                Start My Progress
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                                            No spam. No selling your data. Just financial intelligence.
                                            <br />
                                            <span className="text-slate-500 dark:text-slate-600 italic mt-1 block">Unsubscribe at any time with one click.</span>
                                        </p>
                                    </form>
                                )}
                            </div>

                            {/* Trust badges below form */}
                            <div className="flex items-center justify-around mt-8 opacity-60 dark:opacity-50">
                                <div className="text-center">
                                    <p className="text-xl font-bold text-white tabular-nums">50k+</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Subscribers</p>
                                </div>
                                <div className="w-px h-8 bg-white/10 dark:bg-white/5" />
                                <div className="text-center">
                                    <p className="text-xl font-bold text-white tabular-nums">4.9/5</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Avg Rating</p>
                                </div>
                                <div className="w-px h-8 bg-white/10 dark:bg-white/5" />
                                <div className="text-center">
                                    <p className="text-xl font-bold text-white tabular-nums">12</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Years of Data</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
