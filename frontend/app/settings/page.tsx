"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Bell, Shield, Smartphone, CreditCard, LogOut, Camera, Check } from "lucide-react"

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  )
}

function SettingsContent() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true,
    reports: true,
    marketing: false,
  })

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground font-medium">Manage your account and preferences</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Section */}
          <Card className="lg:col-span-2 border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-bold uppercase tracking-widest text-primary">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription className="font-medium">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary/10">
                  <AvatarImage src="/indian-professional-man.png" />
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground font-bold">RK</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="gap-2 bg-transparent border-border/50 hover:bg-muted font-bold h-9">
                    <Camera className="h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground font-medium opacity-70">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <Separator className="bg-border/50" />

              {/* Form */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">First Name</Label>
                  <Input id="firstName" placeholder="First Name" className="bg-muted/50 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Last Name</Label>
                  <Input id="lastName" placeholder="Last Name" className="bg-muted/50 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" className="bg-muted/50 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="bg-muted/50 font-bold font-mono" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="pan" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">PAN Number</Label>
                  <Input id="pan" placeholder="ABCDE1234F" className="bg-muted/50 font-bold font-mono" />
                </div>
              </div>

              <Button className="gap-2 shadow-sm font-bold">
                <Check className="h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-base font-bold uppercase tracking-widest">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-4">
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent border-border/50 hover:bg-muted font-bold py-6 rounded-xl">
                  <Shield className="h-4 w-4 text-primary" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent border-border/50 hover:bg-muted font-bold py-6 rounded-xl">
                  <Smartphone className="h-4 w-4 text-primary" />
                  Two-Factor Auth
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent border-border/50 hover:bg-muted font-bold py-6 rounded-xl">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Linked Accounts
                </Button>
                <Separator className="my-2 bg-border/50" />
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive font-bold py-6 rounded-xl"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Notifications */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-bold uppercase tracking-widest text-primary">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription className="font-medium">Choose how you want to receive updates</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { id: "email", label: "Email Notifications", desc: "Receive updates via email" },
                { id: "push", label: "Push Notifications", desc: "Browser and mobile push" },
                { id: "sms", label: "SMS Alerts", desc: "Important alerts via SMS" },
                { id: "alerts", label: "Financial Alerts", desc: "Spending and market alerts" },
                { id: "reports", label: "Weekly Reports", desc: "Get weekly summaries" },
                { id: "marketing", label: "Marketing", desc: "Tips and promotions" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-border/50 p-4 bg-muted/30 transition-all hover:border-primary/20">
                  <div className="space-y-0.5">
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-[11px] text-muted-foreground font-medium opacity-70">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.id as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, [item.id]: checked })}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-base font-bold uppercase tracking-widest">App Preferences</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Currency</Label>
                <Select defaultValue="inr">
                  <SelectTrigger className="bg-muted/50 font-bold border-border/50 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr" className="font-medium">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="usd" className="font-medium">US Dollar ($)</SelectItem>
                    <SelectItem value="eur" className="font-medium">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="bg-muted/50 font-bold border-border/50 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en" className="font-medium">English</SelectItem>
                    <SelectItem value="hi" className="font-medium">Hindi</SelectItem>
                    <SelectItem value="ta" className="font-medium">Tamil</SelectItem>
                    <SelectItem value="te" className="font-medium">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Date Format</Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger className="bg-muted/50 font-bold border-border/50 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy" className="font-medium font-mono">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy" className="font-medium font-mono">MM-DD-YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd" className="font-medium font-mono">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
