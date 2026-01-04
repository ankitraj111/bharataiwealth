"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { AICoachWidget } from "@/components/ai-coach-widget"
import { RegulatoryDisclaimer } from "@/components/regulatory-disclaimer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Area,
    AreaChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Line,
} from "recharts"
import {
    Search,
    TrendingUp,
    TrendingDown,
    Info,
    BrainCircuit,
    Target,
    ShieldAlert,
    Zap,
    ArrowUpRight,
    Sparkles,
} from "lucide-react"

// Mock prediction data
const predictionData = [
    { time: "09:00", actual: 18520, predicted: 18515 },
    { time: "10:00", actual: 18600, predicted: 18590 },
    { time: "11:00", actual: 18550, predicted: 18560 },
    { time: "12:00", actual: 18680, predicted: 18650 },
    { time: "13:00", actual: 18720, predicted: 18700 },
    { time: "14:00", actual: 18650, predicted: 18680 },
    { time: "15:00", actual: 18800, predicted: 18750 },
    { time: "16:00", actual: null, predicted: 18850 },
    { time: "17:00", actual: null, predicted: 18920 },
    { time: "18:00", actual: null, predicted: 18880 },
    { time: "19:00", actual: null, predicted: 19010 },
]

const models = [
    {
        name: "LSTM",
        type: "Deep Learning",
        prediction: "Bullish",
        confidence: 88,
        impact: "High",
        description: "Captures long-term dependencies in price sequences.",
    },
    {
        name: "XGBoost",
        type: "Gradient Boosting",
        prediction: "Slightly Bullish",
        confidence: 82,
        impact: "Medium",
        description: "Optimized for directional movement and feature importance.",
    },
    {
        name: "Random Forest",
        type: "Ensemble",
        prediction: "Neutral",
        confidence: 75,
        impact: "Low",
        description: "Evaluates overall volatility and risk classification.",
    },
    {
        name: "Prophet",
        type: "Time Series",
        prediction: "Bullish",
        confidence: 91,
        impact: "High",
        description: "Robust to outliers and seasonality in holiday periods.",
    },
]

export default function PredictionsPage() {
    const [searchTerm, setSearchTerm] = useState("NIFTY 50")

    return (
        <AppShell>
            <div className="space-y-8 pb-10">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary/40 via-background to-secondary/40 p-6 md:p-8">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20 pointer-events-none" />

                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
                                    <BrainCircuit className="h-5 w-5 text-white" />
                                </div>
                                <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground md:text-3xl">ML Price Predictions</h1>
                            </div>
                            <p className="text-sm text-muted-foreground md:text-base max-w-xl">
                                Advanced AI models forecasting market movements using LSTM, XGBoost, and Sentiment Analysis.
                            </p>
                        </div>

                        <div className="relative flex w-full max-w-md items-center gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    className="h-11 w-full border-border/50 bg-secondary/40 pl-10 transition-all focus:border-primary/20 focus:bg-secondary/60 focus:ring-1 focus:ring-primary/10"
                                    placeholder="Search Asset (e.g. NIFTY, RELIANCE, BTC)..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button size="icon" className="h-11 w-11 shrink-0 rounded-xl bg-primary hover:bg-primary/90">
                                <Target className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="glass-card border-border bg-card/40 dark:bg-white/[0.02]">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Current Price</p>
                                    <div className="mt-1 flex items-baseline gap-2">
                                        <span className="text-2xl font-bold font-mono">₹18,800.00</span>
                                        <span className="flex items-center text-xs font-medium text-success">
                                            <ArrowUpRight className="mr-0.5 h-3 w-3" /> +1.2%
                                        </span>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-success/10 p-2 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-success" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-border bg-card/40 dark:bg-white/[0.02]">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">ML Conviction</p>
                                    <div className="mt-1 flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-primary">Strong Buy</span>
                                        <Badge variant="secondary" className="ml-1 bg-primary/8 text-primary border-none font-bold px-2 py-0.5">88% CONF.</Badge>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-primary/10 p-2 flex items-center justify-center">
                                    <Zap className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-border bg-card/40 dark:bg-white/[0.02]">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Risk Status</p>
                                    <div className="mt-1 flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-accent">Moderate</span>
                                        <span className="text-xs text-muted-foreground/80">Vol. 1.2x</span>
                                    </div>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-accent/10 p-2 flex items-center justify-center">
                                    <ShieldAlert className="h-5 w-5 text-accent" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="glass-card border-border bg-card/40 dark:bg-white/[0.02] overflow-hidden">
                    <CardHeader className="border-b border-border bg-muted/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-foreground">
                                    Price Forecast Trend
                                    <Badge variant="secondary" className="text-[10px] bg-primary/8 text-primary border-none font-bold">AI POWERED</Badge>
                                </CardTitle>
                                <CardDescription className="text-muted-foreground/80">Visualizing historical performance vs next-session predictions</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 pt-6">
                        <div className="h-[400px] w-full px-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={predictionData}>
                                    <defs>
                                        <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border/30" vertical={false} />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-muted-foreground" dy={10} />
                                    <YAxis domain={['dataMin - 100', 'dataMax + 100']} axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-muted-foreground" tickFormatter={(val) => `₹${val}`} />
                                    <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '12px' }} itemStyle={{ color: 'var(--foreground)', fontSize: '12px' }} />
                                    <Area type="monotone" dataKey="predicted" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorPredicted)" strokeDasharray="5 5" name="Predicted" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Multi-Model Analysis
                    </h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {models.map((model, idx) => (
                            <Card key={idx} className="group relative overflow-hidden border-border bg-card/40 p-5 transition-all hover:bg-secondary/60 hover:glass-card hover:scale-[1.02]">
                                <div className="flex flex-col gap-3">
                                    <Badge variant="outline" className="w-fit border-primary/20 text-primary text-[10px] uppercase font-bold px-2">
                                        {model.name}
                                    </Badge>
                                    <h3 className="text-sm font-semibold text-foreground/90">{model.type}</h3>
                                    <p className="text-xs text-muted-foreground/80 leading-relaxed">{model.description}</p>
                                    <div className="mt-2 space-y-2 border-t border-border/40 pt-3">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground font-medium">Conviction Score:</span>
                                            <span className="font-mono text-primary font-bold">{model.confidence}%</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <AICoachWidget message="Why is NIFTY 50 Bullish? Our ensemble models detect strong support at 18,500 with a breakout pattern on the 4H timeframe." action="Download Report" />
                <RegulatoryDisclaimer />
            </div>
        </AppShell>
    )
}
