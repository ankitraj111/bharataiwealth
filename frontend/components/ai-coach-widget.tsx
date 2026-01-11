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
    <Card className="relative overflow-hidden border-primary/20 bg-primary/5 shadow-sm">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">AI Insight</span>
            <span className="h-1 w-1 rounded-full bg-primary/30" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Just now</span>
          </div>
          <p className="text-sm font-medium leading-relaxed text-foreground/90">{message}</p>
          <div className="pt-1">
            <Button
              size="sm"
              variant="link"
              onClick={onAction}
              className="h-auto p-0 gap-2 text-primary font-bold uppercase text-[10px] tracking-widest hover:no-underline opacity-80 hover:opacity-100 transition-opacity"
            >
              {action}
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
