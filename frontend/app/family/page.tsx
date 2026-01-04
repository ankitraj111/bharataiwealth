"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Users, TrendingUp, Target, Wallet, Plus } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function FamilyPage() {
  const { user } = useAuth()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const familyMembers = [
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
    },
    {
      id: "father",
      name: "Suresh Kumar",
      relation: "Father",
      avatar: "SK",
      netWorth: 3500000,
      monthlyExpense: 35000,
      goals: [
        { name: "Retirement Corpus", target: 5000000, current: 3500000 },
        { name: "Medical Emergency", target: 500000, current: 500000 },
      ],
    },
    {
      id: "mother",
      name: "Kamla Devi",
      relation: "Mother",
      avatar: "KD",
      netWorth: 850000,
      monthlyExpense: 15000,
      goals: [
        { name: "Gold Savings", target: 300000, current: 180000 },
        { name: "Pilgrimage Fund", target: 100000, current: 65000 },
      ],
    },
    {
      id: "sibling",
      name: "Priya Kumar",
      relation: "Sister",
      avatar: "PK",
      netWorth: 420000,
      monthlyExpense: 28000,
      goals: [
        { name: "Higher Education", target: 800000, current: 200000 },
        { name: "Travel Fund", target: 150000, current: 50000 },
      ],
    },
  ]

  const [selectedMember, setSelectedMember] = useState(familyMembers[0])

  const totalFamilyNetWorth = familyMembers.reduce((sum, m) => sum + m.netWorth, 0)
  const totalMonthlyExpense = familyMembers.reduce((sum, m) => sum + m.monthlyExpense, 0)

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">Family Dashboard</h1>
            <p className="text-sm text-muted-foreground">Track and manage your family&apos;s finances</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>

        {/* Family Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">Family Members</p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{familyMembers.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">Combined Net Worth</p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">₹{(totalFamilyNetWorth / 100000).toFixed(1)}L</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">Monthly Expenses</p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">₹{totalMonthlyExpense.toLocaleString("en-IN")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">Active Goals</p>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">
                {familyMembers.reduce((sum, m) => sum + m.goals.length, 0)}
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
              className="gap-2"
              onClick={() => setSelectedMember(member)}
            >
              <Avatar className="h-6 w-6">
                <AvatarFallback
                  className={cn(
                    "text-xs",
                    selectedMember.id === member.id
                      ? "bg-primary-foreground text-primary"
                      : "bg-primary/10 text-primary",
                  )}
                >
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
              {member.relation}
            </Button>
          ))}
        </div>

        {/* Selected Member Details */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Member Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-base font-medium">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">{selectedMember.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedMember.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedMember.relation}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-xs text-muted-foreground">Net Worth</p>
                  <p className="mt-1 text-xl font-bold text-foreground">₹{selectedMember.netWorth.toLocaleString("en-IN")}</p>
                </div>
                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-xs text-muted-foreground">Monthly Expense</p>
                  <p className="mt-1 text-xl font-bold text-foreground">
                    ₹{selectedMember.monthlyExpense.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="text-xs text-muted-foreground">Savings Rate</p>
                <div className="mt-2 flex items-center gap-2">
                  <Progress
                    value={Math.round((selectedMember.netWorth / 12 / selectedMember.monthlyExpense) * 10)}
                    className="h-2 flex-1"
                  />
                  <span className="text-sm font-medium text-primary">
                    {Math.round((selectedMember.netWorth / 12 / selectedMember.monthlyExpense) * 10)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Financial Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedMember.goals.map((goal) => {
                const percentage = (goal.current / goal.target) * 100
                return (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{goal.name}</span>
                      <Badge
                        className={cn(
                          percentage >= 100
                            ? "bg-success/10 text-success"
                            : percentage >= 50
                              ? "bg-chart-2/10 text-chart-2"
                              : "bg-secondary text-muted-foreground",
                        )}
                      >
                        {Math.round(percentage)}%
                      </Badge>
                    </div>
                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>₹{goal.current.toLocaleString("en-IN")}</span>
                      <span>₹{goal.target.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )
              })}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
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
