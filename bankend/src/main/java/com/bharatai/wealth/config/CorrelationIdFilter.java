package com.bharatai.wealth.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

/**
 * FAANG-level request tracing.
 *
 * Every incoming request gets a unique correlation ID:
 *   1. Check if client sent X-Request-ID header (forwarded from API gateway)
 *   2. If not, generate a new UUID
 *   3. Put it in SLF4J MDC so every log line includes it
 *   4. Add it to the response header so the client can reference it
 *
 * Log output:  [req-abc123] GET /api/expenses → 200 (45ms)
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
public class CorrelationIdFilter extends OncePerRequestFilter {

    public static final String CORRELATION_ID_HEADER = "X-Request-ID";
    public static final String CORRELATION_ID_MDC_KEY = "correlationId";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // 1. Extract or generate correlation ID
        String correlationId = request.getHeader(CORRELATION_ID_HEADER);
        if (correlationId == null || correlationId.isBlank()) {
            correlationId = UUID.randomUUID().toString().substring(0, 8);
        }

        // 2. Put in MDC for structured logging
        MDC.put(CORRELATION_ID_MDC_KEY, correlationId);

        // 3. Add to response header
        response.setHeader(CORRELATION_ID_HEADER, correlationId);

        long startTime = System.currentTimeMillis();

        try {
            filterChain.doFilter(request, response);
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            log.info("[{}] {} {} → {} ({}ms)",
                    correlationId,
                    request.getMethod(),
                    request.getRequestURI(),
                    response.getStatus(),
                    duration);
            MDC.remove(CORRELATION_ID_MDC_KEY);
        }
    }

    /**
     * Utility: get current correlation ID from MDC (used by GlobalExceptionHandler).
     */
    public static String getCurrentCorrelationId() {
        String id = MDC.get(CORRELATION_ID_MDC_KEY);
        return id != null ? id : "unknown";
    }
}
