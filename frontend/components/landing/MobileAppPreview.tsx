"use client"

import { motion } from "framer-motion"
import { Smartphone, Download, Star, Users, Apple } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileAppPreview() {
    return (
        <section className="relative py-20 px-4 md:px-8 lg:px-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                            <Smartphone className="w-4 h-4 text-white" />
                            <span className="text-sm font-semibold text-white">Mobile App</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
                            Manage Wealth On The Go
                        </h2>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Download our mobile app and access your portfolio anytime, anywhere. Available on iOS and Android.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                                    <span className="text-2xl font-semibold text-white">4.9</span>
                                </div>
                                <p className="text-sm text-white/80">App Rating</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Users className="w-5 h-5 text-white" />
                                    <span className="text-2xl font-semibold text-white">10K+</span>
                                </div>
                                <p className="text-sm text-white/80">Downloads</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Download className="w-5 h-5 text-white" />
                                    <span className="text-2xl font-semibold text-white">Free</span>
                                </div>
                                <p className="text-sm text-white/80">To Download</p>
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                                <Apple className="w-5 h-5 mr-2" />
                                App Store
                            </Button>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                <Download className="w-5 h-5 mr-2" />
                                Google Play
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right - Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative mx-auto w-[280px] h-[560px]">
                            {/* Phone Frame */}
                            <div className="absolute inset-0 bg-slate-900 rounded-[3rem] shadow-2xl border-8 border-slate-800">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl"></div>
                                
                                {/* Screen Content */}
                                <div className="absolute inset-2 bg-white rounded-[2.5rem] overflow-hidden">
                                    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 p-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-semibold text-slate-900 mb-2">Portfolio</h3>
                                            <p className="text-3xl font-semibold text-blue-600">₹12.5L</p>
                                            <p className="text-sm text-emerald-600">+15.2% this month</p>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-semibold text-sm">Asset {i}</p>
                                                            <p className="text-xs text-slate-500">Growth</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-sm">₹{i * 2}L</p>
                                                            <p className="text-xs text-emerald-600">+{i * 3}%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
