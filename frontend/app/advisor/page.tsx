"use client"

import { useState, useRef, useEffect } from "react"
import { AppShell } from "@/components/app-shell"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Send, Mic, Sparkles, TrendingUp, Calculator, ShieldAlert, MessageSquare } from "lucide-react"
import { parseIntent } from "@/lib/intent-parser"
import { fetchPrediction, fetchSentiment, fetchRebalanceSuggestions, fetchAdvisoryRecommend } from "@/lib/api"

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
  return (
    <ProtectedRoute>
      <AdvisorContent />
    </ProtectedRoute>
  )
}

function AdvisorContent() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input
    if (!textToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    if (!overrideInput) setInput("")
    setIsTyping(true)

    const intent = parseIntent(textToSend)
    let response = ""

    try {
      if (intent.action === "PREDICT" && intent.symbol) {
        const data = await fetchPrediction(intent.symbol)
        if (data) {
          response = `Analysis for **${intent.symbol}**:\n` +
            `- Predicted Price: ₹${data.predicted_price.toFixed(2)}\n` +
            `- Confidence: ${(data.confidence * 100).toFixed(1)}%\n` +
            `- Trend: ${data.trend.toUpperCase()}\n\n` +
            `AI Insight: Based on current technical indicators, we expect a ${data.trend === 'up' ? 'bullish' : 'bearish'} move.`
        }
      } else if (intent.action === "SENTIMENT" && intent.symbol) {
        const data = await fetchSentiment(intent.symbol)
        if (data) {
          response = `Market Sentiment for **${intent.symbol}**:\n` +
            `- Score: ${data.score.toFixed(2)}\n` +
            `- Label: ${data.label.toUpperCase()}\n\n` +
            `This analysis includes recent news headlines and social media trends.`
        }
      } else if (intent.action === "REBALANCE") {
        const data = await fetchRebalanceSuggestions()
        if (data && data.suggestions) {
          response = "Here are my rebalancing suggestions for your portfolio:\n\n" +
            data.suggestions.map((s: any) => `- **${s.symbol}**: ${s.action} (Reason: ${s.reason})`).join("\n")
        }
      } else if (intent.action === "ADVISORY" && intent.symbol) {
        const data = await fetchAdvisoryRecommend(intent.symbol)
        if (data) {
          response = `Recommendation for **${intent.symbol}**:\n` +
            `- Action: **${data.action}**\n` +
            `- Price: ₹${data.current_price}\n` +
            `- Reasoning: ${data.reason}`
        }
      }

      if (!response) {
        response = "I couldn't find specific data for that request, but generally, it's a good time to review your long-term goals. Try asking 'Predict RELIANCE' or 'Rebalance my portfolio'."
      }
    } catch (error) {
      response = "Sorry, I'm having trouble connecting to my brain right now. Please try again in a moment."
    }

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsTyping(false)
  }

  const handleChipClick = (label: string) => {
    setInput(label)
  }

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-8rem)] gap-4">
        {/* Thread List - Hidden on mobile */}
        <Card className="hidden w-64 shrink-0 lg:flex lg:flex-col border-border/50 shadow-sm">
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
                    "w-full rounded-lg p-3 text-left transition-colors hover:bg-muted",
                    thread.id === "1" && "bg-primary/5 border-l-2 border-primary",
                  )}
                >
                  <p className="text-sm font-medium text-foreground">{thread.title}</p>
                  <p className="text-xs text-muted-foreground">{thread.date}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t border-border p-3">
            <Button variant="outline" className="w-full gap-2">
              <Sparkles className="h-4 w-4" />
              New Chat
            </Button>
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex flex-1 flex-col border-border/50 shadow-sm">
          <CardHeader className="border-b border-border p-4">
            <CardTitle className="flex items-center gap-2 text-base font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
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
                      <AvatarFallback className="bg-muted text-primary">
                        <Sparkles className="h-4 w-4" />
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground">RK</AvatarFallback>
                    )}
                  </Avatar>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground",
                    )}
                  >
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-muted text-primary">
                      <Sparkles className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl bg-muted px-4 py-3">
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
                  className="gap-2 text-xs border-border/50 hover:bg-muted transition-all"
                  onClick={() => handleChipClick(chip.label)}
                >
                  <chip.icon className="h-3 w-3 text-primary/70" />
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
              <Button onClick={() => handleSend()} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}
