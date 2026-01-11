"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
    {
        question: "Is my data safe with Bharat AI Wealth?",
        answer: "Absolutely! We use bank-grade 256-bit encryption for all data. We only have read-only access to your broker accounts — we can never move, withdraw, or trade your funds. Your credentials are never stored on our servers."
    },
    {
        question: "How does the AI generate investment insights?",
        answer: "Our AI uses ensemble machine learning models trained on historical market data, technical indicators, sentiment analysis from news/social media, and your personal risk profile to generate actionable insights. The models are continuously learning and improving."
    },
    {
        question: "Which brokers do you support?",
        answer: "We currently support Zerodha, Groww, Upstox, and Angel One. We're actively adding more brokers. If your broker isn't listed, you can still use manual portfolio entry or CSV import."
    },
    {
        question: "Is this SEBI registered?",
        answer: "We operate as a financial technology platform providing AI-powered insights and analytics. We do not manage your money or execute trades on your behalf. All investment decisions are made by you. We recommend consulting a SEBI-registered advisor for personalized financial advice."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes! You can cancel your subscription at any time from your account settings. There are no cancellation fees or lock-in periods. If you cancel, you'll retain access until the end of your billing period."
    },
    {
        question: "Do you support cryptocurrency?",
        answer: "Yes! We provide AI insights for major cryptocurrencies including Bitcoin, Ethereum, and top altcoins. Our crypto sentiment engine analyzes on-chain data, social trends, and market indicators for better predictions."
    },
    {
        question: "How accurate are the predictions?",
        answer: "Our AI models have shown 70-85% directional accuracy in backtesting. However, past performance doesn't guarantee future results. We recommend using our insights as one input in your decision-making process, not as the sole factor."
    },
    {
        question: "Is there a mobile app?",
        answer: "Our mobile apps for iOS and Android are currently in development and will be launching soon. In the meantime, our website is fully mobile-responsive and works great on all devices."
    }
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section id="faq" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Got Questions?</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                            Frequently Asked
                        </span>{" "}
                        <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Everything you need to know about Bharat AI Wealth.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <span className="font-semibold text-slate-900 dark:text-white pr-4">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions? */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="mailto:hello@bharataiwealth.com"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/20"
                    >
                        Contact Support
                    </a>
                </motion.div>
            </div>
        </section>
    )
}
