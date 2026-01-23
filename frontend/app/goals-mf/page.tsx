"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Target,
    Home,
    GraduationCap,
    Palmtree,
    Plane,
    Heart,
    ShieldAlert,
    ArrowRight,
    Sparkles,
    TrendingUp,
    Calendar,
    Loader2,
    BarChart3,
    IndianRupee,
} from "lucide-react"
import { fetchGoalBasedFunds } from "@/lib/api"

interface FundAllocation {
    scheme_code: string
    scheme_name: string
    category: string
    allocation_percent: number
    expected_cagr: number
}

interface GoalPortfolio {
    goal_type: string
    description: string
    risk_level: string
    time_horizon: string
    expected_cagr: number
    funds: FundAllocation[]
}

interface Goal {
    goal_type: string
    description: string
    risk_level: string
    time_horizon: string
}

const goalIcons: Record<string, React.ElementType> = {
    retirement: Palmtree,
    house: Home,
    education: GraduationCap,
    vacation: Plane,
    wedding: Heart,
    emergency: ShieldAlert,
}

const goalColors: Record<string, string> = {
    retirement: "from-emerald-500 to-teal-600",
    house: "from-blue-500 to-indigo-600",
    education: "from-purple-500 to-violet-600",
    vacation: "from-orange-500 to-amber-600",
    wedding: "from-pink-500 to-rose-600",
    emergency: "from-red-500 to-orange-600",
}

const goalBgColors: Record<string, string> = {
    retirement: "bg-emerald-500/10 border-emerald-500/20",
    house: "bg-blue-500/10 border-blue-500/20",
    education: "bg-purple-500/10 border-purple-500/20",
    vacation: "bg-orange-500/10 border-orange-500/20",
    wedding: "bg-pink-500/10 border-pink-500/20",
    emergency: "bg-red-500/10 border-red-500/20",
}

export default function GoalBasedFundsPage() {
    return (
        <ProtectedRoute>
            <GoalBasedFundsContent />
        </ProtectedRoute>
    )
}

