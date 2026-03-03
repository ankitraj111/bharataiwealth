"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    History,
    Play,
    TrendingUp,
    TrendingDown,
    Activity,
    BarChart3,
    Calendar,
    ArrowUpRight,
    ShieldCheck,
    Zap,
    Target,
    RefreshCcw,
    Filter
} from "lucide-react"

export default function BacktestingEngine() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50 transition-colors duration-500">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                                <History className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <h1 className="text-3xl font-black text-foreground tracking-tight italic uppercase">Neural Backtest Alpha</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12 font-medium italic">Validate strategies against high-fidelity historical tick data</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-xl border-border bg-card/40 text-muted-foreground hover:text-foreground transition-all font-bold h-11 px-5 backdrop-blur-md">
                            Engine Params
                        </Button>
                        <Button className="rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest h-11 px-8 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 border-0 group">
                            Start Alpha Run <Zap className="h-4 w-4 ml-2 fill-current" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Performance Overview */}
                    {[
                        { label: "Neural Profit", val: "+24.8%", icon: TrendingUp, color: "text-success" },
                        { label: "Win Integrity", val: "68.2%", icon: Target, color: "text-primary" },
                        { label: "Max Deviation", val: "8.4%", icon: BarChart3, color: "text-destructive" },
                        { label: "Alpha Factor", val: "2.42", icon: Activity, color: "text-primary" },
                    ].map((m, i) => (
                        <Card key={i} className="bg-card/40 border-border/50 backdrop-blur-xl shadow-xl rounded-[2.5rem] p-6 hover:border-primary/20 transition-all group overflow-hidden border">
                            <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
                            <div className={cn("p-3 rounded-2xl w-fit mb-4 bg-card border border-border/50 shadow-inner", m.color)}>
                                <m.icon className="h-5 w-5" />
                            </div>
                            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1 italic">{m.label}</p>
                            <h3 className="text-2xl font-black text-foreground italic tabular-nums">{m.val}</h3>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Backtest Results */}
                    <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border">
                        <CardHeader className="p-8 border-b border-border/50 bg-muted/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-card border border-border/50 shadow-sm">
                                        <History className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-sm font-black text-foreground uppercase tracking-tight italic">Alpha Trajectory</CardTitle>
                                        <CardDescription className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Simulated results for Neural Engine v4.2</CardDescription>
                                    </div>
                                </div>
                                <Badge className="bg-success text-success-foreground border-0 font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-xl shadow-lg shadow-success/20">98.2% CONFIDENCE</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground/30 font-black uppercase tracking-[0.5em] italic bg-muted/20 rounded-[2rem] border-2 border-dashed border-border/50">
                                Trajectory Mapping Active
                            </div>
                        </CardContent>
                    </Card>

                    {/* Simulation Parameters */}
                    <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] p-8 border hover:border-primary/20 transition-all flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute bottom-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mb-16" />
                        <div className="relative z-10 w-full">
                            <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mb-8 italic">Simulation Fidelity</CardTitle>
                            <div className="space-y-6">
                                {[
                                    { l: "Data Integrity", v: 98, c: "bg-success" },
                                    { l: "Neural Latency", v: 85, c: "bg-primary" },
                                    { l: "Slippage Alpha", v: 42, c: "bg-warning" }
                                ].map((row, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest italic">
                                            <span className="text-muted-foreground">{row.l}</span>
                                            <span className="text-foreground tabular-nums">{row.v}%</span>
                                        </div>
                                        <Progress value={row.v} className={cn("h-1.5 bg-muted rounded-full overflow-hidden", row.c)} />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                                <p className="text-[11px] text-muted-foreground font-bold leading-relaxed mb-8 italic">
                                    Simulations reveal hyper-correlation with institutional flows. Directing 15% increase in capture frequency.
                                </p>
                                <Button className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 border-0">
                                    Alpha Optimization
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppShell>
    )
}
