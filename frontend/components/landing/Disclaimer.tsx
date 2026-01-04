"use client"

import { AlertTriangle } from "lucide-react"

export function Disclaimer() {
    return (
        <section className="py-16 bg-muted/30 border-t border-border/50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium mb-6">
                        <AlertTriangle size={16} />
                        Important Disclaimer
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        Bharat AI Wealth provides AI-generated insights based on historical and statistical analysis.
                        This platform does not offer investment advice, does not execute trades, and does not guarantee returns.
                        All predictions are probabilistic in nature and should be used for educational and informational purposes only.
                        Please consult a qualified financial advisor before making any investment decisions.
                    </p>
                </div>
            </div>
        </section>
    )
}
