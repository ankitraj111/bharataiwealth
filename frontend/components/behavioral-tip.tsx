"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, X } from "lucide-react"

interface BehavioralTipProps {
  tip: string
}

export function BehavioralTip({ tip }: BehavioralTipProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-primary/5">
      <CardContent className="relative flex items-start gap-3 p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
          <Brain className="h-4 w-4 text-accent" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Behavioral Insight</p>
          <p className="mt-1 text-sm text-foreground">{tip}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => setDismissed(true)}>
          <X className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
