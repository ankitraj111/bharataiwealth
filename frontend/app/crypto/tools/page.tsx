"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
    Calculator,
    Zap,
    TrendingUp,
    Activity,
    RotateCcw,
    Save,
    PieChart,
    Scale,
    BrainCircuit,
    ShieldCheck
} from "lucide-react"

export default function CryptoTools() {
    const [profitIn, setProfitIn] = useState("1000")
    const [buyPrice, setBuyPrice] = useState("64000")
    const [sellPrice, setSellPrice] = useState("72000")

    const investment = parseFloat(profitIn) || 0
    const bPrice = parseFloat(buyPrice) || 0
    const sPrice = parseFloat(sellPrice) || 0
    const units = investment / bPrice
    const profit = (sPrice - bPrice) * units
    const roi = (profit / investment) * 100

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50 backdrop-blur-sm">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-primary shadow-lg shadow-primary/20">
                                <Calculator className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Alpha Systems</h1>
                        </div>
                        <p className="text-muted-foreground text-[11px] ml-16 font-black uppercase tracking-[0.2em] italic opacity-60">Neural Calculators & Strategy Synthesis</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="h-12 rounded-2xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-6 hover:text-primary transition-all">
                            <Save className="h-4 w-4 mr-3 text-primary" /> Export Matrix
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="profit" className="space-y-10">
                    <TabsList className="bg-muted/40 p-2 rounded-[2rem] border border-border/50 h-auto flex-wrap justify-start gap-2 shadow-inner">
                        <TabsTrigger value="profit" className="rounded-2xl px-8 py-3.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all shadow-lg italic">
                            Alpha ROI Synthesis
                        </TabsTrigger>
                        <TabsTrigger value="dca" className="rounded-2xl px-8 py-3.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all shadow-lg italic">
                            Structural DCA Matrix
                        </TabsTrigger>
                        <TabsTrigger value="volatility" className="rounded-2xl px-8 py-3.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground transition-all shadow-lg italic">
                            Neural Variance Scan
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profit" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <Card className="bg-card/40 border-border/50 shadow-2xl rounded-[3rem] overflow-hidden border group">
                                <CardHeader className="p-8 border-b border-border/30 bg-muted/20 relative">
                                    <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
                                    <CardTitle className="text-sm font-black text-primary uppercase tracking-[0.2em] italic relative z-10">Alpha Projection Parameters</CardTitle>
                                </CardHeader>
                                <CardContent className="p-10 relative z-10">
                                    <div className="space-y-8">
                                        <div className="space-y-4 group/input">
                                            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic group-hover/input:text-primary transition-colors opacity-60">Initial Capital Sync (USD)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary font-black italic">$</div>
                                                <Input
                                                    value={profitIn}
                                                    onChange={(e) => setProfitIn(e.target.value)}
                                                    className="h-16 pl-10 bg-muted/30 border-border/50 rounded-2xl text-2xl font-black italic tabular-nums focus:ring-primary/20 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-4 group/input">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Entry Vector</label>
                                                <Input
                                                    value={buyPrice}
                                                    onChange={(e) => setBuyPrice(e.target.value)}
                                                    className="h-14 bg-muted/30 border-border/50 rounded-2xl text-lg font-black italic tabular-nums focus:ring-primary/20 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-4 group/input">
                                                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Exit Vector</label>
                                                <Input
                                                    value={sellPrice}
                                                    onChange={(e) => setSellPrice(e.target.value)}
                                                    className="h-14 bg-muted/30 border-border/50 rounded-2xl text-lg font-black italic tabular-nums focus:ring-primary/20 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary font-black uppercase tracking-widest text-[10px] gap-3 h-14 rounded-2xl border-dashed border-border/50 border-2 transition-all hover:bg-primary/5 mt-4 italic">
                                            <RotateCcw className="h-4 w-4" /> Reset Neural Params
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-8">
                                <Card className="bg-card/40 border-border/50 shadow-2xl rounded-[3rem] overflow-hidden border group">
                                    <CardContent className="p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 opacity-50" />
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4 italic opacity-60 relative z-10">Estimated Structural Net Alpha</p>
                                        <h3 className={cn("text-6xl font-black italic tracking-tighter transition-all relative z-10 tabular-nums", profit >= 0 ? 'text-foreground' : 'text-destructive')}>
                                            ${profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                        </h3>
                                        <div className="mt-8 flex items-center gap-4 relative z-10">
                                            <Badge className={cn("rounded-2xl px-6 py-2.5 font-black text-[11px] uppercase tracking-widest italic shadow-xl transition-transform hover:scale-105", profit >= 0 ? 'bg-success/10 text-success border-success/20 shadow-success/10' : 'bg-destructive/10 text-destructive border-destructive/20 shadow-destructive/10')}>
                                                {roi.toFixed(2)}% ROI SYNC
                                            </Badge>
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-40">Post-execution Synthesis</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card/40 border-border/50 shadow-2xl rounded-[3rem] overflow-hidden border group">
                                    <CardHeader className="p-8 border-b border-border/30 bg-muted/20">
                                        <CardTitle className="text-[10px] font-black text-foreground flex items-center gap-3 uppercase tracking-widest italic">
                                            <PieChart className="h-4 w-4 text-primary" /> Alpha Vector Breakdown
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-center bg-muted/40 p-6 rounded-[2rem] border border-border/50 shadow-inner group/val">
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60 group-hover/val:text-primary transition-colors">Total Structural Units</span>
                                                <span className="text-xl font-black text-foreground italic tabular-nums">{units.toFixed(6)}</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-muted/40 p-6 rounded-[2rem] border border-border/50 shadow-inner group/val">
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60 group-hover/val:text-primary transition-colors">Neural Breakeven Point</span>
                                                <span className="text-xl font-black text-foreground italic tabular-nums">${bPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="volatility" className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-700">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-2 bg-card/40 border-border/50 shadow-2xl rounded-[3rem] overflow-hidden border group">
                                <CardHeader className="p-10 border-b border-border/30 bg-muted/20 relative">
                                    <div className="absolute top-0 right-0 h-32 w-32 bg-destructive/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-destructive/10 transition-all duration-700" />
                                    <div className="flex items-center gap-5 relative z-10">
                                        <div className="p-3.5 rounded-2xl bg-destructive shadow-lg shadow-destructive/20">
                                            <Activity className="h-6 w-6 text-destructive-foreground" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl font-black text-foreground italic uppercase tracking-tighter">Neural Variance Scanner</CardTitle>
                                            <CardDescription className="text-[10px] font-black text-destructive uppercase tracking-widest italic opacity-60">High-Velocity Risk Distribution Matrix</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-10">
                                    <div className="h-[350px] flex items-end justify-between gap-2 px-6 mb-10 relative">
                                        <div className="absolute inset-0 bg-destructive/2 blur-[100px] rounded-full" />
                                        {Array.from({ length: 32 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-full bg-gradient-to-t from-destructive to-warning rounded-t-xl transition-all hover:scale-125 cursor-crosshair group/bar relative shadow-lg"
                                                style={{ height: `${Math.random() * 80 + 20}%`, opacity: (i + 8) / 40 }}
                                            >
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-card/90 border border-destructive/20 px-2 py-1 rounded text-[8px] font-black hidden group-hover/bar:block whitespace-nowrap z-20">VAR {Math.random().toFixed(4)}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">Low Alpha Variance</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic text-right">Neural Volatility Extremes</span>
                                            <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-8">
                                <Card className="bg-card/40 border-border/50 shadow-2xl rounded-[3rem] overflow-hidden border group">
                                    <CardContent className="p-12 text-center relative">
                                        <div className="absolute inset-0 bg-destructive/5 blur-3xl rounded-full" />
                                        <div className="p-6 bg-destructive/10 rounded-full w-fit mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform">
                                            <BrainCircuit className="h-16 w-16 text-destructive" />
                                        </div>
                                        <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-4 italic opacity-60">Alpha Liquidation Vector</h4>
                                        <p className="text-6xl font-black text-destructive italic tabular-nums tracking-tighter">4.2%</p>
                                        <p className="text-[10px] font-black text-destructive uppercase tracking-widest mt-4 italic opacity-80">Synthesis of 24H Price Action</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card/40 border-border/50 shadow-2xl rounded-[3rem] overflow-hidden border group">
                                    <CardHeader className="p-8 border-b border-border/30 bg-muted/20">
                                        <CardTitle className="text-[10px] font-black text-foreground flex items-center gap-3 uppercase tracking-widest italic">
                                            <ShieldCheck className="h-4 w-4 text-primary" /> Structural Safety Threshold
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-10">
                                        <div className="space-y-6">
                                            <div className="p-6 rounded-[2rem] bg-muted/40 border border-border/50 shadow-inner group/item hover:bg-destructive/5 transition-all">
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 italic opacity-60">Max Suggested Neural Drawdown</p>
                                                <p className="text-xl font-black text-foreground italic uppercase tracking-tighter">12% Structural Portfolio</p>
                                            </div>
                                            <div className="p-6 rounded-[2rem] bg-muted/40 border border-border/50 shadow-inner group/item hover:bg-success/5 transition-all">
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 italic opacity-60">Variance-Adjusted Alpha Stop</p>
                                                <p className="text-xl font-black text-success italic tabular-nums">$58,240 <span className="text-[10px] opacity-40 italic">UST CLUSTER</span></p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Advisory Note */}
                <Card className="bg-primary/5 border border-primary/20 backdrop-blur-xl rounded-[2.5rem] p-10 flex items-start gap-8 shadow-2xl relative overflow-hidden group/footer">
                    <div className="absolute top-0 right-0 h-24 w-24 bg-primary/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover/footer:bg-primary/20 transition-all duration-700" />
                    <div className="p-4 rounded-2xl bg-primary/20 shadow-lg shadow-primary/10 transition-transform group-hover/footer:scale-110"><Scale className="h-7 w-7 text-primary" /></div>
                    <div className="space-y-3 relative z-10">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.4em] italic leading-tight">Structural Strategy Risk Synthesis</h4>
                        <p className="text-xs text-muted-foreground font-bold italic leading-relaxed opacity-80">
                            Neural projections are high-fidelity mathematical estimates based on static alpha inputs. Real-world trajectory may vary due to exchange slippage, network fee (GAS) volatility, and systemic liquidity events. Always maintain a 5-10% structural buffer for variance events.
                        </p>
                    </div>
                </Card>
            </div>
        </AppShell>
    )
}
