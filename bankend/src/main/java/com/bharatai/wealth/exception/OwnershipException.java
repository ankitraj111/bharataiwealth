package com.bharatai.wealth.exception;

/**
 * Thrown when a user tries to access/modify a resource they don't own.
 * Automatically mapped to 403 by GlobalExceptionHandler.
 *
 * Usage: throw new OwnershipException("Expense", expenseId);
 *   → 403 {"code":"OWNERSHIP_VIOLATION","message":"You do not own Expense with id: 5"}
 */
public class OwnershipException extends BusinessException {

    public OwnershipException(String resourceName, Object resourceId) {
        super(ErrorCode.OWNERSHIP_VIOLATION,
                String.format("You do not own %s with id: %s", resourceName, resourceId));
    }
}
