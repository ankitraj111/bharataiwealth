"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

const blogPosts = [
    {
        title: "How AI is Revolutionizing Investment Decisions in India",
        excerpt: "Discover how machine learning models are helping Indian investors make smarter, data-driven investment choices.",
        category: "AI & Finance",
        date: "Jan 8, 2026",
        readTime: "5 min read",
        gradient: "from-blue-500 to-cyan-500",
        image: "📊"
    },
    {
        title: "Understanding Risk Scores: A Beginner's Guide",
        excerpt: "Learn how risk scoring works and why it's crucial for building a resilient investment portfolio.",
        category: "Education",
        date: "Jan 5, 2026",
        readTime: "4 min read",
        gradient: "from-purple-500 to-pink-500",
        image: "📈"
    },
    {
        title: "Top 5 Mutual Funds for 2026: AI-Powered Analysis",
        excerpt: "Our AI analyzed 500+ mutual funds to find the best performers for the coming year.",
        category: "Insights",
        date: "Jan 2, 2026",
        readTime: "7 min read",
        gradient: "from-orange-500 to-amber-500",
        image: "💰"
    }
]

export function BlogPreview() {
    return (
        <section id="blog" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <motion.span
                            className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 text-cyan-700 dark:text-cyan-300 mb-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            From Our Blog
                        </motion.span>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                                Latest
                            </span>{" "}
                            <span className="bg-gradient-to-r from-cyan-600 to-blue-500 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                                Insights
                            </span>
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                    >
                        View All Posts
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group cursor-pointer"
                        >
                            <Link href="/blog">
                                <div className="h-full rounded-3xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                                    {/* Image Placeholder */}
                                    <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                                        <span className="text-7xl">{post.image}</span>
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Category */}
                                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${post.gradient} text-white mb-4`}>
                                            {post.category}
                                        </span>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                                            {post.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
