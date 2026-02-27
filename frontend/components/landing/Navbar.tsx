"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, ChevronRight } from "lucide-react"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';


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
                ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 border-b border-slate-100 dark:border-slate-800"
                : "bg-transparent"
                }`}>
                <div className="w-full px-4 sm:px-10 ">
                    <div className="h-18 flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                           <div className="w-[50px] sm:w-[60px] md:w-[70px] flex items-center justify-center h-full overflow-hidden">
                               <img src={`${basePath}/logo2.png`} alt="Bharat AI Wealth" className="h-[30px] sm:h-[35px] md:h-[40px] w-full object-contain"/>
                    </div>
                            <span className="text-lg sm:text-xl md:text-2xl font-black text-[#1E3A8A] dark:text-[#D4AF37] tracking-tight">
                                Bharat <span className="bg-gradient-to-r 
from-[#1E88E5] 
 
via-[#8B64AA] 
to-[#FFC107] 
bg-clip-text 
text-transparent italic">AI Wealth</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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
                                    className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button className="h-12 px-8 text-[11px] font-black uppercase tracking-[0.2em] bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 rounded-[1rem] transition-all hover:scale-[1.03]">
                                    Get Started
                                    <ChevronRight className="w-4 h-4 ml-2" />
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
