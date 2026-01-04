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
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Risk Simulator</h1>
          <p className="text-sm text-muted-foreground">
            Test how your portfolio performs under different market conditions
          </p>
        </div>

        {/* Simulation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <FlaskConical className="h-5 w-5 text-primary" />
              Simulation Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="scenario">Scenario Type</Label>
                <Select value={scenario} onValueChange={setScenario}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {scenarios.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sip">Additional Monthly SIP (Optional)</Label>
                <Input
                  id="sip"
                  type="number"
                  placeholder="₹0"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSimulate} className="w-full gap-2" disabled={!scenario}>
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
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground">Before</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">₹{totalBefore.toLocaleString("en-IN")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground">After Simulation</p>
                  <p className={cn("mt-1 text-2xl font-bold", change >= 0 ? "text-success" : "text-destructive")}>
                    ₹{totalAfter.toLocaleString("en-IN")}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground">Portfolio Impact</p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className={cn("text-2xl font-bold", change >= 0 ? "text-success" : "text-destructive")}>
                      {change >= 0 ? "+" : ""}
                      {change.toFixed(1)}%
                    </p>
                    {change >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-success" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Before & After Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Before Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={beforeData} layout="vertical">
                        <XAxis
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => `₹${value / 1000}k`}
                        />
                        <YAxis
                          type="category"
                          dataKey="category"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          width={60}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: any) => [`₹${Number(value ?? 0).toLocaleString("en-IN")}`, "Value"]}
                        />
                        <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">After Simulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={afterData} layout="vertical">
                        <XAxis
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          tickFormatter={(value) => `₹${value / 1000}k`}
                        />
                        <YAxis
                          type="category"
                          dataKey="category"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                          width={60}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                          formatter={(value: any) => [`₹${Number(value ?? 0).toLocaleString("en-IN")}`, "Value"]}
                        />
                        <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Level & Suggestions */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <AlertTriangle className="h-5 w-5 text-chart-2" />
                    New Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Previous Risk Level</span>
                    <Badge className="bg-chart-2/10 text-chart-2">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">New Risk Level</span>
                    <Badge
                      className={cn(change < -5 ? "bg-destructive/10 text-destructive" : "bg-chart-2/10 text-chart-2")}
                    >
                      {change < -5 ? "High" : "Medium"}
                    </Badge>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={cn("h-full transition-all", change < -5 ? "bg-destructive" : "bg-chart-2")}
                      style={{ width: change < -5 ? "75%" : "50%" }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    AI Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {change < 0
                        ? "Consider increasing debt allocation by 10% to reduce volatility"
                        : "Your portfolio is well-positioned for this scenario"}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {scenario.includes("crypto")
                        ? "Limit crypto exposure to 10% of total portfolio"
                        : "Diversify into gold or bonds for crash protection"}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      Maintain 6-month emergency fund before aggressive investing
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
