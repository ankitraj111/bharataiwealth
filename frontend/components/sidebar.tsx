"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BarChart3,
  MessageSquareText,
  FlaskConical,
  Calculator,
  Bell,
  Settings,
  TrendingUp,
  Zap,
  ChevronDown,
  Sparkles,
  Shield,
  Wallet,
  Mail,
  HelpCircle,
  PiggyBank,
  Coins,
  BrainCircuit,
  Clock,
  Calendar,
  History,
  LineChart,
  Activity,
  FileSearch,
  BookOpen,
  Circle,
  Trophy,
  Newspaper,
  BookOpenCheck,
  ShieldCheck,
  Eye,
  Link2,
  Smile,
  Repeat,
  PenTool,
  Scale,
  FileText,
  Users2,
} from "lucide-react"
import { useState } from "react"

// Main Navigation
const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "text-slate-600" },
  { name: "AI Advisor", href: "/advisor", icon: MessageSquareText, color: "text-slate-600" },
]

// Portfolio Section
const portfolioItems = [
  { name: "Portfolio Management", href: "/portfolio", icon: Wallet, color: "text-blue-600" },
  { name: "Short-Term Forecast", href: "/portfolios/low-risk", icon: TrendingUp, color: "text-emerald-600" },
  { name: "Mid-Term Forecast", href: "/portfolios/medium-risk", icon: BarChart3, color: "text-amber-600" },
  { name: "Long-Term Forecast", href: "/portfolios/high-risk", icon: Zap, color: "text-rose-600" },
  { name: "AI Predictions", href: "/predictions", icon: TrendingUp, color: "text-cyan-600" },
]

// Crypto Hub Section
const cryptoItems = [
  { name: "Market Overview", href: "/crypto/market", icon: LayoutDashboard, color: "text-cyan-500" },
  { name: "Watchlist", href: "/crypto/watchlist", icon: Eye, color: "text-amber-400" },
  { name: "Crypto Portfolio", href: "/crypto/portfolio", icon: Wallet, color: "text-purple-500" },
  { name: "Technical Analysis", href: "/crypto/analysis", icon: LineChart, color: "text-blue-500" },
  { name: "Signals & Alerts", href: "/crypto/signals", icon: Zap, color: "text-orange-500" },
  { name: "On-Chain Data", href: "/crypto/on-chain", icon: Link2, color: "text-emerald-500" },
  { name: "Sentiment Analysis", href: "/crypto/sentiment", icon: Smile, color: "text-rose-400" },
  { name: "Crypto Tools", href: "/crypto/tools", icon: Calculator, color: "text-teal-500" },
  { name: "Compare Coins", href: "/crypto/compare", icon: Repeat, color: "text-indigo-500" },
  { name: "Strategy Builder", href: "/crypto/strategy", icon: PenTool, color: "text-fuchsia-500" },
  { name: "Backtesting", href: "/crypto/backtesting", icon: History, color: "text-slate-400" },
  { name: "Tax & Compliance", href: "/crypto/tax", icon: Scale, color: "text-amber-600" },
  { name: "Advisory Reports", href: "/crypto/reports", icon: FileText, color: "text-sky-500" },
  { name: "News & Updates", href: "/crypto/news", icon: Newspaper, color: "text-blue-400" },
  { name: "Learn Crypto", href: "/crypto/learn", icon: BookOpenCheck, color: "text-lime-500" },
  { name: "Security Hub", href: "/crypto/security", icon: ShieldCheck, color: "text-rose-600" },
]



// Mutual Funds Section
const mutualFundItems = [
  { name: "MF Explorer", href: "/mf", icon: Coins, color: "text-orange-600" },
  { name: "SIP Planner", href: "/sip", icon: PiggyBank, color: "text-pink-600" },
]

// Tools Section
const toolsNavItems = [
  { name: "Emergency Fund", href: "/emergency-fund", icon: Shield, color: "text-blue-600" },
  { name: "Tax & Insurance", href: "/tax", icon: Calculator, color: "text-teal-600" },
]

// Updates & Engagement
const updateNavItems = [
  { name: "Alerts & Reports", href: "/alerts", icon: Bell, color: "text-rose-600" },
  { name: "Badges & Rewards", href: "/badges", icon: Trophy, color: "text-yellow-600" },
  { name: "Email Digest", href: "/digest", icon: Mail, color: "text-sky-600" },
]

