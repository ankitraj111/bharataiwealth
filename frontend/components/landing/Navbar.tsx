"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                        Bharat AI Wealth
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <Link href="/auth/login">
                        <Button variant="ghost" className="font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                            Login
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
