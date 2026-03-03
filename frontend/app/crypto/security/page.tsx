"use client"

import { AppShell } from "@/components/app-shell"
import { ShieldCheck } from "lucide-react"

export default function CryptoSecurity() {
    return (
        <AppShell>
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-10 bg-background/50">
                <div className="p-8 rounded-[2rem] bg-destructive/10 border border-destructive/20 shadow-xl shadow-destructive/5 mb-8 animate-bounce-slow">
                    <ShieldCheck className="h-20 w-20 text-destructive" />
                </div>
                <h1 className="text-4xl font-black text-foreground mb-4 italic uppercase tracking-tight">Security Alpha Protocol</h1>
                <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed font-medium italic">
                    Platform security disclosure and funds safety documentation. Institutional compliance framework and neural-grade protection protocols coming soon.
                </p>
            </div>
        </AppShell>
    )
}
