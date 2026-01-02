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
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Due Today</Badge>
      case "overdue":
        return <Badge className="bg-destructive text-destructive-foreground">Overdue</Badge>
      default:
        return (
          <Badge variant="secondary" className="bg-secondary/80">
            Upcoming
          </Badge>
        )
    }
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-card p-8 border border-border/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
                  <Wallet className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-foreground">SIP Reminders</h1>
              </div>
              <p className="text-muted-foreground max-w-md">
                Never miss a SIP payment. Get timely reminders via SMS, email, or push notifications.
              </p>
            </div>

            <Button className="gap-2 shadow-lg shadow-primary/25">
              <Plus className="h-4 w-4" />
              Add New SIP
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Monthly SIP</p>
                  <p className="text-2xl font-bold font-mono mt-1">
                    <span className="text-muted-foreground text-lg">INR</span> {formatCurrency(totalMonthly)}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <IndianRupee className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active SIPs</p>
                  <p className="text-2xl font-bold font-mono mt-1">{sipReminders.length}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`glass-card border-border/50 ${dueTodayCount > 0 ? "border-destructive/50" : ""}`}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Due Today</p>
                  <p className={`text-2xl font-bold font-mono mt-1 ${dueTodayCount > 0 ? "text-destructive" : ""}`}>
                    {dueTodayCount}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${dueTodayCount > 0 ? "bg-destructive/10" : "bg-secondary"}`}
                >
                  <AlertCircle
                    className={`h-6 w-6 ${dueTodayCount > 0 ? "text-destructive" : "text-muted-foreground"}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SIP List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Your SIPs
            </h2>

            <div className="space-y-4">
              {sipReminders.map((sip, index) => (
                <Card
                  key={sip.id}
                  className={`glass-card border-border/50 overflow-hidden animate-fade-in opacity-0 ${
                    sip.status === "due_today" ? "border-destructive/50 shadow-lg shadow-destructive/10" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                            sip.status === "due_today"
                              ? "bg-destructive/10"
                              : "bg-gradient-to-br from-primary/20 to-primary/5"
                          }`}
                        >
                          <Wallet
                            className={`h-6 w-6 ${sip.status === "due_today" ? "text-destructive" : "text-primary"}`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{sip.name}</h3>
                            {getStatusBadge(sip.status)}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {sip.dueDate} of every month
                            </span>
                            <span className="text-muted-foreground/50">|</span>
                            <span>{sip.broker}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-lg font-bold font-mono">INR {sip.amount.toLocaleString()}</p>
                          <p className="text-sm text-success font-medium">{sip.returns} CAGR</p>
                        </div>

                        <Button
                          variant={sip.status === "due_today" ? "default" : "outline"}
                          size="sm"
                          className="gap-2"
                        >
                          Pay Now
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {sip.status === "due_today" && (
                      <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-3">
                        <Bell className="h-5 w-5 text-destructive" />
                        <p className="text-sm">
                          <span className="font-semibold">Reminder:</span> Your SIP payment of INR{" "}
                          {sip.amount.toLocaleString()} is due today.
                          <a href="#" className="text-primary ml-1 underline underline-offset-2">
                            Click to pay
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
            <h2 className="font-serif text-xl font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notification Settings
            </h2>

            <Card className="glass-card-elevated border-border/50">
              <CardContent className="p-5 space-y-4">
                {settings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                        <setting.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium">{setting.label}</span>
                    </div>
                    <Switch checked={setting.enabled} onCheckedChange={() => toggleSetting(setting.id)} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sample Notification */}
            <Card className="glass-card border-border/50 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary to-accent" />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Sample Notification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">SIP Reminder</p>
                      <p className="text-sm text-muted-foreground">
                        Tomorrow INR 5,000 SIP due for ELSS Tax Saver.
                        <br />
                        <a href="#" className="text-primary underline underline-offset-2">
                          Click to pay
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
