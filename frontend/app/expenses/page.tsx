"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, MessageSquare, Pencil, Trash2, Filter, Building2, CheckCircle2, RefreshCw, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ExportButton } from "@/components/export-button"
import { Progress } from "@/components/ui/progress"

const expenses = [
  { id: 1, date: "2024-01-15", category: "Food", note: "Swiggy Order", amount: 450, source: "UPI" },
  { id: 2, date: "2024-01-15", category: "Travel", note: "Uber ride to office", amount: 320, source: "UPI" },
  { id: 3, date: "2024-01-14", category: "Shopping", note: "Amazon purchase", amount: 2500, source: "Credit Card" },
  { id: 4, date: "2024-01-14", category: "Bills", note: "Electricity bill", amount: 1850, source: "Net Banking" },
  { id: 5, date: "2024-01-13", category: "Food", note: "Zomato dinner", amount: 680, source: "UPI" },
  {
    id: 6,
    date: "2024-01-13",
    category: "Entertainment",
    note: "Netflix subscription",
    amount: 649,
    source: "Credit Card",
  },
  { id: 7, date: "2024-01-12", category: "Travel", note: "Metro card recharge", amount: 500, source: "UPI" },
  { id: 8, date: "2024-01-12", category: "Health", note: "Medicine", amount: 350, source: "UPI" },
]

const majorBanks = [
  { id: "sbi", name: "State Bank of India", logo: "SBI", color: "bg-blue-600" },
  { id: "hdfc", name: "HDFC Bank", logo: "HDFC", color: "bg-blue-900" },
  { id: "icici", name: "ICICI Bank", logo: "ICICI", color: "bg-orange-600" },
  { id: "axis", name: "Axis Bank", logo: "AXIS", color: "bg-rose-900" },
  { id: "kotak", name: "Kotak Mahindra", logo: "KOTAK", color: "bg-red-600" },
]

const categories = ["All", "Food", "Travel", "Shopping", "Bills", "Entertainment", "Health", "Others"]

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Food: "bg-chart-1/10 text-chart-1",
    Travel: "bg-chart-2/10 text-chart-2",
    Shopping: "bg-chart-3/10 text-chart-3",
    Bills: "bg-chart-4/10 text-chart-4",
    Entertainment: "bg-chart-5/10 text-chart-5",
    Health: "bg-success/10 text-success",
    Others: "bg-muted text-muted-foreground",
  }
  return colors[category] || colors.Others
}

