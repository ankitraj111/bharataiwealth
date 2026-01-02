"use client"

import { Bell, Mic, Search, Menu, Command, User, CreditCard, Settings, Users, LifeBuoy, LogOut, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileSidebar } from "./mobile-sidebar"
import { ThemeToggle } from "./theme-toggle"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

import { useAuth } from "@/context/auth-context"

export function Topbar() {
  const { logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden hover:bg-secondary/80 transition-premium">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] p-0 border-r-border/50">
          <MobileSidebar />
        </SheetContent>
      </Sheet>

      {/* Search - Enhanced */}
      <div className="hidden flex-1 md:flex md:max-w-lg">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60 transition-colors group-focus-within:text-primary" />
          <Input
            placeholder="Search transactions, assets..."
            className="w-full h-11 bg-secondary/50 border-border/50 pl-11 pr-20 rounded-xl focus:bg-secondary/80 focus:border-primary/30 transition-premium placeholder:text-muted-foreground/50"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground/50">
            <kbd className="flex h-6 items-center gap-1 rounded-md border border-border/50 bg-muted/50 px-2 text-[10px] font-medium">
              <Command className="h-3 w-3" />K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Section - Enhanced */}
      <div className="flex items-center gap-1.5">
        {/* Voice Assistant */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex h-10 w-10 rounded-xl hover:bg-secondary/80 transition-premium group"
        >
          <Mic className="h-[18px] w-[18px] text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="sr-only">Voice assistant</span>
        </Button>

        <ThemeToggle />

        {/* Notifications - Enhanced with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-xl hover:bg-secondary/80 transition-premium group"
            >
              <Bell className="h-[18px] w-[18px] text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="absolute right-2.5 top-2.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
              </span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 glass-card-elevated" align="end" forceMount>
            <DropdownMenuLabel className="flex items-center justify-between">
              <span className="font-semibold">Notifications</span>
              <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-none">3 NEW</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="cursor-pointer p-4 rounded-lg transition-premium focus:bg-secondary/80 block">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-primary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">SIP Installment Due</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Your monthly SIP for "Nifty 50 Index Fund" is due tomorrow.</p>
                    <p className="text-[10px] text-muted-foreground/60">2 hours ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-4 rounded-lg transition-premium focus:bg-secondary/80 block">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-primary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Price Alert Triggered</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">RELIANCE has reached your target price of ₹2,850.</p>
                    <p className="text-[10px] text-muted-foreground/60">5 hours ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer p-4 rounded-lg transition-premium focus:bg-secondary/80 block">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-primary shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Weekly Report Ready</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Your AI wealth digest for December Week 4 is now available.</p>
                    <p className="text-[10px] text-muted-foreground/60">Yesterday</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="cursor-pointer justify-center text-xs text-primary font-medium hover:bg-primary/5">
              Mark all as read
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Divider */}
        <div className="mx-2 h-8 w-px bg-border/50 hidden sm:block" />

        {/* User Menu - Enhanced */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 gap-2 rounded-xl px-2 hover:bg-secondary/80 transition-premium"
            >
              <div className="relative">
                <Avatar className="h-8 w-8 ring-2 ring-border/50 ring-offset-2 ring-offset-background transition-all group-hover:ring-primary/50">
                  <AvatarImage src="/indian-professional-man.png" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-semibold">
                    RK
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
              </div>
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold text-foreground tracking-tight">Rajesh</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-bold uppercase tracking-wider">
                    <Crown className="h-2.5 w-2.5" />
                    Premium
                  </div>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 glass-card-elevated" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2 p-1">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border/50">
                    <AvatarImage src="/indian-professional-man.png" alt="RK" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold leading-none">Rajesh Kumar</p>
                    <p className="text-xs text-muted-foreground mt-1">rajesh@bharatai.com</p>
                  </div>
                </div>
                <Badge variant="outline" className="w-fit bg-primary/5 text-primary border-primary/20 text-[10px] font-bold">PRO ACCOUNT</Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80 gap-3 py-2.5">
                <Link href="/settings">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Personal Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80 gap-3 py-2.5">
                <Link href="/settings">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Wealth Subscriptions</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80 gap-3 py-2.5">
                <Link href="/settings">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border/50" />

            <DropdownMenuLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/70 px-2 py-1.5">Family Wealth</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80 gap-3 py-2.5">
                <Link href="/family">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Manage Family</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80 gap-3 py-2.5">
                <Link href="/family">
                  <LifeBuoy className="h-4 w-4 text-muted-foreground" />
                  <span>Beneficiary Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-border/50" />

            <DropdownMenuItem
              className="cursor-pointer rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive transition-premium gap-3 py-2.5"
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
