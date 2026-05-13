"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { NotificationProvider } from "@/contexts/NotificationContext"
import { ReactNode, useState, useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import AuthService from "@/services/auth.service"

function BackendWarmup() {
    useEffect(() => {
        // Proactive wake-up call for the backend on any page load
        AuthService.checkHealth().catch(() => {
            console.log("Bharat AI Backend is initializing...");
        });
    }, []);
    return null;
}

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
                gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
                retry: 1,
                retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            },
            mutations: {
                retry: 1,
            },
        },
    }))

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <NotificationProvider>
                        <BackendWarmup />
                        {children}
                    </NotificationProvider>
                </AuthProvider>
                {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
        </ThemeProvider>
    )
}
