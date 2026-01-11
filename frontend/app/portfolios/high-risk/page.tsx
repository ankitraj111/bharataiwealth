"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { PortfolioView } from "@/components/portfolio-view"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { fetchPortfolioAssets } from "@/lib/api"

const defaultAssets = [
  { name: "Bitcoin (BTC)", type: "Crypto", value: 120000, return: 45.2, confidence: 55, risk: "High" },
  { name: "Ethereum (ETH)", type: "Crypto", value: 80000, return: 38.5, confidence: 58, risk: "High" },
  { name: "Solana (SOL)", type: "Crypto", value: 50000, return: 52.8, confidence: 48, risk: "High" },
  { name: "Small Cap Fund", type: "Mutual Fund", value: 40000, return: 28.5, confidence: 65, risk: "High" },
  { name: "Adani Enterprises", type: "Stock", value: 25000, return: 22.3, confidence: 52, risk: "High" },
]

export default function HighRiskPortfolioPage() {
  const [assets, setAssets] = useState(defaultAssets)

  useEffect(() => {
    fetchPortfolioAssets("high").then(data => {
      if (data?.assets?.length > 0) setAssets(data.assets)
    })
  }, [])

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const avgReturn = assets.length > 0 ? assets.reduce((sum, asset) => sum + asset.return, 0) / assets.length : 0

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
          totalValue={totalValue}
          totalReturn={parseFloat(avgReturn.toFixed(1))}
          riskLevel="High"
          assets={assets}
          showCryptoWarning
        />
      </div>
    </AppShell>
  )
}
