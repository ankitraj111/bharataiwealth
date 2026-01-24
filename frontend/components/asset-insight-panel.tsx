"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, BrainCircuit, Info, Newspaper } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const miniChartData = [
    { day: "1", value: 100 },
    { day: "2", value: 120 },
    { day: "3", value: 110 },
    { day: "4", value: 140 },
    { day: "5", value: 135 },
    { day: "6", value: 160 },
    { day: "7", value: 155 },
]

export function AssetInsightPanel({
    asset = "RELIANCE",
    isOpen,
    onClose
}: {
    asset?: string,
    isOpen: boolean,
    onClose: () => void
}) {
    const isCrypto = asset.toLowerCase().includes("btc") || asset.toLowerCase().includes("eth")

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-md bg-background border-l border-border/50 text-foreground p-0 overflow-hidden flex flex-col shadow-2xl">
                <SheetHeader className="p-6 border-b border-border/50 space-y-1 bg-muted/30">
                    <div className="flex items-center gap-3">
                        <SheetTitle className="text-xl font-bold">{asset}</SheetTitle>
                        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest h-5">{isCrypto ? "Crypto" : "Equities"}</Badge>
                    </div>
                    <SheetDescription className="text-muted-foreground font-medium">Live Market Insights & AI Analysis</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {/* Main Price Stat */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Price</span>
                            <p className="text-2xl font-mono font-bold tracking-tight">₹2,450.00</p>
                        </div>
                        <div className="space-y-1 text-right">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Change (24h)</span>
                            <p className="text-xl font-mono font-bold text-emerald-400">+3.42%</p>
                        </div>
                    </div>

                    {/* Mini Chart */}
                    <div className="h-[180px] w-full rounded-2xl bg-muted/30 border border-border/50 p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={miniChartData}>
                                <XAxis dataKey="day" hide />
                                <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1a1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    labelStyle={{ display: 'none' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    fill="#3b82f6"
                                    fillOpacity={0.1}
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* ML Summary Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold flex items-center gap-2 text-primary">
                            <BrainCircuit className="h-4 w-4" />
                            ML Prediction Summary
                        </h3>
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                            <div className="flex items-center justify-between font-medium">
                                <span className="text-xs text-primary font-semibold">LSTM Direction</span>
                                <span className="text-xs text-emerald-400 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> Bullish
                                </span>
                            </div>
                            <div className="flex items-center justify-between font-medium">
                                <span className="text-xs text-primary font-semibold">Confidence</span>
                                <span className="text-xs">92.5%</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                                "Consistent accumulation patterns observed in the last 14 trading sessions."
                            </p>
                        </div>
                    </div>

                    {/* AI Explanation */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <Info className="h-4 w-4 text-accent" />
                            AI Commentary
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Reliance is showing strong bullish momentum after clearing the major resistance at 2400. Institutional buyers are active. MACD shows a fresh crossover on the daily chart. Low risk for short-term entry.
                        </p>
                    </div>

                    {/* News & Sentiment */}
                    <div className="space-y-4 pb-4">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                            <Newspaper className="h-4 w-4" />
                            Latest Sentiment
                        </h3>
                        <div className="space-y-3">
                            {[1, 2].map((i) => (
                                <div key={i} className="rounded-lg border border-white/[0.05] p-3 hover:bg-white/[0.01] transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Economic Times • 2h ago</span>
                                        <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-tighter h-4 px-1 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Positive</Badge>
                                    </div>
                                    <p className="text-[11px] font-bold leading-relaxed">{i === 1 ? "Reliance Retail expansion plans trigger upgrades from top financial analysts." : "New strategic partnership in green energy sector expected to drive future growth."}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="p-6 border-t border-border/50 bg-muted/20 mt-auto">
                    <Button className="w-full font-bold shadow-sm h-12 rounded-xl">Add to Portfolio</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
