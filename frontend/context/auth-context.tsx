"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { authService, User } from '@/lib/auth'
import { BACKEND_URL } from '@/lib/api'

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    demoLogin: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for existing session on mount
        const savedUser = authService.getUser()
        const token = authService.getToken()

        if (savedUser && token) {
            setUser(savedUser)
        }

        // Client-side route protection for static export
        const pathname = window.location.pathname
        const protectedRoutes = ['/dashboard', '/predictions', '/analytics', '/advisor', '/portfolios', '/expenses', '/family', '/goals', '/emergency-fund', '/sandbox', '/tax', '/settings']
        const authRoutes = ['/auth/login', '/auth/signup']

        // If user is logged in and trying to access auth pages, redirect to dashboard
        if (token && authRoutes.some(route => pathname.includes(route))) {
            router.push('/dashboard')
        }

        // If user is NOT logged in and trying to access protected pages, redirect to login
        if (!token && protectedRoutes.some(route => pathname.includes(route))) {
            router.push('/auth/login')
        }

        setIsLoading(false)
    }, [router])

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            const { token, user } = await authService.login(email, password)
            authService.setAuth(token, user)
            setUser(user)
            router.push('/dashboard')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            throw error
        }
    }

    const demoLogin = async () => {
        await login('demo@bharatai.com', 'demo123')
    }

    const logout = () => {
        authService.clearAuth()
        setUser(null)
        router.push('/auth/login')
    }

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            logout,
            demoLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
