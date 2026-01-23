"use client"

import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calculator, Shield, Heart, Car, Lightbulb, ArrowRight, Check, TrendingUp, Search } from "lucide-react"

const taxDeductions = [
  {
    section: "80C",
    limit: 150000,
    used: 90000,
    items: ["ELSS", "PPF", "LIC Premium", "EPF"],
  },
  {
    section: "80D",
    limit: 25000,
    used: 18000,
    items: ["Health Insurance"],
  },
  {
    section: "HRA",
    limit: 240000,
    used: 180000,
    items: ["House Rent Allowance"],
  },
  {
    section: "80CCD(1B)",
    limit: 50000,
    used: 0,
    items: ["NPS Contribution"],
  },
]

const insurancePlans = [
  {
    type: "Term Life",
    icon: Shield,
    current: "₹1 Cr Cover",
    recommended: "₹2 Cr Cover",
    premium: "₹12,000/year",
    status: "Active",
  },
  {
    type: "Health Insurance",
    icon: Heart,
    current: "₹5 Lakh Cover",
    recommended: "₹10 Lakh Cover",
    premium: "₹18,000/year",
    status: "Active",
  },
  {
    type: "Vehicle Insurance",
    icon: Car,
    current: "Third Party",
    recommended: "Comprehensive",
    premium: "₹8,500/year",
    status: "Expiring Soon",
  },
]

const taxSuggestions = [
  "Invest ₹60,000 more in ELSS to maximize 80C benefits",
  "Claim ₹7,000 more under 80D for health checkup",
  "Invest ₹50,000 in NPS for additional tax benefit under 80CCD(1B)",
  "Keep rent receipts for HRA claims",
]

import { useState, useEffect } from "react"
import { fetchTaxEstimate } from "@/lib/api"
import { Loader2 } from "lucide-react"

export default function TaxPage() {
  return (
    <ProtectedRoute>
      <TaxContent />
    </ProtectedRoute>
  )
}

