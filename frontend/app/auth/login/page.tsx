"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Lock, Mail, Loader2, Info } from "lucide-react"
import Script from "next/script"

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
import config from "@/lib/config"
import AuthService from "@/services/auth.service"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean().default(false).optional(),
})

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: object) => void
                    renderButton: (element: HTMLElement, config: object) => void
                    prompt: (callback?: (notification: any) => void) => void
                    cancel: () => void
                }
            }
        }
    }
}

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isBackendDown, setIsBackendDown] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const googleButtonRef = useRef<HTMLDivElement>(null)
    const isGsiInitialized = useRef(false)
    const { login, googleLogin, isLoading } = useAuth()
    const router = useRouter()

    const handleGoogleCallback = useCallback(async (response: { credential: string }) => {
        setIsGoogleLoading(true)
        setError(null)
        setIsBackendDown(false)
        try {
            await googleLogin(response.credential)
        } catch (e: any) {
            const isNetworkOrTimeout =
                e?.status === 0 ||
                e?.status === 408 ||
                e?.message?.includes('Network error') ||
                e?.message?.includes('Failed to fetch') ||
                e?.message?.includes('timed out') ||
                e?.message?.includes('slow to respond')
            if (isNetworkOrTimeout) {
                setIsBackendDown(true)
            } else {
                setError(e.message || "Google login failed. Please try again.")
            }
        } finally {
            setIsGoogleLoading(false)
        }
    }, [googleLogin])

    const initializeGoogleSignIn = useCallback(() => {
        const clientId = config.GOOGLE_CLIENT_ID?.trim()
        if (!clientId || !window.google || isGsiInitialized.current) return

        try {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleCallback,
                auto_select: false,
                use_fedcm_for_prompt: false,
                itp_support: true,
                context: "signin",
            })

            // Render the real Google button into an invisible (but NOT display:none) div.
            // display:none prevents GSI from rendering; opacity-0 + absolute works correctly.
            if (googleButtonRef.current) {
                window.google.accounts.id.renderButton(googleButtonRef.current, {
                    theme: "outline",
                    size: "large",
                    type: "standard",
                    text: "continue_with",
                    shape: "rectangular",
                    ux_mode: "popup",
                    width: 300,
                })
            }

            isGsiInitialized.current = true
        } catch (err) {
            console.error("GSI Init Error:", err)
        }
    }, [handleGoogleCallback])

    const handleGoogleButtonClick = useCallback(() => {
        if (!config.GOOGLE_CLIENT_ID) {
            setError("Google Sign-In is not configured.")
            return
        }
        if (!window.google) {
            setError("Google Sign-In script failed to load. Please refresh the page.")
            return
        }
        // Try clicking the GSI-rendered button first (most reliable popup approach)
        const realBtn = googleButtonRef.current?.querySelector('div[role="button"]') as HTMLElement | null
        if (realBtn) {
            realBtn.click()
        } else {
            // Fallback: use prompt() — works when button isn't rendered yet
            window.google.accounts.id.prompt((notification: any) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    setError("Google Sign-In was blocked by browser. Please allow popups for this site and try again.")
                }
            })
        }
    }, [])

    useEffect(() => {
        // Proactive wake-up call for the backend (handles Render cold-starts)
        AuthService.checkHealth().catch(() => {
            console.log("Backend is initializing in background...");
        });

        if (window.google) {
            initializeGoogleSignIn()
        }
    }, [initializeGoogleSignIn])

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
        setIsBackendDown(false)
        try {
            await login({ email: values.email, password: values.password })
        } catch (e: any) {
            const msg: string = e.message || "Invalid credentials. Please try again."
            if (e.status === 0 || msg.includes('Network error') || msg.includes('Backend server')) {
                setIsBackendDown(true)
            } else {
                setError(msg)
            }
        }
    }

    return (
        <>
            <Script
                src="https://accounts.google.com/gsi/client"
                onLoad={initializeGoogleSignIn}
                strategy="afterInteractive"
            />

            <div className="min-h-screen relative bg-background overflow-hidden font-sans">
                {/* Full-page DotsBackground */}
                <div className="absolute inset-0 z-0">
                    <DotsBackground />
                </div>
                <div className="absolute inset-0 bg-noise-pattern opacity-10 brightness-100 contrast-150 pointer-events-none z-0" />

                <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
                    {/* Left Side: Branding */}
                    <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
                        <div className="relative z-10 flex items-center">
                            <div className="w-[76px] flex items-center justify-center h-full overflow-hidden">
                                <img src={`${basePath}/logo2.png`} alt="Bharat AI Wealth" className="h-[45px] w-full" />
                            </div>
                            <div className="pl-2 text-2xl text-bold leading-[20px] text-[#D4AF37] font-bold">
                                BHARAT <br /><span className="text-sm from-[#1E88E5] bg-gradient-to-r via-[#8B64AA] to-[#FFC107] bg-clip-text text-transparent italic">AI Wealth</span>
                            </div>
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
                                        <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary/80 shadow-sm" />
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
                        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
                            <div className="space-y-2 text-center lg:text-left">
                                <h2 className="text-3xl font-black tracking-tighter text-foreground uppercase">Welcome Back</h2>
                                <p className="text-muted-foreground font-medium">Please enter your details to access your wealth.</p>
                            </div>

                            {/* Subtle error message if credentials fail */}
                            {error && (
                                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-destructive animate-pulse flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Google Sign-In Button */}
                            <div className="space-y-3 relative">
                                {/*
                                  Real Google button — must NOT be display:none (hidden class).
                                  Google GSI refuses to render inside a display:none element.
                                  We use opacity-0 + absolute positioning so it's invisible but rendered.
                                */}
                                <div
                                    ref={googleButtonRef}
                                    aria-hidden="true"
                                    style={{
                                        position: 'absolute',
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        overflow: 'hidden',
                                        width: '300px',
                                        height: '50px',
                                        zIndex: -1,
                                    }}
                                />

                                <button
                                    type="button"
                                    disabled={isGoogleLoading}
                                    onClick={handleGoogleButtonClick}
                                    className="w-full h-12 rounded-xl border border-border/50 bg-secondary/30 backdrop-blur-sm font-semibold text-foreground/80 hover:bg-secondary/50 transition-all flex items-center px-4 gap-3 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    {isGoogleLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                    ) : (
                                        <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                    )}
                                    <span className="flex-1 text-center pr-5">Continue with Google</span>
                                </button>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border/50" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase tracking-widest text-muted-foreground font-bold">
                                    <span className="bg-background px-4">Or sign in with email</span>
                                </div>
                            </div>

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
                                                                placeholder="your.example@gmail.com"
                                                                className="bg-secondary/40 border-border/50 h-12 pl-11 rounded-xl focus:ring-primary/20 transition-all font-medium"
                                                                autoComplete="off"
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
                                                                placeholder="Password"
                                                                className="bg-secondary/40 border-border/50 h-12 pl-11 pr-11 rounded-xl focus:ring-primary/20 transition-all font-medium"
                                                                autoComplete="new-password"
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
                                            <Checkbox id="remember" className="rounded-md border-border/50" />
                                            <label htmlFor="remember" className="text-sm font-semibold text-muted-foreground cursor-pointer select-none">Remember me</label>
                                        </div>
                                        <Link href="/auth/forgot" className="text-sm font-bold text-[#1E88E5] hover:text-[#1E88E5]/80 transition-colors">Forgot password?</Link>
                                    </div>

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

                                    {/* Subtle Connection Status */}
                                    {isBackendDown && (
                                        <div className="flex items-center justify-center gap-2 text-amber-500/60 animate-in fade-in slide-in-from-top-1 duration-500">
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure AI Connection Initializing...</span>
                                        </div>
                                    )}
                                </form>
                            </Form>

                            <p className="text-center text-sm font-semibold text-muted-foreground tracking-tight pt-4">
                                Don't have an account?{" "}
                                <Link href="/auth/signup" className="text-primary hover:text-primary/80 transition-all font-black">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
