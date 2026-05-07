"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DotsBackground } from "@/components/ui/DotsBackground"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const forgotSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<z.infer<typeof forgotSchema>>({
        resolver: zodResolver(forgotSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof forgotSchema>) {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsLoading(false)
        setIsSubmitted(true)
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-background overflow-hidden font-sans p-4 sm:p-6">
            {/* Full-page DotsBackground */}
            <div className="absolute inset-0 z-0">
                <DotsBackground />
            </div>
            <div className="absolute inset-0 bg-noise-pattern opacity-10 brightness-100 contrast-150 pointer-events-none z-0" />

            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
                {/* Logo Section */}
                <div className="flex flex-col items-center gap-4 mb-8">
                    <Link href="/" className="flex items-center">
                        <div className="w-[60px] flex items-center justify-center overflow-hidden">
                            <img src={`${basePath}/logo2.png`} alt="Bharat AI Wealth" className="h-[35px] w-full" />
                        </div>
                        <div className="pl-2 text-xl text-bold leading-[18px] text-[#D4AF37] font-bold">
                            BHARAT <br /><span className="text-xs from-[#1E88E5] bg-gradient-to-r via-[#8B64AA] to-[#FFC107] bg-clip-text text-transparent italic">AI Wealth</span>
                        </div>
                    </Link>
                </div>

                {/* Main Card */}
                <div className="bg-background/40 backdrop-blur-md border border-border/50 p-8 rounded-2xl shadow-xl">
                    {!isSubmitted ? (
                        <>
                            <div className="space-y-2 text-center mb-8">
                                <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase">Forgot Password?</h2>
                                <p className="text-muted-foreground font-medium text-sm">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold text-foreground/80">Email Address</FormLabel>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                                                        <Input
                                                            placeholder="your.example@gmail.com"
                                                            className="bg-secondary/40 border-border/50 h-12 pl-11 rounded-xl focus:ring-primary/20 transition-all font-medium"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Sending Link...
                                            </div>
                                        ) : "Send Reset Link"}
                                    </Button>
                                </form>
                            </Form>
                        </>
                    ) : (
                        <div className="text-center space-y-6 py-4">
                            <div className="flex justify-center">
                                <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase">Check Your Email</h3>
                                <p className="text-muted-foreground font-medium text-sm">
                                    We've sent a password reset link to <br />
                                    <span className="text-foreground font-bold">{form.getValues("email")}</span>
                                </p>
                            </div>
                            <Button
                                onClick={() => setIsSubmitted(false)}
                                variant="outline"
                                className="w-full h-12 rounded-xl border-border/50 font-bold hover:bg-secondary/80 transition-all"
                            >
                                Resend Email
                            </Button>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-border/40 text-center">
                        <Link 
                            href="/auth/login" 
                            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </div>
                </div>

                <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-6 mt-8">
                    <span>&copy; 2026 Bharat AI Wealth</span>
                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                </div>
            </div>
        </div>
    )
}
