"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    FileText,
    Download,
    Share2,
    FileCheck,
    BarChart3,
    Clock,
    Eye,
    Mail,
    Zap,
    ShieldCheck
} from "lucide-react"

const reports = [
    { id: 1, title: "Neural Market Alpha Summary", date: "Jan 23, 2026", type: "Alpha Hub", size: "2.4 MB", status: "Neural" },
    { id: 2, title: "Structural Audit Sync", date: "Jan 18, 2026", type: "Structural", size: "1.8 MB", status: "Archived" },
    { id: 3, title: "Macro Regulatory Compliance", date: "Dec 31, 2025", type: "Tax Vector", size: "4.1 MB", status: "Verified" },
]

export default function CryptoReports() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen bg-background/50 backdrop-blur-sm">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-2xl bg-primary shadow-lg shadow-primary/20">
                                <FileText className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h1 className="text-4xl font-black text-foreground tracking-tighter italic uppercase">Alpha Research</h1>
                        </div>
                        <p className="text-muted-foreground text-[11px] ml-16 font-black uppercase tracking-[0.2em] italic opacity-60">High-Intelligence Synthesis & Structural Audits</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="h-12 rounded-2xl border-border bg-card/40 text-[10px] font-black uppercase tracking-widest px-6 hover:text-primary transition-all">
                            <Mail className="h-4 w-4 mr-3 text-primary" /> Intel Settings
                        </Button>
                        <Button className="h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest px-6 shadow-xl shadow-primary/20 border-0 transition-all hover:scale-105">
                            <Zap className="h-4 w-4 mr-3" /> Instant Synthesis
                        </Button>
                    </div>
                </div>

                {/* Top Feature Card */}
                <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-2xl rounded-[3rem] overflow-hidden border group">
                    <div className="flex flex-col md:flex-row items-center gap-10 p-10 relative">
                        <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-primary/10 transition-all duration-700" />
                        <div className="p-10 rounded-[2.5rem] bg-muted/40 border border-border/50 relative shadow-inner group-hover:scale-105 transition-transform">
                            <FileText className="h-24 w-24 text-primary relative z-10" />
                            <div className="absolute -bottom-4 -right-4 h-14 w-14 rounded-2xl bg-card border border-primary/20 flex items-center justify-center shadow-xl">
                                <FileCheck className="h-7 w-7 text-primary" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-6 text-center md:text-left relative z-10">
                            <div>
                                <Badge className="bg-primary/10 text-primary border-primary/20 font-black px-5 py-1.5 rounded-xl text-[10px] uppercase tracking-[0.3em] mb-4 italic shadow-lg shadow-primary/5">PRESTIGE INTELLIGENCE</Badge>
                                <h2 className="text-3xl font-black text-foreground italic uppercase tracking-tighter leading-tight">Q1 2026 Crypto Neural Alpha</h2>
                            </div>
                            <p className="text-sm font-black text-muted-foreground leading-relaxed max-w-2xl italic opacity-70">
                                Deep structural dive into institutional flows, regulatory shifts, and neural price trajectories for the next 90-day window. Professional-grade synthesis for high-net-worth positions.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                                <Button className="h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest px-8 shadow-xl shadow-primary/30 transition-all border-0">
                                    <Download className="h-5 w-5 mr-3" /> Download High-Res Alpha
                                </Button>
                                <Button variant="outline" className="h-14 rounded-2xl border-border bg-card/40 text-[11px] font-black uppercase tracking-widest px-8 hovr:bg-muted/50 transition-all">
                                    <Eye className="h-5 w-5 mr-3" /> Structural Viewer
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* History / Archive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 bg-card/40 border-border/50 backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden border group">
                        <CardHeader className="p-8 border-b border-border/30 bg-muted/20 relative">
                            <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all" />
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                <div>
                                    <CardTitle className="text-2xl font-black text-foreground italic uppercase tracking-tighter">Research Archive</CardTitle>
                                    <CardDescription className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">Historical generated intelligence logs</CardDescription>
                                </div>
                                <Button variant="ghost" className="text-[10px] font-black text-primary hover:text-primary/80 transition-all uppercase tracking-widest italic h-auto p-0">View Structural Archive</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border/30">
                                {reports.map((report) => (
                                    <div key={report.id} className="p-8 flex items-center justify-between hover:bg-primary/5 transition-all group/item shadow-inner relative overflow-hidden">
                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className="h-14 w-14 rounded-2xl bg-muted/40 border border-border/50 flex items-center justify-center group-hover/item:bg-primary/10 transition-all shadow-sm">
                                                <FileText className="h-6 w-6 text-muted-foreground group-hover/item:text-primary transition-colors" />
                                            </div>
                                            <div>
                                                <h5 className="font-black text-foreground text-lg italic uppercase tracking-tight group-hover/item:text-primary transition-colors">{report.title}</h5>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60">{report.date}</span>
                                                    <span className="h-1 w-1 rounded-full bg-border" />
                                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest italic opacity-80">{report.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 relative z-10">
                                            <Badge className={cn(
                                                "font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-xl border italic shadow-lg transition-transform group-hover/item:scale-105",
                                                report.status === 'Neural' ? 'bg-primary/10 text-primary border-primary/20 shadow-primary/10' : 'bg-muted text-muted-foreground border-border/50 shadow-inner'
                                            )}>
                                                {report.status}
                                            </Badge>
                                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                                                <Download className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all">
                                                <Share2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-8">
                        <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group/intel">
                            <CardHeader className="p-6 border-b border-border/30 bg-muted/20">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-4 w-4 text-primary" />
                                    <CardTitle className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Scheduled Alpha Sync</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest italic">Next Macro Digest</p>
                                        <div className="flex items-baseline gap-3">
                                            <h3 className="text-5xl font-black text-foreground italic tracking-tighter">07</h3>
                                            <span className="font-black text-muted-foreground text-sm uppercase italic tracking-widest opacity-60">Neural Days</span>
                                        </div>
                                        <Progress value={75} className="h-2 bg-muted rounded-full overflow-hidden border border-border/50 relative shadow-inner">
                                            <div className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" style={{ width: '75%' }} />
                                        </Progress>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 text-[11px] text-muted-foreground font-bold italic leading-relaxed">
                                        Structural inclusion of proprietary Layer-2 dominance alpha clusters.
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/40 border-border/50 backdrop-blur-2xl shadow-xl rounded-[2.5rem] overflow-hidden border group/reserve">
                            <CardHeader className="p-6 border-b border-border/30 bg-muted/20">
                                <CardTitle className="text-[10px] font-black text-success uppercase tracking-[0.2em] italic flex items-center gap-3">
                                    <ShieldCheck className="h-4 w-4" /> Structural Reserve Export
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8">
                                <p className="text-[11px] text-muted-foreground font-black italic leading-relaxed mb-6 opacity-70">
                                    Finalize cryptographically signed Alpha structural report verifying total asset integrity across all integrated exchange vectors.
                                </p>
                                <Button className="w-full h-14 rounded-2xl bg-success text-success-foreground font-black uppercase tracking-widest shadow-xl shadow-success/20 transition-all hover:scale-[1.02] border-0">
                                    Neural Verify & Export
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Footer Note */}
                <Card className="bg-primary/10 border border-primary/20 backdrop-blur-xl rounded-[2.5rem] p-8 flex items-start gap-6 shadow-2xl relative overflow-hidden group/footer">
                    <div className="absolute top-0 right-0 h-20 w-20 bg-primary/10 rounded-full blur-xl -mr-10 -mt-10 group-hover/footer:bg-primary/20 transition-all" />
                    <div className="p-4 rounded-2xl bg-primary/20 shadow-lg shadow-primary/10 transition-transform group-hover/footer:scale-110"><BarChart3 className="h-6 w-6 text-primary" /></div>
                    <div className="space-y-2 relative z-10">
                        <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">Neural Research Directive</h4>
                        <p className="text-xs text-muted-foreground font-bold italic leading-relaxed opacity-80">
                            Structural reports are synthesized from 400+ neural data nodes. Research clusters are educational and not financial advice. Past alpha performance is a signal of fidelity, not a prediction of future results.
                        </p>
                    </div>
                </Card>
            </div>
        </AppShell>
    )
}
