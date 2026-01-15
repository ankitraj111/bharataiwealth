"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp, Scale, ArrowUpRight, ArrowDownRight, BarChart3, Target, Brain,
  Sparkles, AlertCircle, Info, Plus, Eye, Zap, X
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { fetchPortfolioAssets } from "@/lib/api"

const defaultAssets = [
  { name: "HDFC Flexi Cap Fund", type: "Flexi Cap MF", value: 180000, return: 14.5, confidence: 78, risk: "Medium", change: 3.2 },
  { name: "ICICI Prudential Value", type: "Value Fund", value: 150000, return: 12.8, confidence: 80, risk: "Medium", change: 2.1 },
  { name: "Axis Mid Cap Fund", type: "Mid Cap MF", value: 120000, return: 16.2, confidence: 72, risk: "Medium", change: -1.5 },
  { name: "TCS", type: "Large Cap Stock", value: 100000, return: 11.5, confidence: 85, risk: "Medium", change: 4.2 },
  { name: "Infosys", type: "Large Cap Stock", value: 80000, return: 10.8, confidence: 82, risk: "Medium", change: 2.8 },
  { name: "HDFC Bank", type: "Large Cap Stock", value: 75000, return: 9.5, confidence: 84, risk: "Medium", change: 1.2 },
]

const allocationData = [
  { name: "Flexi/Value MF", value: 43, color: "#FF8C00" },
  { name: "Large Cap Stocks", value: 33, color: "#0A66C2" },
  { name: "Mid Cap MF", value: 16, color: "#16A34A" },
  { name: "Hybrid Funds", value: 8, color: "#6366f1" },
]

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  value: 700000 + (i * 15000) + (Math.random() * 20000 - 10000)
}))

export default function MediumRiskPortfolioPage() {
  const [assets, setAssets] = useState(defaultAssets)
  const [showAddModal, setShowAddModal] = useState(false)
  useEffect(() => {
    fetchPortfolioAssets("medium").then(data => {
      if (data?.assets?.length > 0) setAssets(data.assets)
    })
  }, [])

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const avgReturn = assets.length > 0 ? assets.reduce((sum, asset) => sum + asset.return, 0) / assets.length : 0

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Scale className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Medium Risk Portfolio</h1>
              <p className="text-muted-foreground">Balanced growth with moderate volatility</p>
            </div>
          </div>
        </div>

        <Card className="border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-amber-500" />
                <div>
                  <p className="font-bold text-amber-700">Balanced Risk Portfolio</p>
                  <p className="text-xs text-muted-foreground">Growth focused • Suitable for 3-5 year horizon</p>
                </div>
              </div>
              <Badge className="bg-amber-500 text-white">Risk Score: 5/10</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-2 border-border/50"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Total Value</p>
            <p className="text-2xl font-bold tabular-nums">₹{(totalValue / 100000).toFixed(2)}L</p>
          </CardContent></Card>
          <Card className="border-2 border-border/50"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Expected Return</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-amber-500 tabular-nums">+{avgReturn.toFixed(1)}%</p>
              <TrendingUp className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent></Card>
          <Card className="border-2 border-amber-500/30 bg-amber-500/5"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Risk Level</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500 text-white">Medium</Badge>
              <Scale className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent></Card>
          <Card className="border-2 border-border/50"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Assets</p>
            <p className="text-2xl font-bold tabular-nums">{assets.length}</p>
          </CardContent></Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-2 border-border/50">
            <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><BarChart3 className="h-4 w-4 text-amber-600" />Asset Allocation</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie><Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                    {allocationData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie><Tooltip /></RechartsPie>
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

          <Card className="border-2 border-border/50">
            <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-amber-600" />12-Month Performance</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs><linearGradient id="medGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FF8C00" stopOpacity={0.3} /><stop offset="100%" stopColor="#FF8C00" stopOpacity={0} /></linearGradient></defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} />
                    <Tooltip formatter={(v: number) => `₹${(v / 100000).toFixed(2)}L`} />
                    <Area type="monotone" dataKey="value" stroke="#FF8C00" strokeWidth={2} fill="url(#medGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-border/50">
          <CardHeader className="pb-2"><CardTitle className="text-lg font-bold">Holdings</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50"><tr className="text-xs uppercase text-muted-foreground">
                  <th className="text-left p-4 font-medium">Asset</th>
                  <th className="text-right p-4 font-medium hidden sm:table-cell">Type</th>
                  <th className="text-right p-4 font-medium">Value</th>
                  <th className="text-right p-4 font-medium">Return</th>
                </tr></thead>
                <tbody className="divide-y divide-border">
                  {assets.map((asset, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4"><p className="font-bold">{asset.name}</p><Badge variant="secondary" className="text-[10px] mt-1 bg-amber-500/10 text-amber-600">{asset.risk}</Badge></td>
                      <td className="text-right p-4 text-sm text-muted-foreground hidden sm:table-cell">{asset.type}</td>
                      <td className="text-right p-4 font-bold tabular-nums">₹{asset.value.toLocaleString()}</td>
                      <td className="text-right p-4"><div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold ${asset.change >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                        {asset.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}+{asset.return}%
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/50">
          <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><Info className="h-4 w-4" />Why Medium Risk?</CardTitle></CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20"><Scale className="h-6 w-6 text-amber-500 mb-2" /><p className="font-bold text-sm">Balanced Approach</p><p className="text-xs text-muted-foreground mt-1">Mix of equity and debt for optimal risk-reward</p></div>
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20"><Zap className="h-6 w-6 text-blue-500 mb-2" /><p className="font-bold text-sm">Growth Focus</p><p className="text-xs text-muted-foreground mt-1">Target 12-15% annual returns</p></div>
              <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20"><Brain className="h-6 w-6 text-purple-500 mb-2" /><p className="font-bold text-sm">AI Rebalanced</p><p className="text-xs text-muted-foreground mt-1">Portfolio auto-adjusted using signals</p></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Button onClick={() => setShowAddModal(true)} className="h-12 bg-amber-600 hover:bg-amber-700"><Plus className="h-5 w-5 mr-2" />Add Investment</Button>
          <Button variant="outline" className="h-12" onClick={() => window.open('/portfolio', '_self')}><Eye className="h-5 w-5 mr-2" />View Full Portfolio</Button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Add Medium Risk Investment</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowAddModal(false)}><X className="h-4 w-4" /></Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div><label className="text-sm font-medium mb-2 block">Investment Type</label>
                  <select className="w-full p-3 rounded-lg border border-border bg-background">
                    <option>Flexi Cap Fund</option><option>Mid Cap Fund</option><option>Large Cap Stock</option><option>Balanced Fund</option>
                  </select>
                </div>
                <div><label className="text-sm font-medium mb-2 block">Fund/Stock Name</label><Input placeholder="e.g. HDFC Flexi Cap" /></div>
                <div><label className="text-sm font-medium mb-2 block">Investment Amount</label><Input type="number" placeholder="₹1,00,000" /></div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={() => setShowAddModal(false)}>Add to Portfolio</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  )
}
