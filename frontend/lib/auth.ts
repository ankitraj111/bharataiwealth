export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

import { BACKEND_URL } from './api';

export const authService = {
    getUser: (): User | null => {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('token');
    },

    setAuth: (token: string, user: User) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        // Set cookie for middleware
        document.cookie = `bharat_auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
    },

    clearAuth: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Clear cookie
        document.cookie = 'bharat_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    },

    login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
        // Check if we're on GitHub Pages (static site) - use demo mode
        const isStaticSite = typeof window !== 'undefined' && 
            (window.location.hostname.includes('github.io') || 
             window.location.pathname.includes('/bharataiwealth'));

        if (isStaticSite) {
            // Demo login for static site
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Accept any email/password for demo
                    if (email && password.length >= 6) {
                        resolve({
                            token: 'demo-token-' + Date.now(),
                            user: {
                                id: 1,
                                name: email.split('@')[0] || 'Demo User',
                                email: email,
                                role: 'USER'
                            }
                        });
                    } else {
                        reject(new Error('Please enter valid email and password (min 6 characters)'));
                    }
                }, 500); // Simulate network delay
            });
        }

        // Production login with backend API
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

            const response = await fetch(`${BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                let errorMessage = 'Login failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    // If not JSON, try text
                    const text = await response.text().catch(() => '');
                    if (text) errorMessage = text;
                }
                throw new Error(errorMessage);
            }

            return response.json();
        } catch (error: any) {
            // If backend is unreachable, fallback to demo mode
            if (error.name === 'AbortError' || 
                error.message.includes('fetch') || 
                error.message.includes('Failed to fetch') ||
                error.message.includes('NetworkError') ||
                error.message.includes('CORS')) {
                console.warn('Backend unavailable, using demo mode');
                return {
                    token: 'demo-token-' + Date.now(),
                    user: {
                        id: 1,
                        name: email.split('@')[0] || 'Demo User',
                        email: email,
                        role: 'USER'
                    }
                };
            }
            throw error;
        }
    },

    register: async (name: string, email: string, password: string): Promise<{ token: string; user: User }> => {
        // Check if we're on GitHub Pages (static site) - use demo mode
        const isStaticSite = typeof window !== 'undefined' && 
            (window.location.hostname.includes('github.io') || 
             window.location.pathname.includes('/bharataiwealth'));

        if (isStaticSite) {
            // Demo registration for static site
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (name && email && password.length >= 6) {
                        resolve({
                            token: 'demo-token-' + Date.now(),
                            user: {
                                id: 1,
                                name: name,
                                email: email,
                                role: 'USER'
                            }
                        });
                    } else {
                        reject(new Error('Please fill all fields (password min 6 characters)'));
                    }
                }, 500);
            });
        }

        // Production registration with backend API
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

            const response = await fetch(`${BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                let errorMessage = 'Registration failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    // If not JSON, try text
                    const text = await response.text().catch(() => '');
                    if (text) errorMessage = text;
                }
                throw new Error(errorMessage);
            }

            return response.json();
        } catch (error: any) {
            // If backend is unreachable, fallback to demo mode
            if (error.name === 'AbortError' || 
                error.message.includes('fetch') || 
                error.message.includes('Failed to fetch') ||
                error.message.includes('NetworkError') ||
                error.message.includes('CORS')) {
                console.warn('Backend unavailable, using demo mode');
                return {
                    token: 'demo-token-' + Date.now(),
                    user: {
                        id: 1,
                        name: name,
                        email: email,
                        role: 'USER'
                    }
                };
            }
            throw error;
        }
    }
};
