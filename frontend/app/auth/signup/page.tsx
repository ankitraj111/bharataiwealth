"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck, Loader2, TrendingUp, Shield, Zap } from "lucide-react"
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
import { CryptoFinanceBackground } from "@/components/ui/CryptoFinanceBackground"
import config from "@/lib/config"
import AuthService from "@/services/auth.service"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const signupSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
    terms: z.boolean().refine(val => val === true, { message: "You must accept the terms" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
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

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isBackendDown, setIsBackendDown] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const googleButtonRef = useRef<HTMLDivElement>(null)
    const isGsiInitialized = useRef(false)
    const { register: registerUser, googleLogin, isLoading } = useAuth()
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
                setError(e.message || "Google signup failed. Please try again.")
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
                context: "signup",
            })

            if (googleButtonRef.current) {
                window.google.accounts.id.renderButton(googleButtonRef.current, {
                    theme: "outline",
                    size: "large",
                    type: "standard",
                    text: "signup_with",
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
        const realBtn = googleButtonRef.current?.querySelector('div[role="button"]') as HTMLElement | null
        if (realBtn) {
            realBtn.click()
        } else {
            window.google.accounts.id.prompt((notification: any) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    setError("Google Sign-In was blocked by browser. Please allow popups for this site and try again.")
                }
            })
        }
    }, [])

    useEffect(() => {
        AuthService.checkHealth().catch(() => {
            console.log("Backend is initializing in background...");
        });

        if (window.google) {
            initializeGoogleSignIn()
        }
    }, [initializeGoogleSignIn])

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
    })

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        setError(null)
        setIsBackendDown(false)
        try {
            await registerUser({ name: values.name, email: values.email, password: values.password })
        } catch (e: any) {
            const msg: string = e.message || "Something went wrong. Please try again."
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

            <div className="min-h-screen relative overflow-hidden font-sans" style={{ background: '#12121e' }}>
                {/* Full-page Crypto Finance Animated Background */}
                <div className="absolute inset-0 z-0">
                    <CryptoFinanceBackground />
                </div>

                {/* Vignette overlay for depth */}
                <div className="absolute inset-0 z-[1]" style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,20,0.5) 100%)',
                }} />

                <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
                    {/* Left Side: Fintech Branding */}
                    <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
                        {/* Logo */}
                        <div className="relative z-10 flex items-center">
                            <div className="w-[76px] flex items-center justify-center h-full overflow-hidden">
                                <img src={`${basePath}/logo2.png`} alt="Bharat AI Wealth" className="h-[45px] w-full drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                            </div>
                            <div className="pl-2 text-2xl text-bold leading-[20px] text-[#F8FAFC] font-bold">
                                BHARAT <br /><span className="text-sm bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent italic">AI Wealth</span>
                            </div>
                        </div>

                        {/* Hero Content */}
                        <div className="relative z-10 space-y-6 max-w-lg">
                            <h1 className="text-5xl font-black tracking-tighter leading-tight text-white">
                                Start Your Journey, <br />
                                <span className="bg-gradient-to-r from-[#60A5FA] to-[#2563EB] bg-clip-text text-transparent italic">Build Wealth</span>
                            </h1>
                            <p className="text-lg text-[#94A3B8] font-medium leading-relaxed">
                                Join <span className="text-white font-bold">10,000+</span> Indians achieving financial freedom with AI-powered investing.
                            </p>

                            {/* Feature badges */}
                            <div className="flex flex-wrap gap-3 py-2">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 backdrop-blur-sm">
                                    <TrendingUp className="h-4 w-4 text-[#3B82F6]" />
                                    <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider">Live Market Data</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#60A5FA]/20 bg-[#60A5FA]/5 backdrop-blur-sm">
                                    <Shield className="h-4 w-4 text-[#60A5FA]" />
                                    <span className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider">Bank-Grade Security</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#93C5FD]/20 bg-[#93C5FD]/5 backdrop-blur-sm">
                                    <Zap className="h-4 w-4 text-[#93C5FD]" />
                                    <span className="text-xs font-bold text-[#93C5FD] uppercase tracking-wider">AI Predictions</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="relative z-10 flex gap-6 text-[#64748B] text-sm font-semibold">
                            <Link href="/privacy" className="hover:text-[#3B82F6] transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-[#3B82F6] transition-colors">Terms of Service</Link>
                        </div>
                    </div>

                    {/* Right Side: Signup Form */}
                    <div className="flex items-center justify-center p-4 lg:p-12 relative w-full overflow-y-auto max-h-screen">
                        <div 
                            className="w-full max-w-[460px] p-8 sm:p-10 rounded-[2rem] space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10 my-8 lg:my-0"
                            style={{
                                background: 'linear-gradient(145deg, rgba(20,25,40,0.7) 0%, rgba(5,8,15,0.85) 100%)',
                                backdropFilter: 'blur(40px)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                boxShadow: '0 30px 100px -10px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.08)',
                            }}
                        >
                            {/* Mobile logo */}
                            <div className="flex items-center justify-center gap-3 lg:hidden mb-4">
                                <img src={`${basePath}/logo2.png`} alt="Bharat AI Wealth" className="h-10 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
                                <div className="text-xl font-bold text-[#F8FAFC]">BHARAT <span className="text-sm bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent italic">AI Wealth</span></div>
                            </div>

                            <div className="space-y-2 text-center">
                                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-md">
                                    Create account
                                </h2>
                                <p className="text-[#64748B] font-medium text-sm lg:text-base">Start your wealth building journey.</p>
                            </div>

                            {/* Subtle error message */}
                            {error && (
                                <div className="p-4 rounded-xl border text-sm font-semibold flex items-center gap-3" style={{
                                    background: 'rgba(239,68,68,0.1)',
                                    borderColor: 'rgba(239,68,68,0.2)',
                                    color: '#F87171',
                                }}>
                                    <div className="h-2 w-2 rounded-full bg-[#EF4444] animate-pulse flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Google Sign-In Button */}
                            <div className="space-y-3 relative">
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
                                    className="w-full h-14 rounded-xl font-semibold transition-all flex items-center px-4 gap-3 active:scale-[0.98] focus:outline-none cursor-pointer"
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: '#E2E8F0',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {isGoogleLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin text-[#3B82F6]" />
                                    ) : (
                                        <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                    )}
                                    <span className="flex-1 text-center pr-5">Sign up with Google</span>
                                </button>
                            </div>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
                                </div>
                                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                                    <span className="px-4 text-[#64748B] bg-transparent">OR CONTINUE WITH EMAIL</span>
                                </div>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative group">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B] group-focus-within:text-[#60A5FA] transition-colors duration-300" />
                                                        <Input
                                                            placeholder="Full Name"
                                                            className="h-14 pl-12 rounded-xl font-medium transition-all duration-300 focus-visible:ring-1 focus-visible:ring-[#60A5FA] focus-visible:border-[#60A5FA]"
                                                            style={{
                                                                background: 'rgba(255,255,255,0.03)',
                                                                border: '1px solid rgba(255,255,255,0.06)',
                                                                color: '#F8FAFC',
                                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                                                            }}
                                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
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
                                                <FormControl>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B] group-focus-within:text-[#60A5FA] transition-colors duration-300" />
                                                        <Input
                                                            placeholder="Email Address"
                                                            className="h-14 pl-12 rounded-xl font-medium transition-all duration-300 focus-visible:ring-1 focus-visible:ring-[#60A5FA] focus-visible:border-[#60A5FA]"
                                                            style={{
                                                                background: 'rgba(255,255,255,0.03)',
                                                                border: '1px solid rgba(255,255,255,0.06)',
                                                                color: '#F8FAFC',
                                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                                                            }}
                                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
                                                            autoComplete="off"
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
                                                    <FormControl>
                                                        <div className="relative group">
                                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] group-focus-within:text-[#60A5FA] transition-colors duration-300" />
                                                            <Input
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Password"
                                                                className="h-14 pl-9 pr-8 rounded-xl font-medium transition-all duration-300 focus-visible:ring-1 focus-visible:ring-[#60A5FA] focus-visible:border-[#60A5FA] text-sm"
                                                                style={{
                                                                    background: 'rgba(255,255,255,0.03)',
                                                                    border: '1px solid rgba(255,255,255,0.06)',
                                                                    color: '#F8FAFC',
                                                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                                                                }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
                                                                autoComplete="new-password"
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
                                                    <FormControl>
                                                        <div className="relative group">
                                                            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B] group-focus-within:text-[#60A5FA] transition-colors duration-300" />
                                                            <Input
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Confirm"
                                                                className="h-14 pl-9 pr-8 rounded-xl font-medium transition-all duration-300 focus-visible:ring-1 focus-visible:ring-[#60A5FA] focus-visible:border-[#60A5FA] text-sm"
                                                                style={{
                                                                    background: 'rgba(255,255,255,0.03)',
                                                                    border: '1px solid rgba(255,255,255,0.06)',
                                                                    color: '#F8FAFC',
                                                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                                                                }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
                                                                autoComplete="new-password"
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    
                                    <div className="flex justify-end pt-1">
                                         <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-xs font-semibold text-[#64748B] hover:text-[#F8FAFC] transition-colors flex items-center gap-1.5"
                                        >
                                            {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                            {showPassword ? 'Hide passwords' : 'Show passwords'}
                                        </button>
                                    </div>

                                    <div className="flex items-center space-x-2 pt-2">
                                        <FormField
                                            control={form.control}
                                            name="terms"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox 
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            className="rounded-md border-[rgba(255,255,255,0.2)] mt-0.5" 
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="text-xs font-medium text-[#94A3B8] cursor-pointer">
                                                            I agree to the <Link href="/terms" className="text-[#60A5FA] hover:text-[#93C5FD]">Terms of Service</Link> and <Link href="/privacy" className="text-[#60A5FA] hover:text-[#93C5FD]">Privacy Policy</Link>
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 rounded-xl font-bold text-base transition-all duration-300 active:scale-[0.98] cursor-pointer hover:shadow-[0_15px_40px_-10px_rgba(59,130,246,0.6)] mt-6"
                                        style={{
                                            background: 'linear-gradient(to right, #2563EB, #3B82F6)',
                                            color: '#fff',
                                            boxShadow: '0 10px 30px -10px rgba(37,99,235,0.5), inset 0 1px 1px rgba(255,255,255,0.3)',
                                            border: 'none',
                                        }}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span>Creating account...</span>
                                            </div>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </Button>
                                </form>
                            </Form>

                            <div className="text-center pt-4 border-t border-[rgba(255,255,255,0.05)]">
                                <span className="text-sm text-[#64748B] font-semibold">Already have an account? </span>
                                <Link href="/auth/login" className="text-sm font-bold text-[#60A5FA] hover:text-[#93C5FD] transition-colors ml-1">
                                    Sign in
                                </Link>
                            </div>

                            {/* Trust badges */}
                            <div className="flex justify-center items-center gap-3 pt-2 text-[10px] font-bold text-[#475569] tracking-widest uppercase">
                                <div className="flex items-center gap-1.5">
                                    <ShieldCheck className="h-3.5 w-3.5 text-[#3B82F6]" />
                                    <span>256-bit SSL Encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
