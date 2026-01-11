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
    <Card className="border-accent/20 bg-accent/5 shadow-sm">
      <CardContent className="relative flex items-start gap-4 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-sm">
          <Brain className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent opacity-80">Behavioral Insight</p>
          <p className="text-sm font-medium text-foreground leading-relaxed">{tip}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 rounded-lg hover:bg-accent/10" onClick={() => setDismissed(true)}>
          <X className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
