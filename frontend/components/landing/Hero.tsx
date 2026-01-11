"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Sparkles, TrendingUp, Shield, Zap } from "lucide-react"
import { motion } from "framer-motion"

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
    })
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
}

export function Hero() {
    const stats = [
        { value: "10K+", label: "Insights Generated", icon: Sparkles },
        { value: "99.9%", label: "Uptime", icon: Zap },
        { value: "100%", label: "Secure", icon: Shield }
    ]

    return (
        <section className="relative min-h-screen pt-24 pb-20 overflow-hidden">
            {/* Vibrant Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-slate-950" />

            {/* Animated Colorful Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Blue Orb */}
                <motion.div
                    className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%)',
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
                {/* Orange/Saffron Orb */}
                <motion.div
                    className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 70%)',
                    }}
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -20, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 10,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
                {/* Accent Purple Orb */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 6,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[80vh]">
                    {/* Left Content */}
                    <motion.div
                        className="space-y-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={fadeInUp}
                            custom={0}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900/40 dark:to-orange-900/40 border border-blue-200/50 dark:border-blue-700/30"
                        >
                            <div className="relative">
                                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-orange-500" />
                                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 animate-ping" />
                            </div>
                            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-orange-600 dark:from-blue-400 dark:to-orange-400 bg-clip-text text-transparent">
                                India&apos;s Next-Gen AI Financial Advisor
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div className="space-y-4" variants={fadeInUp} custom={0.1}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent">
                                    Your Wealth.
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                                    Powered by AI.
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 dark:from-orange-400 dark:via-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                                    Built for Bharat.
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subheadline */}
                        <motion.p
                            variants={fadeInUp}
                            custom={0.2}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg"
                        >
                            Smart investment insights, risk analysis, and personalized advice — trusted by young investors across India.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            custom={0.3}
                            className="flex flex-wrap items-center gap-4 pt-4"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group h-14 px-8 text-base font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                            >
                                <Link href="/dashboard">
                                    <motion.div
                                        className="flex items-center"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </motion.div>
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="group h-14 px-8 text-base font-bold border-2 border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-slate-900/50 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-2xl transition-all duration-300"
                            >
                                <Download className="mr-2 h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                                <span className="bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent">
                                    Download App
                                </span>
                            </Button>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div
                            variants={fadeInUp}
                            custom={0.4}
                            className="flex flex-wrap items-center gap-8 pt-8"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                >
                                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-orange-100 dark:from-blue-900/50 dark:to-orange-900/50">
                                        <stat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Colorful Dashboard Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        {/* Floating Animation for entire card */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotateX: [0, 2, 0],
                                rotateY: [0, -2, 0]
                            }}
                            transition={{
                                duration: 6,
                                ease: "easeInOut",
                                repeat: Infinity
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Main Card */}
                            <div className="relative bg-white/80 dark:bg-slate-900/80 rounded-3xl shadow-2xl shadow-blue-500/10 dark:shadow-blue-500/5 border border-slate-200/50 dark:border-slate-700/50 p-8 md:p-10 backdrop-blur-xl overflow-hidden">
                                {/* Animated Shimmer Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                    animate={{ x: ["-200%", "200%"] }}
                                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                                />

                                {/* Gradient Border Effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-orange-500/10 pointer-events-none" />

                                {/* AI Status Badge */}
                                <motion.div
                                    className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 border border-green-200 dark:border-green-700/30"
                                    animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 0 rgba(34,197,94,0)", "0 0 0 8px rgba(34,197,94,0.2)", "0 0 0 0 rgba(34,197,94,0)"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <motion.div
                                        className="w-2 h-2 rounded-full bg-green-500"
                                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">AI Active</span>
                                </motion.div>

                                {/* Portfolio Value with Counter Animation */}
                                <div className="mb-10 relative">
                                    <motion.p
                                        className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        Total Portfolio Value
                                    </motion.p>
                                    <div className="flex items-baseline gap-4">
                                        <motion.span
                                            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                                        >
                                            ₹12,45,890
                                        </motion.span>
                                        <motion.span
                                            className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full"
                                            animate={{
                                                scale: [1, 1.08, 1],
                                                y: [0, -3, 0]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <motion.span
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                            >
                                                <TrendingUp size={14} />
                                            </motion.span>
                                            +18.5% this year
                                        </motion.span>
                                    </div>
                                </div>

                                {/* Colorful Bar Chart with Continuous Animation */}
                                <div className="flex items-end justify-between gap-2 h-36 relative">
                                    {[35, 45, 55, 42, 62, 50, 72, 65, 78, 58, 82, 75].map((baseHeight, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex-1 rounded-t-lg cursor-pointer group relative overflow-hidden"
                                            initial={{ height: 0 }}
                                            animate={{
                                                height: [`${baseHeight}%`, `${baseHeight + 8}%`, `${baseHeight}%`]
                                            }}
                                            transition={{
                                                height: {
                                                    duration: 2,
                                                    delay: i * 0.1,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }
                                            }}
                                            whileHover={{
                                                height: `${Math.min(baseHeight + 15, 100)}%`,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <motion.div
                                                className="absolute inset-0 rounded-t-lg"
                                                style={{
                                                    background: i % 3 === 0
                                                        ? 'linear-gradient(to top, #2563eb, #3b82f6)'
                                                        : i % 3 === 1
                                                            ? 'linear-gradient(to top, #7c3aed, #8b5cf6)'
                                                            : 'linear-gradient(to top, #f97316, #fb923c)'
                                                }}
                                                animate={{
                                                    opacity: [0.8, 1, 0.8]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    delay: i * 0.1,
                                                    repeat: Infinity
                                                }}
                                            />
                                            {/* Glow effect on hover */}
                                            <motion.div
                                                className="absolute inset-0 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                style={{
                                                    background: i % 3 === 0
                                                        ? 'radial-gradient(circle at center, rgba(59,130,246,0.5), transparent)'
                                                        : i % 3 === 1
                                                            ? 'radial-gradient(circle at center, rgba(139,92,246,0.5), transparent)'
                                                            : 'radial-gradient(circle at center, rgba(251,146,60,0.5), transparent)'
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Asset Labels with Stagger Animation */}
                                <div className="flex justify-between mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                                    {[
                                        { name: 'Stocks', value: '₹5.2L', color: 'from-blue-500 to-blue-600' },
                                        { name: 'MF', value: '₹4.1L', color: 'from-purple-500 to-purple-600' },
                                        { name: 'Crypto', value: '₹3.1L', color: 'from-orange-500 to-orange-600' },
                                    ].map((asset, i) => (
                                        <motion.div
                                            key={i}
                                            className="text-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.2 + i * 0.1 }}
                                        >
                                            <motion.div
                                                className={`w-3 h-3 rounded-full bg-gradient-to-r ${asset.color} mx-auto mb-2`}
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                            />
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{asset.name}</p>
                                            <motion.p
                                                className="text-sm font-bold text-slate-900 dark:text-white"
                                                animate={{ opacity: [0.7, 1, 0.7] }}
                                                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                                            >
                                                {asset.value}
                                            </motion.p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Decorative Elements */}
                        <motion.div
                            className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 0.6, 0.4],
                            }}
                            transition={{
                                duration: 4,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                        />
                        <motion.div
                            className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-orange-400/25 to-amber-400/25 rounded-full blur-2xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 5,
                                ease: "easeInOut",
                                repeat: Infinity,
                                delay: 1,
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
