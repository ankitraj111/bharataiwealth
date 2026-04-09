"use client"

import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
    TrendingUp,
    BarChart3,
    Brain,
    Shield,
    Zap,
    Target,
    LineChart,
    Activity,
    Coins,
    ArrowRight
} from "lucide-react"

export default function CryptoHub() {
    const features = [
        {
            icon: BarChart3,
            title: "Market Analysis",
            description: "Real-time crypto market data and trends",
            href: "/crypto/market",
            color: "text-primary",
            bg: "bg-primary/10"
        },
        {
            icon: Brain,
            title: "AI Analysis",
            description: "Advanced technical indicators and AI insights",
            href: "/crypto/analysis",
            color: "text-accent-foreground",
            bg: "bg-accent"
        },
        {
            icon: LineChart,
            title: "Portfolio Tracker",
            description: "Track your crypto investments",
            href: "/crypto/portfolio",
            color: "text-success",
            bg: "bg-success/10"
        },
        {
            icon: Target,
            title: "Trading Signals",
            description: "AI-powered buy/sell signals",
            href: "/crypto/signals",
            color: "text-warning",
            bg: "bg-warning/10"
        },
        {
            icon: Activity,
            title: "On-Chain Analytics",
            description: "Blockchain data and metrics",
            href: "/crypto/on-chain",
            color: "text-primary",
            bg: "bg-primary/10"
        },
        {
            icon: Shield,
            title: "Security Scanner",
            description: "Token security and risk analysis",
            href: "/crypto/security",
            color: "text-destructive",
            bg: "bg-destructive/10"
        }
    ]

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary/60">
                            <Coins className="h-8 w-8 text-primary-foreground" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                        Crypto <span className="text-primary italic">Intelligence</span> Hub
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                        Advanced AI-powered cryptocurrency analysis, portfolio tracking, and trading insights
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-4">
                        <Badge className="bg-success/10 text-success border-success/20 font-bold px-4 py-2 rounded-full">
                            <Zap className="h-3 w-3 mr-1.5" />
                            Real-time Data
                        </Badge>
                        <Badge className="bg-primary/10 text-primary border-primary/20 font-bold px-4 py-2 rounded-full">
                            <Brain className="h-3 w-3 mr-1.5" />
                            AI-Powered
                        </Badge>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Link key={index} href={feature.href}>
                                <Card className="border border-border/50 bg-card/40 backdrop-blur-xl hover:border-primary/50 transition-all hover:shadow-2xl cursor-pointer group h-full rounded-[2rem] overflow-hidden">
                                    <CardHeader className="p-8">
                                        <div className={`p-4 rounded-2xl ${feature.bg} w-fit mb-6 group-hover:scale-110 transition-all duration-500 shadow-inner`}>
                                            <Icon className={`h-6 w-6 ${feature.color}`} />
                                        </div>
                                        <CardTitle className="text-xl font-black text-foreground group-hover:text-primary transition-colors italic uppercase tracking-tight">
                                            {feature.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm font-medium text-muted-foreground leading-relaxed italic">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="px-8 pb-8">
                                        <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 rounded-xl font-black uppercase tracking-widest text-[10px]">
                                            Explore Intelligence
                                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                    {[
                        { label: "Market Cap", val: "$2.1T", change: "+2.4% (24h)", color: "text-success", bg: "bg-success/5" },
                        { label: "BTC Dominance", val: "54.2%", change: "+0.3% (24h)", color: "text-primary", bg: "bg-primary/5" },
                        { label: "24h Volume", val: "$89.4B", change: "+12.1% (24h)", color: "text-warning", bg: "bg-warning/5" },
                        { label: "Active Coins", val: "12,847", change: "Live Tracking", color: "text-primary", bg: "bg-primary/5" },
                    ].map((stat, i) => (
                        <Card key={i} className="border-border/50 bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden group hover:border-primary/20 transition-all">
                            <CardContent className="p-6">
                                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-3">
                                    {stat.label}
                                </p>
                                <p className="text-2xl font-black text-foreground italic tabular-nums group-hover:scale-105 transition-transform origin-left">{stat.val}</p>
                                <div className={cn("mt-4 px-3 py-1 rounded-lg w-fit text-[9px] font-black uppercase tracking-widest italic", stat.bg, stat.color)}>
                                    {stat.change}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* CTA Section */}
                <Card className="bg-gradient-to-br from-primary/5 to-accent border-2 border-primary/20 mt-12 rounded-[2.5rem] overflow-hidden relative group">
                    <div className="absolute top-0 right-0 h-64 w-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-all duration-1000" />
                    <CardContent className="p-12 text-center relative z-10">
                        <h3 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tight italic">Ready to Unleash AI Alpha?</h3>
                        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto font-medium italic">
                            Get deep neural insights, real-time blockchain alerts, and advanced crowd psychology analytics to stay ahead of the market curve.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/crypto/analysis">
                                <Button size="lg" className="h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(var(--primary),0.3)] border-0">
                                    <Brain className="h-5 w-5 mr-2" />
                                    Launch Analysis
                                </Button>
                            </Link>
                            <Link href="/crypto/portfolio">
                                <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl border-border bg-card/40 text-foreground font-black uppercase tracking-widest hover:bg-accent transition-all">
                                    <TrendingUp className="h-5 w-5 mr-2" />
                                    Track Portfolio
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    )
}
