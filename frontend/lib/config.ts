// lib/config.ts
// Application configuration and constants

export const config = {
    // API Configuration
    API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
    ENABLE_MFA: process.env.NEXT_PUBLIC_ENABLE_MFA === 'true',
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',

    // Auth Configuration
    TOKEN_REFRESH_INTERVAL: 14 * 60 * 1000, // 14 minutes (access token expires in 15)
    TOKEN_STORAGE_KEY: 'bharatai_access_token',
    REFRESH_TOKEN_STORAGE_KEY: 'bharatai_refresh_token',
    USER_STORAGE_KEY: 'bharatai_user',

    // API Endpoints
    AUTH_ENDPOINTS: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        VERIFY_MFA: '/api/auth/verify-mfa',
        REFRESH: '/api/auth/refresh',
        MFA_SETUP: '/api/auth/mfa/setup',
        MFA_ENABLE: '/api/auth/mfa/enable',
        MFA_DISABLE: '/api/auth/mfa/disable',
        MFA_STATUS: '/api/auth/mfa/status',
        LOGOUT: '/api/auth/logout',
        GOOGLE_LOGIN: '/api/auth/google',
    },

    // Default Headers
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
} as const;

export default config;
