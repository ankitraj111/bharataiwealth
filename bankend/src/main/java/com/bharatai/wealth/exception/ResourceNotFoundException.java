package com.bharatai.wealth.exception;

/**
 * Thrown when a requested entity does not exist.
 * Automatically mapped to 404 by GlobalExceptionHandler.
 *
 * Usage: throw new ResourceNotFoundException("Expense", "id", 42);
 *   → 404 {"code":"RESOURCE_NOT_FOUND","message":"Expense not found with id: 42"}
 */
public class ResourceNotFoundException extends BusinessException {

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(ErrorCode.RESOURCE_NOT_FOUND,
                String.format("%s not found with %s: %s", resourceName, fieldName, fieldValue));
    }

    public ResourceNotFoundException(String message) {
        super(ErrorCode.RESOURCE_NOT_FOUND, message);
    }
}
