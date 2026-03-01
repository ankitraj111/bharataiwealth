"""
Security middleware for ML Service
"""
import os
import time
from functools import wraps
from typing import Dict, List
from collections import defaultdict
from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse

# Rate limiting storage
rate_limit_storage: Dict[str, List[float]] = defaultdict(list)

# API Key validation
API_KEY = os.getenv("API_KEY", "")


def get_client_ip(request: Request) -> str:
    """Extract client IP from request"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def validate_api_key(api_key: str) -> bool:
    """Validate API key"""
    if not API_KEY:
        return True  # Skip validation if no API key is configured
    return api_key == API_KEY


async def api_key_middleware(request: Request, call_next):
    """Middleware to validate API key"""
    # Skip validation for health check endpoints
    if request.url.path in ["/health", "/", "/docs", "/openapi.json"]:
        return await call_next(request)

    api_key = request.headers.get("X-API-Key")
    
    if not validate_api_key(api_key):
        return JSONResponse(
            status_code=status.HTTP_403_FORBIDDEN,
            content={"error": "Invalid or missing API key"}
        )
    
    return await call_next(request)


async def rate_limit_middleware(request: Request, call_next):
    """Rate limiting middleware"""
    client_ip = get_client_ip(request)
    current_time = time.time()
    
    # Rate limit: 60 requests per minute
    window = 60  # seconds
    max_requests = 60
    
    # Clean old entries
    rate_limit_storage[client_ip] = [
        timestamp for timestamp in rate_limit_storage[client_ip]
        if current_time - timestamp < window
    ]
    
    # Check rate limit
    if len(rate_limit_storage[client_ip]) >= max_requests:
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={
                "error": "Rate limit exceeded",
                "retry_after_seconds": window
            }
        )
    
    # Record request
    rate_limit_storage[client_ip].append(current_time)
    
    response = await call_next(request)
    response.headers["X-RateLimit-Remaining"] = str(
        max_requests - len(rate_limit_storage[client_ip])
    )
    response.headers["X-RateLimit-Limit"] = str(max_requests)
    
    return response


async def security_headers_middleware(request: Request, call_next):
    """Add security headers to responses"""
    response = await call_next(request)
    
    # Security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    
    return response


def sanitize_input(text: str, max_length: int = 10000) -> str:
    """Sanitize text input"""
    if not text:
        return ""
    
    # Limit length
    text = text[:max_length]
    
    # Remove potentially dangerous characters
    dangerous_chars = ["<", ">", "&", '"', "'", "/"]
    for char in dangerous_chars:
        text = text.replace(char, "")
    
    return text.strip()


def validate_numeric_input(value: float, min_val: float = None, max_val: float = None) -> bool:
    """Validate numeric input"""
    if not isinstance(value, (int, float)):
        return False
    
    if min_val is not None and value < min_val:
        return False
    
    if max_val is not None and value > max_val:
        return False
    
    return True


class InputValidator:
    """Input validation utilities"""
    
    @staticmethod
    def validate_portfolio_data(data: dict) -> bool:
        """Validate portfolio data structure"""
        required_fields = ["amount", "risk_level"]
        
        for field in required_fields:
            if field not in data:
                return False
        
        # Validate amount
        if not validate_numeric_input(data["amount"], min_val=0, max_val=1e10):
            return False
        
        # Validate risk level
        if data["risk_level"] not in ["low", "medium", "high"]:
            return False
        
        return True
    
    @staticmethod
    def validate_prediction_data(data: dict) -> bool:
        """Validate prediction request data"""
        if "symbol" not in data:
            return False
        
        # Sanitize symbol
        symbol = sanitize_input(data["symbol"], max_length=10)
        if not symbol or not symbol.isalnum():
            return False
        
        return True
