"use client"

import { AppShell } from "@/components/app-shell"
import { Newspaper } from "lucide-react"

export default function CryptoNews() {
    return (
        <AppShell>
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-10">
                <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-950/30 mb-6">
                    <Newspaper className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">Neural News Hub</h1>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Real-time global crypto headlines and regulatory updates are being indexed. Neural sentiment integration in progress.
                </p>
            </div>
        </AppShell>
    )
}
