"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const initialMessages = [
    {
        role: "bot",
        text: "👋 Hi! I'm Bharat AI Assistant. How can I help you today?"
    }
]

const quickReplies = [
    "How does AI analysis work?",
    "How do I import my portfolio?",
    "Tell me about pricing",
    "Is my data secure?"
]

const botResponses: Record<string, string> = {
    "How does AI analysis work?": "Our AI uses ensemble machine learning models trained on historical market data, technical indicators, and sentiment analysis to generate actionable investment insights. The models analyze patterns across 500+ data points to provide predictions with 70-85% directional accuracy.",
    "How do I import my portfolio?": "You can import your portfolio via CSV upload or manual entry. We support secure data import with bank-grade encryption to keep your information safe.",
    "Tell me about pricing": "We offer a Free tier with basic features, Pro at ₹499/month with unlimited insights and advanced features, and Enterprise at ₹1,999/month for families and HNIs. Start with a 14-day free trial of Pro!",
    "Is my data secure?": "Absolutely! We use bank-grade 256-bit encryption for all data. Your portfolio information is stored securely and never shared with third parties. Your credentials are never stored on our servers."
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState(initialMessages)
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    const handleSend = (text: string) => {
        if (!text.trim()) return

        // Add user message
        setMessages(prev => [...prev, { role: "user", text }])
        setInput("")
        setIsTyping(true)

        // Simulate bot response
        setTimeout(() => {
            const response = botResponses[text] || "Thanks for your question! For detailed assistance, please email us at hello@bharataiwealth.com or try our FAQ section."
            setMessages(prev => [...prev, { role: "bot", text: response }])
            setIsTyping(false)
        }, 1000)
    }

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center ${isOpen ? 'hidden' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                aria-label="Open Chat"
            >
                <MessageCircle className="w-6 h-6" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-purple-600">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Bharat AI Assistant</h3>
                                    <p className="text-xs text-white/70">Always here to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                                aria-label="Close Chat"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'bot'
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                            : 'bg-slate-200 dark:bg-slate-700'
                                        }`}>
                                        {msg.role === 'bot'
                                            ? <Bot className="w-4 h-4 text-white" />
                                            : <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                        }
                                    </div>
                                    <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.role === 'bot'
                                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-tl-none'
                                            : 'bg-blue-600 text-white rounded-tr-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Quick Replies */}
                        {messages.length <= 2 && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickReplies.map((reply, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSend(reply)}
                                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Button
                                    onClick={() => handleSend(input)}
                                    className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
