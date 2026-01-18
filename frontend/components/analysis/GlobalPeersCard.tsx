"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, TrendingUp, TrendingDown } from "lucide-react"

interface PeerComparison {
    name: string
    country: string
    marketCap: number
    peRatio: number
    revenueGrowth: number
    profitMargin: number
}

interface GlobalPeersProps {
    peers: PeerComparison[]
    valuationGap: number
    growthGap: number
    insight: string
}

const FLAG_EMOJI: Record<string, string> = {
    US: "🇺🇸",
    UK: "🇬🇧",
    Japan: "🇯🇵",
    Germany: "🇩🇪",
    Singapore: "🇸🇬",
    Saudi: "🇸🇦",
    India: "🇮🇳"
}

export function GlobalPeersCard({ peers, valuationGap, growthGap, insight }: GlobalPeersProps) {
    return (
        <Card className="border-2 border-border/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-500" />
                    Global Peer Benchmarking
                </CardTitle>
            </CardHeader>
            <CardContent>
                {/* Gap Summary */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${valuationGap < 0 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'} border`}>
                        <p className="text-xs text-muted-foreground mb-1">Valuation vs Peers</p>
                        <div className="flex items-center gap-1">
                            {valuationGap < 0 ? (
                                <Badge className="bg-emerald-500 text-white text-[10px]">UNDERVALUED</Badge>
                            ) : (
                                <Badge className="bg-red-500 text-white text-[10px]">PREMIUM</Badge>
                            )}
                            <span className={`text-lg font-bold ${valuationGap < 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                {valuationGap > 0 ? '+' : ''}{valuationGap.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                    <div className={`p-3 rounded-xl ${growthGap > 0 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'} border`}>
                        <p className="text-xs text-muted-foreground mb-1">Growth vs Peers</p>
                        <div className="flex items-center gap-1">
                            {growthGap > 0 ? (
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-amber-500" />
                            )}
                            <span className={`text-lg font-bold ${growthGap > 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                {growthGap > 0 ? '+' : ''}{growthGap.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>

                {/* Peers Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead className="bg-muted/50">
                            <tr className="text-muted-foreground uppercase">
                                <th className="text-left p-2 font-medium">Company</th>
                                <th className="text-right p-2 font-medium">Mkt Cap</th>
                                <th className="text-right p-2 font-medium">P/E</th>
                                <th className="text-right p-2 font-medium">Growth</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {peers.map((peer, i) => (
                                <tr key={i} className="hover:bg-muted/30">
                                    <td className="p-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base">{FLAG_EMOJI[peer.country] || "🌍"}</span>
                                            <div>
                                                <p className="font-medium">{peer.name}</p>
                                                <p className="text-[10px] text-muted-foreground">{peer.country}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-right p-2 font-mono">${peer.marketCap}B</td>
                                    <td className="text-right p-2 font-mono">{peer.peRatio.toFixed(1)}x</td>
                                    <td className="text-right p-2">
                                        <span className={`font-bold ${peer.revenueGrowth >= 10 ? 'text-emerald-500' : peer.revenueGrowth >= 5 ? 'text-amber-500' : 'text-red-500'}`}>
                                            {peer.revenueGrowth}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Insight */}
                <div className="mt-3 p-2 bg-blue-500/5 rounded-lg border border-blue-500/20">
                    <p className="text-xs text-blue-600 italic">💡 {insight}</p>
                </div>
            </CardContent>
        </Card>
    )
}
