"use client"

import { motion } from "framer-motion"
import { Smartphone, Monitor, TrendingUp, PieChart, Bell, BarChart3 } from "lucide-react"

export function AppPreview() {
    const features = [
        { icon: TrendingUp, label: "AI Predictions", color: "text-blue-500" },
        { icon: PieChart, label: "Portfolio Analytics", color: "text-purple-500" },
        { icon: Bell, label: "Smart Alerts", color: "text-orange-500" },
        { icon: BarChart3, label: "Risk Scoring", color: "text-emerald-500" }
    ]

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            {/* Floating Orbs */}
            <motion.div
                className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Smartphone className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-semibold text-white/80">Available on All Devices</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Beautiful on{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Every Screen
                            </span>
                        </h2>

                        <p className="text-lg text-white/70 mb-10 max-w-lg mx-auto lg:mx-0">
                            Access your AI-powered insights anywhere. Our responsive design ensures a seamless experience on desktop, tablet, and mobile.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
                                >
                                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                                    <span className="text-sm font-medium text-white/80">{feature.label}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Device Icons */}
                        <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
                            <div className="flex items-center gap-2 text-white/50">
                                <Monitor className="w-6 h-6" />
                                <span className="text-sm">Desktop</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/50">
                                <Smartphone className="w-5 h-5" />
                                <span className="text-sm">Mobile</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: App Mockups */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Desktop Mockup */}
                        <motion.div
                            className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-1 shadow-2xl"
                            whileHover={{ y: -5 }}
                        >
                            <div className="bg-slate-900 rounded-xl p-4">
                                {/* Browser Bar */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500" />
                                    </div>
                                    <div className="flex-1 h-6 bg-slate-800 rounded-lg mx-2" />
                                </div>

                                {/* App Content Preview */}
                                <div className="bg-gradient-to-br from-slate-800 to-slate-850 rounded-lg p-6 space-y-4">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500" />
                                            <div>
                                                <div className="h-4 w-24 bg-slate-700 rounded mb-1" />
                                                <div className="h-3 w-16 bg-slate-700/50 rounded" />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-slate-700" />
                                            <div className="w-8 h-8 rounded-lg bg-slate-700" />
                                        </div>
                                    </div>

                                    {/* Portfolio Card */}
                                    <div className="bg-slate-700/50 rounded-xl p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="h-4 w-20 bg-slate-600 rounded" />
                                            <div className="h-5 w-16 bg-emerald-500/30 rounded-full" />
                                        </div>
                                        <div className="h-6 w-32 bg-slate-600 rounded mb-2" />
                                        <div className="flex gap-1 h-20">
                                            {[40, 55, 45, 60, 50, 70, 65].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex-1 rounded-sm bg-gradient-to-t from-blue-500 to-cyan-400"
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${h}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.5 + i * 0.1 }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { color: 'from-blue-500 to-cyan-500' },
                                            { color: 'from-purple-500 to-pink-500' },
                                            { color: 'from-orange-500 to-amber-500' }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-slate-700/50 rounded-lg p-3">
                                                <div className={`h-2 w-8 rounded bg-gradient-to-r ${stat.color} mb-2`} />
                                                <div className="h-4 w-12 bg-slate-600 rounded" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mobile Mockup (Floating) */}
                        <motion.div
                            className="absolute -bottom-8 -right-8 w-32 md:w-40 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-1 shadow-2xl z-20"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="bg-slate-900 rounded-[20px] p-2">
                                {/* Phone Notch */}
                                <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-2" />

                                {/* App Content */}
                                <div className="bg-gradient-to-br from-slate-800 to-slate-850 rounded-xl p-3 space-y-2">
                                    <div className="h-3 w-16 bg-slate-700 rounded" />
                                    <div className="h-5 w-20 bg-slate-600 rounded" />
                                    <div className="flex gap-0.5 h-12">
                                        {[35, 50, 40, 55, 45].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                className="flex-1 rounded-sm bg-gradient-to-t from-purple-500 to-pink-400"
                                                initial={{ height: 0 }}
                                                whileInView={{ height: `${h}%` }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.8 + i * 0.1 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Glow Effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
