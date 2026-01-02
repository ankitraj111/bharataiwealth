"use client"

import { AppShell } from "@/components/app-shell"
import { PortfolioView } from "@/components/portfolio-view"

const mediumRiskAssets = [
  {
    name: "Axis Bluechip Fund",
    type: "Large Cap",
    value: 180000,
    return: 12.5,
    confidence: 78,
    risk: "Medium",
  },
  {
    name: "Mirae Asset Emerging Bluechip",
    type: "Large & Mid Cap",
    value: 150000,
    return: 15.2,
    confidence: 72,
    risk: "Medium",
  },
  {
    name: "HDFC Bank",
    type: "Stock",
    value: 95000,
    return: 11.8,
    confidence: 75,
    risk: "Medium",
  },
  {
    name: "Parag Parikh Flexi Cap",
    type: "Flexi Cap",
    value: 120000,
    return: 14.3,
    confidence: 80,
    risk: "Medium",
  },
  {
    name: "Infosys",
    type: "Stock",
    value: 85000,
    return: 10.5,
    confidence: 70,
    risk: "Medium",
  },
]

export default function MediumRiskPortfolioPage() {
  return (
    <AppShell>
      <PortfolioView
        title="Medium Risk Portfolio"
        description="Balanced growth with moderate risk"
        totalValue={630000}
        totalReturn={13.2}
        riskLevel="Medium"
        assets={mediumRiskAssets}
      />
    </AppShell>
  )
}