// Bottom Section
const bottomNavItems = [
  { name: "Help & Support", href: "/support", icon: HelpCircle, color: "text-green-600" },
  { name: "Settings", href: "/settings", icon: Settings, color: "text-slate-500" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [portfolioOpen, setPortfolioOpen] = useState(true)
  const [cryptoOpen, setCryptoOpen] = useState(true)
  const [mutualFundsOpen, setMutualFundsOpen] = useState(true)
  const [toolsOpen, setToolsOpen] = useState(true)
  const [updatesOpen, setUpdatesOpen] = useState(false)

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[260px] border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex-col hidden lg:flex shadow-sm">
      {/* Logo Section - Professional Theme-Aware Clean Version */}
      <div className="flex h-[72px] items-center gap-3 px-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 shadow-sm shadow-orange-500/20">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Bharat AI</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Wealth Management</span>
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
                  ? "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>



        {/* Portfolios Section */}
        <div className="mb-3 px-2">
          <button
            onClick={() => setPortfolioOpen(!portfolioOpen)}
            className={cn(
              "flex w-full items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-lg",
              portfolioOpen
                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-500/5"
                : "text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            <span className="flex items-center gap-2.5">
              <TrendingUp className="h-4 w-4" />
              Portfolios
            </span>
            <ChevronDown className={cn("h-3 w-3 transition-transform opacity-40", portfolioOpen && "rotate-180")} />
          </button>
          <div className={cn("mt-1 ml-4 pl-3 border-l border-slate-100 dark:border-slate-800 space-y-0.5 overflow-hidden transition-all", portfolioOpen ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0")}>
            {portfolioItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-all group",
                  pathname === item.href
                    ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50",
                )}
              >
                <div className={cn("h-1 w-1 rounded-full bg-slate-300 transition-opacity", pathname === item.href ? "opacity-100 text-emerald-500" : "opacity-20 group-hover:opacity-60")} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>



        {/* Crypto Hub Section */}
        <div className="mb-3 px-2">
          <button
            onClick={() => setCryptoOpen(!cryptoOpen)}
            className={cn(
              "flex w-full items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-lg",
              cryptoOpen
                ? "text-cyan-600 dark:text-cyan-400 bg-cyan-50/30 dark:bg-cyan-500/5"
                : "text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            <span className="flex items-center gap-2.5">
              <Coins className="h-4 w-4" />
              Crypto Hub
            </span>
            <ChevronDown className={cn("h-3 w-3 transition-transform opacity-40", cryptoOpen && "rotate-180")} />
          </button>
          <div className={cn("mt-1 ml-4 pl-3 border-l border-slate-100 dark:border-slate-800 space-y-0.5 overflow-hidden transition-all", cryptoOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
            {cryptoItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-all group",
                  pathname === item.href
                    ? "text-cyan-700 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50",
                )}
              >
                <div className={cn("h-1 w-1 rounded-full bg-slate-300 transition-opacity", pathname === item.href ? "opacity-100 text-cyan-500" : "opacity-20 group-hover:opacity-60")} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>



        {/* Mutual Funds Section */}
        <div className="mb-3 px-2">
          <button
            onClick={() => setMutualFundsOpen(!mutualFundsOpen)}
            className={cn(
              "flex w-full items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-lg",
              mutualFundsOpen
                ? "text-orange-600 dark:text-orange-400 bg-orange-50/30 dark:bg-orange-500/5"
                : "text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            <span className="flex items-center gap-2.5">
              <Coins className="h-4 w-4" />
              Mutual Funds
            </span>
            <ChevronDown className={cn("h-3 w-3 transition-transform opacity-40", mutualFundsOpen && "rotate-180")} />
          </button>
          <div className={cn("mt-1 ml-4 pl-3 border-l border-slate-100 dark:border-slate-800 space-y-0.5 overflow-hidden transition-all", mutualFundsOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0")}>
            {mutualFundItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-all group",
                  pathname === item.href
                    ? "text-orange-700 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50",
                )}
              >
                <Circle className={cn("h-1 w-1 fill-current transition-opacity", pathname === item.href ? "opacity-100 text-orange-500" : "opacity-20 group-hover:opacity-60")} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-3 px-2">
          <button
            onClick={() => setToolsOpen(!toolsOpen)}
            className={cn(
              "flex w-full items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-lg",
              toolsOpen
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-500/5"
                : "text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            <span className="flex items-center gap-2.5">
              <FlaskConical className="h-4 w-4" />
              Tools
            </span>
            <ChevronDown className={cn("h-3 w-3 transition-transform opacity-40", toolsOpen && "rotate-180")} />
          </button>
          <div className={cn("mt-1 ml-4 pl-3 border-l border-slate-100 dark:border-slate-800 space-y-0.5 overflow-hidden transition-all", toolsOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0")}>
            {toolsNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-all group",
                  pathname === item.href
                    ? "text-indigo-700 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50",
                )}
              >
                <Circle className={cn("h-1 w-1 fill-current transition-opacity", pathname === item.href ? "opacity-100 text-indigo-500" : "opacity-20 group-hover:opacity-60")} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Updates Section */}
        <div className="mb-3 px-2">
          <button
            onClick={() => setUpdatesOpen(!updatesOpen)}
            className={cn(
              "flex w-full items-center justify-between px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-lg",
              updatesOpen
                ? "text-violet-600 dark:text-violet-400 bg-violet-50/30 dark:bg-violet-500/5"
                : "text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            <span className="flex items-center gap-2.5">
              <Bell className="h-4 w-4" />
              Updates
            </span>
            <ChevronDown className={cn("h-3 w-3 transition-transform opacity-40", updatesOpen && "rotate-180")} />
          </button>
          <div className={cn("mt-1 ml-4 pl-3 border-l border-slate-100 dark:border-slate-800 space-y-0.5 overflow-hidden transition-all", updatesOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0")}>
            {updateNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[12.5px] font-medium transition-all group",
                  pathname === item.href
                    ? "text-violet-700 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-500/10"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50",
                )}
              >
                <Circle className={cn("h-1 w-1 fill-current transition-opacity", pathname === item.href ? "opacity-100 text-violet-500" : "opacity-20 group-hover:opacity-60")} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="px-3 py-3 space-y-0.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
        {bottomNavItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {i === bottomNavItems.length - 1 ? (
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">N</div>
            ) : (
              <item.icon className={cn("h-4 w-4", item.color)} />
            )}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </aside >
  )
}
