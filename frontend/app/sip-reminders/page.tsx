"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  Calendar,
  IndianRupee,
  ExternalLink,
  Clock,
  AlertCircle,
  Plus,
  TrendingUp,
  Sparkles,
} from "lucide-react"

const sipReminders = [
  {
    id: 1,
    name: "ELSS Tax Saver",
    amount: 5000,
    dueDate: "5th",
    nextDue: "Dec 5, 2024",
    status: "upcoming",
    broker: "Zerodha",
    returns: "+18.5%",
  },
  {
    id: 2,
    name: "Nifty 50 Index Fund",
    amount: 10000,
    dueDate: "10th",
    nextDue: "Dec 10, 2024",
    status: "upcoming",
    broker: "Groww",
    returns: "+22.3%",
  },
  {
    id: 3,
    name: "Liquid Fund",
    amount: 3000,
    dueDate: "1st",
    nextDue: "Dec 1, 2024",
    status: "due_today",
    broker: "Kuvera",
    returns: "+6.2%",
  },
  {
    id: 4,
    name: "Mid Cap Fund",
    amount: 7500,
    dueDate: "15th",
    nextDue: "Dec 15, 2024",
    status: "upcoming",
    broker: "Zerodha",
    returns: "+28.7%",
  },
  {
    id: 5,
    name: "PPF Contribution",
    amount: 12500,
    dueDate: "5th",
    nextDue: "Dec 5, 2024",
    status: "upcoming",
    broker: "SBI",
    returns: "+7.1%",
  },
]

const notificationSettings = [
  { id: "sms", label: "SMS Alerts", icon: MessageSquare, enabled: true },
  { id: "email", label: "Email Reminders", icon: Mail, enabled: true },
  { id: "push", label: "Push Notifications", icon: Bell, enabled: true },
  { id: "whatsapp", label: "WhatsApp", icon: Smartphone, enabled: false },
]

export default function SIPRemindersPage() {
  const [settings, setSettings] = useState(notificationSettings)

  const toggleSetting = (id: string) => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)))
  }

  const totalMonthly = sipReminders.reduce((sum, sip) => sum + sip.amount, 0)
  const dueTodayCount = sipReminders.filter((sip) => sip.status === "due_today").length

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `${(amount / 100000).toFixed(2)}L`
    return `${(amount / 1000).toFixed(1)}K`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "due_today":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] font-bold uppercase tracking-widest h-5">Due Today</Badge>
      case "overdue":
        return <Badge className="bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-widest h-5">Overdue</Badge>
      default:
        return (
          <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest h-5">
            Upcoming
          </Badge>
        )
    }
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-muted/30 p-8 border border-border/50">
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Wallet className="h-6 w-6" />
                </div>
                <div className="space-y-0.5">
                  <h1 className="text-3xl font-bold text-foreground">SIP Reminders</h1>
                  <p className="text-muted-foreground max-w-md font-medium">
                    Never miss a SIP payment. Get timely reminders via SMS, email, or push notifications.
                  </p>
                </div>
              </div>
            </div>

            <Button className="gap-2 shadow-sm font-bold">
              <Plus className="h-4 w-4" />
              Add New SIP
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Total Monthly SIP</p>
                  <p className="text-2xl font-bold font-mono mt-1 text-primary">
                    <span className="text-muted-foreground text-sm opacity-60">INR</span> {formatCurrency(totalMonthly)}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-muted border border-border/50 flex items-center justify-center">
                  <IndianRupee className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Active SIPs</p>
                  <p className="text-2xl font-bold font-mono mt-1">{sipReminders.length}</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-success/5 border border-success/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`border-border/50 shadow-sm transition-all ${dueTodayCount > 0 ? "border-destructive/30 bg-destructive/5" : "hover:border-primary/20"}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Due Today</p>
                  <p className={`text-2xl font-bold font-mono mt-1 ${dueTodayCount > 0 ? "text-destructive" : ""}`}>
                    {dueTodayCount}
                  </p>
                </div>
                <div
                  className={`h-10 w-10 rounded-xl flex items-center justify-center border ${dueTodayCount > 0 ? "bg-destructive/10 border-destructive/20" : "bg-muted border-border/50"}`}
                >
                  <AlertCircle
                    className={`h-5 w-5 ${dueTodayCount > 0 ? "text-destructive" : "text-muted-foreground"}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SIP List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Your SIPs</h2>
            </div>

            <div className="space-y-4">
              {sipReminders.map((sip) => (
                <Card
                  key={sip.id}
                  className={`border-border/50 shadow-sm transition-all hover:border-primary/20 overflow-hidden ${sip.status === "due_today" ? "border-destructive/30 shadow-destructive/5" : ""
                    }`}
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-14 w-14 rounded-2xl flex items-center justify-center border ${sip.status === "due_today"
                            ? "bg-destructive/10 border-destructive/20"
                            : "bg-primary/5 border-primary/10"
                            }`}
                        >
                          <Wallet
                            className={`h-7 w-7 ${sip.status === "due_today" ? "text-destructive" : "text-primary"}`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-base">{sip.name}</h3>
                            {getStatusBadge(sip.status)}
                          </div>
                          <div className="flex items-center gap-4 text-xs font-bold font-mono tracking-widest text-muted-foreground opacity-70">
                            <span className="flex items-center gap-1.5 uppercase">
                              <Clock className="h-3.5 w-3.5" />
                              {sip.dueDate} of month
                            </span>
                            <span className="text-border">|</span>
                            <span className="uppercase">{sip.broker}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-xl font-bold font-mono">₹{sip.amount.toLocaleString("en-IN")}</p>
                          <p className="text-[10px] text-success font-bold uppercase tracking-widest mt-0.5">{sip.returns} CAGR</p>
                        </div>

                        <Button
                          variant={sip.status === "due_today" ? "default" : "outline"}
                          size="sm"
                          className="gap-2 font-bold px-4 h-9 shadow-sm"
                        >
                          Pay Now
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {sip.status === "due_today" && (
                      <div className="mt-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                          <Bell className="h-4 w-4 text-destructive" />
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          <span className="font-bold text-destructive">Reminder:</span> Your SIP payment of <span className="font-bold">₹{sip.amount.toLocaleString("en-IN")}</span> is due today.
                          <a href="#" className="text-primary ml-2 font-bold hover:underline underline-offset-4">
                            Pay via {sip.broker} →
                          </a>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Notifications</h2>
            </div>

            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-5 space-y-2">
                {settings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-muted/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-muted border border-border/50 flex items-center justify-center">
                        <setting.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-bold text-sm">{setting.label}</span>
                    </div>
                    <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights Card */}
            <Card className="border-border/50 shadow-sm bg-primary/5 border-primary/10 overflow-hidden mt-6">
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-primary">AI Coach Tip</h3>
                </div>
                <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                  Automating your SIPs on the <span className="font-bold">5th of every month</span> aligns with most salary cycles in India, ensuring better discipline and zero missed payments.
                </p>
                <Button variant="link" className="p-0 h-auto text-primary font-bold text-xs mt-4 uppercase tracking-widest">
                  Learn about automation →
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
