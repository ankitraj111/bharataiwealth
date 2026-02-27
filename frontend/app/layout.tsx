import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins, JetBrains_Mono } from "next/font/google"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import "./normalize-text.css"
import "./responsive.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
  fallback: ['monospace'],
})

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: "Bharat AI Wealth | Future of Wealth. Built for Bharat.",
  description:
    "Premium AI-powered wealth management platform for India. Track expenses, analyze investments, and get personalized financial advice with cutting-edge AI technology.",
  generator: "v0.app",
  keywords: ["wealth management", "AI finance", "India fintech", "investment tracking", "expense management"],
  authors: [{ name: "Bharat AI Wealth" }],
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: 'image/svg+xml' },
      { url: `${basePath}/icon-light-32x32.png`, sizes: '32x32', type: 'image/png' }
    ],
    apple: `${basePath}/apple-icon.png`,
  },
  manifest: `${basePath}/manifest.json`,
}

export const viewport: Viewport = {
  themeColor: "#0D1117",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="http://localhost:8080" />
        <link rel="dns-prefetch" href="http://localhost:8080" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
// Triggering re-bundle to resolve chunk loading error
