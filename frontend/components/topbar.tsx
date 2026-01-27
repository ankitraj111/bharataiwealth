"use client"

import { Bell, Mic, Search, Menu, Command, User, CreditCard, Settings, Users, LifeBuoy, LogOut, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { MobileSidebar } from "./mobile-sidebar"
import { ThemeToggle } from "./theme-toggle"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"

import { useAuth } from "@/contexts/AuthContext"
import { useNotifications } from "@/contexts/NotificationContext"

export function Topbar() {
  const { user, logout } = useAuth()
  const { notifications, unreadCount, markAllAsRead } = useNotifications()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Fallback for avatar initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const userInitials = user?.name ? getInitials(user.name) : "RK"
  const userName = user?.name?.split(" ")[0] || "Guest"
  const fullName = user?.name || "Guest User"
  const email = user?.email || "guest@bharatai.com"

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const trimmedQuery = searchQuery.trim()

    if (trimmedQuery) {
      const upperQuery = trimmedQuery.toUpperCase()
      router.push(`/predictions?search=${encodeURIComponent(upperQuery)}`)
      setSearchQuery("")
      searchInputRef.current?.blur()
    }
  }

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle Enter key press
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const trimmedQuery = searchQuery.trim()
      if (trimmedQuery) {
        const upperQuery = trimmedQuery.toUpperCase()
        router.push(`/predictions?search=${encodeURIComponent(upperQuery)}`)
        setSearchQuery("")
        searchInputRef.current?.blur()
      }
    }
  }

  // Handle input click to ensure it's focusable
  const handleInputClick = () => {
    searchInputRef.current?.focus()
  }

  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Voice Assistant Handler - Auto-start on open
  const handleVoiceSearch = () => {
    // Check browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser. Please use Chrome, Edge, or Safari.')
      return
    }

    // Open dialog and auto-start listening
    setVoiceDialogOpen(true)
    setTranscript("Starting...")
    setIsListening(false)

    // Start listening after a brief delay to let dialog open
    setTimeout(() => {
      startListening()
    }, 300)
  }

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.lang = 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    let hasReceivedSpeech = false

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('🎤 Listening... Speak now!')
    }

    recognition.onspeechstart = () => {
      hasReceivedSpeech = true
      setTranscript('🎤 I can hear you...')
    }

    recognition.onresult = (event: any) => {
      hasReceivedSpeech = true
      const current = event.resultIndex
      const transcriptText = event.results[current][0].transcript.toLowerCase()
      setTranscript(`"${transcriptText}"`)

      if (event.results[current].isFinal) {
        setIsListening(false)

        // Voice Navigation Commands
        const command = transcriptText.toLowerCase().trim()

        // Dashboard commands
        if (command.includes('dashboard') || command.includes('home')) {
          setTranscript('✓ Opening Dashboard...')
          setTimeout(() => {
            router.push('/dashboard')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Portfolio commands
        else if (command.includes('portfolio')) {
          setTranscript('✓ Opening Portfolio...')
          setTimeout(() => {
            router.push('/portfolio')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Goals commands
        else if (command.includes('goal') || command.includes('goals')) {
          setTranscript('✓ Opening Goals...')
          setTimeout(() => {
            router.push('/goals')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // SIP commands
        else if (command.includes('sip') || command.includes('systematic investment')) {
          setTranscript('✓ Opening SIP...')
          setTimeout(() => {
            router.push('/sip')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Expenses commands
        else if (command.includes('expense') || command.includes('spending')) {
          setTranscript('✓ Opening Expenses...')
          setTimeout(() => {
            router.push('/expenses')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Tax commands
        else if (command.includes('tax')) {
          setTranscript('✓ Opening Tax...')
          setTimeout(() => {
            router.push('/tax')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Analytics commands
        else if (command.includes('analytic') || command.includes('analysis')) {
          setTranscript('✓ Opening Analytics...')
          setTimeout(() => {
            router.push('/analytics')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Predictions commands
        else if (command.includes('prediction') || command.includes('forecast')) {
          setTranscript('✓ Opening Predictions...')
          setTimeout(() => {
            router.push('/predictions')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Crypto commands
        else if (command.includes('crypto') || command.includes('bitcoin') || command.includes('cryptocurrency')) {
          setTranscript('✓ Opening Crypto Hub...')
          setTimeout(() => {
            router.push('/crypto')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Alerts commands
        else if (command.includes('alert') || command.includes('notification')) {
          setTranscript('✓ Opening Alerts...')
          setTimeout(() => {
            router.push('/alerts')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Settings commands
        else if (command.includes('setting') || command.includes('preference')) {
          setTranscript('✓ Opening Settings...')
          setTimeout(() => {
            router.push('/settings')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Family commands
        else if (command.includes('family') || command.includes('member')) {
          setTranscript('✓ Opening Family...')
          setTimeout(() => {
            router.push('/family')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Emergency Fund commands
        else if (command.includes('emergency') || command.includes('emergency fund')) {
          setTranscript('✓ Opening Emergency Fund...')
          setTimeout(() => {
            router.push('/emergency-fund')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Advisor commands
        else if (command.includes('advisor') || command.includes('advice')) {
          setTranscript('✓ Opening AI Advisor...')
          setTimeout(() => {
            router.push('/advisor')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Mutual Funds commands
        else if (command.includes('mutual fund') || command.includes('mf')) {
          setTranscript('✓ Opening Mutual Funds...')
          setTimeout(() => {
            router.push('/mf')
            setVoiceDialogOpen(false)
          }, 500)
        }
        // Stock search - if no command matched, treat as stock search
        else {
          setTranscript(`✓ Searching for: ${transcriptText}`)
          setTimeout(() => {
            const upperQuery = transcriptText.trim().toUpperCase()
            router.push(`/predictions?search=${encodeURIComponent(upperQuery)}`)
            setVoiceDialogOpen(false)
            setTranscript("")
          }, 800)
        }
      }
    }

    recognition.onerror = (event: any) => {
      setIsListening(false)

      if (!hasReceivedSpeech) {
        switch (event.error) {
          case 'no-speech':
            setTranscript('😕 No speech detected. Try again.')
            break
          case 'not-allowed':
            setTranscript('🚫 Microphone access denied.')
            setTimeout(() => setVoiceDialogOpen(false), 2500)
            break
          case 'network':
            setTranscript('📡 Network error. Check connection.')
            break
          case 'audio-capture':
            setTranscript('🎤 No microphone found.')
            setTimeout(() => setVoiceDialogOpen(false), 2500)
            break
          default:
            setTranscript('❌ Error occurred. Try again.')
        }
      }
    }

    recognition.onspeechend = () => {
      // Speech has ended
    }

    recognition.onend = () => {
      setIsListening(false)
      if (!hasReceivedSpeech && transcript.includes('Listening')) {
        setTranscript('😕 No speech detected. Try again.')
      }
    }

    try {
      recognition.start()
    } catch (error) {
      setIsListening(false)
      setTranscript('❌ Failed to start. Try again.')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-border/50 bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden hover:bg-secondary/80 transition-premium h-10 w-10 rounded-xl">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] p-0 border-r-border/50">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <MobileSidebar />
        </SheetContent>
      </Sheet>

      {/* Search - Responsive Design */}
      <div className="flex-1 flex items-center gap-2 max-w-2xl">
        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileSearchOpen(true)}
          className="md:hidden h-10 w-10 rounded-xl hover:bg-secondary/80 transition-all"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Desktop Search Bar */}
        <form
          className="relative w-full group hidden md:flex"
          onSubmit={handleSearch}
          role="search"
        >
          {/* Subtle Search Icon (Left) */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 group-focus-within:text-primary transition-all duration-300 pointer-events-none z-10">
            <Search className="h-4 w-4" />
          </div>

          {/* Input Field - Compact Height and Better Spacing */}
          <input
            ref={searchInputRef}
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            onClick={handleInputClick}
            placeholder="Search stocks, crypto, mutual funds..."
            className="w-full h-12 bg-gradient-to-r from-secondary/40 to-secondary/30 
                     border-2 border-border/40 pl-11 pr-28 rounded-xl 
                     focus:from-background focus:to-background/95
                     focus:border-primary/40 focus:ring-4 focus:ring-primary/5
                     hover:border-border/60 hover:shadow-lg
                     transition-all duration-300 
                     placeholder:text-muted-foreground/60 placeholder:font-medium
                     outline-none text-base font-medium
                     shadow-sm focus:shadow-md"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-label="Search for stocks, crypto, and mutual funds"
          />

          {/* Search Button - Compact and Clean */}
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
            <button
              type="submit"
              aria-label="Search"
              className="flex items-center justify-center gap-2 h-9 px-4 rounded-lg 
                       bg-gradient-to-r from-primary to-primary/90 
                       text-primary-foreground text-xs font-bold 
                       hover:from-primary/90 hover:to-primary/80
                       active:scale-95 
                       transition-all duration-200 
                       shadow-md hover:shadow-lg
                       border border-primary/20"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>


      {/* Right Section - Enhanced */}
      <div className="flex items-center gap-2">
        {/* Voice Assistant - Modern Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleVoiceSearch}
          className="hidden sm:flex h-10 w-10 rounded-xl hover:bg-secondary/80 transition-all group"
        >
          <Mic className="h-[18px] w-[18px] text-foreground/70 group-hover:text-primary group-hover:scale-110 transition-all" />
          <span className="sr-only">Voice assistant</span>
        </Button>

        {/* Voice Search Dialog - Auto-start */}
        <Dialog open={voiceDialogOpen} onOpenChange={(open) => {
          setVoiceDialogOpen(open)
          if (!open && recognitionRef.current) {
            recognitionRef.current.stop()
            setIsListening(false)
          }
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Voice Navigation</DialogTitle>
              <DialogDescription className="text-center">
                Navigate anywhere with your voice
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-8 space-y-6">
              {/* Animated Mic Icon - Shows status */}
              <div className="relative">
                <div className={`absolute inset-0 rounded-full ${isListening ? 'animate-ping bg-primary/20' : ''}`} />
                <div className={`relative flex items-center justify-center w-24 h-24 rounded-full transition-all ${isListening
                  ? 'bg-primary/10 ring-4 ring-primary/20'
                  : 'bg-secondary'
                  }`}>
                  <Mic className={`w-12 h-12 transition-all ${isListening ? 'text-primary animate-pulse' : 'text-muted-foreground'
                    }`} />
                </div>
              </div>

              {/* Transcript Display */}
              <div className="w-full min-h-[60px] flex items-center justify-center px-4">
                <p className={`text-center text-lg font-medium transition-all ${isListening ? 'text-primary' : 'text-foreground'
                  }`}>
                  {transcript}
                </p>
              </div>

              {/* Sound Wave Animation */}
              {isListening && (
                <div className="flex items-center justify-center gap-1 h-12">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full animate-pulse"
                      style={{
                        height: `${20 + Math.random() * 30}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.6s'
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Instructions */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  {isListening
                    ? '🎤 Listening... Speak clearly'
                    : 'Ready to listen'
                  }
                </p>
                <div className="text-xs text-muted-foreground/70 space-y-1">
                  <p className="font-semibold">Try saying:</p>
                  <p>&quot;Open Dashboard&quot; • &quot;Show Portfolio&quot;</p>
                  <p>&quot;Go to Settings&quot; • &quot;Open Crypto&quot;</p>
                  <p>&quot;Show Goals&quot; • &quot;RELIANCE stock&quot;</p>
                </div>
                {!isListening && transcript.includes('Try again') && (
                  <Button
                    onClick={startListening}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Mobile Search Dialog */}
        <Dialog open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Search Assets</DialogTitle>
              <DialogDescription>
                Search for stocks, crypto, and mutual funds
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => { handleSearch(e); setMobileSearchOpen(false); }} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search stocks, crypto, mutual funds..."
                  className="w-full h-12 pl-10 pr-4 rounded-xl border-2 border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <ThemeToggle />

        {/* Notifications - Professional Design */}
        <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-xl hover:bg-secondary/80 transition-all"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[420px] p-0 shadow-lg" align="end" sideOffset={8}>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b bg-muted/30">
              <h3 className="font-bold text-base">Notifications</h3>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-[11px] px-2.5 py-0.5 font-bold bg-primary/10 text-primary border-0">
                  {unreadCount} New
                </Badge>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[450px] overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className={`px-5 py-4 hover:bg-muted/50 cursor-pointer transition-all border-b group ${notification.isRead ? 'opacity-50' : ''}`}>
                  <div className="flex gap-3.5">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${notification.isRead ? 'bg-muted-foreground/40' : 'bg-primary shadow-sm shadow-primary/50'}`} />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <p className="text-[15px] font-semibold leading-tight group-hover:text-primary transition-colors">
                        {notification.title}
                      </p>
                      <p className="text-[13px] text-muted-foreground leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-[11px] text-muted-foreground/70 font-medium">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 border-t bg-muted/20">
              <Button
                variant="ghost"
                className="w-full text-[13px] font-semibold text-primary hover:bg-primary/10 hover:text-primary h-9"
                onClick={() => { markAllAsRead(); setNotificationOpen(false); }}
              >
                Mark all as read
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Divider */}
        <div className="mx-2 h-8 w-px bg-slate-200 hidden sm:block" />

        {/* User Menu - Enhanced */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 gap-2 rounded-xl px-2 hover:bg-secondary/80 transition-premium"
            >
              <div className="relative">
                <Avatar className="h-8 w-8 ring-2 ring-border/50 ring-offset-2 ring-offset-background transition-all group-hover:ring-primary/50">
                  <AvatarImage src="/indian-professional-man.png" alt={userName} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs font-semibold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
              </div>
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold text-foreground tracking-tight">{userName}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 text-[9px] font-bold uppercase tracking-wider">
                    <Crown className="h-2.5 w-2.5" />
                    {user?.role === 'ADMIN' ? 'Admin' : 'Premium'}
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
                    <AvatarImage src="/indian-professional-man.png" alt={fullName} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold leading-none text-foreground">{fullName}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 font-medium">{email}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="w-fit bg-accent text-accent-foreground border-none text-[10px] font-black tracking-wider px-2 py-0.5 shadow-sm">PRO ACCOUNT</Badge>
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
