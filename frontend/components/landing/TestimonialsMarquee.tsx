"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "Priya Sharma",
        role: "Software Engineer, Bengaluru",
        content: "Finally an app that understands Indian markets! The AI recommendations are spot-on.",
        rating: 5,
        avatar: "PS"
    },
    {
        name: "Rahul Mehta",
        role: "CA, Mumbai",
        content: "Tax optimization + portfolio tracking in one place. Saved me 2L in taxes last year!",
        rating: 5,
        avatar: "RM"
    },
    {
        name: "Ananya Reddy",
        role: "Doctor, Hyderabad",
        content: "As a busy professional, I needed something simple. This app makes investing effortless.",
        rating: 5,
        avatar: "AR"
    },
    {
        name: "Vikram Singh",
        role: "Startup Founder, Delhi",
        content: "The risk analysis helped me diversify my portfolio. Best investment decision ever.",
        rating: 5,
        avatar: "VS"
    },
    {
        name: "Sneha Patel",
        role: "MBA Student, Ahmedabad",
        content: "Started SIP with just ₹500! The gamification keeps me motivated to save more.",
        rating: 5,
        avatar: "SP"
    },
    {
        name: "Arjun Kumar",
        role: "IT Manager, Chennai",
        content: "The family portfolio feature is amazing. Managing parents' investments is now easy!",
        rating: 5,
        avatar: "AK"
    },
]

export function TestimonialsMarquee() {
    const duplicatedTestimonials = [...testimonials, ...testimonials]

    return (
        <section className="py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
            <div className="container mx-auto px-6 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Loved by Investors
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Join thousands of happy users across India
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative">
                {/* Gradient Fade Left */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
                {/* Gradient Fade Right */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />

                <motion.div
                    className="flex gap-6"
                    animate={{
                        x: [0, -50 * testimonials.length * 6]
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {duplicatedTestimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="flex-shrink-0 w-80 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg"
                            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                        >
                            {/* Quote Icon */}
                            <Quote className="w-8 h-8 text-blue-500/20 mb-4" />

                            {/* Content */}
                            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
                                "{testimonial.content}"
                            </p>

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
