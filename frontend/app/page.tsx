import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { TrustSection } from "@/components/landing/TrustSection"
import { Features } from "@/components/landing/Features"
import { AIEngine } from "@/components/landing/AIEngine"
import { PortfolioPhilosophy } from "@/components/landing/PortfolioPhilosophy"
import { Compliance } from "@/components/landing/Compliance"
import { ProductPreview } from "@/components/landing/ProductPreview"
import { Disclaimer } from "@/components/landing/Disclaimer"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustSection />
      <Features />
      <AIEngine />
      <PortfolioPhilosophy />
      <Compliance />
      <ProductPreview />
      <FinalCTA />
      <Disclaimer />
      <Footer />
    </main>
  )
}
