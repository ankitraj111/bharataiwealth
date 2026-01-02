import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for Bharat AI Wealth
 * Handles route protection and auth redirection.
 */

// Define protected and public routes
const protectedRoutes = ['/dashboard', '/predictions', '/analytics', '/advisor', '/portfolios', '/expenses', '/family', '/goals', '/emergency-fund', '/sandbox', '/tax', '/settings']
const authRoutes = ['/auth/login', '/auth/signup']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('bharat_auth_token')?.value
    const { pathname } = request.nextUrl

    // 1. If user is logged in and trying to access auth pages, redirect to dashboard
    if (token && authRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // 2. If user is NOT logged in and trying to access protected pages, redirect to login
    if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
        const loginUrl = new URL('/auth/login', request.url)
        // Optional: add a redirect param to return after login
        // loginUrl.searchParams.set('from', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
