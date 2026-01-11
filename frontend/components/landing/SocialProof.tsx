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
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-purple-50/30 to-orange-50/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 text-emerald-700 dark:text-emerald-300 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Trusted by Investors
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                            What Our Users
                        </span>{" "}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                            Say
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
                            <div className="h-full p-8 rounded-3xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/30 dark:shadow-none transition-all duration-300 hover:shadow-2xl">
                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                {/* User Info */}
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
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
                            whileHover={{ scale: 1.03 }}
                            className="relative group"
                        >
                            <div className={`p-6 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white text-center shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
                                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
