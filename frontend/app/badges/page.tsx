"use client"

import { AppShell } from "@/components/app-shell"
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
    color: "from-emerald-500 to-teal-500",
    earnedDate: "Mar 2024",
    rarity: "Legendary",
  },
  {
    id: 2,
    name: "SIP Champion",
    description: "Completed 12 consecutive SIPs",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    earnedDate: "Feb 2024",
    rarity: "Epic",
  },
  {
    id: 3,
    name: "Budget Master",
    description: "Stayed under budget for 3 months",
    icon: Target,
    color: "from-purple-500 to-pink-500",
    earnedDate: "Jan 2024",
    rarity: "Rare",
  },
  {
    id: 4,
    name: "No Zomato Week",
    description: "No food delivery for 7 days",
    icon: Flame,
    color: "from-orange-500 to-amber-500",
    earnedDate: "Mar 2024",
    rarity: "Common",
  },
  {
    id: 5,
    name: "Early Bird",
    description: "Paid all bills before due date",
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
    earnedDate: "Mar 2024",
    rarity: "Uncommon",
  },
  {
    id: 6,
    name: "Goal Crusher",
    description: "Completed first financial goal",
    icon: Trophy,
    color: "from-primary to-primary/70",
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
  Common: "bg-slate-500/20 text-slate-400",
  Uncommon: "bg-green-500/20 text-green-400",
  Rare: "bg-blue-500/20 text-blue-400",
  Epic: "bg-purple-500/20 text-purple-400",
  Legendary: "bg-amber-500/20 text-amber-400",
}

export default function BadgesPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 via-card to-card p-8 border border-border/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent/80 shadow-lg shadow-accent/25">
                  <Trophy className="h-6 w-6 text-accent-foreground" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Badges & Rewards</h1>
              </div>
              <p className="text-muted-foreground max-w-md">
                Earn badges for your financial achievements and build healthy money habits.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold font-mono text-accent">{earnedBadges.length}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-4xl font-bold font-mono text-primary">1,250</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Streaks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {streaks.map((streak, index) => (
            <Card key={index} className="glass-card border-border/50 overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center`}
                    >
                      <streak.icon className={`h-7 w-7 ${streak.color}`} />
                    </div>
                    <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-background border-2 border-border flex items-center justify-center">
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{streak.name}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-mono">{streak.current}</span>
                      <span className="text-muted-foreground">days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Earned Badges */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="font-serif text-xl font-semibold">Earned Badges</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {earnedBadges.map((badge, index) => (
              <Card
                key={badge.id}
                className="glass-card-elevated border-border/50 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`relative h-16 w-16 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}
                    >
                      <badge.icon className="h-8 w-8 text-white" />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{badge.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={`text-xs ${rarityColors[badge.rarity]}`}>
                          {badge.rarity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{badge.earnedDate}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Badges */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <h2 className="font-serif text-xl font-semibold">Badges to Unlock</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {lockedBadges.map((badge, index) => (
              <Card
                key={badge.id}
                className="glass-card border-border/50 relative overflow-hidden animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 rounded-2xl bg-secondary/50 flex items-center justify-center">
                      <badge.icon className="h-8 w-8 text-muted-foreground/50" />
                      <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-background/50 backdrop-blur-sm">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-muted-foreground">{badge.name}</h3>
                        <Badge variant="secondary" className={`text-xs ${rarityColors[badge.rarity]}`}>
                          {badge.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground/70 mb-3">{badge.description}</p>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{badge.requirement}</span>
                        </div>
                        <Progress value={badge.progress} className="h-2" />
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