export default function ExpensesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isConnectOpen, setIsConnectOpen] = useState(false)
  const [connectingBank, setConnectingBank] = useState<string | null>(null)
  const [syncProgress, setSyncProgress] = useState(0)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "completed">("idle")

  const handleConnectBank = (bankId: string) => {
    setConnectingBank(bankId)
    setSyncStatus("syncing")
    setSyncProgress(0)

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setSyncStatus("completed")
          setTimeout(() => {
            setIsConnectOpen(false)
            setSyncStatus("idle")
            setConnectingBank(null)
          }, 1500)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const filteredExpenses =
    selectedCategory === "All" ? expenses : expenses.filter((e) => e.category === selectedCategory)

  const exportData = filteredExpenses.map((e) => ({
    Date: e.date,
    Category: e.category,
    Note: e.note,
    Amount: `₹${e.amount}`,
    Source: e.source,
  }))

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-black tracking-tight text-foreground uppercase">Expenses</h1>
            <p className="text-sm text-muted-foreground font-medium">Auto-sync transactions from all your accounts</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all font-bold">
                  <Building2 className="h-4 w-4" />
                  Connect All Banks
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="text-xl font-black uppercase tracking-tight">Connect Your Bank</DialogTitle>
                  <DialogDescription className="font-medium">
                    Link your accounts to automatically track Indian bank transactions and UPI spends.
                  </DialogDescription>
                </DialogHeader>

                {syncStatus === "idle" ? (
                  <div className="grid gap-3 py-4">
                    {majorBanks.map((bank) => (
                      <button
                        key={bank.id}
                        onClick={() => handleConnectBank(bank.id)}
                        className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/60 hover:border-primary/30 transition-premium group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center text-[10px] font-black text-white shadow-sm", bank.color)}>
                            {bank.logo}
                          </div>
                          <span className="font-bold text-foreground tracking-tight">{bank.name}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                    <Button variant="ghost" className="mt-2 text-xs font-bold text-primary hover:bg-primary/5 uppercase tracking-wider">
                      View More Banks
                    </Button>
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="relative">
                      {syncStatus === "syncing" ? (
                        <div className="h-20 w-20 flex items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
                          <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                        </div>
                      ) : (
                        <div className="h-20 w-20 flex items-center justify-center rounded-full bg-success/10 border-2 border-success/30">
                          <CheckCircle2 className="h-10 w-10 text-success" />
                        </div>
                      )}
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-black uppercase tracking-tight">
                        {syncStatus === "syncing" ? "Fetching Transactions..." : "Sync Complete!"}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium max-w-[250px]">
                        {syncStatus === "syncing"
                          ? `Securely connecting to ${majorBanks.find(b => b.id === connectingBank)?.name}...`
                          : "Your transactions have been successfully synced with Bharat AI Wealth."}
                      </p>
                    </div>

                    {syncStatus === "syncing" && (
                      <div className="w-full max-w-xs space-y-2">
                        <Progress value={syncProgress} className="h-1.5" />
                        <p className="text-[10px] text-center font-bold text-primary uppercase tracking-[0.2em]">{syncProgress}% SECURE SYNC</p>
                      </div>
                    )}
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <ExportButton data={exportData} filename="bharat-ai-expenses" />

            <Button variant="outline" size="sm" className="gap-2 bg-transparent border-border/50 font-bold hover:bg-secondary/40">
              <Upload className="h-4 w-4" />
              UPI Screenshots
            </Button>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2 font-bold px-4">
                  <Plus className="h-4 w-4" />
                  Add Manual
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-black uppercase tracking-tight">Add New Expense</DialogTitle>
                  <DialogDescription className="font-medium">Enter transaction details manually.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount" className="font-bold">Amount (₹)</Label>
                    <Input id="amount" type="number" placeholder="0" className="rounded-xl h-12 border-border/50 text-lg font-bold" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category" className="font-bold">Category</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl h-12 border-border/50 font-medium">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()} className="font-medium">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="note" className="font-bold">Note</Label>
                    <Input id="note" placeholder="Description" className="rounded-xl h-12 border-border/50 font-medium" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="source" className="font-bold">Payment Source</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl h-12 border-border/50 font-medium">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi" className="font-medium">UPI</SelectItem>
                        <SelectItem value="credit" className="font-medium">Credit Card</SelectItem>
                        <SelectItem value="debit" className="font-medium">Debit Card</SelectItem>
                        <SelectItem value="cash" className="font-medium">Cash</SelectItem>
                        <SelectItem value="netbanking" className="font-medium">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddOpen(false)} className="rounded-xl font-bold">
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddOpen(false)} className="rounded-xl font-bold">Add Expense</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-border/50 shadow-sm glass-card">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-black uppercase tracking-wider text-muted-foreground/70">Category Filter</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "h-8 rounded-full px-4 text-xs font-bold transition-premium border-border/40",
                      selectedCategory === category ? "shadow-md shadow-primary/20" : "bg-transparent hover:bg-secondary/40 hover:text-foreground"
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Table */}
        <Card className="border-border/50 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 bg-muted/20 py-4">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground/80">Recent Transactions</CardTitle>
            <Badge variant="outline" className="text-[10px] font-bold border-border/50 px-2 py-0.5">LATEST 30 DAYS</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow className="hover:bg-transparent border-border/40">
                    <TableHead className="font-bold text-[11px] uppercase tracking-wider h-10">Date</TableHead>
                    <TableHead className="font-bold text-[11px] uppercase tracking-wider h-10">Category</TableHead>
                    <TableHead className="font-bold text-[11px] uppercase tracking-wider h-10">Note</TableHead>
                    <TableHead className="font-bold text-[11px] uppercase tracking-wider h-10">Source</TableHead>
                    <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider h-10">Amount</TableHead>
                    <TableHead className="text-right font-bold text-[11px] uppercase tracking-wider h-10">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id} className="border-border/40 hover:bg-secondary/20 transition-colors">
                      <TableCell className="text-muted-foreground font-medium text-xs">
                        {new Date(expense.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("font-bold text-[10px] tracking-wide uppercase px-2 py-0.5 border-none", getCategoryColor(expense.category))}>
                          {expense.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold text-foreground tracking-tight">{expense.note}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                          <span className="text-xs font-semibold text-muted-foreground capitalize">{expense.source}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-black text-foreground">₹{expense.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5 hover:text-primary transition-colors">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
