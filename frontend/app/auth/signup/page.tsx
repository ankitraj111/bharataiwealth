"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck, Loader2, ArrowLeft, Info } from "lucide-react"

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
import { useAuth } from "@/contexts/AuthContext"

const signupSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSlowMessage, setShowSlowMessage] = useState(false)
    const [isStaticSite, setIsStaticSite] = useState(false)
    const { register } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // Check if running on GitHub Pages
        if (typeof window !== 'undefined') {
            const isGitHubPages = window.location.hostname.includes('github.io') ||
                window.location.pathname.includes('/bharataiwealth')
            setIsStaticSite(isGitHubPages)
        }
    }, [])

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        setError(null)
        setIsSubmitting(true)
        setShowSlowMessage(false)

        const slowTimer = setTimeout(() => {
            setShowSlowMessage(true)
        }, 3000)

        try {
            await register({ name: values.name, email: values.email, password: values.password })
            clearTimeout(slowTimer)
            // Redirect handled by AuthContext
        } catch (e: any) {
            clearTimeout(slowTimer)
            setError(e.message || "Something went wrong. Please try again.")
            setIsSubmitting(false)
            setShowSlowMessage(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-between items-center mb-4">
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Login
                    </Link>
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.svg"
                            alt="Bharta AI Wealth Logo"
                            width={160}
                            height={50}
                            priority
                            className="h-12 w-auto object-contain"
                        />
                    </Link>
                </div>

                <div className="space-y-2 text-center">
                    <h2 className="text-4xl font-black tracking-tighter text-foreground uppercase">Create Account</h2>
                    <p className="text-muted-foreground font-medium">Join 10,000+ Indians achieving financial freedom.</p>
                </div>

                {isStaticSite && (
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold flex items-start gap-3">
                        <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-bold mb-1">Demo Mode Active</p>
                            <p className="text-xs font-normal opacity-90">
                                You're viewing the static demo. Fill in any details to create a demo account and explore the platform.
                            </p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold flex items-center gap-3 animate-shake">
                        <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                        {error}
                    </div>
                )}

                <div className="bg-secondary/20 border border-border/50 p-8 rounded-3xl backdrop-blur-xl shadow-2xl shadow-primary/5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-foreground/80">Full Name</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                                                <Input
                                                    placeholder="Your Full Name"
                                                    className="bg-background/50 border-border/50 h-12 pl-11 rounded-xl focus:ring-primary/20 transition-all font-medium"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                                    className="bg-background/50 border-border/50 h-12 pl-11 rounded-xl focus:ring-primary/20 transition-all font-medium"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-foreground/80">Password</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••"
                                                        className="bg-background/50 border-border/50 h-12 pl-10 pr-10 rounded-xl focus:ring-primary/20 transition-all font-medium"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-foreground/80">Confirm</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••"
                                                        className="bg-background/50 border-border/50 h-12 pl-10 pr-10 rounded-xl focus:ring-primary/20 transition-all font-medium"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                                >
                                    {showPassword ? "Hide all passwords" : "Show all passwords"}
                                </button>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base shadow-xl shadow-primary/20 transition-all active:scale-[0.98] mt-4"
                            >
                                {isSubmitting ? (
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            {showSlowMessage ? "Securing Your Vault..." : "Creating Account..."}
                                        </div>
                                        {showSlowMessage && (
                                            <span className="text-[10px] font-medium animate-pulse opacity-70">
                                                Connecting to Bharat AI secure network
                                            </span>
                                        )}
                                    </div>
                                ) : "Start Wealth Journey"}
                            </Button>
                        </form>
                    </Form>
                </div>

                <p className="text-center text-sm font-semibold text-muted-foreground tracking-tight">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-primary hover:text-primary/80 transition-all font-black">
                        Sign In
                    </Link>
                </p>

                <div className="text-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest leading-loose">
                        Secure & Trusted by Bharat AI Security
                    </span>
                </div>
            </div>
        </div>
    )
}
