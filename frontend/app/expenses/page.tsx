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
import { Plus, Upload, MessageSquare, Pencil, Trash2, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { ExportButton } from "@/components/export-button"

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
            <h1 className="font-serif text-2xl font-bold text-foreground">Expenses</h1>
            <p className="text-sm text-muted-foreground">Track and manage all your transactions</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <ExportButton data={exportData} filename="bharat-ai-expenses" />
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Upload UPI Screenshot
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <MessageSquare className="h-4 w-4" />
              Parse SMS
            </Button>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                  <DialogDescription>Enter the details of your expense below.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount (₹)</Label>
                    <Input id="amount" type="number" placeholder="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((cat) => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="note">Note</Label>
                    <Input id="note" placeholder="Description" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="source">Payment Source</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="debit">Debit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddOpen(false)}>Add Expense</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="h-8"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="text-muted-foreground">
                        {new Date(expense.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("font-normal", getCategoryColor(expense.category))}>
                          {expense.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{expense.note}</TableCell>
                      <TableCell className="text-muted-foreground">{expense.source}</TableCell>
                      <TableCell className="text-right font-medium">₹{expense.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
