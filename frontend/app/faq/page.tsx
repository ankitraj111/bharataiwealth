"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Search,
  Shield,
  CreditCard,
  TrendingUp,
  Users,
  Lock,
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"

const faqCategories = [
  { id: "all", name: "All", icon: HelpCircle },
  { id: "general", name: "General", icon: MessageSquare },
  { id: "security", name: "Security", icon: Shield },
  { id: "investment", name: "Investment", icon: TrendingUp },
  { id: "account", name: "Account", icon: Users },
  { id: "payment", name: "Payment", icon: CreditCard },
]

const faqs = [
  {
    category: "general",
    question: "What is Bharat AI Wealth?",
    answer:
      "Bharat AI Wealth is an AI-powered wealth management platform designed specifically for Indian investors. We help you track expenses, manage portfolios, plan goals, and make smarter investment decisions using advanced machine learning algorithms.",
  },
  {
    category: "general",
    question: "How does Bharat AI differ from other investment platforms?",
    answer:
      "Unlike traditional platforms, we use AI to provide personalized recommendations based on your financial goals, risk appetite, and market conditions. We also offer automatic expense tracking through bank integration, goal-based planning, and real-time portfolio analysis.",
  },
  {
    category: "security",
    question: "Is my financial data secure?",
    answer:
      "Absolutely! We use 256-bit AES encryption, the same standard used by banks. All data is encrypted both in transit and at rest. We're also RBI-regulated and follow strict compliance standards. We only have read-only access to your accounts and cannot move any money.",
  },
  {
    category: "security",
    question: "How do you connect to my bank account?",
    answer:
      "We use the Account Aggregator framework approved by RBI. This is a secure, consent-based system where you explicitly grant read-only access to your transaction data. You can revoke this access anytime from your settings.",
  },
  {
    category: "security",
    question: "Can Bharat AI access my money or make transactions?",
    answer:
      "No, absolutely not! We only have read-only access to view your transactions for expense tracking and analysis. We cannot initiate any transactions, transfer money, or access your funds in any way.",
  },
  {
    category: "investment",
    question: "What types of investments can I track?",
    answer:
      "You can track stocks, mutual funds, ETFs, bonds, fixed deposits, PPF, NPS, and even cryptocurrencies. Our platform supports all major Indian exchanges (NSE, BSE) and mutual fund houses.",
  },
  {
    category: "investment",
    question: "How accurate are the AI predictions?",
    answer:
      "Our ML models are trained on historical data and achieve 70-85% accuracy depending on market conditions. However, remember that past performance doesn't guarantee future results. We recommend using our predictions as one of many factors in your investment decisions.",
  },
  {
    category: "investment",
    question: "What is the difference between Low, Medium, and High Risk portfolios?",
    answer:
      "Low Risk portfolios focus on capital protection with 6-8% returns (debt funds, FDs). Medium Risk offers balanced growth with 12-15% returns (mix of equity and debt). High Risk targets aggressive growth with 30-50% returns (stocks, crypto) but with higher volatility.",
  },
  {
    category: "investment",
    question: "Can I invest directly through Bharat AI?",
    answer:
      "Currently, we're a tracking and advisory platform. We provide recommendations and analysis, but you'll need to execute trades through your broker or mutual fund platform. We're working on direct investment features for future releases.",
  },
  {
    category: "account",
    question: "Is Bharat AI free to use?",
    answer:
      "We offer a free tier with basic features including expense tracking, portfolio monitoring, and limited AI insights. Premium plans start at ₹299/month and include advanced features like unlimited AI predictions, tax optimization, and priority support.",
  },
  {
    category: "account",
    question: "How do I create an account?",
    answer:
      "Simply click on 'Sign Up' and register with your email or phone number. Verify your account through OTP, complete your profile, and you're ready to start! The entire process takes less than 2 minutes.",
  },
  {
    category: "account",
    question: "Can I add family members to my account?",
    answer:
      "Yes! Our Family Dashboard feature allows you to add family members and track their finances separately while maintaining a consolidated view. Each member's data remains private and secure.",
  },
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including UPI, credit/debit cards, net banking, and digital wallets. All payments are processed through secure, PCI-DSS compliant payment gateways.",
  },
  {
    category: "payment",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription anytime from your account settings. There are no cancellation fees. If you cancel, you'll continue to have access until the end of your billing period.",
  },
  {
    category: "payment",
    question: "Do you offer refunds?",
    answer:
      "We offer a 7-day money-back guarantee for new premium subscriptions. If you're not satisfied within the first 7 days, contact our support team for a full refund.",
  },
  {
    category: "general",
    question: "How does the Emergency Fund calculator work?",
    answer:
      "Our calculator considers your monthly expenses, family size, EMIs, and rent to recommend an ideal emergency fund. We typically suggest 6-12 months of expenses based on your job stability and dependents.",
  },
  {
    category: "general",
    question: "What is the Sandbox Simulator?",
    answer:
      "The Sandbox lets you test how your portfolio would perform under different market scenarios (crashes, bull runs, etc.) without risking real money. It's a great tool for understanding risk and planning strategies.",
  },
  {
    category: "investment",
    question: "How often should I rebalance my portfolio?",
    answer:
      "We recommend reviewing your portfolio quarterly and rebalancing if any asset class deviates more than 5% from your target allocation. Our AI will send you alerts when rebalancing is needed.",
  },
  {
    category: "security",
    question: "What happens if I lose my phone or forget my password?",
    answer:
      "You can reset your password using your registered email or phone number. We also support two-factor authentication (2FA) for added security. If you lose your phone, you can disable 2FA through email verification.",
  },
  {
    category: "general",
    question: "Do you provide tax filing services?",
    answer:
      "We provide tax optimization suggestions and help you track deductions under various sections (80C, 80D, etc.). However, we don't file taxes directly. We can generate reports that you can share with your CA.",
  },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-orange-500 to-amber-500 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/90 mb-8 font-medium">
              Find answers to common questions about Bharat AI Wealth
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white dark:bg-slate-900 border-0 shadow-lg text-base"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {faqCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-bold text-foreground">{filteredFaqs.length}</span> question
              {filteredFaqs.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* FAQ Accordion */}
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-border/50 shadow-lg">
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className="border-b border-border/50 last:border-0"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-4 group">
                            <div className="flex items-start gap-3 pr-4">
                              <Badge
                                variant="outline"
                                className="mt-1 shrink-0 text-[10px] font-bold uppercase"
                              >
                                {faq.category}
                              </Badge>
                              <span className="font-bold text-base group-hover:text-primary transition-colors">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed pl-20 pr-4 pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or browse different categories
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all") }}>
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Still Have Questions */}
          <Card className="mt-12 border-border/50 bg-gradient-to-br from-primary/5 to-orange-500/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Support
                  </Button>
                </Link>
                <Link href="/advisor">
                  <Button size="lg" variant="outline" className="gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Chat with AI
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2">
                  <Phone className="h-5 w-5" />
                  Call Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
