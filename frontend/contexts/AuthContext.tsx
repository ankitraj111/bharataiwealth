'use client';

// contexts/AuthContext.tsx
// Global authentication state management

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import AuthService, { User, LoginRequest, RegisterRequest, MfaVerifyRequest } from '@/services/auth.service';
import TokenStorage from '@/lib/token-storage';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    mfaRequired: boolean;
    tempToken: string | null;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    verifyMfa: (code: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mfaRequired, setMfaRequired] = useState(false);
    const [tempToken, setTempToken] = useState<string | null>(null);
    const router = useRouter();

    // Initialize auth state from storage
    useEffect(() => {
        const initAuth = () => {
            const storedToken = TokenStorage.getAccessToken();
            const storedUser = TokenStorage.getUser();

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(storedUser);
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    /**
     * Login with email and password
     */
    const login = async (data: LoginRequest) => {
        // Demo credentials for local development when backend is not running
        const DEMO_CREDENTIALS = [
            { email: 'demo@bharatai.com', password: 'demo123', role: 'PREMIUM', name: 'Demo User' },
            { email: 'admin@bharatai.com', password: 'admin123', role: 'ADMIN', name: 'Admin User' },
        ];

        try {
            const response = await AuthService.login(data);

            if (response.mfaRequired) {
                // MFA required - store temp token and redirect
                setMfaRequired(true);
                setTempToken(response.tempToken || null);
                setUser(response.user);
                router.push('/verify-mfa');
            } else {
                // Login successful - store tokens and user
                TokenStorage.setAccessToken(response.token);
                if (response.refreshToken) {
                    TokenStorage.setRefreshToken(response.refreshToken);
                }
                TokenStorage.setUser(response.user);

                setToken(response.token);
                setUser(response.user);
                setMfaRequired(false);
                setTempToken(null);

                router.push('/dashboard');
            }
        } catch (error: any) {
            // Check if it's a network error (backend not running)
            const isNetworkError = error?.status === 0 || error?.message?.includes('Network error') || error?.message?.includes('Failed to fetch');
            const isDemoEnv = typeof window !== 'undefined' &&
                (window.location.hostname.includes('github.io') ||
                    window.location.pathname.includes('/bharataiwealth'));

            // Use demo fallback if: network error on localhost OR demo environment
            if (isNetworkError || isDemoEnv) {
                const matchedDemo = DEMO_CREDENTIALS.find(
                    c => c.email === data.email && c.password === data.password
                );

                if (matchedDemo) {
                    console.warn('Backend not reachable — using demo credentials fallback.');
                    const demoUser: User = { id: 1, name: matchedDemo.name, email: data.email, role: matchedDemo.role, mfaEnabled: false };
                    TokenStorage.setAccessToken('demo-token-' + Date.now());
                    TokenStorage.setUser(demoUser);
                    setToken('demo-token-' + Date.now());
                    setUser(demoUser);
                    router.push('/dashboard');
                    return;
                } else if (isNetworkError) {
                    // Backend is down and credentials don't match demo
                    throw { message: 'Backend server is not running. Start the Spring Boot backend on port 8080, or use demo credentials: demo@bharatai.com / demo123', status: 0 };
                }
            }

            console.error('Login error:', error.message || error);
            throw error;
        }
    };

    /**
     * Register a new user
     */
    const register = async (data: RegisterRequest) => {
        const isDemoEnv = typeof window !== 'undefined' &&
            (window.location.hostname.includes('github.io') ||
                window.location.hostname.includes('vercel.app') ||
                window.location.hostname.includes('onrender.com') ||
                window.location.pathname.includes('/bharataiwealth'));

        try {
            const response = await AuthService.register(data);

            // Store tokens and user
            TokenStorage.setAccessToken(response.token);
            if (response.refreshToken) {
                TokenStorage.setRefreshToken(response.refreshToken);
            }
            TokenStorage.setUser(response.user);

            setToken(response.token);
            setUser(response.user);
            setMfaRequired(false);
            setTempToken(null);

            router.push('/dashboard');
        } catch (error: any) {
            const isNetworkError = error?.status === 0 || error?.status === 408 || error?.message?.includes('Network error') || error?.message?.includes('Failed to fetch') || error?.message?.includes('timed out');

            if (isDemoEnv || isNetworkError) {
                console.warn('Backend not reachable — using demo registration fallback.');
                const demoUser: User = { id: 1, name: data.name, email: data.email, role: 'USER', mfaEnabled: false };
                TokenStorage.setAccessToken('demo-token-' + Date.now());
                TokenStorage.setUser(demoUser);
                setToken('demo-token-' + Date.now());
                setUser(demoUser);
                router.push('/dashboard');
                return;
            }
            console.error('Register error:', error);
            throw error;
        }
    };

    /**
     * Verify MFA code
     */
    const verifyMfa = async (code: string) => {
        if (!tempToken) {
            throw new Error('No MFA temp token found');
        }

        try {
            const response = await AuthService.verifyMfa({ tempToken, code });

            // Store tokens and user
            TokenStorage.setAccessToken(response.token);
            if (response.refreshToken) {
                TokenStorage.setRefreshToken(response.refreshToken);
            }
            TokenStorage.setUser(response.user);

            setToken(response.token);
            setUser(response.user);
            setMfaRequired(false);
            setTempToken(null);

            router.push('/dashboard');
        } catch (error: any) {
            console.error('MFA verification error:', error);
            throw error;
        }
    };

    /**
     * Logout
     */
    const logout = async () => {
        try {
            await AuthService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear all state
            TokenStorage.clearAll();
            setToken(null);
            setUser(null);
            setMfaRequired(false);
            setTempToken(null);

            router.push('/login');
        }
    };

    /**
     * Refresh user data
     */
    const refreshUser = () => {
        const storedUser = TokenStorage.getUser();
        if (storedUser) {
            setUser(storedUser);
        }
    };

    const value = {
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        mfaRequired,
        tempToken,
        login,
        register,
        verifyMfa,
        logout,
        refreshUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
