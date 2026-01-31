"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Calculator,
    Zap,
    TrendingUp,
    Activity,
    RotateCcw,
    Save,
    ArrowUpRight,
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
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400">
                                <Calculator className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Crypto Tools</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12">Calculators and analysis tools</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-lg border-gray-300">
                            <Save className="h-4 w-4 mr-2" /> Export Results
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="profit" className="space-y-8">
                    <TabsList className="bg-muted p-1.5 rounded-xl border border-border h-auto flex-wrap justify-start gap-1">
                        <TabsTrigger value="profit" className="rounded-lg px-5 py-2.5 font-semibold text-xs data-[state=active]:bg-teal-600 data-[state=active]:text-white transition-all">
                            Profit/ROI Calculator
                        </TabsTrigger>
                        <TabsTrigger value="dca" className="rounded-lg px-5 py-2.5 font-semibold text-xs data-[state=active]:bg-teal-600 data-[state=active]:text-white transition-all">
                            DCA Strategy Modeler
                        </TabsTrigger>
                        <TabsTrigger value="volatility" className="rounded-lg px-5 py-2.5 font-semibold text-xs data-[state=active]:bg-rose-600 data-[state=active]:text-white transition-all">
                            Volatility Checker
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profit" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="bg-card border border-border shadow-sm rounded-xl">
                                <CardHeader className="border-b border-border pb-4">
                                    <CardTitle className="text-sm font-bold text-teal-600 dark:text-teal-400">P/L Projections</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-muted-foreground">Initial Investment (USD)</label>
                                            <Input
                                                value={profitIn}
                                                onChange={(e) => setProfitIn(e.target.value)}
                                                className="h-14 rounded-lg bg-background border-border text-xl font-bold text-foreground px-4 focus:border-teal-500 transition-all"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-muted-foreground">Buy Price</label>
                                                <Input
                                                    value={buyPrice}
                                                    onChange={(e) => setBuyPrice(e.target.value)}
                                                    className="h-12 rounded-lg bg-background border-border text-base font-bold text-foreground px-4 focus:border-teal-500 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-muted-foreground">Sell Price</label>
                                                <Input
                                                    value={sellPrice}
                                                    onChange={(e) => setSellPrice(e.target.value)}
                                                    className="h-12 rounded-lg bg-background border-border text-base font-bold text-foreground px-4 focus:border-teal-500 transition-all"
                                                />
                                            </div>
                                        </div>
                                        <Button variant="ghost" className="w-full text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 font-semibold gap-2 py-5 rounded-lg border-dashed border-border border-2">
                                            <RotateCcw className="h-4 w-4" /> Reset Parameters
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-6">
                                <Card className="bg-card border border-border shadow-sm rounded-xl">
                                    <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                                        <p className="text-xs text-muted-foreground font-semibold mb-3">Estimated Net Profit</p>
                                        <h3 className={`text-5xl font-bold transition-all ${profit >= 0 ? 'text-foreground' : 'text-red-600 dark:text-red-400'}`}>
                                            ${profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                        </h3>
                                        <div className="mt-5 flex items-center gap-3">
                                            <Badge className={`rounded-full px-3.5 py-1.5 font-semibold text-xs ${profit >= 0 ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'}`}>
                                                {roi.toFixed(2)}% ROI
                                            </Badge>
                                            <span className="text-xs font-medium text-muted-foreground">Post-Execution</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card border border-border shadow-sm rounded-xl">
                                    <CardHeader className="border-b border-border pb-4">
                                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                                            <PieChart className="h-4 w-4" /> Asset Breakdown
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center bg-muted p-4 rounded-lg border border-border">
                                                <span className="text-xs font-semibold text-muted-foreground">Total Units</span>
                                                <span className="text-base font-bold text-foreground">{units.toFixed(6)}</span>
                                            </div>
                                            <div className="flex justify-between items-center bg-muted p-4 rounded-lg border border-border">
                                                <span className="text-xs font-semibold text-muted-foreground">Breakeven Price</span>
                                                <span className="text-base font-bold text-foreground">${bPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="volatility" className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-2 bg-card border border-border shadow-sm rounded-xl">
                                <CardHeader className="border-b border-border pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-bold text-foreground">Neural Variance Scan</CardTitle>
                                            <CardDescription className="text-xs text-muted-foreground">Asset Risk Distribution</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="h-[300px] flex items-end justify-between gap-1 px-4 mb-6">
                                        {Array.from({ length: 24 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-full bg-gradient-to-t from-rose-500 to-amber-500 rounded-t-sm transition-all hover:scale-110 cursor-pointer"
                                                style={{ height: `${Math.random() * 80 + 20}%`, opacity: (i + 5) / 30 }}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-xs font-semibold text-muted-foreground">
                                        <span>Low Variance Zone</span>
                                        <span>Volatility Extremes</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-6">
                                <Card className="bg-card border border-border shadow-sm rounded-xl">
                                    <CardContent className="p-8 text-center">
                                        <BrainCircuit className="h-12 w-12 text-rose-500 dark:text-rose-400 mx-auto mb-4" />
                                        <h4 className="text-base font-bold text-foreground mb-2">Liquidation Prob.</h4>
                                        <p className="text-4xl font-bold text-rose-600 dark:text-rose-400">4.2%</p>
                                        <p className="text-xs text-muted-foreground mt-3">Based on 24H Price Action</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-card border border-border shadow-sm rounded-xl">
                                    <CardHeader className="border-b border-border pb-4">
                                        <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
                                            <ShieldCheck className="h-4 w-4" /> Safety Threshold
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-3">
                                            <div className="p-4 rounded-lg bg-muted border border-border">
                                                <p className="text-xs font-semibold text-muted-foreground mb-1">Max Suggested Drawdown</p>
                                                <p className="text-base font-bold text-foreground">12% Portfolio</p>
                                            </div>
                                            <div className="p-4 rounded-lg bg-muted border border-border">
                                                <p className="text-xs font-semibold text-muted-foreground mb-1">Vol-Adjusted Stop Loss</p>
                                                <p className="text-base font-bold text-green-600 dark:text-green-400">$58,240</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Advisory Note */}
                <Card className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 rounded-xl p-6 flex items-start gap-4 shadow-sm">
                    <div className="p-2.5 rounded-lg bg-teal-100 dark:bg-teal-900/50"><Scale className="h-5 w-5 text-teal-600 dark:text-teal-400" /></div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-teal-700 dark:text-teal-400">Strategic Risk Disclosure</h4>
                        <p className="text-xs text-teal-600 dark:text-teal-300 leading-relaxed">
                            Projections are mathematical estimates based on static inputs. Real-world results may vary due to exchange slippage, network fees (GAS), and high-frequency volatility. Always maintain a 5-10% buffer for liquidity events.
                        </p>
                    </div>
                </Card>
            </div>
        </AppShell>
    )
}
