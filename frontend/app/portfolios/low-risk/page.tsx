"use client"

import { AppShell } from "@/components/app-shell"
import { PortfolioView } from "@/components/portfolio-view"

const lowRiskAssets = [
  {
    name: "HDFC Corporate Bond Fund",
    type: "Debt Fund",
    value: 150000,
    return: 7.2,
    confidence: 92,
    risk: "Low",
  },
  {
    name: "SBI Fixed Deposit",
    type: "Fixed Deposit",
    value: 200000,
    return: 6.5,
    confidence: 99,
    risk: "Very Low",
  },
  {
    name: "Public Provident Fund",
    type: "PPF",
    value: 180000,
    return: 7.1,
    confidence: 100,
    risk: "Very Low",
  },
  {
    name: "ICICI Prudential Gilt Fund",
    type: "Gilt Fund",
    value: 120000,
    return: 6.8,
    confidence: 88,
    risk: "Low",
  },
]

export default function LowRiskPortfolioPage() {
  return (
    <AppShell>
      <PortfolioView
        title="Low Risk Portfolio"
        description="Stable returns with minimal risk exposure"
        totalValue={650000}
        totalReturn={6.9}
        riskLevel="Low"
        assets={lowRiskAssets}
      />
    </AppShell>
  )
}
