"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  MessageSquareText,
  Calculator,
  Users,
  Bell,
  Settings,
  TrendingUp,
  Target,
  Shield,
  Wallet,
  Sparkles,
  HelpCircle,
  PiggyBank,
  Coins,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

// Simplified navigation for mobile
const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Advisor", href: "/advisor", icon: MessageSquareText },
]

const portfolioItems = [
  { name: "Portfolio", href: "/portfolio", icon: Wallet },
  { name: "Predictions", href: "/predictions", icon: TrendingUp },
  { name: "Portfolios", href: "/portfolios", icon: BarChart3 },
]

const cryptoItems = [
  { name: "Crypto Dashboard", href: "/crypto/dashboard", icon: LayoutDashboard },
  { name: "Market", href: "/crypto/market", icon: TrendingUp },
  { name: "Portfolio", href: "/crypto/portfolio", icon: Wallet },
]

const toolsItems = [
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Emergency Fund", href: "/emergency-fund", icon: Shield },
  { name: "Tax", href: "/tax", icon: Calculator },
  { name: "Family", href: "/family", icon: Users },
  { name: "MF Explorer", href: "/mf", icon: Coins },
  { name: "SIP Planner", href: "/sip", icon: PiggyBank },
]

const bottomItems = [
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Support", href: "/support", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MobileSidebar() {
  const pathname = usePathname()
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const [cryptoOpen, setCryptoOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

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
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {/* Main Items */}
        {mainNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              pathname === item.href
                ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{item.name}</span>
          </Link>
        ))}

        {/* Portfolio Section */}
        <div className="pt-2">
          <button
            onClick={() => setPortfolioOpen(!portfolioOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary/80 transition-all"
          >
            <span>Portfolio</span>
            {portfolioOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {portfolioOpen && (
            <div className="mt-1 space-y-0.5 pl-2">
              {portfolioItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary/60",
                  )}
                >
                  <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Crypto Section */}
        <div>
          <button
            onClick={() => setCryptoOpen(!cryptoOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary/80 transition-all"
          >
            <span>Crypto Hub</span>
            {cryptoOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {cryptoOpen && (
            <div className="mt-1 space-y-0.5 pl-2">
              {cryptoItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary/60",
                  )}
                >
                  <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Tools Section */}
        <div>
          <button
            onClick={() => setToolsOpen(!toolsOpen)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary/80 transition-all"
          >
            <span>Tools & More</span>
            {toolsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
          {toolsOpen && (
            <div className="mt-1 space-y-0.5 pl-2">
              {toolsItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary/60",
                  )}
                >
                  <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Items */}
        <div className="pt-4 mt-4 border-t border-border space-y-0.5">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
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
