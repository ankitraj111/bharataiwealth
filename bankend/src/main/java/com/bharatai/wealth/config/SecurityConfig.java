package com.bharatai.wealth.config;

import com.bharatai.wealth.security.JwtAuthenticationFilter;
import com.bharatai.wealth.security.RateLimitingFilter;
import com.bharatai.wealth.security.IpBlockingFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthFilter;
        private final AuthenticationProvider authenticationProvider;
        private final RateLimitingFilter rateLimitingFilter;
        private final IpBlockingFilter ipBlockingFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                // CORS Configuration
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                                // CSRF - Disabled for stateless JWT API (enable if using sessions)
                                .csrf(csrf -> csrf.disable())

                                // ==================== Security Headers ====================
                                .headers(headers -> headers
                                                // Prevent clickjacking
                                                .frameOptions(frame -> frame.deny())

                                                // XSS Protection
                                                .xssProtection(xss -> xss.headerValue(
                                                                org.springframework.security.web.header.writers.XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))

                                                // Prevent MIME type sniffing
                                                .contentTypeOptions(contentType -> {
                                                })

                                                // HTTP Strict Transport Security
                                                .httpStrictTransportSecurity(hsts -> hsts
                                                                .includeSubDomains(true)
                                                                .maxAgeInSeconds(31536000)
                                                                .preload(true))

                                                // Referrer Policy
                                                .referrerPolicy(referrer -> referrer
                                                                .policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))

                                                // Content Security Policy
                                                .contentSecurityPolicy(csp -> csp
                                                                .policyDirectives("default-src 'self'; " +
                                                                                "script-src 'self'; " +
                                                                                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                                                                                +
                                                                                "font-src 'self' https://fonts.gstatic.com; "
                                                                                +
                                                                                "img-src 'self' data: https:; " +
                                                                                "connect-src 'self' wss: https:; " +
                                                                                "frame-ancestors 'none'; " +
                                                                                "form-action 'self'"))

                                                // Permissions Policy
                                                .permissionsPolicy(permissions -> permissions
                                                                .policy("geolocation=(), microphone=(), camera=()")))

                                // ==================== Authorization Rules ====================
                                .authorizeHttpRequests(auth -> auth
                                                // Public endpoints
                                                .requestMatchers(
                                                                "/",
                                                                "/api/auth/**",
                                                                "/api/health/**",
                                                                "/api/public/**",
                                                                "/error",
                                                                "/actuator/health")
                                                .permitAll()

                                                // Admin only endpoints
                                                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                                                // Analyst & Admin
                                                .requestMatchers("/api/analytics/**").hasAnyRole("ANALYST", "ADMIN")

                                                // Authenticated users
                                                .anyRequest().authenticated())

                                // ==================== Session Management ====================
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                                // ==================== Filters ====================
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(ipBlockingFilter, UsernamePasswordAuthenticationFilter.class)
                                .addFilterBefore(rateLimitingFilter, UsernamePasswordAuthenticationFilter.class)
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration configuration = new CorsConfiguration();

                // Explicitly define allowed origins (no wildcards for production)
                configuration.setAllowedOriginPatterns(Arrays.asList(
                                "http://localhost:*",
                                "https://*.github.io",
                                "https://ankitraj111.github.io",
                                "https://bharataiwealth.com",
                                "https://*.bharataiwealth.com",
                                "https://*.vercel.app"));

                // Allowed HTTP methods
                configuration.setAllowedMethods(Arrays.asList(
                                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

                // Allowed headers
                configuration.setAllowedHeaders(Arrays.asList(
                                "Authorization",
                                "Content-Type",
                                "X-Requested-With",
                                "X-CSRF-Token",
                                "Accept",
                                "Origin"));

                // Allow credentials (cookies, auth headers)
                configuration.setAllowCredentials(true);

                // Exposed headers that client can access
                configuration.setExposedHeaders(Arrays.asList(
                                "Authorization",
                                "X-RateLimit-Remaining",
                                "X-RateLimit-Limit"));

                // Pre-flight cache duration
                configuration.setMaxAge(3600L);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }
}
