"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight, Clock, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"

const blogPosts = [
    {
        title: "How AI is Revolutionizing Investment Decisions in India",
        excerpt: "Discover how machine learning models are helping Indian investors make smarter, data-driven investment choices.",
        category: "AI & Finance",
        date: "Jan 8, 2026",
        readTime: "5 min read",
        gradient: "from-blue-500 to-cyan-500",
        image: "📊",
        tag: "Trending"
    },
    {
        title: "Understanding Risk Scores: A Beginner's Guide",
        excerpt: "Learn how risk scoring works and why it's crucial for building a resilient investment portfolio.",
        category: "Education",
        date: "Jan 5, 2026",
        readTime: "4 min read",
        gradient: "from-purple-500 to-pink-500",
        image: "📈",
        tag: "Popular"
    },
    {
        title: "Top 5 Mutual Funds for 2026: AI-Powered Analysis",
        excerpt: "Our AI analyzed 500+ mutual funds to find the best performers for the coming year.",
        category: "Insights",
        date: "Jan 2, 2026",
        readTime: "7 min read",
        gradient: "from-orange-500 to-amber-500",
        image: "💰",
        tag: "New"
    }
]

export function BlogPreview() {
    return (
        <section id="blog" className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Animated Background Elements */}
            <motion.div
                className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-between mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <motion.div
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-6 uppercase tracking-[0.2em] shadow-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Sparkles className="w-4 h-4" />
                            From Our Blog
                        </motion.div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                            Latest{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                    Insights
                                </span>
                                <motion.div
                                    className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-purple-400/30 blur-sm"
                                    animate={{ scaleX: [0.8, 1, 0.8] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            </span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl">
                            Expert insights, market analysis, and investment strategies powered by AI
                        </p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-black uppercase tracking-wider text-sm hover:shadow-2xl hover:shadow-blue-500/30 transition-all border-2 border-white/20"
                        >
                            View All Posts
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            whileHover={{ y: -12, scale: 1.02 }}
                            className="group cursor-pointer"
                        >
                            <Link href="/blog">
                                <div className="h-full rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 relative">
                                    {/* Trending Badge */}
                                    {post.tag && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <motion.div
                                                className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <span className="flex items-center gap-1.5 text-xs font-black text-blue-600 dark:text-blue-400">
                                                    <TrendingUp className="w-3 h-3" />
                                                    {post.tag}
                                                </span>
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Image Placeholder */}
                                    <div className={`h-56 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                                        <motion.span
                                            className="text-8xl"
                                            whileHover={{ scale: 1.2, rotate: 5 }}
                                            transition={{ type: "spring" }}
                                        >
                                            {post.image}
                                        </motion.span>
                                        {/* Animated Overlay */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                                            whileHover={{ opacity: 0.5 }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        {/* Category */}
                                        <motion.span
                                            className={`inline-block px-4 py-2 text-xs font-black rounded-xl bg-gradient-to-r ${post.gradient} text-white uppercase tracking-wider mb-4 shadow-lg`}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {post.category}
                                        </motion.span>

                                        {/* Title */}
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                                            {post.title}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                                            {post.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center gap-6 text-xs font-bold text-slate-500 dark:text-slate-400 pt-6 border-t-2 border-slate-100 dark:border-slate-700">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        {/* Read More Arrow */}
                                        <motion.div
                                            className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-sm"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            Read More
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.div>
                                    </div>

                                    {/* Glow Effect */}
                                    <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                        Want to stay updated with the latest investment insights?
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-black uppercase tracking-wider text-sm hover:shadow-xl transition-all"
                    >
                        Subscribe to Newsletter
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}
