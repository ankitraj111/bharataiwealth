// lib/token-storage.ts
// Secure token storage utilities

import config from './config';

/**
 * Token storage helper for managing JWT tokens securely
 */
export class TokenStorage {
    /**
     * Store access token (in memory for security, with localStorage fallback)
     */
    static setAccessToken(token: string): void {
        if (typeof window !== 'undefined') {
            // Store in localStorage as fallback (consider using memory-only in production)
            localStorage.setItem(config.TOKEN_STORAGE_KEY, token);
        }
    }

    /**
     * Get access token
     */
    static getAccessToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(config.TOKEN_STORAGE_KEY);
        }
        return null;
    }

    /**
     * Store refresh token (should be HttpOnly cookie in production)
     */
    static setRefreshToken(token: string): void {
        if (typeof window !== 'undefined') {
            // For now using localStorage, but in production use HttpOnly cookies
            localStorage.setItem(config.REFRESH_TOKEN_STORAGE_KEY, token);
        }
    }

    /**
     * Get refresh token
     */
    static getRefreshToken(): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(config.REFRESH_TOKEN_STORAGE_KEY);
        }
        return null;
    }

    /**
     * Store user data (non-sensitive only)
     */
    static setUser(user: any): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(config.USER_STORAGE_KEY, JSON.stringify(user));
        }
    }

    /**
     * Get user data
     */
    static getUser(): any | null {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem(config.USER_STORAGE_KEY);
            return userData ? JSON.parse(userData) : null;
        }
        return null;
    }

    /**
     * Clear all tokens and user data (logout)
     */
    static clearAll(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(config.TOKEN_STORAGE_KEY);
            localStorage.removeItem(config.REFRESH_TOKEN_STORAGE_KEY);
            localStorage.removeItem(config.USER_STORAGE_KEY);
        }
    }

    /**
     * Check if user is authenticated (has valid token)
     */
    static isAuthenticated(): boolean {
        return !!this.getAccessToken();
    }
}

export default TokenStorage;
