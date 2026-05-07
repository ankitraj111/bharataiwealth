"use client"

import Link from "next/link"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const links = {
        Product: ["Features", "How It Works", "Pricing", "API Access"],
        Company: ["About Us", "Careers", "Press", "Contact"],
        Resources: ["Help Center", "Documentation", "Blog", "System Status"],
        Legal: ["Privacy Policy", "Terms of Service", "Compliance", "Security"]
    }

    return (
        <footer className="py-16 border-t border-border/40 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
                    <div className="col-span-2 lg:col-span-1 space-y-6">
                        {/* Option 1: Premium Gold */}
                        <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400 bg-clip-text text-transparent">
                            Bharat AI Wealth
                        </Link>

                        {/* Option 2: Royal Gold (Uncomment to use)
                        <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-700 dark:from-yellow-400 dark:via-amber-300 dark:to-yellow-500 bg-clip-text text-transparent">
                            Bharat AI Wealth
                        </Link>
                        */}

                        {/* Option 3: Elegant Navy Blue (Uncomment to use)
                        <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-500 bg-clip-text text-transparent">
                            Bharat AI Wealth
                        </Link>
                        */}

                        {/* Option 4: Emerald Green (Uncomment to use)
                        <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-700 dark:from-emerald-400 dark:via-green-300 dark:to-emerald-500 bg-clip-text text-transparent">
                            Bharat AI Wealth
                        </Link>
                        */}

                        {/* Option 5: Deep Purple (Uncomment to use)
                        <Link href="/" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-700 via-violet-600 to-purple-800 dark:from-purple-400 dark:via-violet-300 dark:to-purple-500 bg-clip-text text-transparent">
                            Bharat AI Wealth
                        </Link>
                        */}
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs font-medium">
                            India's next-generation AI-powered financial advisor. Delivering institutional-grade investment insights and personalized wealth management solutions.
                        </p>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            {/* Social placeholders could go here */}
                        </div>
                    </div>

                    {Object.entries(links).map(([category, items]) => (
                        <div key={category} className="space-y-5">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">{category}</h4>
                            <ul className="space-y-3">
                                {items.map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs font-semibold text-muted-foreground">
                        © {currentYear} Bharat AI Wealth. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-semibold text-muted-foreground">
                        <Link href="#" className="hover:text-primary transition-colors">System Status</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Security</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
