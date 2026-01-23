"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
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
  Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { fetchAlerts } from "@/lib/api"

export default function AlertsPage() {
  return (
    <ProtectedRoute>
      <AlertsContent />
    </ProtectedRoute>
  )
}

function AlertsContent() {
  const [alertsList, setAlertsList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([])

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
  ]

  useEffect(() => {
    async function loadAlerts() {
      const data = await fetchAlerts()
      if (data && data.length > 0) {
        setAlertsList(data.map((a: any) => ({
          ...a,
          icon: a.type === "danger" ? AlertTriangle : a.type === "warning" ? ShieldAlert : Bell,
          time: "Just now"
        })))
      } else {
        setAlertsList([
          {
            id: 1,
            type: "warning",
            title: "High Crypto Exposure",
            message: "Your crypto allocation (25%) exceeds recommended limit (15%). Consider rebalancing.",
            time: "2 hours ago",
            icon: ShieldAlert,
          }
        ])
      }
      setIsLoading(false)
    }
    loadAlerts()
  }, [])

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex h-[70vh] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </AppShell>
    )
  }

  const activeAlerts = alertsList.filter((a) => !dismissedAlerts.includes(a.id))

  const getAlertColor = (type: string) => {
    switch (type) {
      case "danger":
        return "border-destructive/30 bg-destructive/5"
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/5"
      default:
        return "border-primary/30 bg-primary/5"
    }
  }

  const getAlertIconColor = (type: string) => {
    switch (type) {
      case "danger":
        return "text-destructive"
      case "warning":
        return "text-yellow-500"
      default:
        return "text-primary"
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Alerts & Reports</h1>
          <p className="text-sm text-muted-foreground font-medium">Stay informed with notifications and financial reports</p>
        </div>

        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="alerts" className="gap-2">
              <Bell className="h-4 w-4" />
              Alerts
              {activeAlerts.length > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full bg-destructive p-0 text-xs text-white">{activeAlerts.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            {activeAlerts.length === 0 ? (
              <Card className="border-border/50 shadow-sm">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-4 text-lg font-medium text-muted-foreground">All caught up!</p>
                  <p className="text-sm text-muted-foreground">No new alerts at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              activeAlerts.map((alert) => (
                <Card key={alert.id} className={cn("transition-all border-border/50 shadow-sm", getAlertColor(alert.type))}>
                  <CardContent className="flex items-start gap-4 p-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                        alert.type === "danger"
                          ? "bg-destructive/10"
                          : alert.type === "warning"
                            ? "bg-yellow-500/10"
                            : "bg-primary/10",
                      )}
                    >
                      <alert.icon className={cn("h-5 w-5", getAlertIconColor(alert.type))} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-foreground">{alert.title}</p>
                        <span className="shrink-0 text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{alert.message}</p>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="default" className="h-8 shadow-sm">
                          <Check className="mr-1 h-4 w-4" />
                          Take Action
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 hover:bg-muted"
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
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Generate New Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="gap-2 bg-transparent border-border/50 hover:bg-muted transition-all">
                    <Calendar className="h-4 w-4" />
                    Weekly Report
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent border-border/50 hover:bg-muted transition-all">
                    <Calendar className="h-4 w-4" />
                    Monthly Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Past Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="flex flex-col gap-3 rounded-lg border border-border/50 bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-muted/50 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted border border-border/50">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-foreground">{report.title}</p>
                          <p className="text-sm text-muted-foreground">{report.period}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1 bg-transparent border-border/50 hover:bg-muted">
                          <Download className="h-4 w-4" />
                          Download PDF
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
