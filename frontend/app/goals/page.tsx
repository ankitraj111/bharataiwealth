"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Target,
  Plus,
  Home,
  GraduationCap,
  Plane,
  Heart,
  Palmtree,
  TrendingUp,
  Calendar,
  Sparkles,
  IndianRupee,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"

import { fetchGoals, addGoal } from "@/lib/api"
import { Loader2 } from "lucide-react"

const goalIcons: Record<string, React.ElementType> = {
  house: Home,
  education: GraduationCap,
  travel: Plane,
  marriage: Heart,
  retirement: Palmtree,
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: "",
    type: "house",
    targetAmount: "",
    timeline: "",
  })

  useEffect(() => {
    async function loadGoals() {
      const data = await fetchGoals()
      setGoals(data)
      setIsLoading(false)
    }
    loadGoals()
  }, [])

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`
    return `${(amount / 1000).toFixed(1)}K`
  }

  const handleAddGoal = async () => {
    const target = Number(newGoal.targetAmount)
    const targetYear = Number(newGoal.timeline)
    const yearsLeft = targetYear - new Date().getFullYear()
    const monthsLeft = Math.max(1, yearsLeft * 12)
    const monthlyRequired = Math.round(target / monthsLeft)

    const goalData = {
      name: newGoal.name,
      type: newGoal.type,
      targetAmount: target,
      currentAmount: 0,
      targetYear: targetYear,
      monthlyRequired,
    }

    const savedGoal = await addGoal(goalData)
    if (savedGoal) {
      setGoals([...goals, savedGoal])
      setDialogOpen(false)
      setNewGoal({ name: "", type: "house", targetAmount: "", timeline: "" })
    }
  }

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </AppShell>
    )
  }

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)
  const totalCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const totalMonthly = goals.reduce((sum, g) => sum + g.monthlyRequired, 0)

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 shadow-lg">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-3xl font-black text-white tracking-tight">Goal Tracker</h1>
                  <p className="text-white/80 max-w-md font-medium">
                    Track your financial goals and get AI-powered recommendations to achieve them faster.
                  </p>
                </div>
              </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-white text-emerald-600 hover:bg-white/90 font-bold shadow-lg">
                  <Plus className="h-4 w-4" />
                  Add New Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Create New Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Goal Name</Label>
                    <Input
                      placeholder="e.g., Dream House"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                      className="bg-muted/50 font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Goal Type</Label>
                    <Select value={newGoal.type} onValueChange={(v) => setNewGoal({ ...newGoal, type: v })}>
                      <SelectTrigger className="bg-muted/50 font-bold">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="marriage">Marriage</SelectItem>
                        <SelectItem value="retirement">Retirement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Target Amount (INR)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 5000000"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                      className="bg-muted/50 font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">Target Year</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 2028"
                      value={newGoal.timeline}
                      onChange={(e) => setNewGoal({ ...newGoal, timeline: e.target.value })}
                      className="bg-muted/50 font-mono font-bold"
                    />
                  </div>
                  <Button onClick={handleAddGoal} className="w-full mt-4 font-bold shadow-sm">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Calculate & Add Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
              <Sparkles className="h-3 w-3" />
              Start early for compound growth
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
              <TrendingUp className="h-3 w-3" />
              Automate your SIPs
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
              <CheckCircle2 className="h-3 w-3" />
              Review goals quarterly
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Total Target</p>
                  <p className="text-2xl font-bold font-mono mt-1">
                    <span className="text-muted-foreground text-sm opacity-60">INR</span> {formatCurrency(totalTarget)}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-muted border border-border/50 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Current Saved</p>
                  <p className="text-2xl font-bold font-mono mt-1 text-success">
                    <span className="text-muted-foreground text-sm opacity-60">INR</span> {formatCurrency(totalCurrent)}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-success/5 border border-success/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
              </div>
              <Progress value={(totalCurrent / totalTarget) * 100} className="mt-4 h-1.5" />
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Monthly SIP Required</p>
                  <p className="text-2xl font-bold font-mono mt-1 text-accent">
                    <span className="text-muted-foreground text-sm opacity-60">INR</span> {formatCurrency(totalMonthly)}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-center">
                  <IndianRupee className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const Icon = goalIcons[goal.type] || Target
            const progress = (goal.currentAmount / goal.targetAmount) * 100

            return (
              <Card
                key={goal.id}
                className="border-border/50 overflow-hidden shadow-sm hover:border-primary/30 transition-all group"
              >
                <div className={cn("h-1", goal.color)} />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn("h-12 w-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform", goal.color)}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">{goal.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Target: {goal.timeline}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest h-5 bg-muted">
                      {goal.recommendedPlan}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs font-bold font-mono mt-2">
                      <span className="text-success">INR {formatCurrency(goal.currentAmount)}</span>
                      <span className="text-muted-foreground opacity-60">INR {formatCurrency(goal.targetAmount)}</span>
                    </div>
                  </div>

                  {/* AI Recommendation */}
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">AI Recommendation</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium mb-4">
                      Invest{" "}
                      <span className="font-bold text-accent">
                        INR {formatCurrency(goal.monthlyRequired)}/month
                      </span>{" "}
                      in {goal.recommendedPlan} portfolio to reach your goal.
                    </p>
                    <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent border-border/50 hover:bg-primary/5 hover:border-primary/30 transition-all font-bold group/btn">
                      <TrendingUp className="h-4 w-4" />
                      Start SIP
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
