"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter } from "lucide-react"

const team = [
    {
        name: "Rajesh Kumar",
        role: "Founder & CEO",
        bio: "Ex-Goldman Sachs, IIT Delhi. 15+ years in quantitative finance.",
        avatar: "RK",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        name: "Priya Sharma",
        role: "CTO",
        bio: "Ex-Google AI, Stanford CS PhD. ML expert with 50+ published papers.",
        avatar: "PS",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        name: "Amit Patel",
        role: "Head of Product",
        bio: "Ex-Zerodha, IIMA. Built products used by 10M+ investors.",
        avatar: "AP",
        gradient: "from-orange-500 to-amber-500"
    },
    {
        name: "Neha Gupta",
        role: "Head of Design",
        bio: "Ex-Chargebee, NID. Passionate about fintech UX.",
        avatar: "NG",
        gradient: "from-emerald-500 to-teal-500"
    }
]

export function Team() {
    return (
        <section id="team" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-slate-900 dark:via-purple-950/20 dark:to-slate-900" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-700 dark:text-purple-300 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Our Team
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                            Built by
                        </span>{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                            Experts
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        A world-class team from India&apos;s top institutions and global tech giants.
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <div className="h-full p-6 rounded-3xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 shadow-xl text-center transition-all duration-300 hover:shadow-2xl">
                                {/* Avatar */}
                                <motion.div
                                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-5 shadow-lg`}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <span className="text-2xl font-bold text-white">{member.avatar}</span>
                                </motion.div>

                                {/* Info */}
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                    {member.name}
                                </h3>
                                <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-3`}>
                                    {member.role}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                                    {member.bio}
                                </p>

                                {/* Social Links */}
                                <div className="flex justify-center gap-3">
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                    >
                                        <Linkedin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                    >
                                        <Twitter className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