function TaxContent() {
  const [taxData, setTaxData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadTax() {
      const data = await fetchTaxEstimate()
      if (data) setTaxData(data)
      setIsLoading(false)
    }
    loadTax()
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

  const totalSaved = Number(taxData?.deductions80c || 0) + Number(taxData?.otherDeductions || 0)
  const totalLimit = 150000 + 50000 // 80C + 80CCD
  const potentialSavings = Math.max(0, Math.round((totalLimit * 0.3) - (totalSaved * 0.3)))

  const handleSave = async () => {
    alert("Tax optimizer is currently analytical. Auto-filling from expenses coming soon!")
  }

  const dynamicTaxDeductions = [
    {
      section: "80C",
      limit: 150000,
      used: Number(taxData?.deductions80c || 0),
      items: ["ELSS", "PPF", "LIC Premium", "EPF"],
    },
    {
      section: "Other",
      limit: 50000,
      used: Number(taxData?.otherDeductions || 0),
      items: ["NPS", "Section 80D"],
    }
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
          <h1 className="text-2xl font-bold text-foreground">Tax & Insurance</h1>
          <p className="text-sm text-muted-foreground font-medium">Optimize your taxes and manage insurance coverage</p>
        </div>

        <Tabs defaultValue="tax" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-muted rounded-xl">
            <TabsTrigger value="tax" className="gap-2 rounded-lg font-bold data-[state=active]:shadow-sm">
              <Calculator className="h-4 w-4" />
              Tax Optimizer
            </TabsTrigger>
            <TabsTrigger value="insurance" className="gap-2 rounded-lg font-bold data-[state=active]:shadow-sm">
              <Shield className="h-4 w-4" />
              Insurance Advisor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tax" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-border/50 shadow-sm transition-all hover:border-primary/20">
                <CardContent className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Deductions Claimed</p>
                  <p className="mt-2 text-2xl font-bold text-foreground font-mono">₹{totalSaved.toLocaleString("en-IN")}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">of ₹{totalLimit.toLocaleString("en-IN")} limit</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 shadow-sm transition-all hover:border-success/20">
                <CardContent className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tax Saved This Year</p>
                  <p className="mt-2 text-2xl font-bold text-success font-mono">
                    ₹{Math.round(totalSaved * 0.3).toLocaleString("en-IN")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-accent/20 bg-accent/5 shadow-sm">
                <CardContent className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Potential Savings Remaining</p>
                  <p className="mt-2 text-2xl font-bold text-accent font-mono">₹{potentialSavings.toLocaleString("en-IN")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Deduction Sections */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-base font-bold uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Tax Deduction Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                {dynamicTaxDeductions.map((deduction) => {
                  const percentage = (deduction.used / deduction.limit) * 100
                  return (
                    <div key={deduction.section} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="font-bold text-foreground text-sm uppercase tracking-wider">Section {deduction.section}</span>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-70">
                            {deduction.items.join(" • ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold font-mono">₹{deduction.used.toLocaleString("en-IN")}</span>
                          <span className="text-[11px] text-muted-foreground font-bold font-mono"> / ₹{deduction.limit.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Progress value={percentage} className="h-2 flex-1 shadow-inner" />
                        <span className="text-xs font-bold text-muted-foreground w-10 text-right font-mono">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card className="border-primary/20 bg-primary/5 shadow-sm overflow-hidden">
              <div className="h-1 bg-primary/30" />
              <CardHeader className="border-b border-primary/10 pb-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold uppercase tracking-widest text-primary">
                  <Lightbulb className="h-5 w-5" />
                  AI Tax Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {taxSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-primary/10 group transition-all hover:border-primary/30">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm font-medium text-foreground leading-relaxed">{suggestion}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 gap-2 font-bold shadow-sm py-6 rounded-xl">
                  <Calculator className="h-4 w-4" />
                  Generate Detailed Tax Planning Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insurance" className="space-y-6">
            {/* Insurance Plans */}
            <div className="grid gap-4 md:grid-cols-3">
              {insurancePlans.map((plan) => (
                <Card key={plan.type} className="border-border/50 shadow-sm transition-all hover:border-primary/20 overflow-hidden">
                  <CardHeader className="pb-3 border-b border-border/50 mb-3 bg-muted/30">
                    <CardTitle className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                      <plan.icon className="h-4 w-4 text-primary" />
                      {plan.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Cover</span>
                        <span className="text-sm font-bold font-mono">{plan.current}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recommended</span>
                        <span className="text-sm font-bold font-mono text-primary">{plan.recommended}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Premium</span>
                        <span className="text-sm font-bold font-mono">{plan.premium}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={
                          plan.status === "Active"
                            ? "bg-success/5 text-success border-success/20 text-[10px] font-bold uppercase tracking-widest h-6"
                            : "bg-accent/5 text-accent border-accent/20 text-[10px] font-bold uppercase tracking-widest h-6"
                        }
                      >
                        {plan.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="h-8 font-bold border-border/50 hover:bg-muted bg-transparent">
                        {plan.status === "Active" ? "Upgrade" : "Renew"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Insurance Recommendations */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-base font-bold uppercase tracking-widest flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Coverage Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {[
                  { title: "Increase Term Life Cover", desc: "Based on your income and liabilities, we recommend ₹2 Cr coverage. Additional premium: ~₹6,000/year", icon: Check, color: "text-success", bg: "bg-success/5 border-success/10" },
                  { title: "Add Super Top-up Health Plan", desc: "Get additional ₹15 Lakh cover with super top-up for just ₹4,000/year", icon: Check, color: "text-success", bg: "bg-success/5 border-success/10" },
                  { title: "Vehicle Insurance Expiring", desc: "Your vehicle insurance expires in 15 days. Renew now to avoid coverage gap.", icon: AlertRight, color: "text-accent", bg: "bg-accent/5 border-accent/10" },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-start gap-4 p-5 rounded-2xl border ${item.bg} transition-all hover:scale-[1.01]`}>
                    <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-background shadow-sm ${item.color}`}>
                      {item.icon === Check ? <Check className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-base tracking-tight">{item.title}</p>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed mt-1 opacity-80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button className="w-full gap-2 font-bold shadow-sm py-6 rounded-2xl">
              <Heart className="h-4 w-4" />
              Get Expert Consultation
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}

function AlertRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20" />
      <path d="m17 17 5-5-5-5" />
      <path d="M22 12H12" />
    </svg>
  )
}
