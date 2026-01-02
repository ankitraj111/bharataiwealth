"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from "lucide-react"

interface FraudAlertBannerProps {
  amount: string
  merchant: string
  onConfirm: () => void
  onReport: () => void
}

export function FraudAlertBanner({ amount, merchant, onConfirm, onReport }: FraudAlertBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <Alert className="relative border-destructive bg-destructive/10">
      <AlertTriangle className="h-5 w-5 text-destructive" />
      <AlertTitle className="text-destructive">Suspicious Transaction Detected</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-foreground">
          {amount} at <strong>{merchant}</strong>
        </p>
        <p className="mt-1 text-muted-foreground">Is this transaction made by you?</p>
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onConfirm()
              setDismissed(true)
            }}
          >
            Yes, it&apos;s me
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              onReport()
              setDismissed(true)
            }}
          >
            No, report fraud
          </Button>
        </div>
      </AlertDescription>
      <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-6 w-6" onClick={() => setDismissed(true)}>
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  )
}
