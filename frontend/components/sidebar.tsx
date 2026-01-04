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
  ChevronDown,
  Sparkles,
  Target,
  Trophy,
  Shield,
  Wallet,
  Mail,
  HelpCircle,
} from "lucide-react"
import { useState } from "react"

const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "AI Wealth Advisor", href: "/advisor", icon: MessageSquareText },
]

const portfolioItems = [
  { name: "Low Risk", href: "/portfolios/low-risk", icon: TrendingUp },
  { name: "Medium Risk", href: "/portfolios/medium-risk", icon: BarChart3 },
  { name: "High Risk (Crypto)", href: "/portfolios/high-risk", icon: Zap },
  { name: "ML Price Predictions", href: "/predictions", icon: TrendingUp },
]

const toolsNavItems = [
  { name: "Goal Tracker", href: "/goals", icon: Target },
  { name: "Emergency Fund", href: "/emergency-fund", icon: Shield },
  { name: "Sandbox Simulator", href: "/sandbox", icon: FlaskConical },
  { name: "Tax & Insurance", href: "/tax", icon: Calculator },
  { name: "Family Dashboard", href: "/family", icon: Users },
]

const engagementNavItems = [
  { name: "Badges & Rewards", href: "/badges", icon: Trophy },
  { name: "SIP Reminders", href: "/sip-reminders", icon: Wallet },
  { name: "Email Digest", href: "/digest", icon: Mail },
]

const bottomNavItems = [
  { name: "Alerts & Reports", href: "/alerts", icon: Bell },
  { name: "Help & Support", href: "/support", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [portfolioOpen, setPortfolioOpen] = useState(true)
  const [engagementOpen, setEngagementOpen] = useState(true)

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[260px] border-r border-border/50 bg-sidebar/95 backdrop-blur-xl flex-col hidden lg:flex">
      {/* Logo */}
      <div className="flex h-[72px] items-center gap-3 border-b border-border/50 px-6">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 group/logo">
          <Sparkles className="h-5 w-5 text-primary-foreground relative z-10 animate-pulse-glow" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent z-0" />
          {/* Subtle gold glow behind sparkles */}
          <div className="absolute inset-[-4px] rounded-2xl bg-accent/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700" />
        </div>
        <div className="flex flex-col leading-none pt-1">
          <span className="text-xl font-black tracking-tighter uppercase text-primary drop-shadow-sm">Bharat AI</span>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent">Wealth</span>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-accent to-transparent" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {/* Main Nav */}
        <div className="space-y-1">
          {mainNavItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-premium",
                pathname === item.href
                  ? "text-primary bg-primary/8 shadow-sm"
                  : "text-muted-foreground/90 hover:bg-secondary/80 hover:text-foreground hover:scale-[1.02] active:scale-[0.98]",
                "animate-fade-in opacity-0",
                `stagger-${index + 1}`,
              )}
            >
              {pathname === item.href && (
                <div className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.6)]" />
              )}
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] transition-transform duration-500",
                  pathname === item.href ? "scale-110" : "group-hover:scale-110",
                )}
              />
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Portfolios Section */}
        <div className="mt-6">
          <button
            onClick={() => setPortfolioOpen(!portfolioOpen)}
            className="flex w-full items-center justify-between px-3.5 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 hover:text-primary transition-colors"
          >
            Portfolios
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform duration-300", portfolioOpen && "rotate-180")}
            />
          </button>
          <div
            className={cn(
              "mt-1.5 space-y-1 overflow-hidden transition-all duration-300",
              portfolioOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {portfolioItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-premium",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground/80 hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {pathname === item.href && (
                  <div className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.8)]" />
                )}
                <item.icon className={cn(
                  "h-[18px] w-[18px] transition-transform duration-500",
                  pathname === item.href ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-6">
          <p className="px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Tools
          </p>
          <div className="mt-1.5 space-y-1">
            {toolsNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-premium",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground/80 hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {pathname === item.href && (
                  <div className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.8)]" />
                )}
                <item.icon className={cn(
                  "h-[18px] w-[18px] transition-transform duration-500",
                  pathname === item.href ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setEngagementOpen(!engagementOpen)}
            className="flex w-full items-center justify-between px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 hover:text-muted-foreground transition-colors"
          >
            Engagement
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform duration-300", engagementOpen && "rotate-180")}
            />
          </button>
          <div
            className={cn(
              "mt-1.5 space-y-1 overflow-hidden transition-all duration-300",
              engagementOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {engagementNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-premium",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground/80 hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {pathname === item.href && (
                  <div className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.8)]" />
                )}
                <item.icon className={cn(
                  "h-[18px] w-[18px] transition-transform duration-500",
                  pathname === item.href ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Nav */}
      <div className="border-t border-border/50 px-3 py-4">
        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-premium",
                pathname === item.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground/80 hover:bg-white/5 hover:text-foreground",
              )}
            >
              {pathname === item.href && (
                <div className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-primary shadow-[0_0_12px_rgba(var(--primary),0.8)]" />
              )}
              <item.icon className={cn(
                "h-[18px] w-[18px] transition-transform duration-500",
                pathname === item.href ? "scale-110" : "group-hover:scale-110"
              )} />
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