function GoalBasedFundsContent() {
    const [goals, setGoals] = useState<Goal[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
    const [portfolio, setPortfolio] = useState<GoalPortfolio | null>(null)
    const [portfolioLoading, setPortfolioLoading] = useState(false)

    useEffect(() => {
        loadGoals()
    }, [])

    const loadGoals = async () => {
        setLoading(true)
        const data = await fetchGoalBasedFunds()
        if (data?.available_goals) {
            setGoals(data.available_goals)
        }
        setLoading(false)
    }

    const loadPortfolio = async (goal: string) => {
        setPortfolioLoading(true)
        setSelectedGoal(goal)
        const data = await fetchGoalBasedFunds(goal)
        if (data?.portfolio) {
            setPortfolio(data.portfolio)
        }
        setPortfolioLoading(false)
    }

    const getRiskBadgeColor = (risk: string) => {
        switch (risk) {
            case "low":
                return "bg-success/10 text-success border-success/20"
            case "medium":
                return "bg-warning/10 text-warning border-warning/20"
            case "high":
                return "bg-destructive/10 text-destructive border-destructive/20"
            default:
                return "bg-muted text-muted-foreground"
        }
    }

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-success/5 via-transparent to-accent/5 p-8 border border-border/50">
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success text-success-foreground shadow-lg">
                                    <Target className="h-7 w-7" />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-bold text-foreground">Goal-Based Funds</h1>
                                    <p className="text-muted-foreground font-medium">
                                        Choose your financial goal and get AI-curated mutual fund portfolios
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Goal Selection */}
                        <div className="lg:col-span-1 space-y-4">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Select Your Goal
                            </h2>

                            <div className="space-y-3">
                                {goals.map((goal) => {
                                    const Icon = goalIcons[goal.goal_type] || Target
                                    const isSelected = selectedGoal === goal.goal_type

                                    return (
                                        <Card
                                            key={goal.goal_type}
                                            className={`cursor-pointer transition-all border-2 ${isSelected
                                                ? "border-primary bg-primary/5"
                                                : "border-border/50 hover:border-primary/30"
                                                }`}
                                            onClick={() => loadPortfolio(goal.goal_type)}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${goalColors[goal.goal_type]} flex items-center justify-center shadow-md`}>
                                                        <Icon className="h-6 w-6 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold capitalize">{goal.goal_type}</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <Badge className={`text-[9px] ${getRiskBadgeColor(goal.risk_level)}`}>
                                                                {goal.risk_level}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">{goal.time_horizon}</span>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Portfolio Details */}
                        <div className="lg:col-span-2">
                            {portfolioLoading ? (
                                <div className="flex h-64 items-center justify-center">
                                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                </div>
                            ) : portfolio ? (
                                <div className="space-y-6">
                                    {/* Portfolio Header */}
                                    <Card className={`overflow-hidden ${goalBgColors[portfolio.goal_type]}`}>
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        {(() => {
                                                            const Icon = goalIcons[portfolio.goal_type] || Target
                                                            return (
                                                                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${goalColors[portfolio.goal_type]} flex items-center justify-center shadow-lg`}>
                                                                    <Icon className="h-7 w-7 text-white" />
                                                                </div>
                                                            )
                                                        })()}
                                                        <div>
                                                            <h2 className="text-2xl font-bold capitalize">{portfolio.goal_type} Portfolio</h2>
                                                            <p className="text-muted-foreground text-sm">{portfolio.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Expected CAGR</p>
                                                    <div className="flex items-center gap-1 justify-end">
                                                        <TrendingUp className="h-5 w-5 text-success" />
                                                        <span className="text-3xl font-black font-mono text-success">{portfolio.expected_cagr}%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mt-6">
                                                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Risk Level</p>
                                                    <Badge className={`${getRiskBadgeColor(portfolio.risk_level)} text-sm font-bold py-1 px-3`}>
                                                        {portfolio.risk_level.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Time Horizon</p>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-accent" />
                                                        <span className="font-bold">{portfolio.time_horizon}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Fund Allocation */}
                                    <Card className="border-border/50">
                                        <CardHeader className="border-b border-border">
                                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                                <BarChart3 className="h-5 w-5 text-primary" />
                                                Recommended Allocation
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            {portfolio.funds.map((fund, index) => (
                                                <div
                                                    key={fund.scheme_code}
                                                    className={`p-5 ${index < portfolio.funds.length - 1 ? "border-b border-border/50" : ""}`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1 min-w-0 pr-4">
                                                            <p className="font-bold text-sm">{fund.scheme_name}</p>
                                                            <div className="flex items-center gap-3 mt-2">
                                                                <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                                                                    {fund.category}
                                                                </Badge>
                                                                <span className="text-xs text-success font-mono font-bold">
                                                                    +{fund.expected_cagr}% CAGR
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right shrink-0">
                                                            <div className="flex items-center gap-2 justify-end">
                                                                <div className="h-3 w-24 bg-muted rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-primary rounded-full"
                                                                        style={{ width: `${fund.allocation_percent}%` }}
                                                                    />
                                                                </div>
                                                                <span className="font-black text-xl text-primary w-14 text-right font-mono">
                                                                    {fund.allocation_percent}%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>

                                    {/* Start Investing CTA */}
                                    <Card className="border-primary/30 bg-primary/5">
                                        <CardContent className="p-5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                                        <IndianRupee className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Ready to start investing?</p>
                                                        <p className="text-sm text-muted-foreground">Plan your SIP with our AI-powered calculator</p>
                                                    </div>
                                                </div>
                                                <Button className="gap-2 font-bold shadow-lg" asChild>
                                                    <a href="/sip">
                                                        Go to SIP Planner
                                                        <ArrowRight className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : (
                                <Card className="border-border/50 h-full min-h-[400px] flex items-center justify-center">
                                    <CardContent className="text-center p-12">
                                        <div className="h-20 w-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
                                            <Target className="h-10 w-10 text-muted-foreground/50" />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground mb-2">Select a Financial Goal</h3>
                                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                            Choose from retirement, house, education, wedding, vacation, or emergency fund to see AI-curated mutual fund portfolios.
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    )
}
