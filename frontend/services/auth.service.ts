// services/auth.service.ts
// Authentication API service

import ApiClient from '@/lib/api-client';
import config from '@/lib/config';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    mfaEnabled: boolean;
}

export interface AuthResponse {
    token: string;
    refreshToken?: string;
    tempToken?: string;
    mfaRequired: boolean;
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface MfaVerifyRequest {
    tempToken: string;
    code: string;
}

export interface MfaSetupResponse {
    secret: string;
    qrCodeDataUri: string;
}

export class AuthService {
    /**
     * Register a new user
     */
    static async register(data: RegisterRequest): Promise<AuthResponse> {
        return ApiClient.post<AuthResponse>(config.AUTH_ENDPOINTS.REGISTER, data);
    }

    /**
     * Login with email and password
     */
    static async login(data: LoginRequest): Promise<AuthResponse> {
        return ApiClient.post<AuthResponse>(config.AUTH_ENDPOINTS.LOGIN, data);
    }

    /**
     * Verify MFA code and complete login
     */
    static async verifyMfa(data: MfaVerifyRequest): Promise<AuthResponse> {
        return ApiClient.post<AuthResponse>(config.AUTH_ENDPOINTS.VERIFY_MFA, data);
    }

    /**
     * Setup MFA (get QR code)
     */
    static async setupMfa(): Promise<MfaSetupResponse> {
        return ApiClient.post<MfaSetupResponse>(config.AUTH_ENDPOINTS.MFA_SETUP);
    }

    /**
     * Enable MFA with verification code
     */
    static async enableMfa(code: string): Promise<{ success: boolean; message: string }> {
        return ApiClient.post(config.AUTH_ENDPOINTS.MFA_ENABLE, { code });
    }

    /**
     * Disable MFA (requires code)
     */
    static async disableMfa(code: string): Promise<{ success: boolean; message: string }> {
        return ApiClient.post(config.AUTH_ENDPOINTS.MFA_DISABLE, { code });
    }

    /**
     * Get MFA status
     */
    static async getMfaStatus(): Promise<{ mfaEnabled: boolean }> {
        return ApiClient.get(config.AUTH_ENDPOINTS.MFA_STATUS);
    }

    /**
     * Refresh access token
     */
    static async refreshToken(refreshToken: string): Promise<AuthResponse> {
        return ApiClient.post<AuthResponse>(config.AUTH_ENDPOINTS.REFRESH, { refreshToken });
    }

    /**
     * Logout (server-side token invalidation if needed)
     */
    static async logout(): Promise<void> {
        try {
            await ApiClient.post(config.AUTH_ENDPOINTS.LOGOUT);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
}

export default AuthService;
