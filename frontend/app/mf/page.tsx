"use client"

import { useState, useEffect, useMemo } from "react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    TrendingUp,
    Search,
    Filter,
    Sparkles,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    IndianRupee,
    Loader2,
    Building2,
    RefreshCw,
} from "lucide-react"
import { fetchMutualFundList, fetchMutualFundRanking } from "@/lib/api"

interface MutualFund {
    scheme_code: string
    scheme_name: string
    category: string
    risk_level: string
    amc: string
    cagr_3yr: number
    expense_ratio: number
    score?: number
}

const categories = [
    "All",
    "Large Cap",
    "Mid Cap",
    "Small Cap",
    "Flexi Cap",
    "ELSS",
    "Hybrid",
    "Debt",
    "Liquid",
    "International",
    "Commodities"
]

const riskLevels = ["all", "low", "medium", "high"]

export default function MutualFundsPage() {
    return (
        <ProtectedRoute>
            <MutualFundsContent />
        </ProtectedRoute>
    )
}

function MutualFundsContent() {
    const [funds, setFunds] = useState<MutualFund[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedRisk, setSelectedRisk] = useState("all")
    const [viewMode, setViewMode] = useState<"all" | "ranked">("all")
    const [rankedFunds, setRankedFunds] = useState<MutualFund[]>([])

    useEffect(() => {
        loadFunds()
    }, [])

    const loadFunds = async () => {
        setLoading(true)
        const data = await fetchMutualFundList()
        if (data?.funds) {
            setFunds(data.funds)
        }
        setLoading(false)
    }

    const loadRankedFunds = async (risk: string) => {
        setLoading(true)
        const data = await fetchMutualFundRanking(risk)
        if (data?.top_funds) {
            setRankedFunds(data.top_funds)
        }
        setLoading(false)
    }

    const handleViewModeChange = (mode: "all" | "ranked") => {
        setViewMode(mode)
        if (mode === "ranked" && selectedRisk !== "all") {
            loadRankedFunds(selectedRisk)
        }
    }

    const handleRiskChange = (risk: string) => {
        setSelectedRisk(risk)
        if (viewMode === "ranked" && risk !== "all") {
            loadRankedFunds(risk)
        }
    }

    const filteredFunds = useMemo(() => {
        let result = viewMode === "ranked" ? rankedFunds : funds

        if (searchQuery) {
            result = result.filter(
                (f) =>
                    f.scheme_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    f.amc?.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        if (selectedCategory !== "All" && viewMode === "all") {
            result = result.filter((f) => f.category === selectedCategory)
        }

        if (selectedRisk !== "all" && viewMode === "all") {
            result = result.filter((f) => f.risk_level === selectedRisk)
        }

        return result
    }, [funds, rankedFunds, searchQuery, selectedCategory, selectedRisk, viewMode])

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

    const formatCurrency = (num: number) => {
        if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`
        if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`
        return `₹${num.toLocaleString("en-IN")}`
    }

    return (
        <AppShell>
            <div className="space-y-8">
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-8 border border-border/50">
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                                    <BarChart3 className="h-7 w-7" />
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-3xl font-bold text-foreground">Mutual Funds Explorer</h1>
                                    <p className="text-muted-foreground font-medium">
                                        Discover and analyze top-performing mutual funds across categories
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant={viewMode === "all" ? "default" : "outline"}
                                onClick={() => handleViewModeChange("all")}
                                className="gap-2"
                            >
                                <Filter className="h-4 w-4" />
                                All Funds
                            </Button>
                            <Button
                                variant={viewMode === "ranked" ? "default" : "outline"}
                                onClick={() => handleViewModeChange("ranked")}
                                className="gap-2"
                            >
                                <Sparkles className="h-4 w-4" />
                                Top Ranked
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by fund name or AMC..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/30"
                        />
                    </div>

                    {viewMode === "all" && (
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-48 bg-muted/30">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    <Select value={selectedRisk} onValueChange={handleRiskChange}>
                        <SelectTrigger className="w-40 bg-muted/30">
                            <SelectValue placeholder="Risk Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Risk</SelectItem>
                            <SelectItem value="low">Low Risk</SelectItem>
                            <SelectItem value="medium">Medium Risk</SelectItem>
                            <SelectItem value="high">High Risk</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon" onClick={loadFunds}>
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground font-medium">
                        {viewMode === "ranked" ? (
                            <>
                                Showing <span className="text-foreground font-bold">{filteredFunds.length}</span> top-ranked {selectedRisk !== "all" ? selectedRisk + " risk" : ""} funds
                            </>
                        ) : (
                            <>
                                Showing <span className="text-foreground font-bold">{filteredFunds.length}</span> funds
                            </>
                        )}
                    </p>
                    {viewMode === "ranked" && (
                        <Badge variant="secondary" className="gap-2">
                            <Sparkles className="h-3 w-3" />
                            AI Ranked by CAGR, Volatility & More
                        </Badge>
                    )}
                </div>

                {/* Fund Grid */}
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : filteredFunds.length === 0 ? (
                    <Card className="border-border/50">
                        <CardContent className="p-12 text-center">
                            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground">No funds found matching your criteria</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredFunds.map((fund, index) => (
                            <Card
                                key={fund.scheme_code + index}
                                className="border-border/50 hover:border-primary/30 transition-all group overflow-hidden"
                            >
                                <CardContent className="p-5">
                                    <div className="space-y-4">
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                                    {fund.scheme_name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <Building2 className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground font-medium">{fund.amc}</span>
                                                </div>
                                            </div>
                                            {viewMode === "ranked" && fund.score && (
                                                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 border border-primary/20">
                                                    <Sparkles className="h-3 w-3 text-primary" />
                                                    <span className="text-xs font-bold text-primary">{fund.score}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-bold">
                                                {fund.category}
                                            </Badge>
                                            <Badge className={`text-[10px] uppercase tracking-wider font-bold ${getRiskBadgeColor(fund.risk_level)}`}>
                                                {fund.risk_level} risk
                                            </Badge>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">
                                                    3Y CAGR
                                                </p>
                                                <div className="flex items-center gap-1">
                                                    {fund.cagr_3yr >= 0 ? (
                                                        <ArrowUpRight className="h-4 w-4 text-success" />
                                                    ) : (
                                                        <ArrowDownRight className="h-4 w-4 text-destructive" />
                                                    )}
                                                    <span className={`font-bold font-mono ${fund.cagr_3yr >= 0 ? "text-success" : "text-destructive"}`}>
                                                        {fund.cagr_3yr}%
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">
                                                    Expense
                                                </p>
                                                <span className="font-bold font-mono text-foreground">
                                                    {fund.expense_ratio}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full gap-2 text-xs font-bold bg-transparent hover:bg-primary/5 hover:border-primary/30 transition-all"
                                        >
                                            <TrendingUp className="h-3.5 w-3.5" />
                                            View Details
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    )
}
