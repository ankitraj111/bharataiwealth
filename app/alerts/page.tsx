"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  FileText,
  AlertTriangle,
  TrendingDown,
  ShieldAlert,
  Wallet,
  Download,
  Mail,
  Check,
  X,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "High Crypto Exposure",
    message: "Your crypto allocation (25%) exceeds recommended limit (15%). Consider rebalancing.",
    time: "2 hours ago",
    icon: ShieldAlert,
  },
  {
    id: 2,
    type: "danger",
    title: "Unusual Expense Detected",
    message: "₹12,500 spent at Electronics Store - 3x your usual spending in this category.",
    time: "5 hours ago",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "info",
    title: "Market Update",
    message: "Nifty 50 dropped 2.3% today. Your portfolio impact: -₹8,500",
    time: "Today",
    icon: TrendingDown,
  },
  {
    id: 4,
    type: "info",
    title: "Bill Reminder",
    message: "Electricity bill of ₹2,450 due in 3 days. Pay now to avoid late fee.",
    time: "Yesterday",
    icon: Wallet,
  },
  {
    id: 5,
    type: "warning",
    title: "Insurance Expiring",
    message: "Your vehicle insurance expires in 15 days. Renew to maintain coverage.",
    time: "2 days ago",
    icon: ShieldAlert,
  },
]

const reports = [
  {
    id: 1,
    title: "Weekly Financial Summary",
    period: "Dec 1 - Dec 7, 2024",
    type: "Weekly",
    generated: "Dec 8, 2024",
  },
  {
    id: 2,
    title: "November Monthly Report",
    period: "Nov 1 - Nov 30, 2024",
    type: "Monthly",
    generated: "Dec 1, 2024",
  },
  {
    id: 3,
    title: "Q3 Quarterly Analysis",
    period: "Jul 1 - Sep 30, 2024",
    type: "Quarterly",
    generated: "Oct 2, 2024",
  },
  {
    id: 4,
    title: "Tax Summary FY 2023-24",
    period: "Apr 1, 2023 - Mar 31, 2024",
    type: "Annual",
    generated: "Apr 5, 2024",
  },
]

const getAlertColor = (type: string) => {
  switch (type) {
    case "danger":
      return "border-destructive/50 bg-destructive/5"
    case "warning":
      return "border-chart-2/50 bg-chart-2/5"
    default:
      return "border-primary/50 bg-primary/5"
  }
}

const getAlertIconColor = (type: string) => {
  switch (type) {
    case "danger":
      return "text-destructive"
    case "warning":
      return "text-chart-2"
    default:
      return "text-primary"
  }
}

export default function AlertsPage() {
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([])

  const activeAlerts = alerts.filter((a) => !dismissedAlerts.includes(a.id))

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Alerts & Reports</h1>
          <p className="text-sm text-muted-foreground">Stay informed with notifications and financial reports</p>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="alerts" className="gap-2">
              <Bell className="h-4 w-4" />
              Alerts
              {activeAlerts.length > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full bg-destructive p-0 text-xs">{activeAlerts.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            {activeAlerts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-lg font-medium text-muted-foreground">All caught up!</p>
                  <p className="text-sm text-muted-foreground">No new alerts at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              activeAlerts.map((alert) => (
                <Card key={alert.id} className={cn("transition-all", getAlertColor(alert.type))}>
                  <CardContent className="flex items-start gap-4 p-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        alert.type === "danger"
                          ? "bg-destructive/10"
                          : alert.type === "warning"
                            ? "bg-chart-2/10"
                            : "bg-primary/10",
                      )}
                    >
                      <alert.icon className={cn("h-5 w-5", getAlertIconColor(alert.type))} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-foreground">{alert.title}</p>
                        <span className="shrink-0 text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="default" className="h-8">
                          <Check className="mr-1 h-4 w-4" />
                          Take Action
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8"
                          onClick={() => setDismissedAlerts([...dismissedAlerts, alert.id])}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {/* Generate Report */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Generate New Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Calendar className="h-4 w-4" />
                    Weekly Report
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Calendar className="h-4 w-4" />
                    Monthly Report
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Calendar className="h-4 w-4" />
                    Custom Range
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Past Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Past Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="flex flex-col gap-3 rounded-lg bg-secondary p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{report.title}</p>
                          <p className="text-sm text-muted-foreground">{report.period}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {report.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Generated: {report.generated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1">
                          <Mail className="h-4 w-4" />
                          Email
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
