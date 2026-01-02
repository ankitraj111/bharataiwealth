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
            <SheetContent className="w-full sm:max-w-md bg-[#0d1117]/95 backdrop-blur-2xl border-white/[0.08] text-foreground p-0 overflow-hidden flex flex-col">
                <SheetHeader className="p-6 border-b border-white/[0.05] space-y-1">
                    <div className="flex items-center gap-2">
                        <SheetTitle className="text-xl font-bold font-serif">{asset}</SheetTitle>
                        <Badge variant="outline" className="text-[10px] uppercase">{isCrypto ? "Crypto" : "Equities"}</Badge>
                    </div>
                    <SheetDescription className="text-muted-foreground">Live Market Insights & AI Analysis</SheetDescription>
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
                    <div className="h-[180px] w-full rounded-xl bg-white/[0.02] border border-white/[0.05] p-2">
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
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] text-muted-foreground">Economic Times • 2h ago</span>
                                        <Badge variant="secondary" className="text-[8px] h-3 px-1 bg-emerald-500/10 text-emerald-400 border-none">Positive</Badge>
                                    </div>
                                    <p className="text-[11px] font-medium leading-normal">Reliance Retail expansion plans trigger upgrades from top brokerage firms.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="p-6 border-t border-white/[0.05] bg-white/[0.01] mt-auto">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-sm h-11">Add to Portfolio</Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
