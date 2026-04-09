"use client"

import { useState, useMemo } from "react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Calculator,
    TrendingUp,
    IndianRupee,
    Calendar,
    Sparkles,
    ArrowRight,
    PiggyBank,
    Target,
    BarChart3,
    Loader2,
    Info,
    ArrowUpRight,
    AlertTriangle,
    CheckCircle2,
    Download,
    ChevronRight,
    Zap,
    LineChart as LineChartIcon,
    PieChart as PieChartIcon,
} from "lucide-react"
import { calculateSIPPlan } from "@/lib/api"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface FundAllocation {
    scheme_code: string
    scheme_name: string
    category: string
    allocation_percent: number
    expected_cagr: number
}

interface SIPResult {
    sip_plan: {
        monthly_amount: number
        duration_months: number
        duration_years: number
        risk_level: string
        total_invested: number
    }
    recommended_funds: FundAllocation[]
    projection: {
        expected: { corpus: number; cagr: number }
        best_case: { corpus: number; cagr: number }
        worst_case: { corpus: number; cagr: number }
    }
}

export default function SIPPlannerPage() {
    return (
        <ProtectedRoute>
            <SIPPlannerContent />
        </ProtectedRoute>
    )
}

function SIPPlannerContent() {
    const [monthlyAmount, setMonthlyAmount] = useState(10000)
    const [goalYears, setGoalYears] = useState(10)
    const [expectedReturn, setExpectedReturn] = useState(12)
    const [stepUpPercent, setStepUpPercent] = useState(10)
    const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium")
    const [activeTab, setActiveTab] = useState("growth")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<SIPResult | null>(null)

    // Advanced Calculation with Step-up
    const calculations = useMemo(() => {
        const monthlyRate = expectedReturn / 12 / 100
        const months = goalYears * 12
        let totalInvested = 0
        let totalWealth = 0
        let currentSIP = monthlyAmount
        const data: any[] = []

        for (let m = 1; m <= months; m++) {
            // Add monthly SIP contribution
            totalInvested += currentSIP
            totalWealth = (totalWealth + currentSIP) * (1 + monthlyRate)

            // Annual Step-up
            if (m % 12 === 0 && m < months) {
                currentSIP = currentSIP * (1 + stepUpPercent / 100)
            }

            // Sample data for chart (every year)
            if (m % 12 === 0 || m === months) {
                const year = m / 12
                data.push({
                    name: `Year ${Math.ceil(year)}`,
                    invested: Math.round(totalInvested),
                    wealth: Math.round(totalWealth),
                })
            }
        }

        return {
            totalInvested,
            totalWealth,
            wealthGain: totalWealth - totalInvested,
            multiple: totalWealth / totalInvested,
            chartData: data
        }
    }, [monthlyAmount, goalYears, expectedReturn, stepUpPercent])

    const handleCalculate = async () => {
        setLoading(true)
        try {
            const data = await calculateSIPPlan(monthlyAmount, goalYears, riskLevel)
            if (data) {
                setResult(data)
                toast.success("SIP Plan generated successfully!")
            }
        } catch (error) {
            toast.error("Failed to generate SIP Plan. Please try again.")
        }
        setLoading(false)
    }

    const formatCurrency = (amount: number) => {
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
        if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
        return `₹${amount.toLocaleString("en-IN")}`
    }

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case "low":
                return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            case "medium":
                return "bg-amber-500/10 text-amber-500 border-amber-500/20"
            case "high":
                return "bg-rose-500/10 text-rose-500 border-rose-500/20"
            default:
                return "bg-muted text-muted-foreground"
        }
    }

    return (
        <AppShell>
            <div className="max-w-7xl mx-auto space-y-8 pb-12">


                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Interactive Controls */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-white/10 bg-card/40 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-[2rem]">
                            <CardHeader className="bg-white/5 border-b border-white/5 py-5 px-8">
                                <CardTitle className="flex items-center gap-3 text-xl font-black text-white">
                                    <TrendingUp className="h-6 w-6 text-accent" />
                                    Wealth Parameters
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-10">
                                {/* Monthly SIP */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Monthly Contribution</Label>
                                        <div className="text-2xl font-black text-accent font-mono tabular-nums">
                                            ₹{monthlyAmount.toLocaleString("en-IN")}
                                        </div>
                                    </div>
                                    <Slider
                                        value={[monthlyAmount]}
                                        onValueChange={(v) => setMonthlyAmount(v[0])}
                                        min={500}
                                        max={200000}
                                        step={500}
                                        className="py-2"
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                                        <span>₹500</span>
                                        <span>₹2,00,000</span>
                                    </div>
                                </div>

                                {/* Expected Return */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Growth Expectation (p.a.)</Label>
                                        <div className="text-2xl font-black text-white font-mono tabular-nums">
                                            {expectedReturn}%
                                        </div>
                                    </div>
                                    <Slider
                                        value={[expectedReturn]}
                                        onValueChange={(v) => setExpectedReturn(v[0])}
                                        min={1}
                                        max={30}
                                        step={0.5}
                                        className="py-2"
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                                        <span>1%</span>
                                        <span>30%</span>
                                    </div>
                                </div>

                                {/* Horizon */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Investment Horizon</Label>
                                        <div className="text-2xl font-black text-white font-mono tabular-nums">
                                            {goalYears} Years
                                        </div>
                                    </div>
                                    <Slider
                                        value={[goalYears]}
                                        onValueChange={(v) => setGoalYears(v[0])}
                                        min={1}
                                        max={40}
                                        step={1}
                                        className="py-2"
                                    />
                                    <div className="flex justify-between text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                                        <span>1 Year</span>
                                        <span>40 Years</span>
                                    </div>
                                </div>

                                {/* Step-Up Feature */}
                                <div className="space-y-6 p-6 rounded-3xl bg-accent/5 border border-accent/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <ArrowUpRight className="h-12 w-12 text-accent" />
                                    </div>
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="space-y-1">
                                            <Label className="text-sm font-bold text-white flex items-center gap-2">
                                                Annual Step-up
                                                <Badge variant="outline" className="text-[10px] py-0 border-accent/30 text-accent font-black">PRO</Badge>
                                            </Label>
                                            <p className="text-xs text-slate-500 leading-relaxed font-medium">Auto-increase contribution yearly.</p>
                                        </div>
                                        <div className="text-xl font-black text-accent font-mono">
                                            {stepUpPercent}%
                                        </div>
                                    </div>
                                    <Slider
                                        value={[stepUpPercent]}
                                        onValueChange={(v) => setStepUpPercent(v[0])}
                                        min={0}
                                        max={50}
                                        step={1}
                                        className="py-2"
                                    />
                                </div>

                                {/* Risk Level */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Risk Profile</Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {(["low", "medium", "high"] as const).map((risk) => (
                                            <Button
                                                key={risk}
                                                variant={riskLevel === risk ? "default" : "outline"}
                                                onClick={() => setRiskLevel(risk)}
                                                className={`capitalize h-12 rounded-xl text-xs font-black transition-all duration-500 ${riskLevel === risk
                                                    ? 'bg-accent text-background shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105 hover:bg-accent hover:opacity-90'
                                                    : 'border-white/10 hover:bg-white/5 text-slate-400'
                                                    }`}
                                            >
                                                {risk}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    onClick={handleCalculate}
                                    disabled={loading}
                                    className="w-full h-16 rounded-2xl text-lg font-black bg-gradient-to-r from-accent to-accent/70 text-background hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500 group"
                                >
                                    {loading ? (
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                    ) : (
                                        <>
                                            Explore AI Strategy
                                            <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Visualization & Results */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="p-8 rounded-[2rem] bg-card/40 border border-white/10 backdrop-blur-xl shadow-xl hover:border-accent/30 transition-colors group"
                            >
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Wealth</p>
                                <p className="text-3xl font-black text-white group-hover:text-accent transition-colors">{formatCurrency(calculations.totalWealth)}</p>
                                <div className="mt-3 flex items-center gap-1 text-emerald-400 text-xs font-black">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Wealth Created
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="p-8 rounded-[2rem] bg-card/40 border border-white/10 backdrop-blur-xl shadow-xl"
                            >
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Invested</p>
                                <p className="text-3xl font-black text-slate-400">{formatCurrency(calculations.totalInvested)}</p>
                                <p className="mt-3 text-slate-500 text-xs font-bold">In {goalYears} Years</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="p-8 rounded-[2rem] bg-accent/10 border border-accent/20 backdrop-blur-xl shadow-xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-3xl rounded-full -mr-12 -mt-12" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Wealth Multiple</p>
                                <p className="text-3xl font-black text-accent relative z-10">{calculations.multiple.toFixed(2)}x</p>
                                <p className="mt-3 text-accent/60 text-xs font-black">Performance Factor</p>
                            </motion.div>
                        </div>

                        {/* Chart Area */}
                        <Card className="border-white/10 bg-card/40 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-[2.5rem]">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <CardHeader className="bg-white/5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between py-6 px-8 gap-4">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-black text-white flex items-center gap-3">
                                            <BarChart3 className="h-6 w-6 text-accent" />
                                            Wealth Projection
                                        </CardTitle>
                                        <CardDescription className="text-sm text-slate-400 font-medium">Trajectory of your financial growth</CardDescription>
                                    </div>
                                    <TabsList className="bg-black/40 border border-white/10 rounded-2xl h-12 p-1.5 w-full md:w-auto">
                                        <TabsTrigger value="growth" className="rounded-xl px-6 font-black text-xs data-[state=active]:bg-accent data-[state=active]:text-background">Visual</TabsTrigger>
                                        <TabsTrigger value="breakdown" className="rounded-xl px-6 font-black text-xs data-[state=active]:bg-accent data-[state=active]:text-background">Data</TabsTrigger>
                                    </TabsList>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <TabsContent value="growth" className="mt-0 outline-none">
                                        <div className="h-[420px] w-full mt-4">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={calculations.chartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                                                            <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                                                        </linearGradient>
                                                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                                                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <XAxis
                                                        dataKey="name"
                                                        stroke="#4b5563"
                                                        fontSize={11}
                                                        fontWeight="900"
                                                        tickLine={false}
                                                        axisLine={false}
                                                        dy={10}
                                                    />
                                                    <YAxis
                                                        stroke="#4b5563"
                                                        fontSize={11}
                                                        fontWeight="900"
                                                        tickFormatter={(val) => `₹${(val / 100000).toFixed(0)}L`}
                                                        tickLine={false}
                                                        axisLine={false}
                                                        dx={-10}
                                                    />
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: 'rgba(5, 10, 20, 0.95)',
                                                            border: '1px solid rgba(212, 175, 55, 0.2)',
                                                            borderRadius: '24px',
                                                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                                            backdropFilter: 'blur(12px)',
                                                            padding: '20px'
                                                        }}
                                                        itemStyle={{ fontWeight: '900', fontSize: '14px' }}
                                                        labelStyle={{ fontWeight: '900', color: '#9ca3af', marginBottom: '12px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                                        formatter={(val: any) => [formatCurrency(Number(val) || 0), '']}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="wealth"
                                                        name="Total Wealth"
                                                        stroke="var(--color-accent)"
                                                        strokeWidth={4}
                                                        fillOpacity={1}
                                                        fill="url(#colorWealth)"
                                                        animationDuration={2000}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="invested"
                                                        name="Invested"
                                                        stroke="var(--color-primary)"
                                                        strokeWidth={4}
                                                        fillOpacity={1}
                                                        fill="url(#colorInvested)"
                                                        animationDuration={1500}
                                                    />
                                                    <Legend
                                                        verticalAlign="top"
                                                        align="right"
                                                        iconType="circle"
                                                        wrapperStyle={{ paddingBottom: '30px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="breakdown" className="mt-0 outline-none">
                                        <div className="overflow-x-auto mt-4 rounded-3xl border border-white/10 bg-black/20">
                                            <table className="w-full text-left text-sm border-collapse">
                                                <thead className="bg-white/5 text-slate-500 font-black uppercase tracking-widest text-[10px]">
                                                    <tr>
                                                        <th className="px-8 py-5">Time Period</th>
                                                        <th className="px-8 py-5">Invested</th>
                                                        <th className="px-8 py-5">Projected Wealth</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {calculations.chartData.map((item, idx) => (
                                                        <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                                            <td className="px-8 py-5 font-black text-white group-hover:text-accent transition-colors">{item.name}</td>
                                                            <td className="px-8 py-5 text-slate-400 font-mono tracking-tight">{formatCurrency(item.invested)}</td>
                                                            <td className="px-8 py-5 text-accent font-black font-mono tracking-tight">{formatCurrency(item.wealth)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </TabsContent>
                                </CardContent>
                            </Tabs>
                        </Card>

                        {/* AI Recommendations Section */}
                        <AnimatePresence mode="wait">
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    className="space-y-8"
                                >
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="text-2xl font-black text-white flex items-center gap-3">
                                            <Sparkles className="h-6 w-6 text-accent" />
                                            Optimal Fund Mix
                                        </h3>
                                        <Badge className={`px-5 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest ${getRiskColor(riskLevel)}`}>
                                            {riskLevel} Profile
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {result.recommended_funds.map((fund, index) => (
                                            <motion.div
                                                key={fund.scheme_code}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="group relative p-8 rounded-[2.5rem] bg-card/60 border border-white/5 hover:border-accent/30 hover:bg-card transition-all duration-500 shadow-xl overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors" />

                                                <div className="flex items-start justify-between gap-6 mb-8 relative z-10">
                                                    <div className="space-y-2 overflow-hidden">
                                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{fund.category}</p>
                                                        <h4 className="text-xl font-black text-white leading-tight truncate group-hover:text-accent transition-colors">{fund.scheme_name}</h4>
                                                    </div>
                                                    <div className="h-14 w-14 rounded-2xl bg-accent/10 flex flex-col items-center justify-center shrink-0 border border-accent/20 group-hover:scale-110 transition-transform">
                                                        <span className="text-[9px] font-black text-accent leading-none mb-1">ALLOC</span>
                                                        <span className="text-lg font-black text-accent">{fund.allocation_percent}%</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-6 border-t border-white/5 relative z-10">
                                                    <div className="space-y-1">
                                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Monthly</p>
                                                        <p className="text-lg font-black text-slate-200 font-mono tracking-tighter">{formatCurrency((monthlyAmount * fund.allocation_percent) / 100)}</p>
                                                    </div>
                                                    <div className="text-right space-y-1">
                                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Projection</p>
                                                        <p className="text-lg font-black text-emerald-400 font-mono tracking-tighter">{fund.expected_cagr}% <span className="text-[10px]">p.a.</span></p>
                                                    </div>
                                                </div>

                                                <button className="absolute bottom-6 right-6 h-10 w-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-accent hover:scale-110">
                                                    <ChevronRight className="h-5 w-5 text-white group-hover:text-background" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Action Footer */}
                                    <div className="flex flex-col md:flex-row gap-6 pt-4">
                                        <Button className="flex-1 h-16 rounded-[1.5rem] bg-white text-black hover:bg-accent hover:text-black font-black text-lg gap-3 shadow-2xl transition-all duration-500">
                                            Execute Wealth Plan
                                            <ArrowRight className="h-5 w-5" />
                                        </Button>
                                        <Button variant="outline" className="h-16 px-10 rounded-[1.5rem] border-white/10 bg-white/5 hover:bg-white/10 text-white font-black text-lg gap-3 transition-all">
                                            <Download className="h-5 w-5" />
                                            Report
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Informative Alert */}
                        <div className="p-8 rounded-[2.5rem] bg-card/30 border border-accent/10 flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />
                            <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 relative z-10">
                                <Zap className="h-7 w-7 text-accent" />
                            </div>
                            <div className="space-y-2 relative z-10">
                                <p className="text-lg font-black text-white">The Power of Step-Up</p>
                                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                    A <span className="text-accent font-black">{stepUpPercent}%</span> yearly increase grows your wealth <span className="text-emerald-400 font-black">
                                        {(() => {
                                            const withoutStepUp = monthlyAmount * (((Math.pow(1 + (expectedReturn / 12 / 100), goalYears * 12) - 1) / (expectedReturn / 12 / 100)) * (1 + (expectedReturn / 12 / 100)))
                                            return `${((calculations.totalWealth / withoutStepUp)).toFixed(1)}x`
                                        })()}
                                    </span> faster than a stagnant SIP.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    )
}
