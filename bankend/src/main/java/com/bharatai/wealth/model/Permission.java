package com.bharatai.wealth.model;

/**
 * Fine-grained permission constants used with Spring Security @PreAuthorize.
 *
 * Mapped from Role:
 *  USER     → own data READ/WRITE/DELETE
 *  PREMIUM  → own data READ/WRITE/DELETE + ANALYTICS_READ
 *  ANALYST  → ANALYTICS_READ + all READ (no WRITE/DELETE on others' data)
 *  ADMIN    → all permissions
 */
public enum Permission {

    // ── Expense permissions ──────────────────────────────────────
    EXPENSE_READ,
    EXPENSE_WRITE,
    EXPENSE_DELETE,

    // ── Portfolio permissions ────────────────────────────────────
    PORTFOLIO_READ,
    PORTFOLIO_WRITE,
    PORTFOLIO_DELETE,

    // ── Goals permissions ────────────────────────────────────────
    GOAL_READ,
    GOAL_WRITE,
    GOAL_DELETE,

    // ── Analytics (restricted to PREMIUM, ANALYST, ADMIN) ────────
    ANALYTICS_READ,

    // ── Admin permissions (ADMIN only) ───────────────────────────
    ADMIN_USER_READ,
    ADMIN_USER_WRITE,
    ADMIN_USER_DELETE,
    ADMIN_AUDIT_READ,
    ADMIN_SYSTEM_WRITE
}
