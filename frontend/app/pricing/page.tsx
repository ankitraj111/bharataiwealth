"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/Navbar"
import { Footer } from "@/components/landing/Footer"
import {
    Check,
    Sparkles,
    Zap,
    Crown,
    ArrowRight,
    X,
    HelpCircle,
    Shield,
    TrendingUp,
    Users,
    Rocket,
    Star,
    DollarSign
} from "lucide-react"

const plans = [
    {
        name: "Starter",
        price: 0,
        period: "forever",
        description: "Perfect for beginners exploring AI-powered investing.",
        icon: Sparkles,
        gradient: "from-slate-500 to-slate-600",
        features: [
            { name: "Portfolio tracking", included: true, limit: "Up to 3 portfolios" },
            { name: "AI insights", included: true, limit: "3 per day" },
            { name: "Broker connections", included: true, limit: "1 broker" },
            { name: "Risk scoring", included: true, limit: "Basic" },
            { name: "Community support", included: true },
            { name: "Mobile app access", included: true },
            { name: "Stop-loss alerts", included: false },
            { name: "Portfolio rebalancing", included: false },
            { name: "Sentiment analysis", included: false },
            { name: "Tax optimization", included: false },
            { name: "Priority support", included: false },
            { name: "API access", included: false }
        ],
        cta: "Get Started Free",
        popular: false
    },
    {
        name: "Pro",
        price: 499,
        period: "/month",
        description: "For serious investors who want the full AI advantage.",
        icon: Zap,
        gradient: "from-blue-500 to-purple-600",
        features: [
            { name: "Portfolio tracking", included: true, limit: "Unlimited" },
            { name: "AI insights", included: true, limit: "Unlimited" },
            { name: "Broker connections", included: true, limit: "5 brokers" },
            { name: "Risk scoring", included: true, limit: "Advanced" },
            { name: "Community support", included: true },
            { name: "Mobile app access", included: true },
            { name: "Stop-loss alerts", included: true },
            { name: "Portfolio rebalancing", included: true },
            { name: "Sentiment analysis", included: true },
            { name: "Tax optimization", included: true, limit: "Basic" },
            { name: "Priority support", included: true },
            { name: "API access", included: false }
        ],
        cta: "Start 14-Day Trial",
        popular: true
    },
    {
        name: "Enterprise",
        price: 1999,
        period: "/month",
        description: "For families and HNIs with complex portfolios.",
        icon: Crown,
        gradient: "from-amber-500 to-orange-600",
        features: [
            { name: "Portfolio tracking", included: true, limit: "Unlimited" },
            { name: "AI insights", included: true, limit: "Unlimited" },
            { name: "Broker connections", included: true, limit: "Unlimited" },
            { name: "Risk scoring", included: true, limit: "Custom AI models" },
            { name: "Community support", included: true },
            { name: "Mobile app access", included: true },
            { name: "Stop-loss alerts", included: true },
            { name: "Portfolio rebalancing", included: true },
            { name: "Sentiment analysis", included: true },
            { name: "Tax optimization", included: true, limit: "Advanced" },
            { name: "Priority support", included: true, limit: "Dedicated manager" },
            { name: "API access", included: true }
        ],
        cta: "Contact Sales",
        popular: false
    }
]

const faqs = [
    {
        question: "Can I switch plans anytime?",
        answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges."
    },
    {
        question: "Is there a free trial?",
        answer: "Pro and Enterprise plans come with a 14-day free trial. No credit card required to start."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure payment gateway."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We use bank-grade 256-bit encryption and never store your broker passwords. All connections are read-only."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
    },
    {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
    }
]

