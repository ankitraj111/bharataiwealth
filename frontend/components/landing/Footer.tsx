"use client"

import Link from "next/link"

export function Footer() {
    const currentYear = new Date().getFullYear()

    const links = {
        About: ["Our Mission", "Team", "Careers", "Contact"],
        Platform: ["AI Intelligence", "Portfolio Framework", "Wealth Navigator", "Security"],
        Resources: ["Support Center", "API Documentation", "Methodology", "Status"],
        Legal: ["Privacy Policy", "Terms of Service", "Compliance", "Cookie Policy"]
    }

    return (
        <footer className="py-20 border-t border-border/50 bg-background">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-2 lg:col-span-1 space-y-6">
                        <Link href="/" className="text-xl font-serif font-bold tracking-tight text-primary">
                            Bharat AI Wealth
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Luxury-grade financial intelligence, proudly built in Bharat for the global Indian.
                        </p>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            {/* Social placeholders could go here */}
                        </div>
                    </div>

                    {Object.entries(links).map(([category, items]) => (
                        <div key={category} className="space-y-6">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/80">{category}</h4>
                            <ul className="space-y-4">
                                {items.map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs font-medium text-muted-foreground">
                        © {currentYear} Bharat AI Wealth — Made in Bharat 🇮🇳
                    </p>
                    <div className="flex items-center gap-8 text-xs font-medium text-muted-foreground">
                        <Link href="#" className="hover:text-primary">System Status</Link>
                        <Link href="#" className="hover:text-primary">Security Audits</Link>
                        <Link href="#" className="hover:text-primary">Compliance Reports</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
