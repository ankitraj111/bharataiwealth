"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import {
    Target,
    Eye,
    Heart,
    Users,
    TrendingUp,
    Shield,
    Award,
    Sparkles,
    Rocket,
    Brain,
    BarChart3,
    Lock,
    Lightbulb
} from "lucide-react"

const stats = [
    { value: "10,000+", label: "Active Users", icon: Users },
    { value: "₹500Cr+", label: "Assets Tracked", icon: TrendingUp },
    { value: "500+", label: "Stocks Analyzed", icon: BarChart3 },
    { value: "99.9%", label: "Uptime", icon: Shield }
]

const values = [
    {
        title: "AI-First Approach",
        description: "We believe AI should empower every Indian investor, not just the wealthy. Our ML models democratize institutional-grade insights.",
        icon: Brain,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        title: "Transparency",
        description: "No hidden fees, no dark patterns. We're upfront about our pricing, our algorithms, and our limitations.",
        icon: Eye,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        title: "Security First",
        description: "Bank-grade encryption, read-only access, and zero password storage. Your financial data is sacred to us.",
        icon: Lock,
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        title: "Innovation",
        description: "We're constantly pushing boundaries with cutting-edge ML models, sentiment analysis, and predictive algorithms.",
        icon: Lightbulb,
        gradient: "from-orange-500 to-red-500"
    }
]

const team = [
    {
        name: "Ankit Raj",
        role: "Founder & CEO",
        bio: "DRDO Intern with strong experience in quantitative analysis and algorithmic trading strategies. B.Tech student at GGSIPU, Delhi, with a focus on AI-driven financial systems and market risk analysis.",
        gradient: "from-blue-500 to-purple-600"
    },
    {
        name: "Mrinal Kmahato",
        role: "CTO",
        bio: "Former ML Lead at Google. Built recommendation systems serving 100M+ users. PhD in AI from Stanford.",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        name: "....",
        role: "Head of Product",
        bio: "....",
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        name: ".....",
        role: "Head of AI Research",
        bio: "......",
        gradient: "from-orange-500 to-red-500"
    }
]

const milestones = [
    {
        year: "2022",
        title: "The Beginning",
        description: "Founded with a vision to democratize AI-powered wealth management for Indian investors.",
        icon: Rocket
    },
    {
        year: "2023",
        title: "Product Launch",
        description: "Launched beta with 100 early adopters. Achieved 95% user satisfaction rate.",
        icon: Sparkles
    },
    {
        year: "2024",
        title: "Rapid Growth",
        description: "Crossed 10,000 users. Expanded platform features and raised seed funding.",
        icon: TrendingUp
    },
    {
        year: "2025",
        title: "AI Innovation",
        description: "Launched advanced LSTM models and sentiment engine. Tracking ₹500Cr+ in assets.",
        icon: Brain
    }
]

const achievements = [
    "Featured in Economic Times as 'Top 10 Fintech Startups to Watch'",
    "Winner of NASSCOM Emerge 50 Award 2024",
    "Certified by ISO 27001 for Information Security",
    "Partnered with leading Indian financial institutions",
    "Recognized by Forbes India 30 Under 30",
    "Backed by top-tier VCs and angel investors"
]

export default function AboutPage() {
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
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>Our Story</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight"
                        >
                            Empowering India's{" "}
                            <span className="bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                Financial Future
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
                        >
                            We're on a mission to make institutional-grade AI-powered wealth management <br className="hidden md:block" />
                            accessible to every Indian investor, regardless of their portfolio size.
                        </motion.p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-center hover:shadow-xl transition-all"
                            >
                                <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                                <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-900 text-white relative overflow-hidden"
                        >
                            <Target className="w-16 h-16 mb-6" />
                            <h2 className="text-3xl font-black mb-4">Our Mission</h2>
                            <p className="text-white/90 text-lg leading-relaxed">
                                To democratize wealth management by providing every Indian investor with AI-powered insights, 
                                personalized recommendations, and institutional-grade tools that were previously accessible only to the ultra-wealthy.
                            </p>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-10 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-800 text-white relative overflow-hidden"
                        >
                            <Eye className="w-16 h-16 mb-6" />
                            <h2 className="text-3xl font-black mb-4">Our Vision</h2>
                            <p className="text-white/90 text-lg leading-relaxed">
                                To become India's most trusted AI-powered wealth management platform, helping millions of Indians 
                                achieve their financial goals through intelligent automation, data-driven insights, and personalized guidance.
                            </p>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                        </motion.div>
                    </div>

                    {/* Values */}
                    <div className="mb-32">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                                Our Core{" "}
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Values
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400">
                                The principles that guide everything we do
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:shadow-xl transition-all"
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-xl`}>
                                        <value.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="mb-32">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                                Our{" "}
                                <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                                    Journey
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400">
                                Key milestones in our growth story
                            </p>
                        </div>

                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500" />

                            <div className="space-y-12">
                                {milestones.map((milestone, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    >
                                        <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            <div className="p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:shadow-xl transition-all">
                                                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">
                                                    {milestone.year}
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                                    {milestone.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    {milestone.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Timeline Dot */}
                                        <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center shadow-xl flex-shrink-0 relative z-10">
                                            <milestone.icon className="w-8 h-8 text-white" />
                                        </div>

                                        <div className="flex-1 hidden md:block" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Team */}
                    <div className="mb-32">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                                Meet Our{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                                    Team
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400">
                                Passionate experts building the future of wealth management
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="text-center"
                                >
                                    <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-4xl font-black shadow-xl`}>
                                        {member.name.charAt(0)}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        {member.name}
                                    </h3>
                                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                                        {member.role}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {member.bio}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-32">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                                Recognition &{" "}
                                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                                    Awards
                                </span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-3 p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]"
                                >
                                    <Award className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                        {achievement}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="mb-32">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                                Why Choose{" "}
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    Bharat AI Wealth
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400">
                                What makes us different from traditional wealth management platforms
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8 }}
                                className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/30"
                            >
                                <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-6" />
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    Advanced AI Models
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Our LSTM and Transformer models analyze 500+ stocks with 92% accuracy, 
                                    providing predictions that rival institutional-grade systems.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ y: -8 }}
                                className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800/30"
                            >
                                <Shield className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-6" />
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    Bank-Grade Security
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    ISO 27001 certified with 256-bit encryption. Your portfolio data is 
                                    stored securely and never shared with third parties.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ y: -8 }}
                                className="p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800/30"
                            >
                                <Users className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-6" />
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    Made for Indians
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Built specifically for Indian markets with support for NSE, BSE, 
                                    Indian mutual funds, and tax optimization under Indian laws.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
