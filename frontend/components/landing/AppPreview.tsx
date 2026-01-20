"use client"

import { motion } from "framer-motion"
import { Smartphone, Monitor, TrendingUp, PieChart, Bell, BarChart3, Sparkles } from "lucide-react"
import Image from "next/image"

export function AppPreview() {
    const features = [
        { icon: TrendingUp, label: "AI Predictions", color: "text-blue-500" },
        { icon: PieChart, label: "Portfolio Analytics", color: "text-purple-500" },
        { icon: Bell, label: "Smart Alerts", color: "text-orange-500" },
        { icon: BarChart3, label: "Risk Scoring", color: "text-emerald-500" }
    ]

    return (
        <section className="py-32 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Animated Background Gradient */}
            <motion.div 
                className="absolute inset-0 opacity-30"
                animate={{ 
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                />
            ))}

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800 mb-8 shadow-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">Available on All Devices</span>
                        </motion.div>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                            Beautiful on{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Every Screen
                                </span>
                                <motion.div
                                    className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 blur-sm"
                                    animate={{ scaleX: [0.8, 1, 0.8] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            </span>
                        </h2>

                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Access your AI-powered insights anywhere. Our responsive design ensures a <span className="font-semibold text-slate-900 dark:text-white">seamless experience</span> on desktop, tablet, and mobile.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, type: "spring" }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${feature.color === 'text-blue-500' ? 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30' : feature.color === 'text-purple-500' ? 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30' : feature.color === 'text-orange-500' ? 'from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30' : 'from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30'}`}>
                                        <feature.icon className={`w-4 h-4 ${feature.color}`} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{feature.label}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Device Icons */}
                        <div className="flex items-center gap-8 justify-center lg:justify-start">
                            <motion.div 
                                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Desktop</span>
                            </motion.div>
                            <motion.div 
                                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Mobile</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right: App Mockups with Yellow Circle */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Yellow Organic Circle Background */}
                        <motion.div
                            className="absolute inset-0 -z-10 flex items-center justify-center"
                            animate={{ rotate: [0, 3, 0, -3, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg viewBox="0 0 600 600" className="w-[120%] h-[120%]">
                                <motion.path
                                    d="M 300,80 
                                       C 420,90 510,180 520,300
                                       C 530,420 440,510 320,520
                                       C 200,530 90,440 80,320
                                       C 70,200 160,90 280,80
                                       C 290,79 295,79 300,80 Z"
                                    fill="#FFD700"
                                    stroke="#FFC700"
                                    strokeWidth="12"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.9 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </svg>
                        </motion.div>

                        {/* Desktop Mockup */}
                        <motion.div
                            className="relative z-10 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-[2.5rem] p-5 shadow-2xl border-2 border-white/50 dark:border-slate-600"
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-5 shadow-2xl border border-slate-200 dark:border-slate-700">
                                {/* Browser Bar */}
                                <div className="flex items-center gap-3 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <div className="flex gap-2">
                                        <motion.div 
                                            className="w-3 h-3 rounded-full bg-red-500"
                                            whileHover={{ scale: 1.2 }}
                                        />
                                        <motion.div 
                                            className="w-3 h-3 rounded-full bg-yellow-500"
                                            whileHover={{ scale: 1.2 }}
                                        />
                                        <motion.div 
                                            className="w-3 h-3 rounded-full bg-green-500"
                                            whileHover={{ scale: 1.2 }}
                                        />
                                    </div>
                                    <div className="flex-1 h-7 bg-slate-100 dark:bg-slate-800 rounded-lg mx-3 flex items-center px-3">
                                        <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 mr-2" />
                                        <div className="h-2 flex-1 bg-slate-200 dark:bg-slate-700 rounded" />
                                    </div>
                                </div>

                                {/* App Content Preview - Live Predictions Page */}
                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden shadow-inner">
                                    <div className="relative w-full h-[350px]">
                                        <iframe 
                                            src="/predictions?search=RELIANCE.NS" 
                                            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                                            style={{ 
                                                width: '100%', 
                                                height: '100%',
                                            }}
                                            title="AI Predictions Dashboard Preview"
                                        />
                                        {/* Overlay to prevent interaction */}
                                        <div className="absolute inset-0 bg-transparent pointer-events-auto" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Mobile Mockup (Floating) */}
                        <motion.div
                            className="absolute -bottom-10 -right-6 w-32 md:w-44 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-[2.5rem] p-3 shadow-2xl z-20 border-2 border-white/50 dark:border-slate-600"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-2 shadow-inner border border-slate-100 dark:border-slate-800">
                                {/* Phone Notch */}
                                <div className="w-10 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-3" />

                                {/* App Content - Live Predictions Preview */}
                                <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-[1.5rem] overflow-hidden shadow-inner">
                                    <div className="relative w-full h-24">
                                        <iframe 
                                            src="/predictions?search=RELIANCE.NS" 
                                            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
                                            style={{ 
                                                width: '400%', 
                                                height: '400%',
                                                transform: 'scale(0.25)',
                                                transformOrigin: 'top left'
                                            }}
                                            title="Mobile Predictions Preview"
                                        />
                                        <div className="absolute inset-0 bg-transparent pointer-events-auto" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Glow Effects */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl -z-20" />
                        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-20" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
