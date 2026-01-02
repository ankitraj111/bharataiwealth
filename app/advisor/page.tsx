"use client"

import { useState, useRef, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Send, Mic, Sparkles, TrendingUp, Calculator, ShieldAlert, MessageSquare } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Namaste! I'm your AI Wealth Advisor. I can help you with spending analysis, investment recommendations, tax optimization, and financial planning. How can I assist you today?",
    timestamp: new Date(),
  },
]

const suggestionChips = [
  { label: "Analyze spending", icon: TrendingUp },
  { label: "Best SIP for me", icon: Sparkles },
  { label: "Tax optimization", icon: Calculator },
  { label: "High-risk ideas", icon: ShieldAlert },
]

const chatThreads = [
  { id: "1", title: "Investment advice", date: "Today" },
  { id: "2", title: "Tax planning 2024", date: "Yesterday" },
  { id: "3", title: "SIP recommendations", date: "2 days ago" },
  { id: "4", title: "Crypto analysis", date: "Last week" },
]

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        "analyze spending":
          "Based on your spending data, you spent ₹49,200 this month. Your top categories are:\n\n1. Food & Dining: ₹18,500 (37%)\n2. Travel: ₹12,000 (24%)\n3. Shopping: ₹9,500 (19%)\n\nI recommend reducing food expenses by cooking more at home. This could save you ₹5,000-7,000 monthly.",
        "best sip for me":
          "Based on your risk profile (Medium) and investment goals, I recommend:\n\n1. **Axis Bluechip Fund** - Large cap, stable returns\n2. **Mirae Asset Emerging Bluechip** - Large & mid cap blend\n3. **Parag Parikh Flexi Cap** - Diversified exposure\n\nStart with ₹5,000/month SIP for optimal wealth creation.",
        "tax optimization":
          "You can save up to ₹46,800 in taxes this year:\n\n- Section 80C: ₹1,50,000 (ELSS, PPF, LIC)\n- Section 80D: ₹25,000 (Health Insurance)\n- HRA Exemption: ₹1,80,000\n\nYou've utilized only 60% of 80C. Consider investing in ELSS funds for remaining ₹60,000.",
        "high-risk ideas":
          "⚠️ High-risk investments require careful consideration:\n\n1. **Bitcoin (BTC)** - Current: ₹45L, Predicted: +15% (30 days)\n2. **Ethereum (ETH)** - Current: ₹2.5L, Predicted: +12%\n3. **Small Cap Funds** - Higher volatility, potential 20-25% returns\n\nLimit high-risk to 10-15% of portfolio. Never invest emergency funds.",
      }

      const lowerInput = input.toLowerCase()
      let response =
        "I understand your question. Let me analyze your financial data and provide personalized recommendations. Based on your spending patterns and investment goals, I suggest focusing on building an emergency fund first, then gradually increasing your SIP investments."

      for (const [key, value] of Object.entries(aiResponses)) {
        if (lowerInput.includes(key)) {
          response = value
          break
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleChipClick = (label: string) => {
    setInput(label)
  }

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-8rem)] gap-4">
        {/* Thread List - Hidden on mobile */}
        <Card className="hidden w-64 shrink-0 lg:flex lg:flex-col">
          <CardHeader className="border-b border-border p-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="h-4 w-4" />
              Chat History
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {chatThreads.map((thread) => (
                <button
                  key={thread.id}
                  className={cn(
                    "w-full rounded-lg p-3 text-left transition-colors hover:bg-secondary",
                    thread.id === "1" && "bg-primary/10",
                  )}
                >
                  <p className="text-sm font-medium text-foreground">{thread.title}</p>
                  <p className="text-xs text-muted-foreground">{thread.date}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t border-border p-3">
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Sparkles className="h-4 w-4" />
              New Chat
            </Button>
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex flex-1 flex-col">
          <CardHeader className="border-b border-border p-4">
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              AI Wealth Advisor
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3", message.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    {message.role === "assistant" ? (
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-chart-1 text-chart-1-foreground">RK</AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl bg-secondary px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Suggestion Chips */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {suggestionChips.map((chip) => (
                <Button
                  key={chip.label}
                  variant="outline"
                  size="sm"
                  className="gap-2 text-xs bg-transparent"
                  onClick={() => handleChipClick(chip.label)}
                >
                  <chip.icon className="h-3 w-3" />
                  {chip.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your finances..."
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button variant="ghost" size="icon">
                <Mic className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
