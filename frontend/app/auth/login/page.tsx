"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Lock, Mail, Sparkles, Loader2, Chrome, Smartphone, Info } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/AuthContext"
import { DotsBackground } from "@/components/ui/DotsBackground"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean().default(false).optional(),
})

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isStaticSite, setIsStaticSite] = useState(false)
    const { login, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        // Check if running on GitHub Pages
        if (typeof window !== 'undefined') {
            const isGitHubPages = window.location.hostname.includes('github.io') ||
                window.location.pathname.includes('/bharataiwealth')
            setIsStaticSite(isGitHubPages)
        }
    }, [])

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setError(null)
        try {
            await login({ email: values.email, password: values.password })
            // Redirect handled by AuthContext (dashboard or MFA)
        } catch (e: any) {
            setError(e.message || "Invalid credentials. Please try again.")
        }
    }

    const handleDemoLogin = async () => {
        setError(null)
        form.setValue('email', 'demo@bharatai.com')
        form.setValue('password', 'demo123')
        try {
            await login({ email: 'demo@bharatai.com', password: 'demo123' })
        } catch (e: any) {
            setError("Demo login failed. Please register first.")
        }
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background overflow-hidden font-sans">
            {/* Left Side: Branding/Visuals */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary/20 via-background to-secondary/20 relative">
                <div className="absolute inset-0 z-0">
                    <DotsBackground />
                </div>
                <div className="absolute inset-0 bg-noise-pattern opacity-10 brightness-100 contrast-150 pointer-events-none z-0" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                        <Sparkles className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase text-primary drop-shadow-sm">Bharat AI <span className="text-gradient-gold">Wealth</span></span>
                </div>

                <div className="relative z-10 space-y-6 max-w-lg">
                    <h1 className="text-5xl font-black tracking-tighter leading-tight text-foreground">
                        Aage badho Bharat, <br />
                        <span className="text-primary italic">AI Wealth</span> ke saath.
                    </h1>
                    <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                        The next generation of financial intelligence for India. Secure, automated, and built for your future.
                    </p>
                    <div className="flex items-center gap-4 py-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary/80" />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground tracking-wide">Joined by 10k+ investors this month</span>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-muted-foreground flex items-center gap-6">
                    <span>&copy; 2026 Bharat AI Wealth</span>
                    <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex items-center justify-center p-6 lg:p-12 relative">
                <div className="absolute inset-0 z-0">
                    <DotsBackground />
                </div>
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
                    <div className="space-y-2 text-center lg:text-left">
                        <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase">Welcome Back</h2>
                        <p className="text-muted-foreground font-medium">Please enter your details to access your wealth.</p>
                    </div>

                    {isStaticSite && (
                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-semibold flex items-start gap-3">
                            <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-bold mb-1">Demo Mode Active</p>
                                <p className="text-xs font-normal opacity-90">
                                    You're viewing the static demo. Enter any email and password (min 6 chars) to explore the platform.
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

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-foreground/80">Email / Username</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                                                    <Input
                                                        placeholder="rajesh@bharatai.com"
                                                        className="bg-secondary/40 border-border/50 h-12 pl-11 rounded-xl focus:ring-primary/20 transition-all font-medium"
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
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-foreground/80">Password</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="••••••••"
                                                        className="bg-secondary/40 border-border/50 h-12 pl-11 pr-11 rounded-xl focus:ring-primary/20 transition-all font-medium"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                                                    >
                                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" className="rounded-md border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                    <label htmlFor="remember" className="text-sm font-semibold text-muted-foreground cursor-pointer select-none">Remember me</label>
                                </div>
                                <Link href="/auth/forgot" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">Forgot password?</Link>
                            </div>

                            <div className="space-y-3 pt-2">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Signing in...
                                        </div>
                                    ) : "Sign In"}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest text-muted-foreground font-bold">
                            <span className="bg-background px-4">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 rounded-xl border-border/50 font-bold hover:bg-secondary/80 transition-all" type="button">
                            <Chrome className="mr-2 h-4 w-4 text-red-500" />
                            Google
                        </Button>
                        <Button variant="outline" className="h-12 rounded-xl border-border/50 font-bold hover:bg-secondary/80 transition-all" type="button">
                            <Smartphone className="mr-2 h-4 w-4 text-emerald-500" />
                            OTP
                        </Button>
                    </div>

                    <p className="text-center text-sm font-semibold text-muted-foreground tracking-tight">
                        Don't have an account?{" "}
                        <Link href="/auth/signup" className="text-primary hover:text-primary/80 transition-all font-black">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
