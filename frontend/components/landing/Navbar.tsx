"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ChevronRight } from "lucide-react"

const navLinks = [
    { name: "Features", href: "/features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" }
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-none border-b border-slate-200/50 dark:border-slate-800/50"
                : "bg-transparent"
                }`}>
                <div className="container mx-auto px-6">
                    <div className="h-18 flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-orange-500 flex items-center justify-center shadow-lg shadow-blue-500/20"
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-white font-bold text-lg">B</span>
                            </motion.div>
                            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                Bharat AI Wealth
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-4">
                            <ThemeToggle />
                            <Link href="/auth/login">
                                <Button
                                    variant="ghost"
                                    className="font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button className="font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/25 rounded-xl">
                                    Get Started
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden items-center gap-3">
                            <ThemeToggle />
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-[72px] z-40 lg:hidden"
                    >
                        <div className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl">
                            <div className="container mx-auto px-6 py-6 space-y-4">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block py-3 text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border-b border-slate-100 dark:border-slate-800"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <div className="pt-4 space-y-3">
                                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full h-12 font-medium rounded-xl">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full h-12 font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl mt-3">
                                            Get Started Free
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
