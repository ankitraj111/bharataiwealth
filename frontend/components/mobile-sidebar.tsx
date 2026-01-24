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
  PiggyBank,
  Coins,
  Clock,
  Calendar,
  Activity,
  LineChart,
  FileSearch,
  BookOpen,
  History,
} from "lucide-react"

const allNavItems = [
  // Main Features
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "main" },
  { name: "Expenses", href: "/expenses", icon: Receipt, section: "main" },
  { name: "Analytics", href: "/analytics", icon: BarChart3, section: "main" },
  { name: "AI Advisor", href: "/advisor", icon: MessageSquareText, section: "main" },

  // Portfolio & Predictions
  { name: "Portfolio", href: "/portfolio", icon: Wallet, section: "portfolio" },
  { name: "Short-Term Forecast", href: "/predictions?tab=short-term", icon: Clock, section: "portfolio" },
  { name: "Mid-Term Forecast", href: "/predictions?tab=mid-term", icon: Calendar, section: "portfolio" },
  { name: "Long-Term Forecast", href: "/predictions?tab=long-term", icon: History, section: "portfolio" },
  { name: "Accuracy Report", href: "/predictions?tab=accuracy", icon: Activity, section: "portfolio" },
  { name: "Technical Signals", href: "/predictions?tab=technicals", icon: LineChart, section: "portfolio" },
  { name: "Risk Analysis", href: "/predictions?tab=risk", icon: FileSearch, section: "portfolio" },
  { name: "AI Explanation", href: "/predictions?tab=explanation", icon: BookOpen, section: "portfolio" },

  // Mutual Funds
  { name: "MF Explorer", href: "/mf", icon: Coins, section: "mf" },
  { name: "SIP Planner", href: "/sip", icon: PiggyBank, section: "mf" },
  { name: "Goal Funds", href: "/goals-mf", icon: Target, section: "mf" },

  // Tools
  { name: "Goal Tracker", href: "/goals", icon: Target, section: "tools" },
  { name: "Emergency Fund", href: "/emergency-fund", icon: Shield, section: "tools" },
  { name: "Sandbox", href: "/sandbox", icon: FlaskConical, section: "tools" },
  { name: "Tax & Insurance", href: "/tax", icon: Calculator, section: "tools" },
  { name: "Family", href: "/family", icon: Users, section: "tools" },

  // Engagement
  { name: "Badges", href: "/badges", icon: Trophy, section: "engagement" },
  { name: "SIP Reminders", href: "/sip-reminders", icon: Wallet, section: "engagement" },
  { name: "Email Digest", href: "/digest", icon: Mail, section: "engagement" },

  // Bottom
  { name: "Alerts", href: "/alerts", icon: Bell, section: "bottom" },
  { name: "Support", href: "/support", icon: HelpCircle, section: "bottom" },
  { name: "Settings", href: "/settings", icon: Settings, section: "bottom" },
]

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-border px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-md shadow-primary/20">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-base font-black tracking-tight text-foreground">Bharat AI</span>
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-primary">Wealth</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-0.5">
          {allNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                pathname === item.href
                  ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
