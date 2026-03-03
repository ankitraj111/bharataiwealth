"use client"

import { AppShell } from "@/components/app-shell"
import { BookOpenCheck } from "lucide-react"
import { motion } from "framer-motion"

export default function CryptoLearn() {
    return (
        <AppShell>
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-10 bg-background/50 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-10 rounded-[2.5rem] bg-primary/10 border border-primary/20 mb-8 relative group"
                >
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <BookOpenCheck className="h-20 w-20 text-primary relative z-10" />
                </motion.div>
                <h1 className="text-4xl font-black text-foreground mb-4 italic uppercase tracking-tighter">Neural Academy</h1>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed font-bold italic opacity-70">
                    Curating high-fidelity educational tracks for institutional-grade market literacy. Master blockchain fundamentals soon.
                </p>
            </div>
        </AppShell>
    )
}
