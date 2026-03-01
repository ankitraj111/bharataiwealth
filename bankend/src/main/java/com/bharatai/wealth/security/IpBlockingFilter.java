package com.bharatai.wealth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * IP blocking filter for suspicious activity
 */
@Component
@Slf4j
public class IpBlockingFilter extends OncePerRequestFilter {

    private static final int MAX_FAILED_ATTEMPTS = 10;
    private static final int BLOCK_DURATION_MINUTES = 30;

    private final Map<String, FailedAttempt> failedAttempts = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> blockedIps = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String clientIp = getClientIp(request);

        // Check if IP is blocked
        if (isBlocked(clientIp)) {
            log.warn("Blocked IP attempted access: {}", clientIp);
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"error\": \"Access denied. Your IP has been temporarily blocked due to suspicious activity.\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

    public void recordFailedAttempt(String ipAddress) {
        FailedAttempt attempt = failedAttempts.computeIfAbsent(ipAddress, k -> new FailedAttempt());
        attempt.increment();

        if (attempt.getCount() >= MAX_FAILED_ATTEMPTS) {
            blockIp(ipAddress);
            log.warn("IP blocked due to {} failed attempts: {}", MAX_FAILED_ATTEMPTS, ipAddress);
        }
    }

    public void clearFailedAttempts(String ipAddress) {
        failedAttempts.remove(ipAddress);
    }

    private void blockIp(String ipAddress) {
        blockedIps.put(ipAddress, LocalDateTime.now().plusMinutes(BLOCK_DURATION_MINUTES));
    }

    private boolean isBlocked(String ipAddress) {
        LocalDateTime blockExpiry = blockedIps.get(ipAddress);
        if (blockExpiry == null) {
            return false;
        }

        if (LocalDateTime.now().isAfter(blockExpiry)) {
            blockedIps.remove(ipAddress);
            failedAttempts.remove(ipAddress);
            return false;
        }

        return true;
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private static class FailedAttempt {
        private int count = 0;
        private LocalDateTime lastAttempt = LocalDateTime.now();

        public void increment() {
            this.count++;
            this.lastAttempt = LocalDateTime.now();
        }

        public int getCount() {
            return count;
        }
    }
}
