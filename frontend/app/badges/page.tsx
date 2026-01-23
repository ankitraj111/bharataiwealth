"use client"

import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Medal,
  Star,
  Flame,
  PiggyBank,
  TrendingUp,
  Target,
  Zap,
  Award,
  Crown,
  Sparkles,
  Lock,
} from "lucide-react"

const earnedBadges = [
  {
    id: 1,
    name: "Saver of the Month",
    description: "Saved 30% of income in March",
    icon: PiggyBank,
    color: "bg-emerald-500",
    earnedDate: "Mar 2024",
    rarity: "Legendary",
  },
  {
    id: 2,
    name: "SIP Champion",
    description: "Completed 12 consecutive SIPs",
    icon: TrendingUp,
    color: "bg-blue-500",
    earnedDate: "Feb 2024",
    rarity: "Epic",
  },
  {
    id: 3,
    name: "Budget Master",
    description: "Stayed under budget for 3 months",
    icon: Target,
    color: "bg-purple-500",
    earnedDate: "Jan 2024",
    rarity: "Rare",
  },
  {
    id: 4,
    name: "No Zomato Week",
    description: "No food delivery for 7 days",
    icon: Flame,
    color: "bg-orange-500",
    earnedDate: "Mar 2024",
    rarity: "Common",
  },
  {
    id: 5,
    name: "Early Bird",
    description: "Paid all bills before due date",
    icon: Zap,
    color: "bg-yellow-500",
    earnedDate: "Mar 2024",
    rarity: "Uncommon",
  },
  {
    id: 6,
    name: "Goal Crusher",
    description: "Completed first financial goal",
    icon: Trophy,
    color: "bg-primary",
    earnedDate: "Dec 2023",
    rarity: "Epic",
  },
]

const lockedBadges = [
  {
    id: 7,
    name: "Wealth Builder",
    description: "Reach INR 10L in investments",
    icon: Crown,
    progress: 65,
    requirement: "INR 6.5L / INR 10L",
    rarity: "Legendary",
  },
  {
    id: 8,
    name: "Expense Ninja",
    description: "Reduce expenses by 20% for 3 months",
    icon: Medal,
    progress: 33,
    requirement: "1 / 3 months",
    rarity: "Epic",
  },
  {
    id: 9,
    name: "Diversification Pro",
    description: "Invest in 5 different asset classes",
    icon: Star,
    progress: 60,
    requirement: "3 / 5 assets",
    rarity: "Rare",
  },
  {
    id: 10,
    name: "Emergency Ready",
    description: "Build 6-month emergency fund",
    icon: Award,
    progress: 45,
    requirement: "2.7 / 6 months",
    rarity: "Epic",
  },
]

const streaks = [
  { name: "Daily App Login", current: 28, icon: Flame, color: "text-orange-500" },
  { name: "Weekly Budget Check", current: 12, icon: Target, color: "text-emerald-500" },
  { name: "Monthly SIP", current: 8, icon: TrendingUp, color: "text-blue-500" },
]

const rarityColors: Record<string, string> = {
  Common: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  Uncommon: "bg-green-500/10 text-green-600 border-green-500/20",
  Rare: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Epic: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Legendary: "bg-amber-500/10 text-amber-600 border-amber-500/20",
}

export default function BadgesPage() {
  return (
    <ProtectedRoute>
      <BadgesContent />
    </ProtectedRoute>
  )
}

function BadgesContent() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-muted/30 p-8 border border-border/50">
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Trophy className="h-6 w-6" />
                </div>
                <div className="space-y-0.5">
                  <h1 className="text-3xl font-bold text-foreground">Badges & Rewards</h1>
                  <p className="text-muted-foreground max-w-md font-medium">
                    Earn badges for your financial achievements and build healthy money habits.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 bg-muted/50 p-6 rounded-xl border border-border/50">
              <div className="text-center">
                <p className="text-3xl font-bold font-mono text-primary">{earnedBadges.length}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">Badges Earned</p>
              </div>
              <div className="h-10 w-px bg-border/50" />
              <div className="text-center">
                <p className="text-3xl font-bold font-mono text-primary">1,250</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">Total XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Streaks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {streaks.map((streak, index) => (
            <Card key={index} className="border-border/50 overflow-hidden shadow-sm hover:border-primary/20 transition-all">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 rounded-xl bg-muted border border-border/50 items-center justify-center">
                    <streak.icon className={`h-7 w-7 ${streak.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">{streak.name}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-bold font-mono">{streak.current}</span>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Earned Badges */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Earned Badges</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <Card
                key={badge.id}
                className="border-border/50 group shadow-sm hover:border-primary/30 transition-all"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-16 w-16 rounded-2xl ${badge.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <badge.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground mb-1 mt-0.5">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-tight">{badge.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-wider ${rarityColors[badge.rarity]}`}>
                          {badge.rarity}
                        </Badge>
                        <span className="text-xs font-medium text-muted-foreground">{badge.earnedDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Badges */}
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-xl font-bold text-foreground">Badges to Unlock</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedBadges.map((badge) => (
              <Card
                key={badge.id}
                className="border-border/50 shadow-sm opacity-80"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 rounded-2xl bg-muted border border-border/50 flex items-center justify-center">
                      <badge.icon className="h-8 w-8 text-muted-foreground/30" />
                      <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-background/20 backdrop-blur-[1px]">
                        <Lock className="h-5 w-5 text-muted-foreground/40" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 mt-0.5">
                        <h3 className="font-bold text-muted-foreground">{badge.name}</h3>
                        <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-wider opacity-60 ${rarityColors[badge.rarity]}`}>
                          {badge.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground/60 mb-4 leading-tight">{badge.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                          <span className="text-muted-foreground/60">Progress</span>
                          <span className="text-primary/70">{badge.requirement}</span>
                        </div>
                        <Progress value={badge.progress} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
