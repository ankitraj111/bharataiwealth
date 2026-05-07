package com.bharatai.wealth.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * Standardized error codes across the entire API.
 * Every error response includes a machine-readable code.
 */
@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // ── Resource errors ──────────────────────────────────────────
    RESOURCE_NOT_FOUND("The requested resource was not found", HttpStatus.NOT_FOUND),
    RESOURCE_ALREADY_EXISTS("The resource already exists", HttpStatus.CONFLICT),

    // ── Auth errors ──────────────────────────────────────────────
    INVALID_CREDENTIALS("Invalid email or password", HttpStatus.UNAUTHORIZED),
    ACCOUNT_LOCKED("Account is locked due to too many failed attempts", HttpStatus.FORBIDDEN),
    TOKEN_EXPIRED("Authentication token has expired", HttpStatus.UNAUTHORIZED),
    INVALID_TOKEN("Invalid authentication token", HttpStatus.UNAUTHORIZED),
    MFA_REQUIRED("Multi-factor authentication is required", HttpStatus.FORBIDDEN),
    INVALID_MFA_CODE("Invalid MFA verification code", HttpStatus.UNAUTHORIZED),

    // ── Authorization errors ─────────────────────────────────────
    ACCESS_DENIED("You do not have permission to perform this action", HttpStatus.FORBIDDEN),
    OWNERSHIP_VIOLATION("You do not own this resource", HttpStatus.FORBIDDEN),

    // ── Validation errors ────────────────────────────────────────
    VALIDATION_FAILED("Request validation failed", HttpStatus.BAD_REQUEST),
    INVALID_INPUT("Invalid input provided", HttpStatus.BAD_REQUEST),

    // ── External service errors ──────────────────────────────────
    ML_SERVICE_UNAVAILABLE("AI/ML service is temporarily unavailable", HttpStatus.SERVICE_UNAVAILABLE),
    EXTERNAL_SERVICE_ERROR("External service error", HttpStatus.BAD_GATEWAY),

    // ── System errors ────────────────────────────────────────────
    INTERNAL_ERROR("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR),
    RATE_LIMIT_EXCEEDED("Too many requests, please try again later", HttpStatus.TOO_MANY_REQUESTS);

    private final String defaultMessage;
    private final HttpStatus httpStatus;
}
