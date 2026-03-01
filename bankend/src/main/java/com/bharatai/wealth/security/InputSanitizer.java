package com.bharatai.wealth.security;

import org.springframework.stereotype.Component;

import java.util.regex.Pattern;

/**
 * Input sanitization utility to prevent injection attacks
 */
@Component
public class InputSanitizer {

    private static final Pattern SQL_INJECTION_PATTERN = Pattern.compile(
            "('.+--)|(--)|(;)|(\\|\\|)|(\\*)|(<)|(>)|(\\^)|(\\[)|(\\])|(\\{)|(\\})|(%)|(\\$)",
            Pattern.CASE_INSENSITIVE);

    private static final Pattern XSS_PATTERN = Pattern.compile(
            "<script|javascript:|onerror=|onload=|<iframe|eval\\(|expression\\(",
            Pattern.CASE_INSENSITIVE);

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    /**
     * Sanitize input to prevent SQL injection
     */
    public String sanitizeSql(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        return input.replaceAll("[';\"\\-\\-]", "");
    }

    /**
     * Sanitize input to prevent XSS attacks
     */
    public String sanitizeXss(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        return input
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll("\"", "&quot;")
                .replaceAll("'", "&#x27;")
                .replaceAll("/", "&#x2F;");
    }

    /**
     * Validate email format
     */
    public boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    /**
     * Check for potential SQL injection patterns
     */
    public boolean containsSqlInjection(String input) {
        return input != null && SQL_INJECTION_PATTERN.matcher(input).find();
    }

    /**
     * Check for potential XSS patterns
     */
    public boolean containsXss(String input) {
        return input != null && XSS_PATTERN.matcher(input).find();
    }

    /**
     * Sanitize general text input
     */
    public String sanitizeInput(String input) {
        if (input == null) {
            return null;
        }
        return sanitizeXss(sanitizeSql(input.trim()));
    }
}
