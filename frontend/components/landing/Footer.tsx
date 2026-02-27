"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, MapPin, Twitter, Linkedin, Instagram } from "lucide-react"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        Product: [
            { name: "Features", href: "#features" },
            { name: "How It Works", href: "#how-it-works" },
            { name: "Pricing", href: "/pricing" },
            { name: "API", href: "#" }
        ],
        Company: [
            { name: "About Us", href: "/about" },
            { name: "Careers", href: "#" },
            { name: "Press", href: "#" },
            { name: "Contact", href: "/contact" }
        ],
        Legal: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Cookie Policy", href: "#" },
            { name: "SEBI Compliance", href: "#" }
        ],
        Support: [
            { name: "Help Center", href: "/support" },
            { name: "FAQs", href: "/faq" },
            { name: "Community", href: "#" },
            { name: "Status", href: "#" }
        ]
    }

    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Instagram, href: "#", label: "Instagram" }
    ]

    return (
        <footer className="relative bg-white dark:bg-slate-900 text-slate-900 dark:text-white overflow-hidden">
            {/* Gradient Top Border */}
            <div className="h-px bg-slate-200 dark:bg-slate-700" />

            {/* Main Footer */}
            <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-20 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src={`${basePath}/logo2.png`}
                                alt="Bharat AI Wealth"
                                width={200}
                                height={62}
                                className="h-12 w-auto"
                            />
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 max-w-xs">
                            India&apos;s Next-Gen AI Financial Advisor. Smart investment insights, risk analysis, and institutional-grade personalized advice.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm font-bold">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <a href="mailto:hello@bharataiwealth.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    hello@bharataiwealth.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm font-bold">
                                <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                </div>
                                <span>New Delhi, India</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-8">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    whileHover={{ y: -4, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center transition-all hover:bg-white dark:hover:bg-slate-700 hover:shadow-xl hover:shadow-slate-200 dark:hover:shadow-slate-900"
                                >
                                    <social.icon className="w-5 h-5 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-6">
                                {category}
                            </h4>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-500 dark:text-slate-400 font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            © {currentYear} Bharat AI Wealth. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            <span>Made with</span>
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-red-500"
                            >
                                ❤️
                            </motion.span>
                            <span>in</span>
                            <span className="text-2xl mr-1">🇮🇳</span>
                            <span className="bg-gradient-to-r from-orange-500 via-slate-400 to-green-500 bg-clip-text text-transparent">
                                India
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
