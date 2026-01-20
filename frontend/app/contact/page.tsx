"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, MessageSquare, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@bharatai.com",
      description: "We'll respond within 24 hours",
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/40 dark:to-indigo-900/30",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 1800-123-4567",
      description: "Mon-Fri, 9 AM - 6 PM IST",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/30",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "New delhi",
      description: "India",
      color: "text-pink-600 dark:text-pink-400",
      bg: "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/30",
    },
  ]

  const quickLinks = [
    { icon: MessageSquare, title: "Live Chat", description: "Chat with our AI assistant", href: "/advisor" },
    { icon: Clock, title: "Support Center", description: "Browse help articles", href: "/support" },
    { icon: Users, title: "Community", description: "Join our forum", href: "#" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full"
            >
              <span className="text-white font-semibold text-sm">💬 We're Here to Help</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto font-medium leading-relaxed">
              Have questions about Bharat AI Wealth? We're here to help you make smarter financial decisions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-background to-muted/10">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-black mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Send us a Message
                  </h2>
                  <p className="text-muted-foreground text-base">Fill out the form below and we'll get back to you soon.</p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-black mb-3 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      Thank you for contacting us. We'll respond within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-bold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Rajesh Kumar"
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="rajesh@example.com"
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="font-bold">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="font-bold">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-bold">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        required
                        rows={6}
                        className="resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg group">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`h-14 w-14 rounded-2xl ${info.bg} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          <info.icon className={`h-7 w-7 ${info.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm mb-1">{info.title}</h3>
                          <p className="font-bold text-foreground mb-1">{info.content}</p>
                          <p className="text-xs text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Links */}
            <Card className="border-border/50 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-black text-lg mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Quick Help</h3>
                <div className="space-y-3">
                  {quickLinks.map((link) => (
                    <Link key={link.title} href={link.href}>
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-background/80 transition-all cursor-pointer group hover:shadow-md">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <link.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{link.title}</p>
                          <p className="text-xs text-muted-foreground">{link.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="font-black text-lg mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Office Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-bold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-bold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-bold text-muted-foreground">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
