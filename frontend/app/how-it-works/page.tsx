"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import {
    Link2,
    Brain,
    TrendingUp,
    CheckCircle2,
    Shield,
    Zap,
    BarChart3,
    Bell,
    Users,
    Target,
    Sparkles,
    Play,
    Lock,
    RefreshCw,
    LineChart,
    Activity,
    Globe
} from "lucide-react"

const mainSteps = [
    {
        number: "01",
        title: "Connect Your Broker",
        subtitle: "Secure & Optional",
        description: "Link your Zerodha, Groww, or Upstox account with read-only access. Your credentials stay completely safe with bank-grade encryption.",
        icon: Link2,
        gradient: "from-blue-500 to-cyan-500",
        features: [
            "Read-only API access",
            "256-bit encryption",
            "No password storage",
            "Instant sync"
        ],
        optional: true
    },
    {
        number: "02",
        title: "Get AI Recommendations",
        subtitle: "Powered by Advanced ML",
        description: "Our AI analyzes 500+ stocks, market sentiment, and your risk profile to provide personalized investment insights in real-time.",
        icon: Brain,
        gradient: "from-purple-500 to-pink-500",
        features: [
            "LSTM price predictions",
            "Sentiment analysis",
            "Risk scoring",
            "Portfolio optimization"
        ],
        optional: false
    },
    {
        number: "03",
        title: "Grow Wealth Confidently",
        subtitle: "Track & Optimize",
        description: "Make informed decisions with AI-backed confidence. Track performance, get alerts, optimize taxes, and watch your wealth grow.",
        icon: TrendingUp,
        gradient: "from-emerald-500 to-teal-500",
        features: [
            "Real-time tracking",
            "Smart alerts",
            "Tax optimization",
            "Goal planning"
        ],
        optional: false
    }
]

const detailedProcess = [
    {
        phase: "Setup Phase",
        icon: Shield,
        color: "text-blue-500",
        steps: [
            {
                title: "Create Your Account",
                description: "Sign up in 30 seconds with email or Google. No credit card required.",
                icon: Users
            },
            {
                title: "Set Your Risk Profile",
                description: "Answer 5 quick questions to help our AI understand your investment style.",
                icon: Target
            },
            {
                title: "Connect Brokers (Optional)",
                description: "Link Zerodha/Groww for automatic portfolio sync, or add manually.",
                icon: Link2
            }
        ]
    },
    {
        phase: "Analysis Phase",
        icon: Brain,
        color: "text-purple-500",
        steps: [
            {
                title: "AI Portfolio Analysis",
                description: "Our ML models analyze your holdings, calculate risk scores, and identify opportunities.",
                icon: BarChart3
            },
            {
                title: "Market Intelligence",
                description: "Real-time sentiment analysis from 10,000+ news sources and social signals.",
                icon: Sparkles
            },
            {
                title: "Personalized Insights",
                description: "Get tailored recommendations based on your goals, risk tolerance, and market conditions.",
                icon: Brain
            }
        ]
    },
    {
        phase: "Action Phase",
        icon: Zap,
        color: "text-emerald-500",
        steps: [
            {
                title: "Smart Alerts",
                description: "Receive notifications for stop-loss triggers, rebalancing opportunities, and market events.",
                icon: Bell
            },
            {
                title: "One-Click Optimization",
                description: "Rebalance portfolio, harvest tax losses, and optimize SIPs with AI suggestions.",
                icon: RefreshCw
            },
            {
                title: "Track Progress",
                description: "Monitor performance with beautiful dashboards, charts, and goal tracking.",
                icon: LineChart
            }
        ]
    }
]

