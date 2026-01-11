"use client"

import dynamic from "next/dynamic"
import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"

// Lazy load heavy sections
const ValueProposition = dynamic(() => import("@/components/landing/ValueProposition").then(m => m.ValueProposition))
const StatsCounter = dynamic(() => import("@/components/landing/StatsCounter").then(m => m.StatsCounter))
const ProblemSolution = dynamic(() => import("@/components/landing/ProblemSolution").then(m => m.ProblemSolution))
const Features = dynamic(() => import("@/components/landing/Features").then(m => m.Features))
const AppPreview = dynamic(() => import("@/components/landing/AppPreview").then(m => m.AppPreview))
const SocialProof = dynamic(() => import("@/components/landing/SocialProof").then(m => m.SocialProof))
const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks").then(m => m.HowItWorks))
const Pricing = dynamic(() => import("@/components/landing/Pricing").then(m => m.Pricing))
const Team = dynamic(() => import("@/components/landing/Team").then(m => m.Team))
const FAQ = dynamic(() => import("@/components/landing/FAQ").then(m => m.FAQ))
const BlogPreview = dynamic(() => import("@/components/landing/BlogPreview").then(m => m.BlogPreview))
const SecurityTrust = dynamic(() => import("@/components/landing/SecurityTrust").then(m => m.SecurityTrust))
const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA").then(m => m.FinalCTA))
const Footer = dynamic(() => import("@/components/landing/Footer").then(m => m.Footer))
const Chatbot = dynamic(() => import("@/components/landing/Chatbot").then(m => m.Chatbot))
const BackToTop = dynamic(() => import("@/components/landing/BackToTop").then(m => m.BackToTop))

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
            {/* Navigation */}
            <Navbar />

            <div className="flex flex-col">
                {/* 1️⃣ Hero Section */}
                <Hero />

                {/* 2️⃣ Value Proposition - 4 key benefits */}
                <ValueProposition />

                {/* 3️⃣ Stats Counter - Animated numbers */}
                <StatsCounter />

                {/* 4️⃣ Problem → Solution Block */}
                <ProblemSolution />

                {/* 5️⃣ Features Showcase - 7 features with icons */}
                <Features />

                {/* 6️⃣ App Preview - Device mockups */}
                <AppPreview />

                {/* 7️⃣ Social Proof - Testimonials + Stats */}
                <SocialProof />

                {/* 8️⃣ How It Works - 3 steps */}
                <HowItWorks />

                {/* 9️⃣ Pricing - 3 tiers */}
                <Pricing />

                {/* 🔟 Team - Meet the experts */}
                <Team />

                {/* 1️⃣1️⃣ FAQ - Common questions */}
                <FAQ />

                {/* 1️⃣2️⃣ Blog Preview - Latest insights */}
                <BlogPreview />

                {/* 1️⃣3️⃣ Security & Trust */}
                <SecurityTrust />

                {/* 1️⃣4️⃣ Call to Action - Lead form */}
                <FinalCTA />

                {/* 1️⃣5️⃣ Footer */}
                <Footer />
            </div>

            {/* Floating Elements */}
            <Chatbot />
            <BackToTop />
        </main>
    )
}
