package com.bharatai.wealth.exception;

import com.bharatai.wealth.config.CorrelationIdFilter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * FAANG-level global exception handler.
 *
 * Every error response follows this shape:
 * {
 *   "timestamp":     "2026-05-07T16:30:00",
 *   "status":        404,
 *   "code":          "RESOURCE_NOT_FOUND",
 *   "message":       "Expense not found with id: 42",
 *   "path":          "/api/expenses/42",
 *   "correlationId": "abc12345",
 *   "fieldErrors":   null
 * }
 */
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ErrorResponse {
        private LocalDateTime timestamp;
        private int status;
        private String code;
        private String message;
        private String path;
        private String correlationId;
        private Map<String, String> fieldErrors;
    }

    // ── Typed business exceptions ────────────────────────────────

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException ex, WebRequest request) {
        ErrorCode code = ex.getErrorCode();
        log.warn("[{}] BusinessException: {} — {}", correlationId(), code.name(), ex.getMessage());
        return buildErrorResponse(code.getHttpStatus(), code.name(), ex.getMessage(), request);
    }

    // ── Spring Security exceptions ───────────────────────────────

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS",
                "Invalid email or password", request);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFound(UsernameNotFoundException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.UNAUTHORIZED, "INVALID_CREDENTIALS",
                "Invalid email or password", request);
    }

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ErrorResponse> handleLockedException(LockedException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, "ACCOUNT_LOCKED", ex.getMessage(), request);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex, WebRequest request) {
        return buildErrorResponse(HttpStatus.FORBIDDEN, "ACCESS_DENIED",
                "You do not have permission to perform this action", request);
    }

    // ── Validation exceptions ────────────────────────────────────

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex,
            WebRequest request) {
        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> fieldErrors.put(error.getField(), error.getDefaultMessage()));

        String firstError = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(e -> e.getDefaultMessage())
                .orElse("Validation failed");

        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .code("VALIDATION_FAILED")
                .message(firstError)
                .path(extractPath(request))
                .correlationId(correlationId())
                .fieldErrors(fieldErrors)
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    // ── Catch-all for unhandled RuntimeExceptions ────────────────

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex, WebRequest request) {
        log.error("[{}] Unhandled RuntimeException: ", correlationId(), ex);

        // Still support legacy string-matching for backward compatibility
        String msg = ex.getMessage();
        if (msg != null) {
            if (msg.contains("not found") || msg.contains("Not found")) {
                return buildErrorResponse(HttpStatus.NOT_FOUND, "RESOURCE_NOT_FOUND", msg, request);
            }
            if (msg.contains("already exists")) {
                return buildErrorResponse(HttpStatus.CONFLICT, "RESOURCE_ALREADY_EXISTS", msg, request);
            }
            if (msg.contains("locked")) {
                return buildErrorResponse(HttpStatus.FORBIDDEN, "ACCOUNT_LOCKED", msg, request);
            }
        }

        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR",
                msg != null ? msg : "An unexpected error occurred", request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request) {
        log.error("[{}] Unhandled Exception: ", correlationId(), ex);
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_ERROR",
                "An unexpected error occurred", request);
    }

    // ── Helpers ──────────────────────────────────────────────────

    private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus status, String code,
            String message, WebRequest request) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .code(code)
                .message(message)
                .path(extractPath(request))
                .correlationId(correlationId())
                .build();

        return new ResponseEntity<>(errorResponse, status);
    }

    private String extractPath(WebRequest request) {
        return request.getDescription(false).replace("uri=", "");
    }

    private String correlationId() {
        return CorrelationIdFilter.getCurrentCorrelationId();
    }
}
