"use client"

import { motion } from "framer-motion"
import { Star, Sparkles, Users, Zap } from "lucide-react"

const testimonials = [
    {
        name: "Rahul Sharma",
        role: "Software Engineer, Bangalore",
        avatar: "RS",
        quote: "Finally, an AI advisor that understands Indian markets! The risk scoring saved me from panic selling during the recent dip.",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        name: "Priya Patel",
        role: "CA, Mumbai",
        avatar: "PP",
        quote: "The portfolio rebalancing suggestions are spot-on. I've seen 22% better returns since I started using Bharat AI Wealth.",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        name: "Amit Kumar",
        role: "Business Owner, Delhi",
        avatar: "AK",
        quote: "Love how it works with my Zerodha account. The mutual fund rankings helped me pick better funds for my SIPs.",
        gradient: "from-orange-500 to-amber-500"
    }
]

const stats = [
    { value: "10,000+", label: "Insights Generated", icon: Sparkles, gradient: "from-blue-500 to-cyan-500" },
    { value: "5,000+", label: "Indian Investors", icon: Users, gradient: "from-purple-500 to-pink-500" },
    { value: "100%", label: "AI Powered", icon: Zap, gradient: "from-orange-500 to-amber-500" }
]

export function SocialProof() {
    return (
        <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-800">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-800 via-slate-50 dark:via-slate-900 to-white dark:to-slate-800" />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 mb-6 uppercase tracking-[0.2em]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Trusted by Investors
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">
                        What Our Users
                        <br />
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Say About Us
                        </span>
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    className="grid md:grid-cols-3 gap-6 mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -6 }}
                            className="group"
                        >
                            <div className="h-full p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40 transition-all duration-300 hover:shadow-2xl hover:border-blue-100 dark:hover:border-blue-800">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic font-medium">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                {/* User Info */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 dark:text-white">{testimonial.name}</p>
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.03, y: -4 }}
                            className="relative group h-full"
                        >
                            <div className={`h-full p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40 transition-all duration-300 group-hover:shadow-2xl flex flex-col items-center text-center`}>
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</p>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
