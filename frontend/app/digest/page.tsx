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
        <div className="relative overflow-hidden rounded-2xl bg-muted/30 p-8 border border-border/50">
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="space-y-0.5">
                  <h1 className="text-3xl font-bold text-foreground">Email Digest</h1>
                  <p className="text-muted-foreground max-w-md font-medium">
                    Receive weekly and monthly wealth reports directly in your inbox with AI-powered insights.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 bg-transparent border-border/50 hover:bg-muted transition-all">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button className="gap-2 shadow-sm">
                <Mail className="h-4 w-4" />
                Send Test Email
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sample Digest Preview */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">This Week&apos;s Digest Preview</h2>
            </div>

            {/* Email Preview Card */}
            <Card className="border-border/50 overflow-hidden shadow-sm">
              <div className="bg-primary/5 border-b border-border/50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">Bharat AI Wealth</h3>
                    <p className="text-muted-foreground text-sm font-medium">Weekly Wealth Report</p>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Your Week in Review</h2>
                <p className="text-muted-foreground text-sm flex items-center gap-2 font-medium">
                  <Calendar className="h-4 w-4" />
                  Week of Nov 25 - Dec 1, 2024
                </p>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {weeklyHighlights.map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-muted/50 border border-border/50 shadow-sm">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 mb-1">{item.label}</p>
                      <p className="font-bold text-sm mb-1">{item.value}</p>
                      <div
                        className={`flex items-center gap-1 text-[11px] font-bold ${item.positive ? "text-success" : "text-destructive"}`}
                      >
                        {item.positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                        {item.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Insight */}
                <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="font-bold text-primary uppercase tracking-wider text-xs">AI Coach Insight</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    Great week! Your expenses are 12% lower than last week. Consider investing the saved amount (INR
                    4,500) into your Emergency Fund SIP. Your portfolio is up 2.3% this week, outperforming the Nifty 50
                    by 0.8%.
                  </p>
                </div>

                {/* Market Outlook */}
                <div className="p-5 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="font-bold uppercase tracking-wider text-xs">Market Outlook</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    Nifty 50 closed at 19,845 (+1.2% WoW). Banking sector continues strong momentum. IT sector may see
                    volatility due to global tech earnings. Consider holding your current positions.
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button className="gap-2 shadow-sm">
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
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Digest Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-bold">Weekly Digest</p>
                    <p className="text-xs text-muted-foreground font-medium">Every Sunday, 8:00 AM</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-bold">Monthly Report</p>
                    <p className="text-xs text-muted-foreground font-medium">1st of every month</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="h-px bg-border my-2" />

                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2">Include in digest:</p>
                {digestSections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                        <section.icon className="h-4 w-4 text-muted-foreground/70" />
                      </div>
                      <span className="text-sm font-medium">{section.label}</span>
                    </div>
                    <Switch defaultChecked={section.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Past Digests */}
            <Card className="border-border/50 shadow-sm">
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
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{digest.date}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider h-5 bg-muted">
                            {digest.type}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-success" />
                            Sent
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted">
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
