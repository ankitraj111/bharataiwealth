package com.bharatai.wealth.service;

import com.bharatai.wealth.dto.AuthDTO;
import com.bharatai.wealth.model.AuditLog.AuditEventType;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.UserRepository;
import com.bharatai.wealth.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Map;

@Service
@Slf4j
public class AuthService implements UserDetailsService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        private final LoginAttemptService loginAttemptService;
        private final AuditService auditService;
        private final MfaService mfaService;

        public AuthService(
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder,
                        JwtService jwtService,
                        @org.springframework.context.annotation.Lazy AuthenticationManager authenticationManager,
                        LoginAttemptService loginAttemptService,
                        AuditService auditService,
                        MfaService mfaService) {
                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtService = jwtService;
                this.authenticationManager = authenticationManager;
                this.loginAttemptService = loginAttemptService;
                this.auditService = auditService;
                this.mfaService = mfaService;
        }

        @Override
        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                return userRepository.findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "User not found with email: " + email));
        }

        @Transactional
        public AuthDTO.AuthResponse register(AuthDTO.RegisterRequest request) {
                // Validate email doesn't exist
                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new RuntimeException("Email already exists");
                }

                // Create user with hashed password
                User user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(User.Role.USER)
                                .active(true)
                                .build();

                userRepository.save(user);

                // Generate JWT token
                String token = jwtService.generateToken(user);
                String refreshToken = jwtService.generateRefreshToken(user);

                // Audit log
                auditService.logEvent(
                                AuditEventType.USER_CREATED,
                                user.getId(),
                                user.getEmail(),
                                getClientIp(),
                                null,
                                true,
                                Map.of("name", user.getName()));

                log.info("New user registered: {}", user.getEmail());

                return AuthDTO.AuthResponse.builder()
                                .token(token)
                                .refreshToken(refreshToken)
                                .mfaRequired(false)
                                .user(mapToUserDTO(user))
                                .build();
        }

        public AuthDTO.AuthResponse login(AuthDTO.LoginRequest request) {
                String email = request.getEmail();
                String ipAddress = getClientIp();

                // Check if account is locked
                if (loginAttemptService.isAccountLocked(email)) {
                        long remainingMinutes = loginAttemptService.getRemainingLockTimeMinutes(email);
                        auditService.logFailure(
                                        AuditEventType.LOGIN_FAILED,
                                        email,
                                        ipAddress,
                                        "Account locked");
                        throw new RuntimeException("Account is locked. Try again in " + remainingMinutes + " minutes.");
                }

                try {
                        // Authenticate credentials
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(email, request.getPassword()));

                        User user = userRepository.findByEmail(email)
                                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                        // Check if MFA is required
                        if (user.isMfaEnabled()) {
                                // Return partial response - MFA verification needed
                                auditService.logEvent(
                                                AuditEventType.LOGIN_SUCCESS,
                                                user.getId(),
                                                email,
                                                ipAddress,
                                                null,
                                                true,
                                                Map.of("mfaRequired", true));

                                return AuthDTO.AuthResponse.builder()
                                                .mfaRequired(true)
                                                .tempToken(jwtService.generateMfaTempToken(user))
                                                .user(mapToUserDTO(user))
                                                .build();
                        }

                        // Complete login
                        return completeLogin(user, ipAddress);

                } catch (AuthenticationException e) {
                        // Login failed - track attempt
                        loginAttemptService.loginFailed(email);
                        auditService.logFailure(
                                        AuditEventType.LOGIN_FAILED,
                                        email,
                                        ipAddress,
                                        "Invalid credentials");
                        log.warn("Login failed for {}: {}", email, e.getMessage());
                        throw new RuntimeException("Invalid email or password");
                }
        }

        public AuthDTO.AuthResponse verifyMfaAndLogin(String tempToken, String mfaCode) {
                String email = jwtService.extractUsername(tempToken);
                String ipAddress = getClientIp();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                if (!mfaService.verifyCode(email, mfaCode)) {
                        auditService.logFailure(
                                        AuditEventType.MFA_VERIFICATION_FAILED,
                                        email,
                                        ipAddress,
                                        "Invalid MFA code");
                        throw new RuntimeException("Invalid MFA code");
                }

                auditService.logEvent(
                                AuditEventType.MFA_VERIFICATION_SUCCESS,
                                user.getId(),
                                email,
                                ipAddress,
                                null,
                                true,
                                null);

                return completeLogin(user, ipAddress);
        }

        private AuthDTO.AuthResponse completeLogin(User user, String ipAddress) {
                // Generate tokens
                String token = jwtService.generateToken(user);
                String refreshToken = jwtService.generateRefreshToken(user);

                // Update login tracking
                loginAttemptService.loginSucceeded(user.getEmail(), ipAddress);

                // Audit log
                auditService.logEvent(
                                AuditEventType.LOGIN_SUCCESS,
                                user.getId(),
                                user.getEmail(),
                                ipAddress,
                                null,
                                true,
                                null);

                log.info("User logged in: {}", user.getEmail());

                return AuthDTO.AuthResponse.builder()
                                .token(token)
                                .refreshToken(refreshToken)
                                .mfaRequired(false)
                                .user(mapToUserDTO(user))
                                .build();
        }

        public AuthDTO.AuthResponse refreshToken(String refreshToken) {
                String email = jwtService.extractUsername(refreshToken);
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                if (!jwtService.isRefreshTokenValid(refreshToken, user)) {
                        throw new RuntimeException("Invalid refresh token");
                }

                String newToken = jwtService.generateToken(user);
                return AuthDTO.AuthResponse.builder()
                                .token(newToken)
                                .refreshToken(refreshToken)
                                .user(mapToUserDTO(user))
                                .build();
        }

        private AuthDTO.UserDTO mapToUserDTO(User user) {
                return AuthDTO.UserDTO.builder()
                                .id(user.getId())
                                .name(user.getName())
                                .email(user.getEmail())
                                .role(user.getRole().name())
                                .mfaEnabled(user.isMfaEnabled())
                                .build();
        }

        private String getClientIp() {
                try {
                        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder
                                        .getRequestAttributes();
                        if (attrs != null) {
                                HttpServletRequest request = attrs.getRequest();
                                String xForwardedFor = request.getHeader("X-Forwarded-For");
                                if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                                        return xForwardedFor.split(",")[0].trim();
                                }
                                return request.getRemoteAddr();
                        }
                } catch (Exception e) {
                        log.debug("Could not get client IP: {}", e.getMessage());
                }
                return "unknown";
        }
}
