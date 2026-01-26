"use client"

import { AppShell } from "@/components/app-shell"
import { ShieldCheck } from "lucide-react"

export default function CryptoSecurity() {
    return (
        <AppShell>
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-10">
                <div className="p-6 rounded-xl bg-rose-50 dark:bg-rose-950/30 mb-6">
                    <ShieldCheck className="h-16 w-16 text-rose-600 dark:text-rose-400" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">Security Protocol</h1>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Platform security disclosure and funds safety documentation. Institutional compliance framework coming soon.
                </p>
            </div>
        </AppShell>
    )
}
