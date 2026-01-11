"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Users, TrendingUp, Target, Wallet, Plus, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { fetchFamily } from "@/lib/api"

export default function FamilyPage() {
  const { user } = useAuth()
  const [familyMembers, setFamilyMembers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<any>(null)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    async function loadFamily() {
      const data = await fetchFamily()
      if (data && data.length > 0) {
        const membersWithAvatar = data.map((m: any) => ({
          ...m,
          avatar: getInitials(m.name),
          goals: []
        }))
        setFamilyMembers(membersWithAvatar)
      } else {
        setFamilyMembers([
          {
            id: "you",
            name: user?.name || "Rajesh Kumar",
            relation: "You",
            avatar: user?.name ? getInitials(user.name) : "RK",
            netWorth: 1250000,
            monthlyExpense: 45000,
            goals: [
              { name: "Emergency Fund", target: 300000, current: 250000 },
              { name: "House Down Payment", target: 1500000, current: 450000 },
            ],
          }
        ])
      }
      setIsLoading(false)
    }
    loadFamily()
  }, [user])

  useEffect(() => {
    if (familyMembers.length > 0 && !selectedMember) {
      setSelectedMember(familyMembers[0])
    }
  }, [familyMembers, selectedMember])

  if (isLoading || !selectedMember) {
    return (
      <AppShell>
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </AppShell>
    )
  }

  const totalFamilyNetWorth = familyMembers.reduce((sum, m) => sum + (Number(m.netWorth) || 0), 0)
  const totalMonthlyExpense = familyMembers.reduce((sum, m) => sum + (Number(m.monthlyExpense) || 0), 0)

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-muted/30 p-6 rounded-2xl border border-border/50">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Family Dashboard</h1>
            <p className="text-sm text-muted-foreground font-medium">Track and manage your family&apos;s finances</p>
          </div>
          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>

        {/* Family Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Family Members</p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground font-mono">{familyMembers.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Combined Net Worth</p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground font-mono">₹{(totalFamilyNetWorth / 100000).toFixed(1)}L</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-accent" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Monthly Expenses</p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground font-mono">₹{totalMonthlyExpense.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-info" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Active Goals</p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground font-mono">
                {familyMembers.reduce((sum, m) => sum + (m.goals?.length || 0), 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Member Selection */}
        <div className="flex flex-wrap gap-2">
          {familyMembers.map((member) => (
            <Button
              key={member.id}
              variant={selectedMember.id === member.id ? "default" : "outline"}
              className={cn(
                "gap-2 px-4 py-6 rounded-xl border-border/50 transition-all shadow-sm",
                selectedMember.id === member.id ? "shadow-primary/10 scale-105" : "bg-transparent hover:bg-muted"
              )}
              onClick={() => setSelectedMember(member)}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  className={cn(
                    "text-xs font-bold",
                    selectedMember.id === member.id
                      ? "bg-primary-foreground text-primary"
                      : "bg-muted text-foreground",
                  )}
                >
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="font-bold">{member.relation}</span>
            </Button>
          ))}
        </div>

        {/* Selected Member Details */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Member Overview */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="flex items-center gap-4 text-base font-bold">
                <Avatar className="h-12 w-12 border-2 border-primary/10">
                  <AvatarFallback className="bg-primary/5 text-primary text-sm font-bold">{selectedMember.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-bold">{selectedMember.name}</p>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{selectedMember.relation}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/50 p-4 border border-border/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Net Worth</p>
                  <p className="mt-1 text-xl font-bold text-foreground font-mono">₹{Number(selectedMember.netWorth).toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4 border border-border/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Monthly Expense</p>
                  <p className="mt-1 text-xl font-bold text-foreground font-mono">
                    ₹{Number(selectedMember.monthlyExpense).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-primary/5 p-5 border border-primary/10">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Savings Rate</p>
                  <span className="text-sm font-bold text-primary">
                    {Math.round((Number(selectedMember.netWorth) / 12 / (Number(selectedMember.monthlyExpense) || 1)) * 10)}%
                  </span>
                </div>
                <Progress
                  value={Math.round((Number(selectedMember.netWorth) / 12 / (Number(selectedMember.monthlyExpense) || 1)) * 10)}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-base font-bold uppercase tracking-widest flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Financial Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {selectedMember.goals?.map((goal: any) => {
                const percentage = (goal.current / goal.target) * 100
                return (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-sm">{goal.name}</span>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-widest h-5",
                          percentage >= 100
                            ? "bg-success/5 text-success border-success/20"
                            : percentage >= 50
                              ? "bg-primary/5 text-primary border-primary/20"
                              : "bg-muted text-muted-foreground border-border/50",
                        )}
                      >
                        {Math.round(percentage)}%
                      </Badge>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-1.5" />
                    <div className="flex items-center justify-between text-[11px] font-bold font-mono text-muted-foreground">
                      <span className="text-success">₹{goal.current.toLocaleString("en-IN")}</span>
                      <span className="opacity-60">₹{goal.target.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )
              })}
              <Button variant="outline" className="w-full gap-2 bg-transparent border-dashed border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all py-6 rounded-xl">
                <Plus className="h-4 w-4" />
                Add Goal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}
