"use client"

import { AppShell } from "@/components/app-shell"
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
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-950/30"
        },
        {
            icon: Brain,
            title: "AI Analysis",
            description: "Advanced technical indicators and AI insights",
            href: "/crypto/analysis",
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-950/30"
        },
        {
            icon: LineChart,
            title: "Portfolio Tracker",
            description: "Track your crypto investments",
            href: "/crypto/portfolio",
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-950/30"
        },
        {
            icon: Target,
            title: "Trading Signals",
            description: "AI-powered buy/sell signals",
            href: "/crypto/signals",
            color: "text-orange-600 dark:text-orange-400",
            bg: "bg-orange-50 dark:bg-orange-950/30"
        },
        {
            icon: Activity,
            title: "On-Chain Analytics",
            description: "Blockchain data and metrics",
            href: "/crypto/on-chain",
            color: "text-cyan-600 dark:text-cyan-400",
            bg: "bg-cyan-50 dark:bg-cyan-950/30"
        },
        {
            icon: Shield,
            title: "Security Scanner",
            description: "Token security and risk analysis",
            href: "/crypto/security",
            color: "text-red-600 dark:text-red-400",
            bg: "bg-red-50 dark:bg-red-950/30"
        }
    ]

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                            <Coins className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Crypto Intelligence Hub
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Advanced AI-powered cryptocurrency analysis, portfolio tracking, and trading insights
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-4">
                        <Badge className="bg-emerald-500 text-white font-bold px-4 py-2">
                            <Zap className="h-3 w-3 mr-1" />
                            Real-time Data
                        </Badge>
                        <Badge className="bg-blue-500 text-white font-bold px-4 py-2">
                            <Brain className="h-3 w-3 mr-1" />
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
                                <Card className="border-2 border-border hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer group h-full">
                                    <CardHeader>
                                        <div className={`p-3 rounded-xl ${feature.bg} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                                            <Icon className={`h-6 w-6 ${feature.color}`} />
                                        </div>
                                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm">
                                            {feature.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="ghost" className="w-full group-hover:bg-primary/10 transition-colors">
                                            Explore
                                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        )
                    })}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <Card className="border-border/50">
                        <CardContent className="p-6">
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">
                                Total Market Cap
                            </p>
                            <p className="text-2xl font-black">$2.1T</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                                +2.4% (24h)
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50">
                        <CardContent className="p-6">
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">
                                BTC Dominance
                            </p>
                            <p className="text-2xl font-black">54.2%</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-1">
                                +0.3% (24h)
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50">
                        <CardContent className="p-6">
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">
                                24h Volume
                            </p>
                            <p className="text-2xl font-black">$89.4B</p>
                            <p className="text-xs text-purple-600 dark:text-purple-400 font-bold mt-1">
                                +12.1% (24h)
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50">
                        <CardContent className="p-6">
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-2">
                                Active Coins
                            </p>
                            <p className="text-2xl font-black">12,847</p>
                            <p className="text-xs text-orange-600 dark:text-orange-400 font-bold mt-1">
                                Live Tracking
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA Section */}
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-blue-200 dark:border-blue-800 mt-8">
                    <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to Start Trading?</h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Get AI-powered insights, real-time alerts, and advanced analytics to make smarter crypto investment decisions
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Link href="/crypto/analysis">
                                <Button size="lg" className="gap-2">
                                    <Brain className="h-5 w-5" />
                                    Start Analysis
                                </Button>
                            </Link>
                            <Link href="/crypto/portfolio">
                                <Button size="lg" variant="outline" className="gap-2">
                                    <TrendingUp className="h-5 w-5" />
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
