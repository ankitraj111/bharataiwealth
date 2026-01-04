"use client"

import { Lock, XCircle, AlertTriangle, Eye, FileCheck, Scale } from "lucide-react"

export function Compliance() {
    const items = [
        { title: "Secure Authentication", icon: Lock },
        { title: "No Trade Execution", icon: XCircle },
        { title: "No Guaranteed Returns", icon: AlertTriangle },
        { title: "Transparent AI Logic", icon: Eye },
        { title: "Clear Disclaimers", icon: FileCheck },
        { title: "Compliance-First Mindset", icon: Scale },
    ]

    return (
        <section id="compliance" className="py-28 bg-muted/20 border-y border-border/50">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Security, Ethics & Transparency
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                            Trust is built through transparency, not promises.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
                        {items.map((item, index) => (
                            <div key={index} className="text-center space-y-4">
                                <div className="mx-auto w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-primary border-primary/10">
                                    <item.icon size={22} />
                                </div>
                                <p className="text-sm font-semibold tracking-tight leading-tight">{item.title}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-10 md:p-12 rounded-3xl glass-card border-primary/10 text-center">
                        <h3 className="text-2xl font-bold mb-6">Our Integrity Commitment</h3>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                            Bharat AI Wealth is an intelligence platform, not a trading platform.
                            We do not handle your money, execute trades, or provide investment advice.
                            Our mission is to provide you with the data and insights needed to make
                            informed decisions in the Indian market.
                        </p>
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold tracking-wide">
                            Institutional Standards • Pure Intelligence
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
