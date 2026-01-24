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
    PenTool,
    RotateCcw,
    Play,
    ChevronRight,
    ShieldCheck,
    Zap,
    Activity,
    Clock,
    History,
    Target,
    BarChart3,
    Sparkles
} from "lucide-react"

export default function StrategyBuilder() {
    const [riskProfile, setRiskProfile] = useState("moderate")

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-fuchsia-50 text-fuchsia-600">
                                <PenTool className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Strategy Builder</h1>
                        </div>
                        <p className="text-gray-600 text-sm ml-12">Create and backtest investment strategies</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="rounded-lg border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-semibold h-11 px-5">
                            <History className="h-4 w-4 mr-2 text-fuchsia-600" /> Past Models
                        </Button>
                        <Button className="rounded-lg bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold h-11 px-5 shadow-sm">
                            <Play className="h-4 w-4 mr-2" /> Run Backtest
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="builder" className="space-y-8">
                    <TabsList className="bg-gray-100 p-1.5 rounded-xl border border-gray-200 h-auto flex-wrap justify-start gap-1">
                        <TabsTrigger value="builder" className="rounded-lg px-5 py-2.5 font-semibold text-xs data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white transition-all">
                            Neural Strategy Builder
                        </TabsTrigger>
                        <TabsTrigger value="backtest" className="rounded-lg px-5 py-2.5 font-semibold text-xs data-[state=active]:bg-fuchsia-600 data-[state=active]:text-white transition-all">
                            Deep Backtesting
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="builder" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-xl">
                                <CardHeader className="border-b border-gray-100 pb-4">
                                    <CardTitle className="text-sm font-bold text-fuchsia-600 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" /> Policy Engine Configuration
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <p className="text-xs font-semibold text-gray-600">Select Neural Risk Profile</p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[
                                                    { id: "conservative", label: "Conservative", desc: "60% Stables / 40% Majors", icon: ShieldCheck, color: "text-green-600" },
                                                    { id: "moderate", label: "Moderate", desc: "40% Majors / 60% Alts", icon: Activity, color: "text-blue-600" },
                                                    { id: "aggressive", label: "Aggressive", desc: "10% Majors / 90% Small-Caps", icon: Zap, color: "text-orange-600" },
                                                ].map((p) => (
                                                    <div
                                                        key={p.id}
                                                        onClick={() => setRiskProfile(p.id)}
                                                        className={cn(
                                                            "p-5 rounded-lg border-2 cursor-pointer transition-all space-y-3 group",
                                                            riskProfile === p.id ? "bg-fuchsia-50 border-fuchsia-300" : "bg-white border-gray-200 hover:border-gray-300"
                                                        )}
                                                    >
                                                        <div className={cn("p-2.5 rounded-lg w-fit transition-transform group-hover:scale-110 bg-gray-100", p.color)}>
                                                            <p.icon className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900">{p.label}</p>
                                                            <p className="text-xs text-gray-600 mt-1">{p.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-xs font-semibold text-gray-600">Neural Allocation Suggestion</p>
                                            <div className="p-5 rounded-lg bg-gray-50 border border-gray-200 space-y-6">
                                                {[
                                                    { name: "BTC / Blue-Chips", val: riskProfile === 'conservative' ? 70 : riskProfile === 'moderate' ? 40 : 15, color: "bg-orange-500" },
                                                    { name: "Layer 1 Alts", val: riskProfile === 'conservative' ? 20 : riskProfile === 'moderate' ? 40 : 60, color: "bg-blue-500" },
                                                    { name: "Speculative / AI Tokens", val: riskProfile === 'conservative' ? 10 : riskProfile === 'moderate' ? 20 : 25, color: "bg-fuchsia-500" },
                                                ].map((item, i) => (
                                                    <div key={i} className="space-y-2">
                                                        <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                                                            <span>{item.name}</span>
                                                            <span>{item.val}%</span>
                                                        </div>
                                                        <Progress value={item.val} className="h-2 bg-gray-200 rounded-full" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-6">
                                <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                                    <CardContent className="p-6">
                                        <h4 className="text-base font-bold text-gray-900 mb-4">Active Strategy AI Insight</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                            Based on your {riskProfile} profile, the neural engine suggests a 5% overweight on DePIN tokens for the current market cycle.
                                        </p>
                                        <Button className="w-full rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 py-5">
                                            Deploy Strategy
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                                    <CardHeader className="border-b border-gray-100 pb-4">
                                        <CardTitle className="text-sm font-bold text-gray-900">Model Performance (Mock)</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-5">
                                            <div className="flex items-baseline justify-between">
                                                <span className="text-xs font-semibold text-gray-600">Est. Annual Return</span>
                                                <span className="text-2xl font-bold text-green-600">42.5%</span>
                                            </div>
                                            <div className="flex items-baseline justify-between">
                                                <span className="text-xs font-semibold text-gray-600">Max Drawdown</span>
                                                <span className="text-xl font-bold text-red-600">-18.4%</span>
                                            </div>
                                            <div className="h-20 flex items-end gap-1 mt-6">
                                                {Array.from({ length: 12 }).map((_, i) => (
                                                    <div key={i} className="flex-1 bg-fuchsia-200 rounded-t-sm" style={{ height: `${Math.random() * 80 + 20}%` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppShell>
    )
}
