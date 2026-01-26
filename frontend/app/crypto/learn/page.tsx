"use client"

import { AppShell } from "@/components/app-shell"
import { BookOpenCheck } from "lucide-react"

export default function CryptoLearn() {
    return (
        <AppShell>
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-10">
                <div className="p-6 rounded-xl bg-lime-50 dark:bg-lime-950/30 mb-6">
                    <BookOpenCheck className="h-16 w-16 text-lime-600 dark:text-lime-400" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-3">Neural Academy</h1>
                <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Curating educational tracks for institutional-grade market literacy. Master blockchain fundamentals soon.
                </p>
            </div>
        </AppShell>
    )
}