const testimonials = [
    {
        name: "Rajesh Kumar",
        role: "Software Engineer",
        plan: "Pro",
        quote: "The AI insights helped me optimize my portfolio and save ₹45,000 in taxes last year!",
        rating: 5
    },
    {
        name: "Priya Sharma",
        role: "Business Owner",
        plan: "Enterprise",
        quote: "Managing my family's wealth has never been easier. The dedicated support is worth every rupee.",
        rating: 5
    },
    {
        name: "Amit Patel",
        role: "Investor",
        plan: "Pro",
        quote: "Started with the free plan, upgraded to Pro within a week. The predictions are incredibly accurate!",
        rating: 5
    }
]

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false)
    const [openFaq, setOpenFaq] = useState<number | null>(null)

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
                            <DollarSign className="w-4 h-4 text-emerald-500" />
                            <span>Simple, Transparent Pricing</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight"
                        >
                            Choose the Perfect{" "}
                            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                                Plan for You
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10"
                        >
                            Start free and upgrade as you grow. No hidden fees, cancel anytime. <br className="hidden md:block" />
                            All plans include our core AI-powered features.
                        </motion.p>

                        {/* Billing Toggle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center justify-center gap-4"
                        >
                            <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
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
                            <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                                Annual
                            </span>
                            {isAnnual && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 rounded-full"
                                >
                                    Save 20%
                                </motion.span>
                            )}
                        </motion.div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
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

                                <div className={`h-full p-8 rounded-3xl bg-white dark:bg-white/[0.03] border ${plan.popular ? 'border-blue-200 dark:border-blue-800/50 shadow-2xl' : 'border-slate-200 dark:border-white/[0.08]'} backdrop-blur-md transition-all duration-500`}>
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-6 shadow-xl`}>
                                        <plan.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Plan Name */}
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                                        {plan.name}
                                    </h3>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-5xl font-black text-slate-900 dark:text-white">
                                            {plan.price === 0 ? "Free" : `₹${isAnnual ? Math.round(plan.price * 12 * 0.8) : plan.price}`}
                                        </span>
                                        {plan.price !== 0 && (
                                            <span className="text-slate-400 dark:text-slate-500 font-bold text-sm">
                                                {isAnnual ? '/year' : plan.period}
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                        {plan.description}
                                    </p>

                                    {/* CTA */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`w-full h-14 font-bold rounded-2xl mb-8 flex items-center justify-center gap-2 ${plan.popular
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                                            : 'bg-slate-900 dark:bg-slate-700 text-white hover:bg-slate-800 dark:hover:bg-slate-600'
                                            } transition-all`}
                                    >
                                        {plan.cta}
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>

                                    {/* Features */}
                                    <div className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-500'}`} />
                                                ) : (
                                                    <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-slate-300 dark:text-slate-600" />
                                                )}
                                                <div className="flex-1">
                                                    <span className={`text-sm font-medium ${feature.included ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                                                        {feature.name}
                                                    </span>
                                                    {feature.limit && (
                                                        <span className="block text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                                                            {feature.limit}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonials */}
                    <div className="mb-32">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                                Loved by{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                                    Investors
                                </span>
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400">
                                See what our users have to say about their experience
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="p-8 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:shadow-xl transition-all"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed italic">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-white">{testimonial.name}</div>
                                            <div className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role} • {testimonial.plan} Plan</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                                Frequently Asked{" "}
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    Questions
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden bg-white dark:bg-white/[0.03]"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors"
                                    >
                                        <span className="font-bold text-slate-900 dark:text-white pr-4">
                                            {faq.question}
                                        </span>
                                        <HelpCircle className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: openFaq === index ? 'auto' : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-32 p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-900 text-white text-center relative overflow-hidden shadow-2xl"
                    >
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black mb-6">
                                Ready to Start Growing?
                            </h2>
                            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                                Join thousands of Indian investors who trust Bharat AI Wealth
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 rounded-full bg-white text-blue-600 font-bold text-lg shadow-2xl"
                                >
                                    Start Free Trial
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 rounded-full bg-white/10 backdrop-blur text-white font-bold text-lg border-2 border-white/20"
                                >
                                    Talk to Sales
                                </motion.button>
                            </div>
                        </div>
                        <Rocket className="absolute top-10 right-10 w-32 h-32 text-white/10 rotate-45" />
                        <Shield className="absolute bottom-10 left-10 w-24 h-24 text-white/10" />
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
