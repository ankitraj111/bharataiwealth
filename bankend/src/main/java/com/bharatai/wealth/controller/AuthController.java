package com.bharatai.wealth.controller;

import com.bharatai.wealth.dto.AuthDTO;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.service.AuthService;
import com.bharatai.wealth.service.MfaService;
import dev.samstevens.totp.exceptions.QrGenerationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final MfaService mfaService;

    /**
     * Register a new user account.
     */
    @PostMapping("/register")
    public ResponseEntity<AuthDTO.AuthResponse> register(
            @Valid @RequestBody AuthDTO.RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    /**
     * Login with email and password.
     * Returns MFA challenge if MFA is enabled.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthDTO.AuthResponse> login(
            @Valid @RequestBody AuthDTO.LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * Verify MFA code and complete login.
     */
    @PostMapping("/verify-mfa")
    public ResponseEntity<AuthDTO.AuthResponse> verifyMfa(
            @Valid @RequestBody AuthDTO.MfaVerifyRequest request) {
        return ResponseEntity.ok(
                authService.verifyMfaAndLogin(request.getTempToken(), request.getCode()));
    }

    /**
     * Refresh access token using refresh token.
     */
    @PostMapping("/refresh")
    public ResponseEntity<AuthDTO.AuthResponse> refreshToken(
            @Valid @RequestBody AuthDTO.RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request.getRefreshToken()));
    }

    /**
     * Setup MFA for authenticated user.
     * Returns secret and QR code.
     */
    @PostMapping("/mfa/setup")
    public ResponseEntity<AuthDTO.MfaSetupResponse> setupMfa(
            @AuthenticationPrincipal User user) throws QrGenerationException {
        MfaService.MfaSetupResponse setup = mfaService.setupMfa(user.getId());
        return ResponseEntity.ok(
                AuthDTO.MfaSetupResponse.builder()
                        .secret(setup.secret())
                        .qrCodeDataUri(setup.qrCodeDataUri())
                        .build());
    }

    /**
     * Verify and enable MFA.
     */
    @PostMapping("/mfa/enable")
    public ResponseEntity<Map<String, Object>> enableMfa(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> request) {
        String code = request.get("code");
        boolean success = mfaService.verifyAndEnableMfa(user.getId(), code);

        if (success) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "MFA enabled successfully"));
        } else {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Invalid verification code"));
        }
    }

    /**
     * Disable MFA (requires valid MFA code).
     */
    @PostMapping("/mfa/disable")
    public ResponseEntity<Map<String, Object>> disableMfa(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> request) {
        String code = request.get("code");
        mfaService.disableMfa(user.getId(), code);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "MFA disabled successfully"));
    }

    /**
     * Get MFA status for authenticated user.
     */
    @GetMapping("/mfa/status")
    public ResponseEntity<Map<String, Boolean>> getMfaStatus(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(Map.of(
                "mfaEnabled", user.isMfaEnabled()));
    }

    /**
     * Logout (client should discard tokens).
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        // For JWT, logout is handled client-side by discarding tokens
        // In production, you might blacklist the token in Redis
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
