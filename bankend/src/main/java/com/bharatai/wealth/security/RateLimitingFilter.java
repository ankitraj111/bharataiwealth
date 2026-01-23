package com.bharatai.wealth.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Rate limiting filter using Bucket4j token bucket algorithm.
 * Protects against brute-force and DDoS attacks.
 */
@Component
@Slf4j
public class RateLimitingFilter extends OncePerRequestFilter {

    // Different rate limits for different endpoint types
    private static final Map<String, RateLimitConfig> ENDPOINT_CONFIGS = Map.of(
            "/api/auth/login", new RateLimitConfig(5, Duration.ofMinutes(15)), // Strict for login
            "/api/auth/register", new RateLimitConfig(3, Duration.ofMinutes(15)), // Very strict for registration
            "/api/auth", new RateLimitConfig(10, Duration.ofMinutes(1)), // General auth endpoints
            "default", new RateLimitConfig(100, Duration.ofMinutes(1)) // Default for other endpoints
    );

    // Store buckets per client IP
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String clientId = getClientIdentifier(request);
        String endpoint = request.getRequestURI();

        Bucket bucket = buckets.computeIfAbsent(
                clientId + ":" + getEndpointKey(endpoint),
                k -> createBucket(endpoint));

        // Add rate limit headers
        response.setHeader("X-RateLimit-Remaining", String.valueOf(bucket.getAvailableTokens()));

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            log.warn("Rate limit exceeded for client: {} on endpoint: {}", clientId, endpoint);
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter()
                    .write("{\"error\": \"Too many requests. Please try again later.\", \"retryAfterSeconds\": 60}");
        }
    }

    private String getClientIdentifier(HttpServletRequest request) {
        // Try to get authenticated user first
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                !"anonymousUser".equals(authentication.getPrincipal())) {
            return "user:" + authentication.getName();
        }

        // Fall back to IP address
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return "ip:" + xForwardedFor.split(",")[0].trim();
        }
        return "ip:" + request.getRemoteAddr();
    }

    private String getEndpointKey(String endpoint) {
        // Match specific endpoints first
        for (String key : ENDPOINT_CONFIGS.keySet()) {
            if (!key.equals("default") && endpoint.startsWith(key)) {
                return key;
            }
        }
        return "default";
    }

    private Bucket createBucket(String endpoint) {
        RateLimitConfig config = ENDPOINT_CONFIGS.getOrDefault(
                getEndpointKey(endpoint),
                ENDPOINT_CONFIGS.get("default"));

        return Bucket.builder()
                .addLimit(Bandwidth.classic(config.tokens, Refill.intervally(config.tokens, config.duration)))
                .build();
    }

    private record RateLimitConfig(int tokens, Duration duration) {
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // Don't rate limit health checks
        return path.startsWith("/api/health") || path.equals("/actuator/health");
    }
}
