"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  MessageSquareText,
  FlaskConical,
  Calculator,
  Users,
  Bell,
  Settings,
  TrendingUp,
  Zap,
  Target,
  Shield,
  Trophy,
  Wallet,
  Mail,
  Sparkles,
  HelpCircle,
} from "lucide-react"

const allNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "AI Advisor", href: "/advisor", icon: MessageSquareText },
  { name: "Low Risk", href: "/portfolios/low-risk", icon: TrendingUp },
  { name: "Medium Risk", href: "/portfolios/medium-risk", icon: BarChart3 },
  { name: "High Risk", href: "/portfolios/high-risk", icon: Zap },
  { name: "Goal Tracker", href: "/goals", icon: Target },
  { name: "Emergency Fund", href: "/emergency-fund", icon: Shield },
  { name: "Sandbox", href: "/sandbox", icon: FlaskConical },
  { name: "Tax & Insurance", href: "/tax", icon: Calculator },
  { name: "Family", href: "/family", icon: Users },
  { name: "Badges", href: "/badges", icon: Trophy },
  { name: "SIP Reminders", href: "/sip-reminders", icon: Wallet },
  { name: "Email Digest", href: "/digest", icon: Mail },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Help & Support", href: "/support", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-lg font-bold text-foreground">Bharat AI</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gradient-gold">Wealth</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {allNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-premium",
                pathname === item.href
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
              )}
            >
              <item.icon className="h-[18px] w-[18px]" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
