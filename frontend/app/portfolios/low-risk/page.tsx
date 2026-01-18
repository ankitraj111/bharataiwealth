"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  Target,
  Brain,
  Sparkles,
  CheckCircle2,
  Info,
  Plus,
  Eye,
  X
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { fetchPortfolioAssets } from "@/lib/api"

// Low Risk Assets
const defaultAssets = [
  { name: "SBI Bluechip Fund", type: "Large Cap MF", value: 150000, return: 8.5, confidence: 85, risk: "Low", change: 2.3 },
  { name: "HDFC Top 100", type: "Large Cap MF", value: 120000, return: 7.2, confidence: 82, risk: "Low", change: 1.8 },
  { name: "Axis Liquid Fund", type: "Debt Fund", value: 200000, return: 5.8, confidence: 92, risk: "Very Low", change: 0.4 },
  { name: "PPF Account", type: "Fixed Income", value: 100000, return: 7.1, confidence: 100, risk: "Very Low", change: 0 },
  { name: "Govt Bonds (2028)", type: "Bonds", value: 80000, return: 6.5, confidence: 95, risk: "Very Low", change: 0.2 },
  { name: "ICICI Corporate Bond", type: "Debt Fund", value: 60000, return: 6.8, confidence: 88, risk: "Low", change: 0.5 },
]

const allocationData = [
  { name: "Large Cap MF", value: 37, color: "#0A66C2" },
  { name: "Debt Funds", value: 36, color: "#16A34A" },
  { name: "Fixed Income", value: 14, color: "#6366f1" },
  { name: "Bonds", value: 13, color: "#FF8C00" },
]

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  value: 650000 + (i * 8000) + (Math.random() * 5000)
}))

const sipRecommendations = [
  { fund: "SBI Bluechip Fund", amount: 10000, frequency: "Monthly" },
  { fund: "Axis Liquid Fund", amount: 5000, frequency: "Monthly" },
]

