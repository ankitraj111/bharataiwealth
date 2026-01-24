import { Shield, CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react"

export function RegulatoryDisclaimer() {
  return (
    <div className="mt-8 p-5 rounded-xl bg-secondary/30 border border-border/50">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
          <Shield className="h-5 w-5 text-success" />
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">RBI/SEBI Compliance Notice</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              All investments are subject to market risks. Please read all scheme related documents carefully before
              investing.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              Past performance is not indicative of future results.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
              We do not sell securities. All transactions are executed through SEBI registered platforms.
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              Mutual Fund investments are subject to market risks.
            </li>
          </ul>
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="text-xs text-primary flex items-center gap-1 hover:underline">
              Privacy Policy <ExternalLink className="h-3 w-3" />
            </a>
            <a href="#" className="text-xs text-primary flex items-center gap-1 hover:underline">
              Terms of Service <ExternalLink className="h-3 w-3" />
            </a>
            <a href="#" className="text-xs text-primary flex items-center gap-1 hover:underline">
              SEBI Disclosures <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
