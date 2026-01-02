"use client"

/**
 * Mock Authentication Utilities for Bharat AI Wealth
 * Encapsulates token management and simulated API calls.
 */

export interface User {
    id: string
    name: string
    email: string
    role: 'user' | 'premium' | 'admin'
}

const AUTH_TOKEN_KEY = 'bharat_auth_token'
const USER_DATA_KEY = 'bharat_user_data'

/**
 * Simulates a JWT token by base64 encoding a payload
 */
export const generateMockToken = (userId: string) => {
    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
    }
    return btoa(JSON.stringify(payload))
}

/**
 * Authentication Service Wrapper
 */
export const authService = {
    // Get token from storage
    getToken: () => {
        if (typeof window === 'undefined') return null
        return localStorage.getItem(AUTH_TOKEN_KEY)
    },

    // Get user data from storage
    getUser: (): User | null => {
        if (typeof window === 'undefined') return null
        const data = localStorage.getItem(USER_DATA_KEY)
        return data ? JSON.parse(data) : null
    },

    // Save auth data
    setAuth: (token: string, user: User) => {
        localStorage.setItem(AUTH_TOKEN_KEY, token)
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
        // Set a cookie for middleware to access (since middleware runs on edge/server)
        document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=86400; SameSite=Lax`
    },

    // Remove auth data
    clearAuth: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        localStorage.removeItem(USER_DATA_KEY)
        document.cookie = `${AUTH_TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
    },

    // Simulated Login API
    login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
        // Artificial delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        if (email === 'demo@bharatai.com' && password === 'demo123') {
            const user: User = { id: '1', name: 'Demo User', email, role: 'premium' }
            const token = generateMockToken(user.id)
            return { token, user }
        }

        if (email === 'rajesh@bharatai.com' && password === 'password123') {
            const user: User = { id: '2', name: 'Rajesh Kumar', email, role: 'premium' }
            const token = generateMockToken(user.id)
            return { token, user }
        }

        throw new Error('Invalid email or password')
    },

    // Simulated Register API
    register: async (name: string, email: string, password: string): Promise<User> => {
        await new Promise(resolve => setTimeout(resolve, 1500))
        // In a mock environment, we just "create" the user
        return { id: Math.random().toString(36).substr(2, 9), name, email, role: 'user' }
    }
}
