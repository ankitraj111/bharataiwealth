"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  TrendingUp, Zap, ArrowUpRight, ArrowDownRight, AlertTriangle, Target, Brain,
  Sparkles, Info, Plus, Eye, Flame, Bitcoin, Activity, X
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { fetchPortfolioAssets } from "@/lib/api"

const defaultAssets = [
  { name: "Bitcoin (BTC)", type: "Cryptocurrency", value: 120000, return: 45.2, confidence: 55, risk: "Very High", change: 8.5 },
  { name: "Ethereum (ETH)", type: "Cryptocurrency", value: 80000, return: 38.5, confidence: 58, risk: "Very High", change: 6.2 },
  { name: "Solana (SOL)", type: "Cryptocurrency", value: 50000, return: 52.8, confidence: 48, risk: "Very High", change: -12.3 },
  { name: "SBI Small Cap Fund", type: "Small Cap MF", value: 40000, return: 28.5, confidence: 65, risk: "High", change: 4.1 },
  { name: "Adani Enterprises", type: "Growth Stock", value: 25000, return: 22.3, confidence: 52, risk: "Very High", change: -5.8 },
  { name: "Polygon (MATIC)", type: "Cryptocurrency", value: 20000, return: 35.0, confidence: 45, risk: "Very High", change: 15.2 },
]

const allocationData = [
  { name: "Crypto (Layer 1)", value: 56, color: "#f43f5e" },
  { name: "Crypto (Layer 2)", value: 6, color: "#f97316" },
  { name: "Small Cap MF", value: 13, color: "#6366f1" },
  { name: "Growth Stocks", value: 8, color: "#16A34A" },
  { name: "Other", value: 17, color: "#64748b" },
]

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  value: 250000 + (i * 30000) + (Math.random() * 80000 - 40000)
}))

const marketSentiment = [
  { coin: "BTC", sentiment: "Bullish", fearGreed: 72 },
  { coin: "ETH", sentiment: "Bullish", fearGreed: 68 },
  { coin: "SOL", sentiment: "Neutral", fearGreed: 52 },
]

export default function HighRiskPortfolioPage() {
  return (
    <ProtectedRoute>
      <HighRiskPortfolioContent />
    </ProtectedRoute>
  )
}

