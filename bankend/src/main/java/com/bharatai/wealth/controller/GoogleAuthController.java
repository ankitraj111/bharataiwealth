package com.bharatai.wealth.controller;

import com.bharatai.wealth.dto.AuthDTO;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.UserRepository;
import com.bharatai.wealth.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

/**
 * Handles Google OAuth2 login.
 *
 * Flow:
 * 1. Frontend uses Google Identity Services to get a Google ID token (credential)
 * 2. Frontend POSTs { credential: "eyJ..." } to /api/auth/google
 * 3. Backend verifies the Google ID token via Google's tokeninfo endpoint
 * 4. If valid, finds or creates the user
 * 5. Returns JWT tokens (same shape as normal login)
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class GoogleAuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/google")
    public ResponseEntity<AuthDTO.AuthResponse> googleLogin(@RequestBody Map<String, String> request) {
        String credential = request.get("credential");
        if (credential == null || credential.isBlank()) {
            throw new RuntimeException("Google credential is required");
        }

        // Verify Google ID token via Google's tokeninfo API
        Map<String, Object> googleUser = verifyGoogleToken(credential);

        String email = (String) googleUser.get("email");
        String name = (String) googleUser.get("name");
        String picture = (String) googleUser.get("picture");

        if (email == null || email.isBlank()) {
            throw new RuntimeException("Could not extract email from Google token");
        }

        log.info("Google login for: {}", email);

        // Find or create user
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            log.info("Creating new user from Google login: {}", email);
            User newUser = User.builder()
                    .name(name != null ? name : email.split("@")[0])
                    .email(email)
                    .password(passwordEncoder.encode(UUID.randomUUID().toString())) // Random password (won't be used)
                    .role(User.Role.USER)
                    .active(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            return userRepository.save(newUser);
        });

        // Generate JWT tokens
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        AuthDTO.AuthResponse response = AuthDTO.AuthResponse.builder()
                .token(jwtToken)
                .refreshToken(refreshToken)
                .mfaRequired(false)
                .user(AuthDTO.UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .role(user.getRole().name())
                        .mfaEnabled(user.isMfaEnabled())
                        .build())
                .build();

        return ResponseEntity.ok(response);
    }

    /**
     * Verify Google ID token using Google's tokeninfo endpoint.
     * In production, use Google's official Java client library.
     */
    private Map<String, Object> verifyGoogleToken(String idToken) {
        try {
            org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
            String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;

            @SuppressWarnings("unchecked")
            Map<String, Object> tokenInfo = restTemplate.getForObject(url, Map.class);

            if (tokenInfo == null || !tokenInfo.containsKey("email")) {
                throw new RuntimeException("Invalid Google token - no email found");
            }

            // Verify email is verified
            Object emailVerified = tokenInfo.get("email_verified");
            if (emailVerified != null && !"true".equals(emailVerified.toString())) {
                throw new RuntimeException("Google email is not verified");
            }

            return tokenInfo;
        } catch (org.springframework.web.client.RestClientException e) {
            log.error("Failed to verify Google token: {}", e.getMessage());
            throw new RuntimeException("Invalid Google token");
        }
    }
}
