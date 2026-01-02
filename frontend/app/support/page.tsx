"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  Shield,
  BookOpen,
  ExternalLink,
  Search,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

const faqs = [
  {
    question: "Bharat AI Wealth kya hai?",
    answer:
      "Bharat AI Wealth ek AI-powered wealth management platform hai jo aapko apne finances track karne, investments analyze karne, aur personalized financial advice dene mein madad karta hai. Ye specifically Indian users ke liye design kiya gaya hai.",
  },
  {
    question: "Kya mera data safe hai?",
    answer:
      "Haan, bilkul! Hum bank-grade encryption (256-bit AES) use karte hain aur RBI aur SEBI guidelines follow karte hain. Aapka data kabhi third parties ke saath share nahi hota. Hum GDPR aur Indian data protection laws ke compliant hain.",
  },
  {
    question: "AI predictions kitni accurate hain?",
    answer:
      "Humari AI predictions historical data, market trends, aur multiple technical indicators par based hain. Accuracy typically 70-85% hoti hai, but yaad rakhein ki market predictions kabhi 100% accurate nahi ho sakti. Hamesha apna research karein.",
  },
  {
    question: "UPI screenshot se expense kaise add karein?",
    answer:
      "Expenses page par jaayein, 'Upload UPI Screenshot' button click karein, aur apna screenshot select karein. Humara AI automatically amount, merchant, aur date extract kar lega aur expense add kar dega.",
  },
  {
    question: "Family dashboard mein members kaise add karein?",
    answer:
      "Family Dashboard page par jaayein aur 'Add Member' button click karein. Aap invite link share kar sakte hain ya directly email se invite bhej sakte hain. Invited member accept karne ke baad aap unka financial data dekh sakenge (unki permission ke saath).",
  },
  {
    question: "Premium subscription ke kya benefits hain?",
    answer:
      "Premium mein unlimited AI queries, advanced portfolio analytics, priority support, family dashboard (5 members tak), custom reports, aur ad-free experience milta hai. Monthly ₹299 aur yearly ₹2,499 ke plans available hain.",
  },
  {
    question: "Tax reports kaise generate karein?",
    answer:
      "Tax & Insurance page par jaayein aur 'Generate Tax Report' button click karein. Ye aapke investments aur expenses analyze karke Form 16 compatible report generate karega jo aap apne CA ke saath share kar sakte hain.",
  },
  {
    question: "SIP reminders kaise set karein?",
    answer:
      "SIP Reminders page par jaayein, 'Add SIP' click karein, details fill karein (amount, date, frequency), aur notification preferences select karein. Aapko SMS, email, ya push notification mil jayegi reminder ke liye.",
  },
]

const quickLinks = [
  { title: "Getting Started Guide", icon: BookOpen, href: "#" },
  { title: "Video Tutorials", icon: FileText, href: "#" },
  { title: "API Documentation", icon: FileText, href: "#" },
  { title: "Privacy Policy", icon: Shield, href: "#" },
  { title: "Terms of Service", icon: FileText, href: "#" },
  { title: "RBI/SEBI Compliance", icon: Shield, href: "#" },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 shadow-lg">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                24/7 Support
              </Badge>
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Help & Support</h1>
            <p className="text-muted-foreground max-w-xl">
              Koi sawaal hai? Hum yahan hain aapki madad ke liye. FAQ dekhen, documentation padhein, ya humse directly
              contact karein.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Apna sawaal search karein..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-12 pr-4 text-lg rounded-xl bg-secondary/50 border-border/50 focus:border-primary/50"
          />
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Card
              key={link.title}
              className="group cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary group-hover:bg-primary/20 transition-colors">
                    <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-medium">{link.title}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Common questions ke answers</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:text-primary">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <HelpCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Koi result nahi mila. Neeche contact form se apna sawaal bhejein.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact & Info */}
          <div className="space-y-4">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-muted-foreground">support@bharatawealth.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-xs text-muted-foreground">1800-123-4567 (Toll Free)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Live Chat</p>
                    <p className="text-xs text-muted-foreground">Mon-Sat, 9 AM - 9 PM IST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regulatory Info */}
            <Card className="border-chart-2/30 bg-chart-2/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-5 w-5 text-chart-2" />
                  Regulatory Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-muted-foreground">SEBI Registered Investment Advisor (INA000012345)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-muted-foreground">RBI Compliant Data Security</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-muted-foreground">ISO 27001 Certified</p>
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                  Investment advice is for informational purposes. Past performance does not guarantee future results.
                  Please read all scheme related documents carefully.
                </p>
              </CardContent>
            </Card>

            {/* AI Support */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">AI Support Assistant</p>
                    <p className="text-xs text-muted-foreground">Instant answers 24/7</p>
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat with AI
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Koi specific sawaal hai? Humein message karein aur hum 24 hours mein reply karenge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Aapka naam" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="aapka@email.com" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Aapka sawaal kya hai?" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Detail mein batayein..." className="min-h-[120px]" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
