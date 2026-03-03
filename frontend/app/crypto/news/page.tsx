"use client"

import { AppShell } from "@/components/app-shell"
import { Newspaper } from "lucide-react"
import { motion } from "framer-motion"

export default function CryptoNews() {
    return (
        <AppShell>
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-10 bg-background/50 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-10 rounded-[2.5rem] bg-accent/10 border border-accent/20 mb-8 relative group"
                >
                    <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Newspaper className="h-20 w-20 text-accent relative z-10" />
                </motion.div>
                <h1 className="text-4xl font-black text-foreground mb-4 italic uppercase tracking-tighter">Neural News Hub</h1>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed font-bold italic opacity-70">
                    Real-time global crypto headlines and regulatory updates are being indexed. Neural sentiment integration in progress.
                </p>
            </div>
        </AppShell>
    )
}
