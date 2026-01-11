"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Global error:", error)
    }, [error])

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted">
                    <Card className="max-w-lg w-full border-destructive/20 shadow-2xl">
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                                <AlertTriangle className="h-8 w-8 text-destructive" />
                            </div>
                            <CardTitle className="text-2xl font-bold">Something went wrong!</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-6">
                            <p className="text-muted-foreground">
                                We encountered an unexpected error. Our team has been notified and is working on a fix.
                            </p>

                            {error.digest && (
                                <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                                    Error ID: {error.digest}
                                </p>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button onClick={reset} className="gap-2">
                                    <RefreshCw className="h-4 w-4" />
                                    Try Again
                                </Button>
                                <Button variant="outline" asChild className="gap-2">
                                    <Link href="/dashboard">
                                        <Home className="h-4 w-4" />
                                        Go to Dashboard
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </body>
        </html>
    )
}
