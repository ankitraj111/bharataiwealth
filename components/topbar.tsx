"use client"

import { Bell, Mic, Search, Menu, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileSidebar } from "./mobile-sidebar"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

export function Topbar() {
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

        {/* Notifications - Enhanced with badge */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-xl hover:bg-secondary/80 transition-premium group"
        >
          <Bell className="h-[18px] w-[18px] text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Divider */}
        <div className="mx-2 h-8 w-px bg-border/50 hidden sm:block" />

        {/* User Menu - Enhanced */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 gap-2 rounded-xl px-2 hover:bg-secondary/80 transition-premium"
            >
              <Avatar className="h-8 w-8 ring-2 ring-border/50 ring-offset-2 ring-offset-background">
                <AvatarImage src="/indian-professional-man.png" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-semibold">
                  RK
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">Rajesh</span>
                <span className="text-[10px] text-muted-foreground">Premium</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass-card-elevated" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1.5">
                <p className="text-sm font-semibold leading-none">Rajesh Kumar</p>
                <p className="text-xs leading-none text-muted-foreground">rajesh@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer rounded-lg transition-premium focus:bg-secondary/80">
              <Link href="/support">Help & Support</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="cursor-pointer rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive transition-premium">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
