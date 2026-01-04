"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Shield,
  IndianRupee,
  Users,
  Home,
  Car,
  Sparkles,
  Calculator,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Wallet,
} from "lucide-react"

export default function EmergencyFundPage() {
  const [salary, setSalary] = useState(75000)
  const [familySize, setFamilySize] = useState(3)
  const [rent, setRent] = useState(20000)
  const [emi, setEmi] = useState(15000)
  const [currentSavings, setCurrentSavings] = useState(45000)
  const [monthsCoverage, setMonthsCoverage] = useState(6)

  // Calculate monthly expenses
  const monthlyExpenses = salary * 0.6 + rent + emi // 60% of salary as expenses + rent + EMI
  const recommendedFund = monthlyExpenses * monthsCoverage
  const remaining = recommendedFund - currentSavings
  const progress = Math.min((currentSavings / recommendedFund) * 100, 100)
  const monthsToGoal = remaining > 0 ? Math.ceil(remaining / (salary * 0.2)) : 0 // Save 20% of salary

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `${(amount / 100000).toFixed(2)}L`
    return `${(amount / 1000).toFixed(1)}K`
  }

  const getHealthStatus = () => {
    if (progress >= 100) return { status: "Excellent", color: "text-success", bg: "bg-success/10", icon: CheckCircle2 }
    if (progress >= 70) return { status: "Good", color: "text-blue-500", bg: "bg-blue-500/10", icon: Shield }
    if (progress >= 40) return { status: "Building", color: "text-accent", bg: "bg-accent/10", icon: TrendingUp }
    return { status: "Critical", color: "text-destructive", bg: "bg-destructive/10", icon: AlertTriangle }
  }

  const health = getHealthStatus()

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-success/20 via-card to-card p-8 border border-border/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-success/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-success/80 shadow-lg shadow-success/25">
                  <Shield className="h-6 w-6 text-success-foreground" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Emergency Fund</h1>
              </div>
              <p className="text-muted-foreground max-w-md">
                Calculate your ideal emergency fund based on your Indian household expenses and financial situation.
              </p>
            </div>

            <div className={`flex items-center gap-3 px-5 py-3 rounded-xl ${health.bg}`}>
              <health.icon className={`h-6 w-6 ${health.color}`} />
              <div>
                <p className="text-xs text-muted-foreground">Fund Health</p>
                <p className={`font-semibold ${health.color}`}>{health.status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card className="glass-card-elevated border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif">
                <Calculator className="h-5 w-5 text-primary" />
                Calculate Your Emergency Fund
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly Salary */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    Monthly Salary
                  </Label>
                  <span className="font-mono font-semibold">INR {salary.toLocaleString("en-IN")}</span>
                </div>
                <Slider
                  value={[salary]}
                  onValueChange={(v) => setSalary(v[0])}
                  min={20000}
                  max={500000}
                  step={5000}
                  className="w-full"
                />
              </div>

              {/* Family Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Family Size
                  </Label>
                  <span className="font-mono font-semibold">{familySize} members</span>
                </div>
                <Slider
                  value={[familySize]}
                  onValueChange={(v) => setFamilySize(v[0])}
                  min={1}
                  max={8}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Rent */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    Monthly Rent
                  </Label>
                  <span className="font-mono font-semibold">INR {rent.toLocaleString("en-IN")}</span>
                </div>
                <Slider
                  value={[rent]}
                  onValueChange={(v) => setRent(v[0])}
                  min={0}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
              </div>

              {/* EMI */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    Total EMIs
                  </Label>
                  <span className="font-mono font-semibold">INR {emi.toLocaleString("en-IN")}</span>
                </div>
                <Slider
                  value={[emi]}
                  onValueChange={(v) => setEmi(v[0])}
                  min={0}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
              </div>

              {/* Coverage Months */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    Months of Coverage
                  </Label>
                  <span className="font-mono font-semibold">{monthsCoverage} months</span>
                </div>
                <Slider
                  value={[monthsCoverage]}
                  onValueChange={(v) => setMonthsCoverage(v[0])}
                  min={3}
                  max={12}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Current Savings */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  Current Emergency Savings
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">INR</span>
                  <Input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="pl-12 bg-secondary/50 font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* AI Recommendation Card */}
            <Card className="glass-card-elevated border-border/50 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-success" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                  <p className="text-lg leading-relaxed">
                    Your emergency fund should be{" "}
                    <span className="font-bold text-accent text-xl">INR {formatCurrency(recommendedFund)}</span>.
                    {remaining > 0 ? (
                      <>
                        {" "}
                        You currently have{" "}
                        <span className="font-semibold text-success">INR {formatCurrency(currentSavings)}</span>. Add{" "}
                        <span className="font-semibold text-primary">
                          INR {Math.round(remaining / monthsToGoal).toLocaleString("en-IN")}/month
                        </span>{" "}
                        for <span className="font-semibold">{monthsToGoal} months</span>.
                      </>
                    ) : (
                      <span className="text-success"> Congratulations! Your emergency fund is complete!</span>
                    )}
                  </p>
                </div>

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress to Goal</span>
                    <span className="font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-4 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-success to-emerald-400 rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-mono text-success">INR {formatCurrency(currentSavings)}</span>
                    <span className="font-mono text-muted-foreground">INR {formatCurrency(recommendedFund)}</span>
                  </div>
                </div>

                {remaining > 0 && (
                  <Button className="w-full gap-2" size="lg">
                    Start Emergency Fund SIP
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card border-border/50">
                <CardContent className="p-5 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Expenses</p>
                  <p className="text-2xl font-bold font-mono">INR {formatCurrency(monthlyExpenses)}</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-border/50">
                <CardContent className="p-5 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Months Covered</p>
                  <p className="text-2xl font-bold font-mono text-success">
                    {(currentSavings / monthlyExpenses).toFixed(1)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tips */}
            <Card className="glass-card border-border/50">
              <CardContent className="p-5">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-accent" />
                  Indian Context Tips
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    Keep fund in a high-yield savings account or liquid fund for quick access
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    Consider medical emergencies - average hospitalization costs INR 50K-2L
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    Account for job market conditions in your industry
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