const benefits = [
    {
        title: "No Manual Data Entry",
        description: "Automatic sync with your broker means zero manual work.",
        icon: Zap,
        gradient: "from-orange-500 to-red-500"
    },
    {
        title: "Bank-Grade Security",
        description: "Your data is encrypted and never shared with third parties.",
        icon: Lock,
        gradient: "from-blue-500 to-indigo-500"
    },
    {
        title: "Always Up-to-Date",
        description: "Real-time portfolio updates and market data every second.",
        icon: RefreshCw,
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        title: "AI-Powered Insights",
        description: "Advanced ML models working 24/7 to optimize your wealth.",
        icon: Brain,
        gradient: "from-purple-500 to-pink-500"
    }
]

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 selection:bg-primary selection:text-white">
            <Navbar />

            <div className="pt-32 pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                <div className="container mx-auto px-6">
                    {/* Hero Section */}
                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/70 text-sm font-medium mb-8"
                        >
                            <Play className="w-4 h-4 text-blue-500" />
                            <span>Simple 3-Step Process</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight"
                        >
                            How Bharat AI Wealth{" "}
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
                                Works
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
                        >
                            Get started in minutes and let AI handle the complexity. <br className="hidden md:block" />
                            From portfolio analysis to tax optimization, we've got you covered.
                        </motion.p>
                    </div>

                    {/* Main Steps */}
                    <div className="grid md:grid-cols-3 gap-8 mb-32">
                        {mainSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group relative h-full"
                            >
                                <div className="h-full p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] backdrop-blur-md hover:shadow-xl dark:hover:bg-white/[0.06] transition-all duration-500">
                                    {/* Step Number */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl`}>
                                            <span className="text-2xl font-black text-white">{step.number}</span>
                                        </div>
                                        {step.optional && (
                                            <span className="px-2 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                                Optional
                                            </span>
                                        )}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-xl`}>
                                        <step.icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                                        {step.subtitle}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-6">
                                        {step.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2">
                                        {step.features.map((feature, fIndex) => (
                                            <div key={fIndex} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                <span className="text-sm text-slate-600 dark:text-slate-400">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Background Decoration */}
                                    <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-orange-500/10 dark:from-white/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Detailed Process */}
                    <div className="space-y-24">
                        {detailedProcess.map((phase, phaseIndex) => (
                            <div key={phaseIndex} className="relative">
                                {/* Phase Header */}
                                <div className="flex items-center gap-4 mb-10">
                                    <div className={`p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 ${phase.color}`}>
                                        <phase.icon className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight italic uppercase opacity-80">
                                        {phase.phase}
                                    </h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-slate-300 dark:from-white/10 to-transparent" />
                                </div>

                                {/* Steps Grid */}
                                <div className="grid md:grid-cols-3 gap-8">
                                    {phase.steps.map((step, stepIndex) => (
                                        <motion.div
                                            key={stepIndex}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: stepIndex * 0.1 }}
                                            whileHover={{ y: -8 }}
                                            className="group relative h-full"
                                        >
                                            <div className="h-full p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] backdrop-blur-md hover:shadow-xl dark:hover:bg-white/[0.06] transition-all duration-500">
                                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center mb-6">
                                                    <step.icon className={`w-6 h-6 ${phase.color}`} />
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                                                    {step.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    {step.description}
                                                </p>
                                                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-orange-500/10 dark:from-white/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Benefits Grid */}
                    <div className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:shadow-xl transition-all"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4`}>
                                    <benefit.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Highlight Cards */}
                    <div className="mt-32 grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            className="md:col-span-2 p-10 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-900 dark:from-blue-700 dark:to-indigo-950 border border-blue-400/20 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">AI-Powered Intelligence</h3>
                                <p className="text-white/90 text-lg max-w-lg mb-8">
                                    Our advanced ML models analyze market data 24/7 to provide you with real-time insights and personalized recommendations.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <div className="px-5 py-3 rounded-full bg-white/20 backdrop-blur font-bold text-white text-sm">
                                        🤖 LSTM Models
                                    </div>
                                    <div className="px-5 py-3 rounded-full bg-white/20 backdrop-blur font-bold text-white text-sm">
                                        500+ Stocks
                                    </div>
                                </div>
                            </div>
                            <Activity className="absolute bottom-[-20%] right-[-10%] w-80 h-80 text-white/10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            className="p-10 rounded-[3rem] bg-gradient-to-br from-orange-500 to-red-700 dark:from-orange-600 dark:to-red-800 border border-orange-400/20 shadow-2xl flex flex-col justify-between"
                        >
                            <div>
                                <Zap className="w-12 h-12 text-white mb-6" />
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Instant Sync</h3>
                                <p className="text-white/90">Real-time portfolio updates with zero manual work.</p>
                            </div>
                            <div className="mt-8 pt-8 border-t border-white/20">
                                <div className="text-xs font-medium text-white/70 mb-3 uppercase tracking-widest">Supported Brokers</div>
                                <div className="flex gap-2">
                                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur" />
                                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur" />
                                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-40 p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-orange-500 to-red-600 dark:from-slate-800 dark:to-slate-900 text-white text-center relative overflow-hidden shadow-2xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto relative z-10">
                            Join thousands of Indian investors growing their wealth with AI
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 rounded-full bg-white dark:bg-orange-600 text-orange-600 dark:text-white font-bold text-lg shadow-2xl"
                            >
                                Start Free Trial
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 rounded-full bg-white/10 backdrop-blur text-white font-bold text-lg border-2 border-white/20"
                            >
                                Watch Demo
                            </motion.button>
                        </div>
                        <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] text-white/10 dark:text-white/5 -z-0" />
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
