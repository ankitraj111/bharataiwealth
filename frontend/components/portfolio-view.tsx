"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { cn } from "@/lib/utils"
import { TrendingUp, ShieldCheck, AlertTriangle, Eye, Plus } from "lucide-react"
import { ExportButton } from "@/components/export-button"

interface Asset {
  name: string
  type: string
  value: number
  return: number
  confidence: number
  risk: string
}

interface PortfolioViewProps {
  title: string
  description: string
  totalValue: number
  totalReturn: number
  riskLevel: string
  assets: Asset[]
  showCryptoWarning?: boolean
}

const priceData = [
  { date: "1D", price: 100 },
  { date: "2D", price: 102 },
  { date: "3D", price: 98 },
  { date: "4D", price: 105 },
  { date: "5D", price: 103 },
  { date: "6D", price: 108 },
  { date: "7D", price: 112 },
]

const getRiskColor = (risk: string) => {
  const colors: Record<string, string> = {
    "Very Low": "bg-success/10 text-success",
    Low: "bg-chart-3/10 text-chart-3",
    Medium: "bg-chart-2/10 text-chart-2",
    High: "bg-chart-4/10 text-chart-4",
    "Very High": "bg-destructive/10 text-destructive",
  }
  return colors[risk] || colors.Medium
}

export function PortfolioView({ title, description, totalValue, totalReturn, riskLevel, assets }: PortfolioViewProps) {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)

  const exportData = assets.map((asset) => ({
    Asset: asset.name,
    Type: asset.type,
    Value: `₹${asset.value.toLocaleString("en-IN")}`,
    "Predicted Return": `+${asset.return}%`,
    Confidence: `${asset.confidence}%`,
    Risk: asset.risk,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ExportButton data={exportData} filename={`bharat-ai-${title.toLowerCase().replace(/\s+/g, "-")}`} />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Total Value</p>
            <p className="mt-1 text-2xl font-bold text-foreground">₹{totalValue.toLocaleString("en-IN")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Expected Return</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-2xl font-bold text-success">+{totalReturn}%</p>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Risk Level</p>
            <div className="mt-1 flex items-center gap-2">
              <Badge className={cn("text-sm", getRiskColor(riskLevel))}>{riskLevel}</Badge>
              {riskLevel === "Low" || riskLevel === "Very Low" ? (
                <ShieldCheck className="h-5 w-5 text-success" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-chart-2" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Predicted Return</TableHead>
                  <TableHead className="text-center">Confidence</TableHead>
                  <TableHead className="text-center">Risk</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.name}>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell className="text-muted-foreground">{asset.type}</TableCell>
                    <TableCell className="text-right">₹{asset.value.toLocaleString("en-IN")}</TableCell>
                    <TableCell className="text-right">
                      <span className="text-success">+{asset.return}%</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
                          <div className="h-full bg-primary" style={{ width: `${asset.confidence}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{asset.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cn("font-normal", getRiskColor(asset.risk))}>{asset.risk}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-1" onClick={() => setSelectedAsset(asset)}>
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Asset Detail Modal */}
      <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedAsset?.name}</DialogTitle>
            <DialogDescription>{selectedAsset?.type}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Price Chart */}
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceData}>
                  <defs>
                    <linearGradient id="assetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    fill="url(#assetGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Prediction Card */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">30-Day Prediction</p>
                    <p className="text-xl font-bold text-success">+{selectedAsset?.return}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="text-xl font-bold">{selectedAsset?.confidence}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Risk</p>
                    <Badge className={cn("mt-1", getRiskColor(selectedAsset?.risk || "Medium"))}>
                      {selectedAsset?.risk}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis */}
            <div className="rounded-lg bg-secondary p-4">
              <p className="text-xs font-medium text-muted-foreground">AI Analysis</p>
              <p className="mt-2 text-sm text-foreground">
                Based on technical indicators (RSI, MACD) and fundamental analysis, this asset shows{" "}
                {selectedAsset?.return && selectedAsset.return > 15 ? "strong" : "moderate"} growth potential.
                {selectedAsset?.risk === "Very High" && " Exercise caution due to high volatility."}
              </p>
            </div>

            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add to Portfolio
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
