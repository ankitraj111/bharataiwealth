"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"

interface AICoachWidgetProps {
  message: string
  action?: string
  onAction?: () => void
}

export function AICoachWidget({ message, action = "Show plan", onAction }: AICoachWidgetProps) {
  return (
    <Card className="relative overflow-hidden gradient-border bg-gradient-to-r from-primary/[0.04] via-card to-accent/[0.04]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <CardContent className="flex items-start gap-4 p-5">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg shadow-primary/10">
          <Sparkles className="h-5 w-5 text-primary animate-float" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">AI Insight</span>
            <span className="h-1 w-1 rounded-full bg-primary/50" />
            <span className="text-[10px] text-muted-foreground">Just now</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/90">{message}</p>
          <Button
            size="sm"
            variant="outline"
            onClick={onAction}
            className="h-8 gap-2 rounded-lg bg-transparent border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-premium group"
          >
            {action}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
