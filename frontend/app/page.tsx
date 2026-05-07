"use client"

import dynamic from "next/dynamic"
import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"

// Lazy load heavy sections
const ValueProposition = dynamic(() => import("@/components/landing/ValueProposition").then(m => m.ValueProposition))
const StatsCounter = dynamic(() => import("@/components/landing/StatsCounter").then(m => m.StatsCounter))
const ProblemSolution = dynamic(() => import("@/components/landing/ProblemSolution").then(m => m.ProblemSolution))
const AIPredictionsPreview = dynamic(() => import("@/components/landing/AIPredictionsPreview").then(m => m.AIPredictionsPreview))
const SocialProof = dynamic(() => import("@/components/landing/SocialProof").then(m => m.SocialProof))
const HowItWorks = dynamic(() => import("@/components/landing/HowItWorks").then(m => m.HowItWorks))
const FAQ = dynamic(() => import("@/components/landing/FAQ").then(m => m.FAQ))
const BlogPreview = dynamic(() => import("@/components/landing/BlogPreview").then(m => m.BlogPreview))
const SecurityTrust = dynamic(() => import("@/components/landing/SecurityTrust").then(m => m.SecurityTrust))
const Footer = dynamic(() => import("@/components/landing/Footer").then(m => m.Footer))
const Chatbot = dynamic(() => import("@/components/landing/Chatbot").then(m => m.Chatbot))
const BackToTop = dynamic(() => import("@/components/landing/BackToTop").then(m => m.BackToTop))
const TrustedBy = dynamic(() => import("@/components/landing/TrustedBy").then(m => m.TrustedBy))
const TestimonialsMarquee = dynamic(() => import("@/components/landing/TestimonialsMarquee").then(m => m.TestimonialsMarquee))
const WhyChooseUs = dynamic(() => import("@/components/landing/WhyChooseUs").then(m => m.WhyChooseUs))
const SuccessStories = dynamic(() => import("@/components/landing/SuccessStories").then(m => m.SuccessStories))
const LiveMarketData = dynamic(() => import("@/components/landing/LiveMarketData").then(m => m.LiveMarketData))

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
            {/* Navigation */}
            <Navbar />

            <div className="flex flex-col">
                {/* 1️⃣ Hero Section */}
                <Hero />

                {/* 1.1️⃣ Trusted By Section - Logos & Compliance */}
                <TrustedBy />

                {/* 2️⃣ Value Proposition - 4 key benefits */}
                <ValueProposition />

                {/* 3️⃣ Stats Counter - Animated numbers */}
                <StatsCounter />

                {/* 3.1️⃣ Live Market Data - Real-time updates */}
                <LiveMarketData />

                {/* 4️⃣ Problem → Solution Block */}
                <ProblemSolution />

                {/* 5️⃣ Why Choose Us - Key differentiators */}
                <WhyChooseUs />

                {/* 7️⃣ Social Proof - Testimonials + Stats */}
                <SocialProof />

                {/* 7.1️⃣ Testimonials Marquee - Real user reviews */}
                <TestimonialsMarquee />

                {/* 7.2️⃣ Success Stories - User case studies */}
                <SuccessStories />

                {/* 8️⃣ How It Works - 3 steps */}
                <HowItWorks />

                {/* 1️⃣1️⃣ FAQ - Common questions */}
                <FAQ />

                {/* 1️⃣2️⃣ Blog Preview - Latest insights */}
                <BlogPreview />

                {/* 1️⃣3️⃣ Security & Trust */}
                <SecurityTrust />

                {/* 1️⃣4️⃣ Footer */}
                <Footer />
            </div>

            {/* Floating Elements */}
            <Chatbot />
            <BackToTop />
        </main>
    )
}
