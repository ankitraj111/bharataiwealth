import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins, JetBrains_Mono } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"
import "./normalize-text.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Bharat AI Wealth | Future of Wealth. Built for Bharat.",
  description:
    "Premium AI-powered wealth management platform for India. Track expenses, analyze investments, and get personalized financial advice with cutting-edge AI technology.",
  generator: "v0.app",
  keywords: ["wealth management", "AI finance", "India fintech", "investment tracking", "expense management"],
  authors: [{ name: "Bharat AI Wealth" }],
}

export const viewport: Viewport = {
  themeColor: "#0D1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover", // For mobile notches
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
// Triggering re-bundle to resolve chunk loading error
