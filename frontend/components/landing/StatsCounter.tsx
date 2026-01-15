"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, TrendingUp, Shield, Zap } from "lucide-react"

const stats = [
    {
        value: 50000,
        suffix: "+",
        label: "Active Users",
        icon: Users,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        value: 10,
        suffix: "M+",
        label: "AI Insights Generated",
        icon: TrendingUp,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        value: 99.9,
        suffix: "%",
        label: "Platform Uptime",
        icon: Shield,
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        value: 500,
        suffix: "+",
        label: "Crores Tracked",
        icon: Zap,
        gradient: "from-orange-500 to-amber-500"
    }
]

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!inView) return

        const duration = 2000
        const steps = 60
        const stepValue = value / steps
        const stepDuration = duration / steps
        let current = 0

        const timer = setInterval(() => {
            current += stepValue
            if (current >= value) {
                setCount(value)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, stepDuration)

        return () => clearInterval(timer)
    }, [value, inView])

    const displayValue = value % 1 === 0 ? count.toLocaleString() : count.toFixed(1)

    return (
        <span>
            {displayValue}{suffix}
        </span>
    )
}

export function StatsCounter() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section ref={ref} className="py-24 relative overflow-hidden bg-white">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />

            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
                backgroundSize: '40px 40px'
            }} />

            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            {/* Icon */}
                            <motion.div
                                className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                <stat.icon className="w-7 h-7 text-white" />
                            </motion.div>

                            {/* Value */}
                            <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                            </div>

                            {/* Label */}
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
