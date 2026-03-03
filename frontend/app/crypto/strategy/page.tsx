"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    RotateCcw,
    Play,
    ShieldCheck,
    Zap,
    History,
    Sparkles,
    Cpu,
    Settings,
    BrainCircuit
} from "lucide-react"

export default function StrategyBuilder() {
    const [riskProfile, setRiskProfile] = useState("moderate")

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50 backdrop-blur-sm">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-primary shadow-lg shadow-primary/20">
                                <Cpu className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Alpha Strategy Builder</h1>
                        </div>
                        <p className="text-muted-foreground text-[11px] ml-16 font-black uppercase tracking-[0.2em] italic opacity-60">Deploy neural-optimized structural algorithms</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="h-12 rounded-2xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-6 hover:text-primary transition-all">
                            <History className="h-4 w-4 mr-3 text-primary" /> Past Alpha Models
                        </Button>
                        <Button className="h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest px-8 shadow-xl shadow-primary/20 border-0 transition-all hover:scale-105 active:scale-95 group">
                            Run Structural Backtest <Play className="h-4 w-4 ml-3 fill-current transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Strategy Configuration */}
                    <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-2xl shadow-2xl rounded-[3rem] p-8 border group overflow-hidden">
                        <div className="absolute top-0 right-0 h-64 w-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-primary/10 transition-all" />

                        <Tabs defaultValue="parameters" className="w-full relative z-10">
                            <TabsList className="bg-muted/40 p-1.5 rounded-2xl mb-10 w-fit gap-2 border border-border/50 shadow-inner">
                                <TabsTrigger value="parameters" className="rounded-xl px-8 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all border-0 italic">Algorithm Setup</TabsTrigger>
                                <TabsTrigger value="risk" className="rounded-xl px-8 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all border-0 italic">Alpha Guardrails</TabsTrigger>
                                <TabsTrigger value="data" className="rounded-xl px-8 py-2.5 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all border-0 italic">Neural Data</TabsTrigger>
                            </TabsList>

                            <TabsContent value="parameters" className="space-y-10 mt-0 focus-visible:outline-none">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4 p-8 rounded-[2.5rem] bg-muted/30 border border-border/30 shadow-inner group/val">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60 group-hover/val:text-primary transition-colors">Base Alpha Asset</span>
                                            <Badge className="text-[9px] font-black bg-primary/10 text-primary border-primary/20 px-3 uppercase italic tracking-widest">Top 10 Vector</Badge>
                                        </div>
                                        <div className="flex items-center bg-card/60 rounded-xl p-4 border border-border/50 shadow-sm">
                                            <span className="text-sm font-black text-foreground italic uppercase tracking-tighter">Bitcoin (BTC)</span>
                                            <Settings className="ml-auto h-4 w-4 text-muted-foreground opacity-40" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 p-8 rounded-[2.5rem] bg-muted/30 border border-border/30 shadow-inner group/val">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60 group-hover/val:text-primary transition-colors">Neural Signal Sensitivity</span>
                                            <span className="text-[10px] font-black text-primary italic uppercase tracking-widest">Aggressive Alpha</span>
                                        </div>
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden shadow-inner border border-border/20">
                                            <div className="h-full bg-primary shadow-lg shadow-primary/30" style={{ width: '85%' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic px-2 opacity-60">Neural Risk Profile Selector</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { id: "conservative", label: "Conservative", p: "Low Vol Alpha", icon: ShieldCheck, theme: "text-primary bg-primary/10 border-primary/20" },
                                            { id: "moderate", label: "Structural Sync", p: "Medium Vol Alpha", icon: Zap, theme: "text-accent bg-accent/10 border-accent/20" },
                                            { id: "aggressive", label: "Alpha Seeker", p: "High Vol Alpha", icon: Sparkles, theme: "text-success bg-success/10 border-success/20" },
                                        ].map((p, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setRiskProfile(p.id)}
                                                className={cn(
                                                    "p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer group/item relative overflow-hidden",
                                                    riskProfile === p.id
                                                        ? 'border-primary bg-primary/5 shadow-2xl scale-[1.02]'
                                                        : 'border-border/50 bg-muted/20 hover:border-border hover:bg-muted/40'
                                                )}
                                            >
                                                <div className={cn("p-4 rounded-2xl w-fit mb-6 shadow-lg transition-transform group-hover/item:scale-110", p.theme)}>
                                                    <p.icon className="h-6 w-6" />
                                                </div>
                                                <h4 className="text-base font-black text-foreground uppercase tracking-tighter italic mb-1 shrink-0">{p.label}</h4>
                                                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-40">{p.p}</span>
                                                {riskProfile === p.id && (
                                                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="risk" className="mt-0">
                                <div className="p-10 rounded-[2.5rem] bg-muted/20 border border-dashed border-border/50 min-h-[400px] flex flex-col items-center justify-center text-center group/placeholder">
                                    <ShieldCheck className="h-16 w-16 text-muted-foreground/20 mb-6 group-hover/placeholder:scale-110 transition-transform" />
                                    <p className="text-muted-foreground/40 font-black uppercase tracking-[0.4em] italic text-xs">Structural Alpha Guardrails</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="data" className="mt-0">
                                <div className="p-10 rounded-[2.5rem] bg-muted/20 border border-dashed border-border/50 min-h-[400px] flex flex-col items-center justify-center text-center group/placeholder">
                                    <BrainCircuit className="h-16 w-16 text-muted-foreground/20 mb-6 group-hover/placeholder:scale-110 transition-transform" />
                                    <p className="text-muted-foreground/40 font-black uppercase tracking-[0.4em] italic text-xs">Neural Data Feed Configuration</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </Card>

                    {/* AI Preview */}
                    <div className="space-y-8">
                        <Card className="bg-card/40 border-primary/20 backdrop-blur-3xl shadow-2xl rounded-[3rem] p-10 group overflow-hidden relative border">
                            <div className="absolute top-0 right-0 h-48 w-48 bg-primary/5 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-125 transition-transform duration-700" />
                            <div className="relative z-10 text-center">
                                <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 mx-auto shadow-xl backdrop-blur-md">
                                    <BrainCircuit className="h-8 w-8 text-primary" />
                                </div>
                                <h4 className="text-lg font-black uppercase tracking-[0.2em] mb-3 italic text-muted-foreground opacity-60">Neural Alpha Score</h4>
                                <div className="text-7xl font-black italic tracking-tighter mb-6 tabular-nums group-hover:scale-110 transition-all text-foreground drop-shadow-xl shadow-primary/20">92.4%</div>
                                <p className="text-xs font-bold text-muted-foreground leading-relaxed italic mb-10 max-w-[200px] mx-auto">
                                    Historical Monte Carlo simulations suggest a <span className="text-foreground">high fidelity structural interval</span> for current neural parameters.
                                </p>
                                <Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 border-0">
                                    Optimize Neural Weights
                                </Button>
                            </div>
                        </Card>

                        <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-2xl rounded-[3rem] p-10 border group overflow-hidden relative">
                            <div className="absolute bottom-0 right-0 h-32 w-32 bg-success/5 rounded-full blur-2xl -mr-16 -mb-16 group-hover:bg-success/10 transition-all" />
                            <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em] mb-10 italic opacity-60">Structural Performance</CardTitle>
                            <div className="space-y-8">
                                {[
                                    { l: "Expected Alpha APY", v: "42.8%", c: "text-success bg-success/10 shadow-success/10" },
                                    { l: "Max Structural Drawdown", v: "-12.4%", c: "text-destructive bg-destructive/10 shadow-destructive/10" },
                                    { l: "Neural Sharpe Ratio", v: "2.84", c: "text-primary bg-primary/10 shadow-primary/10" }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-end border-b border-border/30 pb-6 last:border-0 last:pb-0 group/stat">
                                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60 group-hover/stat:text-foreground transition-colors">{item.l}</span>
                                        <div className={cn("px-4 py-1.5 rounded-xl border border-transparent italic transition-all group-hover/stat:scale-110", item.c)}>
                                            <span className="text-2xl font-black italic tabular-nums tracking-tighter">{item.v}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
