"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Scale,
    ShieldAlert,
    FileText,
    Download,
    CheckCircle2,
    AlertTriangle,
    ArrowUpRight,
    Info,
    Clock,
    History,
    Building2,
    Calendar
} from "lucide-react"

export default function CryptoTax() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                                <Scale className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Tax & Compliance 🇮🇳</h1>
                        </div>
                        <p className="text-gray-600 text-sm ml-12">India-specific VDA tax calculations and TDS tracking</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-lg border-gray-300">
                            <Building2 className="h-4 w-4 mr-2" /> TDS Audit
                        </Button>
                        <Button className="rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                            <Download className="h-4 w-4 mr-2" /> Tax Report
                        </Button>
                    </div>
                </div>

                {/* Tax Summary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 bg-white/90 border-amber-600/30 border-2 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-10 overflow-hidden relative">
                        <div className="absolute top-0 right-0 h-48 w-48 bg-amber-600/5 rounded-full blur-[80px]" />
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-4 rounded-3xl bg-amber-600/10 shadow-lg"><FileText className="h-8 w-8 text-amber-600" /></div>
                            <div>
                                <h4 className="text-2xl font-black text-white">FY 2024-25 Liability</h4>
                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]">VDA Section 115BBH Analysis</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-8">
                                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Capital Gains</p>
                                    <h3 className="text-4xl font-black text-slate-900 tabular-nums">₹4,24,580</h3>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-amber-600/20 text-amber-500 border-none font-black text-[9px]">30% TAX APPLIED</Badge>
                                    </div>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Estimated Tax Payable</p>
                                    <h3 className="text-4xl font-black text-amber-500 tabular-nums">₹1,27,374</h3>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Compliance Health</h5>
                                    <div className="space-y-4">
                                        {[
                                            { label: "1% TDS Deducted", status: "Verified", color: "text-emerald-500" },
                                            { label: "Loss Set-off Rule", status: "Not Allowed", color: "text-rose-500" },
                                            { label: "ITR-2 Filing Ready", status: "92%", color: "text-blue-500" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                                <span className="text-xs font-bold text-slate-400">{item.label}</span>
                                                <span className={cn("text-[10px] font-black uppercase", item.color)}>{item.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="space-y-8">
                        <Card className="bg-white/90 border-slate-200/60 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-10 relative overflow-hidden group border-2">
                            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-8 flex items-center gap-3">
                                <Clock className="h-4 w-4 text-amber-600" /> Recent TDS Entries
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { exchange: "CoinDCX", date: "Jan 12", tx: "Sell SOL", tds: "₹142" },
                                    { exchange: "WazirX", date: "Jan 08", tx: "Sell ETH", tds: "₹840" },
                                    { exchange: "Binance P2P", date: "Jan 02", tx: "Convert USDT", tds: "₹1,240" },
                                ].map((log, i) => (
                                    <div key={i} className="flex justify-between items-center group/item hover:bg-white/5 p-3 rounded-2xl transition-all">
                                        <div>
                                            <p className="text-xs font-black text-slate-900">{log.exchange}</p>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase">{log.date} • {log.tx}</p>
                                        </div>
                                        <p className="text-xs font-black text-amber-500">{log.tds}</p>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="w-full mt-8 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-amber-500">
                                View TDS Certificates <ArrowUpRight className="h-3 w-3 ml-2" />
                            </Button>
                        </Card>

                        <Card className="bg-rose-50 border-rose-500/30 border-2 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-10">
                            <div className="flex items-center gap-3 mb-6">
                                <AlertTriangle className="h-5 w-5 text-rose-500" />
                                <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest">Action Required</h4>
                            </div>
                            <p className="text-xs font-bold text-slate-300 leading-relaxed mb-6">
                                "We detected 12 offshore transactions on Binance that lack 1% TDS deduction. Please self-declare these to avoid IT department notices."
                            </p>
                            <Button className="w-full rounded-2xl bg-rose-500 text-white font-black hover:bg-rose-600 transition-all border-none shadow-lg shadow-rose-500/20">
                                Resolve Issues
                            </Button>
                        </Card>
                    </div>
                </div>

                {/* Regulatory Note */}
                <Card className="bg-white/90 border border-slate-200/60 rounded-[2rem] p-8 flex items-start gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                    <div className="p-3 rounded-2xl bg-white/5 text-slate-400"><Info className="h-6 w-6" /></div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-300 uppercase tracking-widest text-[10px]">Disclaimer & Global Standards</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Bharat AI Wealth utilizes Income Tax Department guidelines (Section 115BBH) for calculations. We are not a licensed tax advisory firm. The 30% flat tax on VDA transfers is calculated without loss set-off as per current Indian Law. Verify all filings with a qualified CA.
                        </p>
                    </div>
                </Card>
            </div>
        </AppShell>
    )
}
