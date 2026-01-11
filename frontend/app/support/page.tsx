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
        <div className="relative overflow-hidden rounded-2xl bg-muted/30 p-8 border border-border/50">
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <HelpCircle className="h-6 w-6" />
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] font-bold uppercase tracking-widest h-6">
                24/7 Support
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
            <p className="text-muted-foreground max-w-xl font-medium">
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
            className="h-14 pl-12 pr-4 text-sm font-bold rounded-xl bg-muted/50 border-border/50 focus:border-primary/50 shadow-sm transition-all"
          />
        </div>

        {/* Quick Links */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Card
              key={link.title}
              className="group cursor-pointer border-border/50 hover:border-primary/30 transition-all shadow-sm"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted border border-border/50 group-hover:bg-primary/5 transition-colors">
                    <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-bold text-sm">{link.title}</span>
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
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="flex items-center gap-2 text-base font-bold uppercase tracking-widest">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription className="font-medium">Common questions ke answers</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                      <AccordionTrigger className="text-left font-bold text-sm py-4 hover:text-primary transition-colors no-underline hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-medium leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p className="font-bold">Koi result nahi mila.</p>
                    <p className="text-sm">Neeche contact form se apna sawaal bhejein.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact & Info */}
          <div className="space-y-4">
            {/* Contact Info */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-base font-bold uppercase tracking-widest text-primary">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {[
                  { icon: Mail, label: "Email", value: "support@bharatawealth.in" },
                  { icon: Phone, label: "Phone", value: "1800-123-4567 (Toll Free)" },
                  { icon: MessageCircle, label: "Live Chat", value: "Mon-Sat, 9 AM - 9 PM IST" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50 transition-all hover:border-primary/20">
                    <div className="h-10 w-10 rounded-xl bg-background border border-border/50 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Regulatory Info */}
            <Card className="border-success/20 bg-success/5 shadow-sm">
              <CardHeader className="border-b border-success/10 pb-4">
                <CardTitle className="text-base font-bold uppercase tracking-widest flex items-center gap-2 text-success">
                  <Shield className="h-5 w-5" />
                  Regulatory Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {[
                  "SEBI Registered RIA (INA000012345)",
                  "RBI Compliant Data Security",
                  "ISO 27001 Certified",
                ].map((info, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <p className="text-xs font-bold text-success/80">{info}</p>
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground pt-3 border-t border-success/10 font-medium leading-relaxed opacity-70">
                  Investment advice is for informational purposes. Past performance does not guarantee future results.
                  Please read all scheme related documents carefully.
                </p>
              </CardContent>
            </Card>

            {/* AI Support */}
            <Card className="border-primary/20 bg-primary/5 shadow-sm overflow-hidden group">
              <CardContent className="p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-110">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground tracking-tight">AI Support Assistant</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/70">Instant answers 24/7</p>
                  </div>
                </div>
                <Button className="w-full gap-2 font-bold shadow-sm py-6 rounded-xl group/btn">
                  <MessageCircle className="h-4 w-4" />
                  Chat with AI
                  <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-xl font-bold">Send us a Message</CardTitle>
            <CardDescription className="font-medium">
              Koi specific sawaal hai? Humein message karein aur hum 24 hours mein reply karenge.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="grid gap-6 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</Label>
                <Input id="name" placeholder="Aapka naam" className="bg-muted/50 font-bold" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
                <Input id="email" type="email" placeholder="aapka@email.com" className="bg-muted/50 font-bold" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Subject</Label>
                <Input id="subject" placeholder="Aapka sawaal kya hai?" className="bg-muted/50 font-bold" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Message</Label>
                <Textarea id="message" placeholder="Detail mein batayein..." className="min-h-[120px] bg-muted/50 font-bold" />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="gap-2 font-bold shadow-sm px-8 py-6 rounded-xl">
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
