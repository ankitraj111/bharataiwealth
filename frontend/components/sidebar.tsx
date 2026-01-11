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
  PiggyBank,
  Coins,
} from "lucide-react"
import { useState } from "react"

// Main Navigation
const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "text-slate-600" },
  { name: "Expenses", href: "/expenses", icon: Receipt, color: "text-slate-600" },
  { name: "Analytics", href: "/analytics", icon: BarChart3, color: "text-slate-600" },
  { name: "AI Advisor", href: "/advisor", icon: MessageSquareText, color: "text-slate-600" },
]

// Portfolio Section
const portfolioItems = [
  { name: "Low Risk", href: "/portfolios/low-risk", icon: TrendingUp, color: "text-emerald-600" },
  { name: "Medium Risk", href: "/portfolios/medium-risk", icon: BarChart3, color: "text-amber-600" },
  { name: "High Risk (Crypto)", href: "/portfolios/high-risk", icon: Zap, color: "text-red-600" },
  { name: "ML Price Predictions", href: "/predictions", icon: TrendingUp, color: "text-cyan-600" },
]

// Mutual Funds Section
const mutualFundItems = [
  { name: "MF Explorer", href: "/mf", icon: Coins, color: "text-orange-600" },
  { name: "SIP Planner", href: "/sip", icon: PiggyBank, color: "text-pink-600" },
  { name: "Goal Funds", href: "/goals-mf", icon: Target, color: "text-violet-600" },
]

// Tools Section
const toolsNavItems = [
  { name: "Goal Tracker", href: "/goals", icon: Target, color: "text-emerald-600" },
  { name: "Emergency Fund", href: "/emergency-fund", icon: Shield, color: "text-blue-600" },
  { name: "Sandbox Simulator", href: "/sandbox", icon: FlaskConical, color: "text-purple-600" },
  { name: "Tax & Insurance", href: "/tax", icon: Calculator, color: "text-teal-600" },
  { name: "Family Dashboard", href: "/family", icon: Users, color: "text-indigo-600" },
]

// Engagement Section
const engagementNavItems = [
  { name: "Badges & Rewards", href: "/badges", icon: Trophy, color: "text-yellow-600" },
  { name: "SIP Reminders", href: "/sip-reminders", icon: Wallet, color: "text-orange-600" },
  { name: "Email Digest", href: "/digest", icon: Mail, color: "text-sky-600" },
]

// Bottom Section
const bottomNavItems = [
  { name: "Alerts & Reports", href: "/alerts", icon: Bell, color: "text-rose-600" },
  { name: "Help & Support", href: "/support", icon: HelpCircle, color: "text-green-600" },
  { name: "Settings", href: "/settings", icon: Settings, color: "text-slate-500" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [portfolioOpen, setPortfolioOpen] = useState(true)
  const [engagementOpen, setEngagementOpen] = useState(false)

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[260px] border-r border-slate-200 bg-white flex-col hidden lg:flex shadow-sm">
      {/* Logo Section */}
      <div className="flex h-[72px] items-center gap-3 px-5 border-b border-slate-100 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-white tracking-tight">Bharat AI</span>
          <span className="text-[9px] font-semibold uppercase tracking-widest text-white/80">Wealth Management</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Main Nav */}
        <div className="space-y-0.5 mb-6">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                pathname === item.href
                  ? "bg-orange-50 text-orange-700 border border-orange-200"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Portfolios Section */}
        <div className="mb-5">
          <button
            onClick={() => setPortfolioOpen(!portfolioOpen)}
            className="flex w-full items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-lg mx-1"
          >
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Portfolios
            </span>
            <ChevronDown className={cn("h-3 w-3 transition-transform", portfolioOpen && "rotate-180")} />
          </button>
          <div className={cn("mt-1 space-y-0.5 overflow-hidden transition-all", portfolioOpen ? "max-h-[200px]" : "max-h-0")}>
            {portfolioItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                  pathname === item.href
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <item.icon className={cn("h-4 w-4", item.color)} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mutual Funds Section */}
        <div className="mb-5">
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-2 bg-amber-50 rounded-lg mx-1">
            <Coins className="h-4 w-4" />
            Mutual Funds
          </p>
          <div className="mt-1 space-y-0.5">
            {mutualFundItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                  pathname === item.href
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <item.icon className={cn("h-4 w-4", item.color)} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-5">
          <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-2 bg-blue-50 rounded-lg mx-1">
            <FlaskConical className="h-4 w-4" />
            Tools
          </p>
          <div className="mt-1 space-y-0.5">
            {toolsNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <item.icon className={cn("h-4 w-4", item.color)} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Engagement Section */}
        <div className="mb-5">
          <button
            onClick={() => setEngagementOpen(!engagementOpen)}
            className="flex w-full items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 rounded-lg mx-1"
          >
            <span className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Engagement
            </span>
            <ChevronDown className={cn("h-3 w-3 transition-transform", engagementOpen && "rotate-180")} />
          </button>
          <div className={cn("mt-1 space-y-0.5 overflow-hidden transition-all", engagementOpen ? "max-h-[150px]" : "max-h-0")}>
            {engagementNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                  pathname === item.href
                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <item.icon className={cn("h-4 w-4", item.color)} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-3 space-y-0.5 border-t border-slate-100 bg-slate-50/50">
        {bottomNavItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-white hover:text-slate-900 transition-colors"
          >
            {i === bottomNavItems.length - 1 ? (
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">N</div>
            ) : (
              <item.icon className={cn("h-4 w-4", item.color)} />
            )}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
