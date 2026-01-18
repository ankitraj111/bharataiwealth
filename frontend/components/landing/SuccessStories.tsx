"use client"

import { motion } from "framer-motion"
import { Star, TrendingUp } from "lucide-react"

export function SuccessStories() {
    const stories = [
        {
            name: "Rajesh Kumar",
            role: "Software Engineer",
            location: "Bangalore",
            image: "🧑‍💼",
            story: "Started with ₹5L, now managing ₹25L portfolio. AI predictions helped me identify winning stocks early.",
            growth: "+420%",
            rating: 5
        },
        {
            name: "Priya Sharma",
            role: "Business Owner",
            location: "Mumbai",
            image: "👩‍💼",
            story: "Diversified my investments across stocks, MFs, and crypto. Portfolio grew 3x in 2 years.",
            growth: "+300%",
            rating: 5
        },
        {
            name: "Amit Patel",
            role: "Doctor",
            location: "Delhi",
            image: "👨‍⚕️",
            story: "Tax planning features saved me ₹2L in taxes. Now I focus on healthcare, AI handles investments.",
            growth: "+180%",
            rating: 5
        },
        {
            name: "Neha Gupta",
            role: "Freelancer",
            location: "Pune",
            image: "👩‍💻",
            story: "Emergency fund feature gave me peace of mind. Now I invest confidently with AI guidance.",
            growth: "+250%",
            rating: 5
        }
    ]

    return (
        <section className="relative py-20 px-4 md:px-8 lg:px-20 bg-gradient-to-b from-slate-50 dark:from-slate-900/50 to-background">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-4">
                        Success Stories from Our Users
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Real people, real results. See how our users are building wealth with AI.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {stories.map((story, i) => (
                        <motion.div
                            key={i}
                            className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-900/50 transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-4xl">{story.image}</div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {story.name}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            {story.role} • {story.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    {Array(story.rating).fill(0).map((_, j) => (
                                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                                "{story.story}"
                            </p>

                            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                                <TrendingUp className="w-4 h-4" />
                                Portfolio Growth: {story.growth}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
