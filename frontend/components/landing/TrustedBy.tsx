"use client"

import { motion } from "framer-motion"

// Trusted by logos - Major Indian companies and institutions
const trustedLogos = [
    { name: "SEBI", subtitle: "Registered" },
    { name: "RBI", subtitle: "Compliant" },
    { name: "AWS", subtitle: "Secured" },
    { name: "ISO", subtitle: "27001" },
    { name: "NSE", subtitle: "Partner" },
]

export function TrustedBy() {
    return (
        <section className="py-12 bg-white dark:bg-slate-800 border-y border-slate-100 dark:border-slate-700 relative overflow-hidden">
            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {trustedLogos.map((logo, index) => (
                        <motion.div
                            key={logo.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md dark:hover:shadow-slate-900/50 transition-all"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">{logo.name}</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{logo.name}</p>
                                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{logo.subtitle}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
