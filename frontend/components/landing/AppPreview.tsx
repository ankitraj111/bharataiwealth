"use client"

import { motion } from "framer-motion"
import { Smartphone, Monitor, TrendingUp, PieChart, Bell, BarChart3, Sparkles } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function AppPreview() {
    const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">("desktop")

    const features = [
        { icon: TrendingUp, label: "AI Predictions", color: "from-cyan-400 to-blue-500" },
        { icon: PieChart, label: "Portfolio Analytics", color: "from-purple-400 to-pink-500" },
        { icon: Bell, label: "Smart Alerts", color: "from-orange-400 to-red-500" },
        { icon: BarChart3, label: "Risk Scoring", color: "from-emerald-400 to-teal-500" }
    ]

    return (
        <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#0a0f1a] via-[#0d1321] to-[#0a0f1a]">
            {/* Animated Background Glow Effects */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />

            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-blue-400/30 rounded-full"
                    style={{
                        left: `${15 + i * 12}%`,
                        top: `${25 + (i % 4) * 15}%`
                    }}
                    animate={{
                        y: [0, -40, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3
                    }}
                />
            ))}

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 mb-8 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-4 h-4 text-cyan-400" />
                            </motion.div>
                            <span className="text-xs font-bold text-cyan-300 uppercase tracking-[0.2em]">Available on All Devices</span>
                        </motion.div>

                        {/* Heading */}
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tight">
                            Beautiful on{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Every Screen
                                </span>
                                <motion.div
                                    className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                />
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Access your AI-powered insights anywhere. Our responsive design ensures a{" "}
                            <span className="font-semibold text-white">seamless experience</span> on desktop, tablet, and mobile.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm shadow-lg hover:border-slate-600 transition-all cursor-pointer group"
                                >
                                    <div className={`p-2 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                                        <feature.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{feature.label}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Device Toggle Buttons */}
                        <div className="flex items-center gap-4 justify-center lg:justify-start">
                            <motion.button
                                onClick={() => setActiveDevice("desktop")}
                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${activeDevice === "desktop"
                                    ? "bg-gradient-to-r from-slate-700 to-slate-800 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                                    : "bg-slate-800/50 border border-slate-700/50 hover:border-slate-600"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Monitor className={`w-5 h-5 ${activeDevice === "desktop" ? "text-cyan-400" : "text-slate-400"}`} />
                                <span className={`text-sm font-bold uppercase tracking-wider ${activeDevice === "desktop" ? "text-white" : "text-slate-400"}`}>Desktop</span>
                            </motion.button>
                            <motion.button
                                onClick={() => setActiveDevice("mobile")}
                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${activeDevice === "mobile"
                                    ? "bg-gradient-to-r from-slate-700 to-slate-800 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
                                    : "bg-slate-800/50 border border-slate-700/50 hover:border-slate-600"
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Smartphone className={`w-5 h-5 ${activeDevice === "mobile" ? "text-purple-400" : "text-slate-400"}`} />
                                <span className={`text-sm font-bold uppercase tracking-wider ${activeDevice === "mobile" ? "text-white" : "text-slate-400"}`}>Mobile</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right: App Mockups with Images */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Main Tablet/Desktop Mockup */}
                        <motion.div
                            className="relative z-10"
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {/* Outer Frame with Glow */}
                            <div className="relative">
                                {/* Glow behind device */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-60" />

                                {/* Device Frame */}
                                <div className="relative bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-[2rem] p-3 shadow-2xl border border-slate-500/30">
                                    {/* Screen Bezel */}
                                    <div className="bg-slate-900 rounded-[1.5rem] p-2 shadow-inner">
                                        {/* Browser Chrome */}
                                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/80 rounded-t-xl">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                                            </div>
                                            <div className="flex-1 h-6 bg-slate-700/50 rounded-md mx-4" />
                                        </div>

                                        {/* Tablet Image */}
                                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-b-xl">
                                            <Image
                                                src="/tablet-mockup.png"
                                                alt="AI Asset Insights Dashboard"
                                                fill
                                                className="object-cover object-top"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority
                                            />
                                            {/* Glass overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Mobile Mockup */}
                        <motion.div
                            className="absolute -bottom-6 -right-2 md:right-6 w-32 md:w-40 z-20"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            {/* Glow behind mobile */}
                            <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-[2rem] blur-xl opacity-60" />

                            {/* Phone Frame */}
                            <div className="relative bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 rounded-[1.75rem] p-2 shadow-2xl border border-slate-500/30">
                                <div className="bg-slate-900 rounded-[1.5rem] overflow-hidden relative">
                                    {/* Dynamic Island */}
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-5 bg-black rounded-full z-10 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-slate-800" />
                                    </div>

                                    {/* Mobile Image */}
                                    <div className="relative w-full aspect-[9/19] overflow-hidden">
                                        <Image
                                            src="/mobile-mockup.png"
                                            alt="AI Insights Mobile App"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 20vw"
                                            priority
                                        />
                                        {/* Glass overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute -top-8 -left-8 w-20 h-20 border-2 border-cyan-500/20 rounded-full"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute -bottom-12 left-1/4 w-16 h-16 border-2 border-purple-500/20 rounded-full"
                            animate={{ rotate: [360, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Glow Effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] -z-10" />
                        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] -z-10" />
                    </motion.div>
                </div>
            </div>

            {/* Decorative Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent pointer-events-none" />
        </section>
    )
}
