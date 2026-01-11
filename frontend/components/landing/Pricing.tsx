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
            "1 broker connection",
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
            "5 broker connections",
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
            "Unlimited broker connections",
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
        <section id="pricing" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.span
                        className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Simple Pricing
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                            Choose Your
                        </span>{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Plan
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                        Start free and upgrade as you grow. No hidden fees, cancel anytime.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-medium ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                        >
                            <motion.div
                                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                                animate={{ left: isAnnual ? '32px' : '4px' }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                            Annual
                        </span>
                        {isAnnual && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="px-2 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
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

                            <div className={`h-full p-8 rounded-3xl bg-gradient-to-b ${plan.bgGradient} backdrop-blur-sm border ${plan.popular ? 'border-blue-300 dark:border-blue-700 shadow-2xl shadow-blue-500/20' : 'border-slate-200 dark:border-slate-700 shadow-xl'} transition-all duration-300`}>
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-6`}>
                                    <plan.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Plan Name */}
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {plan.name}
                                </h3>

                                {/* Price */}
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                        {plan.price === "Free" ? "Free" : isAnnual ? `₹${Math.round(parseInt(plan.price.replace('₹', '').replace(',', '')) * 0.8)}` : plan.price}
                                    </span>
                                    {plan.price !== "Free" && (
                                        <span className="text-slate-500 dark:text-slate-400">{plan.period}</span>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    {plan.description}
                                </p>

                                {/* CTA */}
                                <Link href={plan.name === "Enterprise" ? "/contact" : "/dashboard"}>
                                    <Button
                                        className={`w-full h-12 font-semibold rounded-xl mb-8 ${plan.popular
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                                                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
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
                                            <Check className={`w-5 h-5 mt-0.5 ${plan.popular ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-500'}`} />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
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
