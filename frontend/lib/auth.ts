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
        const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

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
    },

    register: async (name: string, email: string, password: string): Promise<{ token: string; user: User }> => {
        const response = await fetch(`${BACKEND_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

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
    }
};
