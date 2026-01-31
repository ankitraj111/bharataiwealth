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
    TrendingUp,
    BarChart3,
    Clock,
    ChevronRight,
    Eye,
    Mail,
    Zap,
    ShieldCheck
} from "lucide-react"

const reports = [
    { id: 1, title: "Weekly Market Alpha Summary", date: "Jan 23, 2026", type: "Market Hub", size: "2.4 MB", status: "New" },
    { id: 2, title: "Portfolio Performance Audit", date: "Jan 18, 2026", type: "Personal", size: "1.8 MB", status: "Downloaded" },
    { id: 3, title: "Monthly Regulatory Compliance", date: "Dec 31, 2025", type: "Tax & Legal", size: "4.1 MB", status: "Archived" },
]

export default function CryptoReports() {
    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400">
                                <FileText className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-foreground">Advisory Reports</h1>
                        </div>
                        <p className="text-muted-foreground text-sm ml-12">Professional-grade research, performance summaries, and PDF exports</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-lg border-gray-300">
                            <Mail className="h-4 w-4 mr-2 text-sky-600" /> Subscription Settings
                        </Button>
                        <Button className="rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold">
                            <Zap className="h-4 w-4 mr-2" /> Generate Instant Audit
                        </Button>
                    </div>
                </div>

                {/* Top Feature Card */}
                <Card className="bg-card border border-border shadow-sm rounded-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                        <div className="p-6 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 relative">
                            <FileText className="h-20 w-20 text-sky-600 dark:text-sky-400" />
                            <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-lg bg-card border border-sky-200 dark:border-sky-800 flex items-center justify-center shadow-sm">
                                <FileCheck className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <div>
                                <Badge className="bg-sky-100 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800 font-semibold px-3 py-1 rounded-full text-xs mb-3">LATEST PRESTIGE REPORT</Badge>
                                <h2 className="text-2xl font-bold text-foreground leading-tight">Q1 2026 Crypto Market Intelligence</h2>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                                Deep dive into institutional flows, regulatory shifts, and neural price targets for the next 90 days. Professional analysis for high-net-worth positions.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                                <Button className="rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold">
                                    <Download className="h-4 w-4 mr-2" /> Download High-Res PDF
                                </Button>
                                <Button variant="outline" className="rounded-lg border-border font-semibold">
                                    <Eye className="h-4 w-4 mr-2" /> Online Viewer
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* History / Archive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 bg-card border border-border shadow-sm rounded-xl overflow-hidden">
                        <CardHeader className="p-6 border-b border-border flex flex-row items-center justify-between bg-muted/50">
                            <div>
                                <CardTitle className="text-lg font-bold text-foreground">Report Archive</CardTitle>
                                <CardDescription className="text-xs text-muted-foreground">Access your historical generated intelligence</CardDescription>
                            </div>
                            <Button variant="ghost" className="text-muted-foreground font-semibold text-xs hover:text-foreground">View Full History</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border">
                                {reports.map((report) => (
                                    <div key={report.id} className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-sky-50 dark:group-hover:bg-sky-950/30 transition-colors">
                                                <FileText className="h-5 w-5 text-muted-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-foreground text-base">{report.title}</h5>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs text-muted-foreground">{report.date}</span>
                                                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground">{report.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge className={cn(
                                                "rounded-full px-2.5 py-0.5 font-semibold text-xs",
                                                report.status === 'New' ? 'bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800' : 'bg-muted text-muted-foreground border-border'
                                            )}>
                                                {report.status}
                                            </Badge>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-sky-600" />
                                    <CardTitle className="text-sm font-bold text-sky-600">Scheduled Intel</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <p className="text-xs font-semibold text-gray-600">Next Monthly Digest</p>
                                        <div className="flex items-baseline gap-2">
                                            <h3 className="text-4xl font-bold text-gray-900">07</h3>
                                            <span className="font-semibold text-gray-600 text-base">Days Left</span>
                                        </div>
                                        <Progress value={75} className="h-2 bg-gray-200 rounded-full" />
                                    </div>
                                    <div className="p-4 rounded-lg bg-sky-50 border border-sky-200 text-sm text-sky-700 leading-relaxed">
                                        Including exclusive data on Q1 2026 Layer-2 dominance shifts.
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <CardTitle className="text-sm font-bold text-green-600 flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" /> Proof of Reserve Export
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                                    Download a cryptographically signed report verifying your total assets across all integrated exchanges for auditing.
                                </p>
                                <Button className="w-full rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">
                                    Verify & Export
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Footer Note */}
                <Card className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 rounded-xl p-6 flex items-start gap-4 shadow-sm">
                    <div className="p-2.5 rounded-lg bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400"><BarChart3 className="h-5 w-5" /></div>
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-sky-700 dark:text-sky-400">Neural Research Integrity</h4>
                        <p className="text-xs text-sky-600 dark:text-sky-300 leading-relaxed">
                            Reports are synthesized from 400+ data points using LLM-V3 nodes. Research is educational and not financial advice. Past alpha performance is a signal of quality, not a prediction of future returns.
                        </p>
                    </div>
                </Card>
            </div>
        </AppShell>
    )
}
