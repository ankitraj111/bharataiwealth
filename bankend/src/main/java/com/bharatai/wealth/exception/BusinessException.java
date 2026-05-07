package com.bharatai.wealth.exception;

import lombok.Getter;

/**
 * Base exception for all domain/business errors.
 * Every business exception carries an {@link ErrorCode} so the
 * {@link GlobalExceptionHandler} can produce a consistent API error response.
 */
@Getter
public class BusinessException extends RuntimeException {

    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getDefaultMessage());
        this.errorCode = errorCode;
    }

    public BusinessException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public BusinessException(ErrorCode errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }
}
