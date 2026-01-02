"use client"

import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calculator, Shield, Heart, Car, Lightbulb, ArrowRight, Check } from "lucide-react"

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

export default function TaxPage() {
  const totalSaved = taxDeductions.reduce((sum, d) => sum + d.used, 0)
  const totalLimit = taxDeductions.reduce((sum, d) => sum + d.limit, 0)
  const potentialSavings = Math.round(totalLimit * 0.3 - totalSaved * 0.3)

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Tax & Insurance</h1>
          <p className="text-sm text-muted-foreground">Optimize your taxes and manage insurance coverage</p>
        </div>

        <Tabs defaultValue="tax" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="tax" className="gap-2">
              <Calculator className="h-4 w-4" />
              Tax Optimizer
            </TabsTrigger>
            <TabsTrigger value="insurance" className="gap-2">
              <Shield className="h-4 w-4" />
              Insurance Advisor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tax" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground">Total Deductions Claimed</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">₹{totalSaved.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-muted-foreground">of ₹{totalLimit.toLocaleString()} limit</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground">Tax Saved This Year</p>
                  <p className="mt-1 text-2xl font-bold text-success">
                    ₹{Math.round(totalSaved * 0.3).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-muted-foreground">Potential Additional Savings</p>
                  <p className="mt-1 text-2xl font-bold text-accent">₹{potentialSavings.toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>

            {/* Deduction Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Tax Deduction Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {taxDeductions.map((deduction) => {
                  const percentage = (deduction.used / deduction.limit) * 100
                  return (
                    <div key={deduction.section} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-foreground">Section {deduction.section}</span>
                          <p className="text-xs text-muted-foreground">{deduction.items.join(", ")}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">₹{deduction.used.toLocaleString()}</span>
                          <span className="text-muted-foreground"> / ₹{deduction.limit.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={percentage} className="h-2 flex-1" />
                        <span className="text-sm font-medium text-muted-foreground w-12">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  AI Tax Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {taxSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insurance" className="space-y-6">
            {/* Insurance Plans */}
            <div className="grid gap-4 md:grid-cols-3">
              {insurancePlans.map((plan) => (
                <Card key={plan.type}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <plan.icon className="h-5 w-5 text-primary" />
                      {plan.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Current Cover</span>
                        <span className="font-medium">{plan.current}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Recommended</span>
                        <span className="font-medium text-primary">{plan.recommended}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Premium</span>
                        <span className="font-medium">{plan.premium}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={
                          plan.status === "Active" ? "bg-success/10 text-success" : "bg-chart-2/10 text-chart-2"
                        }
                      >
                        {plan.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {plan.status === "Active" ? "Upgrade" : "Renew"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Insurance Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Coverage Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg bg-secondary p-4">
                    <Check className="mt-0.5 h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-foreground">Increase Term Life Cover</p>
                      <p className="text-sm text-muted-foreground">
                        Based on your income and liabilities, we recommend ₹2 Cr coverage. Additional premium:
                        ~₹6,000/year
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-secondary p-4">
                    <Check className="mt-0.5 h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-foreground">Add Super Top-up Health Plan</p>
                      <p className="text-sm text-muted-foreground">
                        Get additional ₹15 Lakh cover with super top-up for just ₹4,000/year
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg bg-chart-2/10 p-4">
                    <Shield className="mt-0.5 h-5 w-5 text-chart-2" />
                    <div>
                      <p className="font-medium text-foreground">Vehicle Insurance Expiring</p>
                      <p className="text-sm text-muted-foreground">
                        Your vehicle insurance expires in 15 days. Renew now to avoid coverage gap.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
