"use client"

import type React from "react"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

const goalIcons: Record<string, React.ElementType> = {
  house: Home,
  education: GraduationCap,
  travel: Plane,
  marriage: Heart,
  retirement: Palmtree,
}

const initialGoals = [
  {
    id: 1,
    name: "Dream House",
    type: "house",
    targetAmount: 5000000,
    currentAmount: 1250000,
    timeline: "2028",
    monthlyRequired: 62500,
    recommendedPlan: "Medium Risk",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Child's Education",
    type: "education",
    targetAmount: 2000000,
    currentAmount: 450000,
    timeline: "2030",
    monthlyRequired: 21500,
    recommendedPlan: "Low Risk",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    name: "Europe Trip",
    type: "travel",
    targetAmount: 500000,
    currentAmount: 125000,
    timeline: "2025",
    monthlyRequired: 31250,
    recommendedPlan: "Low Risk",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 4,
    name: "Retirement Corpus",
    type: "retirement",
    targetAmount: 20000000,
    currentAmount: 3500000,
    timeline: "2045",
    monthlyRequired: 55000,
    recommendedPlan: "High Risk",
    color: "from-purple-500 to-pink-500",
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: "",
    type: "house",
    targetAmount: "",
    timeline: "",
  })

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`
    return `${(amount / 1000).toFixed(1)}K`
  }

  const handleAddGoal = () => {
    const target = Number(newGoal.targetAmount)
    const yearsLeft = Number(newGoal.timeline) - new Date().getFullYear()
    const monthsLeft = yearsLeft * 12
    const monthlyRequired = Math.round(target / monthsLeft)

    const newGoalData = {
      id: goals.length + 1,
      name: newGoal.name,
      type: newGoal.type,
      targetAmount: target,
      currentAmount: 0,
      timeline: newGoal.timeline,
      monthlyRequired,
      recommendedPlan: target > 1000000 ? "Medium Risk" : "Low Risk",
      color: "from-primary to-primary/70",
    }

    setGoals([...goals, newGoalData])
    setDialogOpen(false)
    setNewGoal({ name: "", type: "house", targetAmount: "", timeline: "" })
  }

  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0)
  const totalCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0)
  const totalMonthly = goals.reduce((sum, g) => sum + g.monthlyRequired, 0)

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-card p-8 border border-border/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Goal Tracker</h1>
              </div>
              <p className="text-muted-foreground max-w-md">
                Track your financial goals and get AI-powered investment recommendations to achieve them faster.
              </p>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 shadow-lg shadow-primary/25">
                  <Plus className="h-4 w-4" />
                  Add New Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card-elevated border-border/50">
                <DialogHeader>
                  <DialogTitle className="font-serif text-xl">Create New Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label>Goal Name</Label>
                    <Input
                      placeholder="e.g., Dream House"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Goal Type</Label>
                    <Select value={newGoal.type} onValueChange={(v) => setNewGoal({ ...newGoal, type: v })}>
                      <SelectTrigger className="bg-secondary/50">
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
                    <Label>Target Amount (INR)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 5000000"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Year</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 2028"
                      value={newGoal.timeline}
                      onChange={(e) => setNewGoal({ ...newGoal, timeline: e.target.value })}
                      className="bg-secondary/50"
                    />
                  </div>
                  <Button onClick={handleAddGoal} className="w-full mt-4">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Calculate & Add Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Target</p>
                  <p className="text-2xl font-bold font-mono mt-1">
                    <span className="text-muted-foreground text-lg">INR</span> {formatCurrency(totalTarget)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Saved</p>
                  <p className="text-2xl font-bold font-mono mt-1 text-success">
                    <span className="text-muted-foreground text-lg">INR</span> {formatCurrency(totalCurrent)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
              </div>
              <Progress value={(totalCurrent / totalTarget) * 100} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly SIP Required</p>
                  <p className="text-2xl font-bold font-mono mt-1 text-accent">
                    <span className="text-muted-foreground text-lg">INR</span> {formatCurrency(totalMonthly)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <IndianRupee className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => {
            const Icon = goalIcons[goal.type] || Target
            const progress = (goal.currentAmount / goal.targetAmount) * 100

            return (
              <Card
                key={goal.id}
                className="glass-card-elevated border-border/50 overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-1.5 bg-gradient-to-r ${goal.color}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-11 w-11 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold">{goal.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Target: {goal.timeline}</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                      {goal.recommendedPlan}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="font-mono text-success">INR {formatCurrency(goal.currentAmount)}</span>
                      <span className="font-mono text-muted-foreground">INR {formatCurrency(goal.targetAmount)}</span>
                    </div>
                  </div>

                  {/* AI Recommendation */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">AI Recommendation</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Invest{" "}
                      <span className="font-semibold text-accent">
                        INR {formatCurrency(goal.monthlyRequired)}/month
                      </span>{" "}
                      in {goal.recommendedPlan} portfolio to reach your goal.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 gap-2 group/btn bg-transparent">
                      <TrendingUp className="h-4 w-4" />
                      Start SIP
                      <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
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
