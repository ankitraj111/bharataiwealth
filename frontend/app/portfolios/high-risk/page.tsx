"use client"

import { AppShell } from "@/components/app-shell"
import { PortfolioView } from "@/components/portfolio-view"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

const highRiskAssets = [
  {
    name: "Bitcoin (BTC)",
    type: "Cryptocurrency",
    value: 85000,
    return: 45.2,
    confidence: 55,
    risk: "Very High",
  },
  {
    name: "Ethereum (ETH)",
    type: "Cryptocurrency",
    value: 65000,
    return: 38.5,
    confidence: 52,
    risk: "Very High",
  },
  {
    name: "Quant Small Cap Fund",
    type: "Small Cap",
    value: 75000,
    return: 28.3,
    confidence: 62,
    risk: "High",
  },
  {
    name: "Solana (SOL)",
    type: "Cryptocurrency",
    value: 35000,
    return: 52.1,
    confidence: 48,
    risk: "Very High",
  },
  {
    name: "Nippon India Small Cap",
    type: "Small Cap",
    value: 55000,
    return: 25.8,
    confidence: 65,
    risk: "High",
  },
]

export default function HighRiskPortfolioPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-destructive">High Volatility Warning</AlertTitle>
          <AlertDescription className="text-destructive/80">
            These investments carry significant risk. Only invest what you can afford to lose. Crypto assets are highly
            volatile and can lose value rapidly.
          </AlertDescription>
        </Alert>
        <PortfolioView
          title="High Risk Portfolio (Crypto & Small Caps)"
          description="Aggressive growth with high volatility"
          totalValue={315000}
          totalReturn={35.8}
          riskLevel="High"
          assets={highRiskAssets}
          showCryptoWarning
        />
      </div>
    </AppShell>
  )
}
