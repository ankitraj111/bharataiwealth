"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { PortfolioView } from "@/components/portfolio-view"
import { fetchPortfolioAssets } from "@/lib/api"

const defaultAssets = [
  { name: "HDFC Flexi Cap", type: "Mutual Fund", value: 180000, return: 14.5, confidence: 78, risk: "Medium" },
  { name: "ICICI Prudential", type: "Mutual Fund", value: 150000, return: 12.8, confidence: 80, risk: "Medium" },
  { name: "Axis Mid Cap", type: "Mutual Fund", value: 120000, return: 16.2, confidence: 72, risk: "Medium" },
  { name: "TCS", type: "Stock", value: 100000, return: 11.5, confidence: 85, risk: "Medium" },
  { name: "Infosys", type: "Stock", value: 80000, return: 10.8, confidence: 82, risk: "Medium" },
]

export default function MediumRiskPortfolioPage() {
  const [assets, setAssets] = useState(defaultAssets)

  useEffect(() => {
    fetchPortfolioAssets("medium").then(data => {
      if (data?.assets?.length > 0) setAssets(data.assets)
    })
  }, [])

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const avgReturn = assets.length > 0 ? assets.reduce((sum, asset) => sum + asset.return, 0) / assets.length : 0

  return (
    <AppShell>
      <PortfolioView
        title="Medium Risk Portfolio"
        description="Balanced growth with moderate risk"
        totalValue={totalValue}
        totalReturn={parseFloat(avgReturn.toFixed(1))}
        riskLevel="Medium"
        assets={assets}
      />
    </AppShell>
  )
}
