"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, ShieldAlert, Link as LinkIcon, ExternalLink, Loader2 } from "lucide-react"
import { fetchKiteStatus, fetchKiteLoginUrl } from "@/lib/api"

export function KiteConnector() {
    const [status, setStatus] = useState<{ is_active: boolean; api_key_configured: boolean } | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getStatus() {
            const data = await fetchKiteStatus()
            if (data) setStatus(data)
            setIsLoading(false)
        }
        getStatus()
    }, [])

    const handleConnect = async () => {
        const data = await fetchKiteLoginUrl()
        if (data?.login_url) {
            window.open(data.login_url, "_blank")
        }
    }

    if (isLoading) return null

    return (
        <Card className="border-primary/20 bg-primary/5 shadow-none overflow-hidden relative">
            <div className="absolute top-0 right-0 p-3">
                <div className="h-20 w-20 bg-primary/10 rounded-full -mr-10 -mt-10 blur-2xl" />
            </div>

            <CardContent className="p-5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${status?.is_active ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'}`}>
                        {status?.is_active ? <ShieldCheck className="h-6 w-6" /> : <LinkIcon className="h-6 w-6" />}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">Kite Trading Session</CardTitle>
                            <Badge className={`text-[10px] font-bold ${status?.is_active ? "bg-success/20 text-success border-success/20" : ""}`} variant={status?.is_active ? "outline" : "secondary"}>
                                {status?.is_active ? "CONNECTED" : "DISCONNECTED"}
                            </Badge>
                        </div>
                        <CardDescription className="text-xs mt-0.5">
                            {status?.is_active
                                ? "Your Zerodha account is linked. Real-time portfolio analysis enabled."
                                : "Connect your Zerodha account to analyze your real portfolio with Bharat AI."}
                        </CardDescription>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {!status?.is_active && (
                        <Button
                            onClick={handleConnect}
                            disabled={!status?.api_key_configured}
                            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 gap-2"
                        >
                            Connect Kite <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                    )}
                    {!status?.api_key_configured && (
                        <p className="text-[10px] text-destructive font-medium italic">
                            * KITE_API_KEY missing in backend environment.
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