export default function LowRiskPortfolioPage() {
  const [assets, setAssets] = useState(defaultAssets)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchPortfolioAssets("low").then(data => {
      if (data?.assets?.length > 0) setAssets(data.assets)
    })
  }, [])

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const avgReturn = assets.length > 0 ? assets.reduce((sum, asset) => sum + asset.return, 0) / assets.length : 0

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Low Risk Portfolio</h1>
              <p className="text-muted-foreground">Stable returns with capital protection</p>
            </div>
          </div>
        </div>

        {/* Risk Indicator Banner */}
        <Card className="border-2 border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 to-emerald-500/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                <div>
                  <p className="font-bold text-emerald-700">Low Volatility Portfolio</p>
                  <p className="text-xs text-muted-foreground">Capital preservation focused • Ideal for conservative investors</p>
                </div>
              </div>
              <Badge className="bg-emerald-500 text-white">Risk Score: 2/10</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-2 border-border/50">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Value</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">₹{(totalValue / 100000).toFixed(2)}L</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Expected Return</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-emerald-500 tabular-nums">+{avgReturn.toFixed(1)}%</p>
                <TrendingUp className="h-5 w-5 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-emerald-500/30 bg-emerald-500/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Risk Level</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500 text-white">Low</Badge>
                <Shield className="h-5 w-5 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-2 border-border/50">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Assets</p>
              <p className="text-2xl font-bold text-foreground tabular-nums">{assets.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Allocation Pie Chart */}
          <Card className="border-2 border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <PiggyBank className="h-4 w-4 text-emerald-600" />
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                      {allocationData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {allocationData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card className="border-2 border-border/50">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                12-Month Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="lowRiskGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16A34A" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#16A34A" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: any) => `${(Number(v || 0) / 100000).toFixed(0)}L`} />
                    <Tooltip formatter={(v: any) => `₹${(Number(v || 0) / 100000).toFixed(2)}L`} />
                    <Area type="monotone" dataKey="value" stroke="#16A34A" strokeWidth={2} fill="url(#lowRiskGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card className="border-2 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Holdings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr className="text-xs uppercase text-muted-foreground">
                    <th className="text-left p-4 font-medium">Asset</th>
                    <th className="text-right p-4 font-medium hidden sm:table-cell">Type</th>
                    <th className="text-right p-4 font-medium">Value</th>
                    <th className="text-center p-4 font-medium hidden md:table-cell">Confidence</th>
                    <th className="text-right p-4 font-medium">Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {assets.map((asset, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-foreground">{asset.name}</p>
                          <Badge variant="secondary" className="text-[10px] mt-1 bg-emerald-500/10 text-emerald-600">{asset.risk} Risk</Badge>
                        </div>
                      </td>
                      <td className="text-right p-4 text-sm text-muted-foreground hidden sm:table-cell">{asset.type}</td>
                      <td className="text-right p-4 font-bold tabular-nums">₹{asset.value.toLocaleString()}</td>
                      <td className="text-center p-4 hidden md:table-cell">
                        <div className="flex items-center justify-center gap-1">
                          <div className="h-2 w-16 overflow-hidden rounded-full bg-muted/30">
                            <div className="h-full bg-emerald-500" style={{ width: `${asset.confidence}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{asset.confidence}%</span>
                        </div>
                      </td>
                      <td className="text-right p-4">
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold bg-emerald-500/10 text-emerald-500">
                          <ArrowUpRight className="h-3 w-3" />
                          +{asset.return}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* SIP Recommendations */}
        <Card className="border-2 border-[#0A66C2]/30 bg-[#0A66C2]/5">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#0A66C2]" />
              AI Recommended SIPs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sipRecommendations.map((sip, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-background rounded-xl border border-border">
                  <div>
                    <p className="font-bold text-sm">{sip.fund}</p>
                    <p className="text-xs text-muted-foreground">{sip.frequency} SIP</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#0A66C2] tabular-nums">₹{sip.amount.toLocaleString()}</span>
                    <Button size="sm" className="bg-[#0A66C2] hover:bg-[#0855a1] h-8">
                      <Plus className="h-3 w-3 mr-1" />Start SIP
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Why Low Risk Info */}
        <Card className="border-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              Why Low Risk?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                <Shield className="h-6 w-6 text-emerald-500 mb-2" />
                <p className="font-bold text-sm">Capital Protection</p>
                <p className="text-xs text-muted-foreground mt-1">Your principal is protected with focus on stable returns</p>
              </div>
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                <Target className="h-6 w-6 text-blue-500 mb-2" />
                <p className="font-bold text-sm">Steady Growth</p>
                <p className="text-xs text-muted-foreground mt-1">Consistent 6-8% annual returns with low volatility</p>
              </div>
              <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20">
                <Brain className="h-6 w-6 text-purple-500 mb-2" />
                <p className="font-bold text-sm">AI Optimized</p>
                <p className="text-xs text-muted-foreground mt-1">Allocation balanced using our ML models</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Button onClick={() => setShowAddModal(true)} className="h-12 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-5 w-5 mr-2" />
            Add Investment
          </Button>
          <Button variant="outline" className="h-12" onClick={() => window.open('/portfolio', '_self')}>
            <Eye className="h-5 w-5 mr-2" />
            View Full Portfolio
          </Button>
        </div>

        {/* Add Investment Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Add Low Risk Investment</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowAddModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Investment Type</label>
                  <select className="w-full p-3 rounded-lg border border-border bg-background">
                    <option>Mutual Fund (Large Cap)</option>
                    <option>Debt Fund</option>
                    <option>Government Bonds</option>
                    <option>Fixed Deposit</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Fund/Asset Name</label>
                  <Input placeholder="e.g. SBI Bluechip Fund" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Investment Amount</label>
                  <Input type="number" placeholder="₹50,000" />
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setShowAddModal(false)}>
                  Add to Portfolio
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  )
}
