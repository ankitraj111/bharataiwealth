package com.bharatai.wealth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;

/**
 * API Key authentication for service-to-service communication
 */
@Component
@Slf4j
public class ApiKeyAuthFilter extends OncePerRequestFilter {

    @Value("${api.key.header:X-API-Key}")
    private String apiKeyHeader;

    @Value("${api.key.ml-service:}")
    private String mlServiceApiKey;

    private static final Set<String> PROTECTED_PATHS = Set.of(
            "/api/ml/",
            "/api/internal/"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // Check if path requires API key
        boolean requiresApiKey = PROTECTED_PATHS.stream().anyMatch(path::startsWith);

        if (requiresApiKey) {
            String apiKey = request.getHeader(apiKeyHeader);

            if (apiKey == null || apiKey.isEmpty()) {
                log.warn("Missing API key for protected endpoint: {}", path);
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"API key required\"}");
                return;
            }

            if (!isValidApiKey(apiKey)) {
                log.warn("Invalid API key attempt for endpoint: {}", path);
                response.setStatus(HttpStatus.FORBIDDEN.value());
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Invalid API key\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private boolean isValidApiKey(String apiKey) {
        // Validate against configured API keys
        return mlServiceApiKey != null && !mlServiceApiKey.isEmpty() && mlServiceApiKey.equals(apiKey);
    }
}