function HighRiskPortfolioContent() {
  const [assets, setAssets] = useState(defaultAssets)
  const [showAddModal, setShowAddModal] = useState(false)
  useEffect(() => {
    fetchPortfolioAssets("high").then(data => {
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
            <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Flame className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">High Risk Portfolio</h1>
              <p className="text-muted-foreground">Aggressive growth with Crypto & Small Caps</p>
            </div>
          </div>
        </div>

        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertTitle className="text-red-600 font-bold">High Volatility Warning</AlertTitle>
          <AlertDescription className="text-red-600/80">
            These investments carry significant risk. Only invest what you can afford to lose. Crypto assets are highly volatile and can lose value rapidly.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-2 border-border/50"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Total Value</p>
            <p className="text-2xl font-bold tabular-nums">₹{(totalValue / 100000).toFixed(2)}L</p>
          </CardContent></Card>
          <Card className="border-2 border-border/50"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Expected Return</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-red-500 tabular-nums">+{avgReturn.toFixed(1)}%</p>
              <TrendingUp className="h-5 w-5 text-red-500" />
            </div>
          </CardContent></Card>
          <Card className="border-2 border-red-500/30 bg-red-500/5"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Risk Level</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-500 text-white">Very High</Badge>
              <Zap className="h-5 w-5 text-red-500" />
            </div>
          </CardContent></Card>
          <Card className="border-2 border-border/50"><CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Asset Count</p>
            <p className="text-2xl font-bold tabular-nums">{assets.length}</p>
          </CardContent></Card>
        </div>

        {/* Market Sentiment */}
        <Card className="border-2 border-amber-500/30 bg-amber-500/5">
          <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><Activity className="h-4 w-4 text-amber-600" />Market Sentiment</CardTitle></CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-3">
              {marketSentiment.map((item, i) => (
                <div key={i} className="p-3 bg-background rounded-xl border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bitcoin className="h-5 w-5 text-amber-500" />
                    <span className="font-bold">{item.coin}</span>
                  </div>
                  <div className="text-right">
                    <Badge className={item.sentiment === "Bullish" ? "bg-emerald-500" : item.sentiment === "Bearish" ? "bg-red-500" : "bg-gray-500"}>{item.sentiment}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">Fear/Greed: {item.fearGreed}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="border-2 border-border/50">
            <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><Zap className="h-4 w-4 text-red-600" />Asset Allocation</CardTitle></CardHeader>
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
            <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-red-600" />12-Month Performance (Volatile)</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs><linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} /><stop offset="100%" stopColor="#f43f5e" stopOpacity={0} /></linearGradient></defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} tickFormatter={(v: any) => `${(Number(v || 0) / 100000).toFixed(0)}L`} />
                    <Tooltip formatter={(v: any) => `₹${(Number(v || 0) / 100000).toFixed(2)}L`} />
                    <Area type="monotone" dataKey="value" stroke="#f43f5e" strokeWidth={2} fill="url(#highGrad)" />
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
                  <th className="text-right p-4 font-medium">24h Change</th>
                </tr></thead>
                <tbody className="divide-y divide-border">
                  {assets.map((asset, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4"><p className="font-bold">{asset.name}</p><Badge variant="secondary" className="text-[10px] mt-1 bg-red-500/10 text-red-600">{asset.risk}</Badge></td>
                      <td className="text-right p-4 text-sm text-muted-foreground hidden sm:table-cell">{asset.type}</td>
                      <td className="text-right p-4 font-bold tabular-nums">₹{asset.value.toLocaleString()}</td>
                      <td className="text-right p-4"><div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold ${asset.change >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                        {asset.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{asset.change >= 0 ? "+" : ""}{asset.change}%
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border/50">
          <CardHeader><CardTitle className="text-base font-bold flex items-center gap-2"><Info className="h-4 w-4" />High Risk Strategy</CardTitle></CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20"><Flame className="h-6 w-6 text-red-500 mb-2" /><p className="font-bold text-sm">Maximum Growth</p><p className="text-xs text-muted-foreground mt-1">Targeting 30-50%+ returns in bull markets</p></div>
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20"><AlertTriangle className="h-6 w-6 text-amber-500 mb-2" /><p className="font-bold text-sm">Accept Volatility</p><p className="text-xs text-muted-foreground mt-1">Expect 20-40% price swings regularly</p></div>
              <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20"><Brain className="h-6 w-6 text-purple-500 mb-2" /><p className="font-bold text-sm">AI Signals</p><p className="text-xs text-muted-foreground mt-1">Real-time alerts for entry/exit points</p></div>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Button onClick={() => setShowAddModal(true)} className="h-12 bg-red-600 hover:bg-red-700"><Plus className="h-5 w-5 mr-2" />Add Investment</Button>
          <Button variant="outline" className="h-12" onClick={() => window.open('/portfolio', '_self')}><Eye className="h-5 w-5 mr-2" />View Full Portfolio</Button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Add High Risk Investment</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowAddModal(false)}><X className="h-4 w-4" /></Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-red-500/30 bg-red-500/10"><AlertTriangle className="h-4 w-4 text-red-500" /><AlertDescription className="text-xs text-red-600">High risk investments - only invest what you can afford to lose.</AlertDescription></Alert>
                <div><label className="text-sm font-medium mb-2 block">Investment Type</label>
                  <select className="w-full p-3 rounded-lg border border-border bg-background">
                    <option>Cryptocurrency (BTC, ETH)</option><option>Altcoins (SOL, MATIC)</option><option>Small Cap Fund</option><option>Growth Stocks</option>
                  </select>
                </div>
                <div><label className="text-sm font-medium mb-2 block">Asset Name</label><Input placeholder="e.g. Bitcoin (BTC)" /></div>
                <div><label className="text-sm font-medium mb-2 block">Investment Amount</label><Input type="number" placeholder="₵50,000" /></div>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => setShowAddModal(false)}>Add to Portfolio</Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  )
}
