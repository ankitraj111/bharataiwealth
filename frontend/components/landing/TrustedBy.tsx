"use client"

import { motion } from "framer-motion"

// Trusted by logos - Major Indian companies and institutions
const trustedLogos = [
    { name: "IIT", subtitle: "Alumni" },
    { name: "SEBI", subtitle: "Registered" },
    { name: "RBI", subtitle: "Compliant" },
    { name: "AWS", subtitle: "Secured" },
    { name: "ISO", subtitle: "27001" },
    { name: "NSE", subtitle: "Partner" },
]

export function TrustedBy() {
    return (
        <section className="py-12 bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-200/50 dark:border-slate-800/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Trusted by 50,000+ Indian Investors
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {trustedLogos.map((logo, index) => (
                        <motion.div
                            key={logo.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">{logo.name}</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">{logo.name}</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">{logo.subtitle}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
