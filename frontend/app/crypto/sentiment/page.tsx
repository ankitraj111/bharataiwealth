"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Smile,
    Frown,
    Meh,
    Activity,
    TrendingUp,
    TrendingDown,
    MessageSquare,
    Newspaper,
    Twitter,
    Search,
    Zap,
    Sparkles,
    BarChart3
} from "lucide-react"

export default function CryptoSentiment() {
    const [fearGreed, setFearGreed] = useState(72)

    return (
        <AppShell>
            <div className="flex flex-col gap-8 p-6 lg:p-10 max-w-[1600px] mx-auto min-h-screen">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                                <Smile className="h-6 w-6" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Market Sentiment</h1>
                        </div>
                        <p className="text-gray-600 text-sm ml-12">Social signals and crowd psychology analysis</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-lg bg-rose-50 border border-rose-200">
                            <span className="text-xs font-semibold text-rose-700">Processing 1.2M Headlines/HR</span>
                        </div>
                        <Button variant="outline" className="rounded-lg border-gray-300">
                            <Search className="h-4 w-4 mr-2" /> Filter Sources
                        </Button>
                    </div>
                </div>

                {/* Sentiment Score Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border border-gray-200 shadow-sm bg-white">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-6">Social Media Sentiment</p>
                            <div className="relative h-40 w-40 flex items-center justify-center mb-6">
                                <svg className="h-full w-full -rotate-90">
                                    <circle cx="80" cy="80" r="70" className="stroke-gray-200 fill-none" strokeWidth="12" />
                                    <circle
                                        cx="80" cy="80" r="70"
                                        className="stroke-green-500 fill-none transition-all duration-1000"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeDasharray="440"
                                        strokeDashoffset={440 - (440 * 82) / 100}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-gray-900">82%</span>
                                    <span className="text-xs font-semibold text-green-600 uppercase">Bullish</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-200">
                                    <Twitter className="h-3 w-3 text-blue-600" />
                                    <span className="text-xs font-semibold text-blue-700">Extreme</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 border border-orange-200">
                                    <MessageSquare className="h-3 w-3 text-orange-600" />
                                    <span className="text-xs font-semibold text-orange-700">Neutral</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm bg-white">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-6">News Impact Score</p>
                            <div className="relative h-40 w-40 flex items-center justify-center mb-6">
                                <svg className="h-full w-full -rotate-90">
                                    <circle cx="80" cy="80" r="70" className="stroke-gray-200 fill-none" strokeWidth="12" />
                                    <circle
                                        cx="80" cy="80" r="70"
                                        className="stroke-blue-500 fill-none transition-all duration-1000"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeDasharray="440"
                                        strokeDashoffset={440 - (440 * 64) / 100}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-gray-900">64</span>
                                    <span className="text-xs font-semibold text-blue-600 uppercase">Positive</span>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
                                    <Newspaper className="h-3 w-3 text-gray-600" />
                                    <span className="text-xs font-semibold text-gray-700">High Volume</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-200 shadow-sm bg-white">
                        <CardContent className="p-8">
                            <p className="text-xs text-gray-600 font-semibold uppercase mb-6">Market Psychology</p>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-gray-600">FOMO Levels</span>
                                        <span className="text-xs font-bold text-red-600">Intense</span>
                                    </div>
                                    <Progress value={85} className="h-2 bg-gray-100 rounded-full" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-gray-600">Panic Index</span>
                                        <span className="text-xs font-bold text-green-600">Low</span>
                                    </div>
                                    <Progress value={12} className="h-2 bg-gray-100 rounded-full" />
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-gray-600">Retail Excitement</span>
                                        <span className="text-xs font-bold text-blue-600">Very High</span>
                                    </div>
                                    <Progress value={92} className="h-2 bg-gray-100 rounded-full" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-sm rounded-xl">
                        <CardHeader className="border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-gray-900">AI Crowd Intelligence</CardTitle>
                                    <CardDescription className="text-xs text-gray-600">Neural Pattern Matching</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {[
                                    { title: "ETF Approval Rumors", impact: "High", sentiment: "Positive", text: "Growing consensus on social media regarding upcoming Spot Solana ETF filings. Volume is spiking on keyword detection.", source: "Twitter Clusters" },
                                    { title: "Macro Regulation Update", impact: "Medium", sentiment: "Neutral", text: "New guidelines from SEC regarding staking protocols. Market reacting with cautious optimism at the clarity.", source: "Mainstream News" },
                                    { title: "Whale Wallet Discovery", impact: "High", sentiment: "Hyper-Bullish", text: "Identification of a new wallet holding 2% of total supply moving funds into long-term cold storage.", source: "On-Chain Feed" },
                                ].map((insight, i) => (
                                    <div key={i} className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
                                        <div className="flex items-center justify-between mb-3">
                                            <h5 className="text-sm font-bold text-gray-900">{insight.title}</h5>
                                            <Badge className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${insight.sentiment.includes('Positive') || insight.sentiment.includes('Bullish') ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'
                                                }`}>
                                                {insight.sentiment}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-3">"{insight.text}"</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Zap className="h-3.5 w-3.5 text-rose-600" />
                                                <span className="text-xs font-semibold text-gray-600">Impact: {insight.impact}</span>
                                            </div>
                                            <span className="text-xs font-medium text-gray-500">{insight.source}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                            <CardHeader className="border-b border-gray-100 pb-4">
                                <CardTitle className="text-sm font-bold text-gray-900">Fear & Greed Clock</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="text-center mb-6">
                                    <h3 className="text-6xl font-bold text-gray-900 mb-2">72</h3>
                                    <p className="text-xs font-semibold text-green-600 uppercase">Greed Intensity</p>
                                    <p className="text-xs text-gray-600 mt-3">Historical average for Bull Cycle Phase 2: 68-75.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-center">
                                        <p className="text-xs font-semibold text-gray-600 mb-1">Yesterday</p>
                                        <p className="text-lg font-bold text-gray-900">68</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-center">
                                        <p className="text-xs font-semibold text-gray-600 mb-1">Last Week</p>
                                        <p className="text-lg font-bold text-gray-900">42</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                            <CardContent className="p-6 text-center">
                                <div className="mx-auto p-3 rounded-lg bg-rose-50 w-fit mb-4">
                                    <Activity className="h-8 w-8 text-rose-600" />
                                </div>
                                <h4 className="text-base font-bold text-gray-900 mb-2">Neural Buzz Alert</h4>
                                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                    AI detection identifies a 350% spike in keyword '#SolanaSummer' across Reddit and Telegram cluster nodes.
                                </p>
                                <Button className="w-full rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors">
                                    Drill Down Analytics
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
