"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import {
    heroText,
    floatingCard,
    staggerContainer,
    fadeInUpSimple,
    buttonHover,
    buttonTap
} from "@/lib/animation-variants"

export function Hero() {
    const barHeights = [40, 50, 60, 45, 65, 55, 75, 70, 80, 60, 85, 75, 90, 80, 95]

    return (
        <section className="relative min-h-screen pt-20 pb-16 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-40 dark:opacity-20"
                    style={{
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                    }}
                    transition={{
                        duration: 8,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-30 dark:opacity-15"
                    style={{
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                    }}
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -20, 0],
                    }}
                    transition={{
                        duration: 10,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[85vh]">
                    {/* Left Content */}
                    <motion.div
                        className="space-y-8"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Badge */}
                        <motion.div
                            variants={fadeInUpSimple}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/30 backdrop-blur-sm"
                        >
                            <div className="relative">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <div className="absolute inset-0 w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                            </div>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                AI Powered Wealth Management
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div className="space-y-3">
                            <motion.h1
                                variants={heroText}
                                initial="hidden"
                                animate="visible"
                                custom={0.1}
                                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
                            >
                                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent block">
                                    AI Wealth Advisor
                                </span>
                                <span className="text-slate-700 dark:text-slate-300 font-semibold">for </span>
                                <motion.span
                                    className="bg-gradient-to-r from-accent via-accent/80 to-accent dark:from-accent dark:via-accent/90 dark:to-accent bg-clip-text text-transparent font-black"
                                    initial={{ backgroundPosition: "0% 50%" }}
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                    }}
                                    transition={{
                                        duration: 5,
                                        ease: "linear",
                                        repeat: Infinity,
                                    }}
                                    style={{
                                        backgroundSize: "200% 200%",
                                    }}
                                >
                                    Bharat
                                </motion.span>
                            </motion.h1>
                        </motion.div>

                        {/* Subtext */}
                        <motion.p
                            variants={heroText}
                            custom={0.3}
                            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg"
                        >
                            Plan, Invest & Grow your wealth with intelligent automation,
                            ML predictions, and smart portfolios.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={heroText}
                            custom={0.4}
                            className="flex flex-wrap items-center gap-4 pt-4"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="group h-12 px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                            >
                                <Link href="/dashboard">
                                    <motion.div
                                        className="flex items-center"
                                        whileHover={buttonHover}
                                        whileTap={buttonTap}
                                    >
                                        Get Started
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </motion.div>
                                </Link>
                            </Button>
                            <motion.div
                                whileHover={buttonHover}
                                whileTap={buttonTap}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="group h-12 px-8 text-base font-semibold border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-300"
                                >
                                    <Play className="mr-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform duration-300" />
                                    Watch Demo
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            variants={heroText}
                            custom={0.5}
                            className="flex items-center gap-5 pt-8"
                        >
                            <div className="flex -space-x-3">
                                {['A', 'B', 'C', 'D'].map((letter: string, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 0.6 + i * 0.1,
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 15,
                                        }}
                                        whileHover={{ scale: 1.2, zIndex: 10 }}
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 border-[3px] border-white dark:border-slate-900 flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg cursor-pointer"
                                    >
                                        {letter}
                                    </motion.div>
                                ))}
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                <span className="font-bold text-slate-700 dark:text-slate-200">5,000+</span> Indian investors trust us
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Portfolio Card */}
                    <motion.div
                        variants={floatingCard}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="relative"
                    >
                        {/* Main Card */}
                        <div className="bg-white dark:bg-slate-900/80 rounded-3xl shadow-2xl shadow-slate-200/70 dark:shadow-black/30 border border-slate-100 dark:border-slate-800 p-8 md:p-10 relative backdrop-blur-sm transition-all duration-500">
                            <motion.div
                                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.02] to-purple-500/[0.02] pointer-events-none"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ type: "tween", duration: 0.5 }}
                            />

                            {/* AI Prediction Badge */}
                            <motion.div
                                className="absolute top-6 md:top-8 right-6 md:right-8 flex items-center gap-2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <span className="text-xs font-medium text-slate-400">AI Prediction:</span>
                                <span className="px-3 py-1 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 rounded-full">
                                    Buy
                                </span>
                            </motion.div>

                            {/* Portfolio Value */}
                            <motion.div
                                className="mb-12 relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <p className="text-sm font-medium text-slate-400 mb-2">Total Portfolio</p>
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                                        ₹12,45,890
                                    </span>
                                    <motion.span
                                        className="flex items-center gap-1.5 text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <TrendingUp size={14} />
                                        +0.3%
                                    </motion.span>
                                </div>
                            </motion.div>

                            {/* Animated Bar Chart */}
                            <div className="flex items-end justify-between gap-1.5 h-40 relative">
                                {barHeights.map((height: number, i: number) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 rounded-t-sm cursor-pointer group relative"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.8 + i * 0.05,
                                            ease: [0.34, 1.56, 0.64, 1],
                                        }}
                                        whileHover={{
                                            height: `${Math.min(height + 5, 100)}%`,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/60 dark:from-primary dark:to-primary/80 rounded-t-sm group-hover:from-primary/80 group-hover:to-primary/60 transition-all duration-300" />
                                        {/* Hover tooltip */}
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                            ₹{(height * 1000).toLocaleString('en-IN')}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Floating decorative elements */}
                        <motion.div
                            className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"
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
                            className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-400/15 rounded-full blur-xl"
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
