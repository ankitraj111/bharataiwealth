"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Scale,
    FileText,
    Download,
    AlertTriangle,
    ArrowUpRight,
    Info,
    Clock,
    Building2,
    ShieldAlert
} from "lucide-react"

export default function CryptoTax() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50 backdrop-blur-sm">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-primary shadow-lg shadow-primary/20">
                                <Scale className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Tax & Compliance</h1>
                        </div>
                        <p className="text-muted-foreground text-[11px] ml-16 font-black uppercase tracking-[0.2em] italic opacity-60">India-specific VDA Alpha Regulation Analysis</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="h-12 rounded-2xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-6 hover:text-primary transition-all">
                            <Building2 className="h-4 w-4 mr-3 text-primary" /> Structural Audit
                        </Button>
                        <Button className="h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest px-6 shadow-xl shadow-primary/20 border-0 transition-all hover:scale-105">
                            <Download className="h-4 w-4 mr-3" /> Alpha Tax Report
                        </Button>
                    </div>
                </div>

                {/* Tax Summary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-2xl shadow-2xl rounded-[3rem] p-10 overflow-hidden border group">
                        <div className="absolute top-0 right-0 h-48 w-48 bg-primary/5 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-primary/10 transition-all duration-700" />
                        <div className="flex items-center gap-5 mb-12 relative z-10">
                            <div className="p-4 rounded-3xl bg-primary shadow-lg shadow-primary/20"><FileText className="h-8 w-8 text-primary-foreground" /></div>
                            <div>
                                <h4 className="text-3xl font-black text-foreground italic uppercase tracking-tighter leading-tight">FY 2024-25 Alpha Liability</h4>
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.25em] italic mt-1">VDA Section 115BBH Structural Analysis</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                            <div className="space-y-8">
                                <div className="p-8 rounded-[2.5rem] bg-muted/40 border border-border/50 space-y-4 shadow-inner">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Total Structural Alpha Gains</p>
                                    <h3 className="text-4xl font-black text-foreground tabular-nums italic tracking-tighter">₹4,24,580</h3>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-primary/10 text-primary border-primary/20 font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg">30% STRUCTURAL TAX APPLIED</Badge>
                                    </div>
                                </div>
                                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 space-y-4 relative group/tax">
                                    <div className="absolute inset-0 bg-primary/2 blur-2xl rounded-full opacity-0 group-hover/tax:opacity-100 transition-opacity" />
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest italic relative z-10">Estimated Alpha Tax Payable</p>
                                    <h3 className="text-4xl font-black text-primary tabular-nums italic tracking-tighter relative z-10">₹1,27,374</h3>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h5 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Compliance Health Sync</h5>
                                    <div className="space-y-4">
                                        {[
                                            { label: "1% TDS Deducted", status: "Verified", color: "text-success bg-success/10 border-success/20" },
                                            { label: "Loss Set-off Rule", status: "Not Allowed", color: "text-destructive bg-destructive/10 border-destructive/20" },
                                            { label: "ITR-2 Filing Ready", status: "92%", color: "text-primary bg-primary/10 border-primary/20" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-muted/30 border border-border/50 shadow-sm group/item hover:bg-muted/50 transition-all">
                                                <span className="text-[11px] font-black text-foreground italic uppercase tracking-tighter">{item.label}</span>
                                                <Badge className={cn("font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg border", item.color)}>
                                                    {item.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div className="space-y-8">
                        <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] p-10 relative overflow-hidden group border">
                            <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
                            <h4 className="text-[10px] font-black text-foreground uppercase tracking-[0.2em] mb-8 flex items-center gap-3 italic relative z-10">
                                <Clock className="h-4 w-4 text-primary" /> Alpha TDS Logs
                            </h4>
                            <div className="space-y-6 relative z-10">
                                {[
                                    { exchange: "AlphaSync DCX", date: "Jan 12", tx: "Sell SOL", tds: "₹142" },
                                    { exchange: "Neural WazirX", date: "Jan 08", tx: "Sell ETH", tds: "₹840" },
                                    { exchange: "Structural P2P", date: "Jan 02", tx: "Convert USDT", tds: "₹1,240" },
                                ].map((log, i) => (
                                    <div key={i} className="flex justify-between items-center group/item hover:bg-primary/5 p-4 rounded-2xl transition-all shadow-inner bg-muted/20 border border-transparent hover:border-primary/20">
                                        <div>
                                            <p className="text-xs font-black text-foreground italic uppercase tracking-tighter">{log.exchange}</p>
                                            <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60 mt-1">{log.date} • {log.tx}</p>
                                        </div>
                                        <p className="text-xs font-black text-primary italic tabular-nums">{log.tds}</p>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" className="w-full mt-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all italic h-auto p-0">
                                View TDS Certificates <ArrowUpRight className="h-3 w-3 ml-2" />
                            </Button>
                        </Card>

                        <Card className="bg-destructive/5 border-destructive/20 backdrop-blur-2xl shadow-xl rounded-[2.5rem] p-10 border-2 group/alert">
                            <div className="flex items-center gap-4 mb-6 relative">
                                <div className="p-3 rounded-2xl bg-destructive/10 group-hover/alert:scale-110 transition-transform">
                                    <ShieldAlert className="h-6 w-6 text-destructive" />
                                </div>
                                <h4 className="text-[10px] font-black text-destructive uppercase tracking-widest italic">Structural Action Required</h4>
                            </div>
                            <p className="text-[11px] font-black text-muted-foreground leading-relaxed mb-8 italic opacity-80">
                                Neural engine detected 12 offshore vectors lacking 1% internal TDS deduction. Self-declare to prevent structural IT audit notices.
                            </p>
                            <Button className="w-full h-14 rounded-2xl bg-destructive text-destructive-foreground font-black uppercase tracking-widest shadow-xl shadow-destructive/20 transition-all hover:scale-[1.02] border-0">
                                Resolve Compliance
                            </Button>
                        </Card>
                    </div>
                </div>

                {/* Regulatory Note */}
                <Card className="bg-card/40 border border-border/50 rounded-[2.5rem] p-8 flex items-start gap-6 shadow-2xl backdrop-blur-md relative overflow-hidden group/note">
                    <div className="absolute top-0 right-0 h-20 w-20 bg-primary/5 rounded-full blur-xl -mr-10 -mt-10 group-hover/note:bg-primary/10 transition-all" />
                    <div className="p-4 rounded-2xl bg-muted/40 text-muted-foreground shadow-inner group-hover/note:scale-110 transition-transform"><Info className="h-6 w-6" /></div>
                    <div className="space-y-2 relative z-10">
                        <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic opacity-60">Legal Disclaimer & Compliance Synthesis</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed font-bold italic opacity-80">
                            Bharat AI Wealth utilizes synthesis of ITD Section 115BBH guidelines for calculations. Not a licensed tax advisory service. Structural 30% flat tax on VDA transfers is calculated without loss set-off as per current Law. Verify all filings with a qualified Alpha auditor (CA).
                        </p>
                    </div>
                </Card>
            </div>
        </AppShell>
    )
}
