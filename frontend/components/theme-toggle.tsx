"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
        <Sun className="h-[18px] w-[18px] text-muted-foreground" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-10 w-10 rounded-xl hover:bg-secondary/80 transition-premium group"
    >
      {theme === "dark" ? (
        <Sun className="h-[18px] w-[18px] text-muted-foreground group-hover:text-primary transition-colors" />
      ) : (
        <Moon className="h-[18px] w-[18px] text-muted-foreground group-hover:text-primary transition-colors" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
