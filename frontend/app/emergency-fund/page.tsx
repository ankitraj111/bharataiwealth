"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
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

import { useEffect, useCallback } from "react"
import { fetchEmergencyFund, updateEmergencyFund } from "@/lib/api"
import { Loader2 } from "lucide-react"

export default function EmergencyFundPage() {
  const [salary, setSalary] = useState(75000)
  const [familySize, setFamilySize] = useState(3)
  const [rent, setRent] = useState(20000)
  const [emi, setEmi] = useState(15000)
  const [currentSavings, setCurrentSavings] = useState(45000)
  const [monthsCoverage, setMonthsCoverage] = useState(6)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadFund() {
      const data = await fetchEmergencyFund()
      if (data) {
        setSalary(Number(data.monthlyExpenses || 75000) / 0.6)
        setCurrentSavings(Number(data.currentAmount || 0))
        setMonthsCoverage(data.monthsBuffer || 6)
      }
      setIsLoading(false)
    }
    loadFund()
  }, [])

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </AppShell>
    )
  }

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

  const handleSave = async () => {
    const fundData = {
      targetAmount: recommendedFund,
      currentAmount: currentSavings,
      monthlyExpenses: salary * 0.6,
      monthsBuffer: monthsCoverage
    }
    await updateEmergencyFund(fundData)
    alert("Emergency Fund settings saved!")
  }

  const getHealthStatus = () => {
    if (progress >= 100) return { status: "Excellent", color: "text-success", bg: "bg-success/5 border-success/20", icon: CheckCircle2 }
    if (progress >= 70) return { status: "Good", color: "text-blue-500", bg: "bg-blue-500/5 border-blue-500/20", icon: Shield }
    if (progress >= 40) return { status: "Building", color: "text-accent", bg: "bg-accent/5 border-accent/20", icon: TrendingUp }
    return { status: "Critical", color: "text-destructive", bg: "bg-destructive/5 border-destructive/20", icon: AlertTriangle }
  }

  const health = getHealthStatus()

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 p-8 shadow-lg">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-3xl font-black text-white tracking-tight">Emergency Fund</h1>
                  <p className="text-white/80 max-w-md font-medium">
                    Calculate your ideal emergency fund based on your Indian household expenses.
                  </p>
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30`}>
              <health.icon className="h-6 w-6 text-white" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Fund Health</p>
                <p className="font-bold text-white">{health.status}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <Calculator className="h-5 w-5 text-primary" />
                Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly Salary */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 font-semibold">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    Monthly Salary
                  </Label>
                  <span className="font-mono font-bold text-primary">INR {salary.toLocaleString("en-IN")}</span>
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
                  <Label className="flex items-center gap-2 font-semibold">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Family Size
                  </Label>
                  <span className="font-mono font-bold text-primary">{familySize} members</span>
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
                  <Label className="flex items-center gap-2 font-semibold">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    Monthly Rent
                  </Label>
                  <span className="font-mono font-bold text-primary">INR {rent.toLocaleString("en-IN")}</span>
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
                  <Label className="flex items-center gap-2 font-semibold">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    Total EMIs
                  </Label>
                  <span className="font-mono font-bold text-primary">INR {emi.toLocaleString("en-IN")}</span>
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
                  <Label className="flex items-center gap-2 font-semibold">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    Months of Coverage
                  </Label>
                  <span className="font-mono font-bold text-primary">{monthsCoverage} months</span>
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
                <Label className="flex items-center gap-2 font-semibold">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  Current Emergency Savings
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold">INR</span>
                  <Input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="pl-12 bg-muted/50 font-mono font-bold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {/* AI Recommendation Card */}
            <Card className="border-border/50 overflow-hidden shadow-sm">
              <div className="h-1 bg-primary" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-bold">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-lg leading-relaxed font-medium">
                    Your emergency fund should be{" "}
                    <span className="font-bold text-primary text-xl">INR {formatCurrency(recommendedFund)}</span>.
                    {remaining > 0 ? (
                      <>
                        {" "}
                        You currently have{" "}
                        <span className="font-bold text-success">INR {formatCurrency(currentSavings)}</span>. Add{" "}
                        <span className="font-bold text-primary">
                          INR {Math.round(remaining / monthsToGoal).toLocaleString("en-IN")}/month
                        </span>{" "}
                        for <span className="font-bold text-foreground">{monthsToGoal} months</span>.
                      </>
                    ) : (
                      <span className="text-success font-bold"> Congratulations! Your emergency fund is complete!</span>
                    )}
                  </p>
                </div>

                {/* Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span>Progress to Goal</span>
                    <span className="text-primary">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs font-bold font-mono">
                    <span className="text-success">INR {formatCurrency(currentSavings)}</span>
                    <span className="text-muted-foreground opacity-60">INR {formatCurrency(recommendedFund)}</span>
                  </div>
                </div>

                {remaining > 0 && (
                  <div className="space-y-3">
                    <Button onClick={handleSave} variant="outline" className="w-full gap-2 shadow-sm">
                      Save Settings
                    </Button>
                    <Button className="w-full gap-2 shadow-sm" size="lg">
                      Start Emergency Fund SIP
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {remaining <= 0 && (
                  <Button onClick={handleSave} variant="outline" className="w-full shadow-sm">
                    Update Savings Status
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
                <CardContent className="p-5 text-center">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Monthly Expenses</p>
                  <p className="text-2xl font-bold font-mono">INR {formatCurrency(monthlyExpenses)}</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
                <CardContent className="p-5 text-center">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Months Covered</p>
                  <p className="text-2xl font-bold font-mono text-success">
                    {(currentSavings / monthlyExpenses).toFixed(1)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tips */}
            <Card className="border-border/50 shadow-sm bg-muted/20">
              <CardContent className="p-5">
                <h4 className="font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <AlertTriangle className="h-4 w-4 text-accent" />
                  Indian Context Tips
                </h4>
                <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    Keep fund in a high-yield savings account or liquid fund for quick access
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    Consider medical emergencies - average hospitalization costs INR 50K-2L
                  </li>
                  <li className="flex items-start gap-3">
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
