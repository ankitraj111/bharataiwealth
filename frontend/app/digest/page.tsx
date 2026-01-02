"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Calendar,
  TrendingUp,
  Sparkles,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
} from "lucide-react"

const weeklyHighlights = [
  { label: "Top Gain", value: "HDFC Bank", change: "+5.2%", positive: true },
  { label: "Top Loss", value: "Infosys", change: "-2.8%", positive: false },
  { label: "Expenses", value: "INR 32,450", change: "-12% vs last week", positive: true },
  { label: "Investments", value: "INR 25,000", change: "3 SIPs completed", positive: true },
]

const pastDigests = [
  { id: 1, date: "Nov 24, 2024", type: "Weekly", status: "sent", opens: 1 },
  { id: 2, date: "Nov 17, 2024", type: "Weekly", status: "sent", opens: 1 },
  { id: 3, date: "Oct 31, 2024", type: "Monthly", status: "sent", opens: 1 },
  { id: 4, date: "Nov 10, 2024", type: "Weekly", status: "sent", opens: 1 },
  { id: 5, date: "Nov 3, 2024", type: "Weekly", status: "sent", opens: 1 },
]

const digestSections = [
  { id: "portfolio", label: "Portfolio Summary", icon: PieChart, enabled: true },
  { id: "gains", label: "Top Gains/Losses", icon: TrendingUp, enabled: true },
  { id: "expenses", label: "Expense Summary", icon: BarChart3, enabled: true },
  { id: "ai", label: "AI Coach Advice", icon: Sparkles, enabled: true },
  { id: "market", label: "Market Outlook", icon: TrendingUp, enabled: false },
]

export default function DigestPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 via-card to-card p-8 border border-border/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-foreground">Email Digest</h1>
              </div>
              <p className="text-muted-foreground max-w-md">
                Receive weekly and monthly wealth reports directly in your inbox with AI-powered insights.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button className="gap-2 shadow-lg shadow-primary/25">
                <Mail className="h-4 w-4" />
                Send Test Email
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sample Digest Preview */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              This Week&apos;s Digest Preview
            </h2>

            {/* Email Preview Card */}
            <Card className="glass-card-elevated border-border/50 overflow-hidden">
              <div className="bg-gradient-to-r from-primary via-blue-500 to-accent p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg">Bharat AI Wealth</h3>
                    <p className="text-white/70 text-sm">Weekly Wealth Report</p>
                  </div>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white mb-1">Your Week in Review</h2>
                <p className="text-white/80 text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Week of Nov 25 - Dec 1, 2024
                </p>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {weeklyHighlights.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-semibold text-sm mb-1">{item.value}</p>
                      <div
                        className={`flex items-center gap-1 text-xs ${item.positive ? "text-success" : "text-destructive"}`}
                      >
                        {item.positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insight */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">AI Coach Insight</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Great week! Your expenses are 12% lower than last week. Consider investing the saved amount (INR
                    4,500) into your Emergency Fund SIP. Your portfolio is up 2.3% this week, outperforming the Nifty 50
                    by 0.8%.
                  </p>
                </div>

                {/* Market Outlook */}
                <div className="p-5 rounded-xl bg-secondary/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="font-semibold">Market Outlook</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nifty 50 closed at 19,845 (+1.2% WoW). Banking sector continues strong momentum. IT sector may see
                    volatility due to global tech earnings. Consider holding your current positions.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button className="gap-2">
                    View Full Dashboard
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings & History */}
          <div className="space-y-6">
            {/* Digest Settings */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Digest Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">Every Sunday, 8:00 AM</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Monthly Report</p>
                    <p className="text-sm text-muted-foreground">1st of every month</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="h-px bg-border my-2" />

                <p className="text-sm font-medium text-muted-foreground">Include in digest:</p>
                {digestSections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{section.label}</span>
                    </div>
                    <Switch defaultChecked={section.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Past Digests */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Past Digests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pastDigests.map((digest) => (
                  <div
                    key={digest.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{digest.date}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {digest.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-success" />
                            Sent
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
