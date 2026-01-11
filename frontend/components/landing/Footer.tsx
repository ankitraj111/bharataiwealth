"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, MapPin, Twitter, Linkedin, Instagram } from "lucide-react"

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
        <footer className="relative bg-slate-900 dark:bg-slate-950 text-white overflow-hidden">
            {/* Gradient Top Border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />

            {/* Main Footer */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">B</span>
                                </div>
                                <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                    Bharat AI Wealth
                                </span>
                            </div>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                            India&apos;s Next-Gen AI Financial Advisor. Smart investment insights, risk analysis, and personalized advice.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <a href="mailto:hello@bharataiwealth.com" className="hover:text-white transition-colors">
                                    hello@bharataiwealth.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <MapPin className="w-4 h-4 text-orange-400" />
                                <span>Bangalore, India</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 mt-6">
                            {socialLinks.map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                                >
                                    <social.icon className="w-5 h-5 text-slate-400" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-white transition-colors"
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
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-slate-500">
                            © {currentYear} Bharat AI Wealth. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-500">Made with</span>
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-red-500"
                            >
                                ❤️
                            </motion.span>
                            <span className="text-slate-500">in</span>
                            <span className="text-2xl">🇮🇳</span>
                            <span className="font-semibold bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">
                                India
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
