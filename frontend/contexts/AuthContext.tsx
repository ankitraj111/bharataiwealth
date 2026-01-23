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
            console.error('Login error:', error.message || error);
            console.dir(error);
            throw error;
        }
    };

    /**
     * Register a new user
     */
    const register = async (data: RegisterRequest) => {
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
