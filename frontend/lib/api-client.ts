// lib/api-client.ts
// Centralized HTTP client with authentication and token refresh

import config from './config';
import TokenStorage from './token-storage';

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>;
}

export class ApiClient {
    private static baseURL = config.API_BASE_URL;
    private static isRefreshing = false;
    private static refreshSubscribers: Array<(token: string) => void> = [];

    /**
     * Subscribe to token refresh
     */
    private static subscribeTokenRefresh(callback: (token: string) => void): void {
        this.refreshSubscribers.push(callback);
    }

    /**
     * Notify all subscribers of new token
     */
    private static onRefreshed(token: string): void {
        this.refreshSubscribers.forEach((callback) => callback(token));
        this.refreshSubscribers = [];
    }

    /**
     * Refresh the access token
     */
    private static async refreshAccessToken(): Promise<string | null> {
        const refreshToken = TokenStorage.getRefreshToken();
        if (!refreshToken) {
            return null;
        }

        try {
            const response = await fetch(`${this.baseURL}${config.AUTH_ENDPOINTS.REFRESH}`, {
                method: 'POST',
                headers: config.DEFAULT_HEADERS,
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                TokenStorage.clearAll();
                window.location.href = '/login';
                return null;
            }

            const data = await response.json();
            TokenStorage.setAccessToken(data.token);
            TokenStorage.setRefreshToken(data.refreshToken);
            return data.token;
        } catch (error) {
            console.error('Token refresh failed:', error);
            TokenStorage.clearAll();
            window.location.href = '/login';
            return null;
        }
    }

    /**
     * Main request method
     */
    static async request<T = any>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const token = TokenStorage.getAccessToken();

        const headers: Record<string, string> = {
            ...config.DEFAULT_HEADERS,
            ...(options.headers as any),
        };

        // Add authorization header if token exists
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const requestOptions: RequestInit = {
            ...options,
            headers,
        };

        // Implementation of timeout — respects NEXT_PUBLIC_API_TIMEOUT (default 30s for Render cold-start)
        const timeout = options.signal ? 0 : config.API_TIMEOUT;
        let timeoutId: any;

        if (timeout > 0) {
            const controller = new AbortController();
            requestOptions.signal = controller.signal;
            timeoutId = setTimeout(() => controller.abort(), timeout);
        }

        try {
            let response = await fetch(url, requestOptions);
            if (timeoutId) clearTimeout(timeoutId);

            // Handle 401 Unauthorized - token expired
            if (response.status === 401 && token) {
                if (!this.isRefreshing) {
                    this.isRefreshing = true;
                    const newToken = await this.refreshAccessToken();
                    this.isRefreshing = false;

                    if (newToken) {
                        this.onRefreshed(newToken);
                        // Retry original request with new token
                        headers['Authorization'] = `Bearer ${newToken}`;
                        response = await fetch(url, { ...requestOptions, headers });
                    } else {
                        throw new Error('Session expired. Please login again.');
                    }
                } else {
                    // Wait for token refresh to complete
                    const newToken = await new Promise<string>((resolve) => {
                        this.subscribeTokenRefresh(resolve);
                    });
                    headers['Authorization'] = `Bearer ${newToken}`;
                    response = await fetch(url, { ...requestOptions, headers });
                }
            }

            // Handle rate limiting
            if (response.status === 429) {
                const error: ApiError = {
                    message: 'Too many requests. Please try again later.',
                    status: 429,
                };
                throw error;
            }

            // Handle other errors
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error(`API Error [${response.status}] ${url}:`, errorData);
                const error: ApiError = {
                    message: errorData.message || errorData.error || 'An error occurred',
                    status: response.status,
                    errors: errorData.errors,
                };
                throw error;
            }

            // Handle no content
            if (response.status === 204) {
                return {} as T;
            }

            return await response.json();
        } catch (error: any) {
            // Network errors
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                const networkError: ApiError = {
                    message: 'Network error. Please check your connection.',
                    status: 0,
                };
                throw networkError;
            }
            if (error.name === 'AbortError') {
                const timeoutError: ApiError = {
                    message: 'Request timed out. The server may be starting up. Please wait 30 seconds and try again.',
                    status: 408,
                };
                throw timeoutError;
            }
            throw error;
        }
    }

    /**
     * GET request
     */
    static get<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET' });
    }

    /**
     * POST request
     */
    static post<T = any>(
        endpoint: string,
        data?: any,
        options?: RequestInit
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * PUT request
     */
    static put<T = any>(
        endpoint: string,
        data?: any,
        options?: RequestInit
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * DELETE request
     */
    static delete<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'DELETE' });
    }

    /**
     * PATCH request
     */
    static patch<T = any>(
        endpoint: string,
        data?: any,
        options?: RequestInit
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }
}

export default ApiClient;
