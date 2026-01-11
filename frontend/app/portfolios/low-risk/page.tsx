"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { PortfolioView } from "@/components/portfolio-view"
import { fetchPortfolioAssets } from "@/lib/api"

const defaultAssets = [
  { name: "SBI Bluechip", type: "Mutual Fund", value: 150000, return: 8.5, confidence: 85, risk: "Low" },
  { name: "HDFC Top 100", type: "Mutual Fund", value: 120000, return: 7.2, confidence: 82, risk: "Low" },
  { name: "Axis Liquid Fund", type: "Debt Fund", value: 200000, return: 5.8, confidence: 92, risk: "Low" },
  { name: "PPF", type: "Fixed Income", value: 100000, return: 7.1, confidence: 100, risk: "Low" },
  { name: "Govt Bonds", type: "Bonds", value: 80000, return: 6.5, confidence: 95, risk: "Low" },
]

export default function LowRiskPortfolioPage() {
  const [assets, setAssets] = useState(defaultAssets)

  useEffect(() => {
    fetchPortfolioAssets("low").then(data => {
      if (data?.assets?.length > 0) setAssets(data.assets)
    })
  }, [])

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const avgReturn = assets.length > 0 ? assets.reduce((sum, asset) => sum + asset.return, 0) / assets.length : 0

  return (
    <AppShell>
      <PortfolioView
        title="Low Risk Portfolio"
        description="Stable returns with minimal risk exposure"
        totalValue={totalValue}
        totalReturn={parseFloat(avgReturn.toFixed(1))}
        riskLevel="Low"
        assets={assets}
      />
    </AppShell>
  )
}

