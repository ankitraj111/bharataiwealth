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
        <section className="py-24 bg-white dark:bg-slate-800 relative overflow-hidden">
            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                        Loved by{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Indian Investors
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
                        Join thousands of happy users who are growing their wealth with us.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative">
                {/* Gradient Fade Left */}
                <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-white dark:from-slate-800 to-transparent z-10" />
                {/* Gradient Fade Right */}
                <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white dark:from-slate-800 to-transparent z-10" />

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
                            className="flex-shrink-0 w-96 p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40"
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                        >
                            {/* Quote Icon */}
                            <Quote className="w-8 h-8 text-blue-500/20 dark:text-blue-400/20 mb-4" />

                            {/* Content */}
                            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-6 italic">
                                &ldquo;{testimonial.content}&rdquo;
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
                                    <p className="font-black text-slate-900 dark:text-white">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
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
