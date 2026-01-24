"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react"

const plans = [
    {
        name: "Starter",
        price: "Free",
        period: "forever",
        description: "Perfect for beginners exploring AI-powered investing.",
        icon: Sparkles,
        gradient: "from-slate-500 to-slate-600",
        bgGradient: "from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50",
        features: [
            "Basic portfolio tracking",
            "3 AI insights per day",
            "Manual portfolio entry",
            "Community support",
            "Basic risk score"
        ],
        cta: "Get Started Free",
        popular: false
    },
    {
        name: "Pro",
        price: "₹499",
        period: "/month",
        description: "For serious investors who want the full AI advantage.",
        icon: Zap,
        gradient: "from-blue-500 to-purple-600",
        bgGradient: "from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30",
        features: [
            "Unlimited portfolio tracking",
            "Unlimited AI insights",
            "CSV import & export",
            "Priority support",
            "Advanced risk scoring",
            "Stop-loss alerts",
            "Portfolio rebalancing",
            "Sentiment analysis"
        ],
        cta: "Start 14-Day Trial",
        popular: true
    },
    {
        name: "Enterprise",
        price: "₹1,999",
        period: "/month",
        description: "For families and HNIs with complex portfolios.",
        icon: Crown,
        gradient: "from-amber-500 to-orange-600",
        bgGradient: "from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30",
        features: [
            "Everything in Pro",
            "Unlimited portfolio imports",
            "Family accounts (up to 5)",
            "Dedicated account manager",
            "Custom AI models",
            "Tax optimization",
            "API access",
            "White-glove onboarding"
        ],
        cta: "Contact Sales",
        popular: false
    }
]

export function Pricing() {
    const [isAnnual, setIsAnnual] = useState(false)

    return (
        <section id="pricing" className="py-24 relative overflow-hidden bg-white dark:bg-slate-900">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-900 via-slate-50 dark:via-slate-800 to-white dark:to-slate-900" />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 mb-6 uppercase tracking-[0.2em]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Simple Pricing
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Choose Your{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Plan
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-10">
                        Start free and upgrade as you grow. No hidden fees, cancel anytime.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-black uppercase tracking-widest ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            <motion.div
                                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                                animate={{ left: isAnnual ? '32px' : '4px' }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-sm font-black uppercase tracking-widest ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                            Annual
                        </span>
                        {isAnnual && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="px-2 py-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 rounded-full uppercase tracking-wider"
                            >
                                Save 20%
                            </motion.span>
                        )}
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <span className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className={`h-full p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border ${plan.popular ? 'border-blue-200 dark:border-blue-800 shadow-2xl shadow-blue-500/10 dark:shadow-blue-900/20' : 'border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40'} transition-all duration-300`}>
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-6`}>
                                    <plan.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Plan Name */}
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                                    {plan.name}
                                </h3>

                                {/* Price */}
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                                        {plan.price === "Free" ? "Free" : isAnnual ? `₹${Math.round(parseInt(plan.price.replace('₹', '').replace(',', '')) * 0.8)}` : plan.price}
                                    </span>
                                    {plan.price !== "Free" && (
                                        <span className="text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-wider">{plan.period}</span>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-slate-600 dark:text-slate-300 font-medium mb-8 leading-relaxed">
                                    {plan.description}
                                </p>

                                {/* CTA */}
                                <Link href={plan.name === "Enterprise" ? "/contact" : "/dashboard"}>
                                    <Button
                                        className={`w-full h-14 font-black rounded-2xl mb-8 uppercase tracking-widest text-xs ${plan.popular
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition-transform text-white shadow-xl shadow-blue-500/20'
                                            : 'bg-slate-900 text-white hover:bg-slate-800'
                                            }`}
                                    >
                                        {plan.cta}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>

                                {/* Features */}
                                <ul className="space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className={`w-5 h-5 mt-0.5 ${plan.popular ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-500 dark:text-emerald-400'}`} />
                                            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
