"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { FlaskConical, Play, TrendingDown, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

const scenarios = [
  { value: "crash-10", label: "Market Crash -10%" },
  { value: "crash-20", label: "Market Crash -20%" },
  { value: "crypto-pump-20", label: "Crypto Pump +20%" },
  { value: "crypto-pump-50", label: "Crypto Pump +50%" },
  { value: "recession", label: "Economic Recession" },
  { value: "bull-run", label: "Bull Market +15%" },
]

export default function SandboxPage() {
  const [scenario, setScenario] = useState("")
  const [sipAmount, setSipAmount] = useState("")
  const [hasSimulated, setHasSimulated] = useState(false)

  const beforeData = [
    { category: "Equity", value: 350000 },
    { category: "Debt", value: 200000 },
    { category: "Crypto", value: 85000 },
    { category: "Gold", value: 50000 },
  ]

  const afterData = [
    { category: "Equity", value: scenario.includes("crash") ? 280000 : 402500 },
    { category: "Debt", value: 200000 },
    { category: "Crypto", value: scenario.includes("crypto-pump") ? 127500 : 68000 },
    { category: "Gold", value: 55000 },
  ]

  const handleSimulate = () => {
    setHasSimulated(true)
  }

  const totalBefore = beforeData.reduce((sum, item) => sum + item.value, 0)
  const totalAfter = afterData.reduce((sum, item) => sum + item.value, 0)
  const change = ((totalAfter - totalBefore) / totalBefore) * 100

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 p-8 shadow-lg">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
              <FlaskConical className="h-7 w-7 text-white" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-white tracking-tight">Risk Simulator</h1>
              <p className="text-white/80 font-medium">
                Test how your portfolio performs under different market conditions
              </p>
            </div>
          </div>
        </div>

        {/* Simulation Form */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold uppercase tracking-widest text-primary">
              <FlaskConical className="h-5 w-5" />
              Simulation Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="scenario" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Scenario Type</Label>
                <Select value={scenario} onValueChange={setScenario}>
                  <SelectTrigger className="bg-muted/50 font-bold">
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {scenarios.map((s) => (
                      <SelectItem key={s.value} value={s.value} className="font-medium">
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sip" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Additional Monthly SIP (Optional)</Label>
                <Input
                  id="sip"
                  type="number"
                  placeholder="₹0"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(e.target.value)}
                  className="bg-muted/50 font-bold font-mono"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSimulate} className="w-full gap-2 shadow-sm font-bold" disabled={!scenario}>
                  <Play className="h-4 w-4" />
                  Run Simulation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {hasSimulated && (
          <>
            {/* Impact Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
                <CardContent className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Before</p>
                  <p className="mt-1 text-2xl font-bold text-foreground font-mono">₹{totalBefore.toLocaleString("en-IN")}</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
                <CardContent className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">After Simulation</p>
                  <p className={cn("mt-1 text-2xl font-bold font-mono", change >= 0 ? "text-success" : "text-destructive")}>
                    ₹{totalAfter.toLocaleString("en-IN")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
                <CardContent className="p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Portfolio Impact</p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className={cn("text-2xl font-bold font-mono", change >= 0 ? "text-success" : "text-destructive")}>
                      {change >= 0 ? "+" : ""}
                      {change.toFixed(1)}%
                    </p>
                    {change >= 0 ? (
                      <TrendingUp className="h-6 w-6 text-success" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-destructive" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Before & After Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-2 border-b border-border/50 mb-4">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Before Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={beforeData} layout="vertical">
                        <XAxis
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 700 }}
                          tickFormatter={(value) => `₹${value / 1000}k`}
                        />
                        <YAxis
                          type="category"
                          dataKey="category"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 700 }}
                          width={60}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                          itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                          formatter={(value: any) => [`₹${Number(value ?? 0).toLocaleString("en-IN")}`, "Value"]}
                        />
                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={4} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="pb-2 border-b border-border/50 mb-4">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">After Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={afterData} layout="vertical">
                        <XAxis
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 700 }}
                          tickFormatter={(value) => `₹${value / 1000}k`}
                        />
                        <YAxis
                          type="category"
                          dataKey="category"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 700 }}
                          width={60}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                          itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                          formatter={(value: any) => [`₹${Number(value ?? 0).toLocaleString("en-IN")}`, "Value"]}
                        />
                        <Bar dataKey="value" fill={change >= 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"} radius={4} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Level & Suggestions */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-bold uppercase tracking-widest">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Previous Risk Level</span>
                    <Badge variant="outline" className="bg-muted text-foreground font-bold border-border/50">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">New Risk Level</span>
                    <Badge
                      className={cn("font-bold uppercase tracking-widest", change < -5 ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground")}
                    >
                      {change < -5 ? "High" : "Medium"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <span>Risk Exposure</span>
                      <span>{change < -5 ? "75%" : "50%"}</span>
                    </div>
                    <Progress
                      value={change < -5 ? 75 : 50}
                      className={cn("h-2", change < -5 ? "bg-destructive/10" : "bg-primary/10")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20 bg-muted/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-bold uppercase tracking-widest">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 text-sm text-muted-foreground font-medium">
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        {change < 0
                          ? "Consider increasing debt allocation by 10% to reduce volatility"
                          : "Your portfolio is well-positioned for this scenario"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>
                        {scenario.includes("crypto")
                          ? "Limit crypto exposure to 10% of total portfolio"
                          : "Diversify into gold or bonds for crash protection"}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>Maintain 6-month emergency fund before aggressive investing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </AppShell>
  )
}
