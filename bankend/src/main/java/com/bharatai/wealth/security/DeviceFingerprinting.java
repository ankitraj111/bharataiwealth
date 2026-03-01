package com.bharatai.wealth.security;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

/**
 * Device fingerprinting for fraud detection
 * Banks use this to detect suspicious login attempts from new devices
 */
@Component
@Slf4j
public class DeviceFingerprinting {

    /**
     * Generate device fingerprint from request headers
     */
    public String generateFingerprint(HttpServletRequest request) {
        StringBuilder fingerprintData = new StringBuilder();
        
        // User Agent
        String userAgent = request.getHeader("User-Agent");
        fingerprintData.append(userAgent != null ? userAgent : "unknown");
        fingerprintData.append("|");
        
        // Accept Language
        String acceptLanguage = request.getHeader("Accept-Language");
        fingerprintData.append(acceptLanguage != null ? acceptLanguage : "unknown");
        fingerprintData.append("|");
        
        // Accept Encoding
        String acceptEncoding = request.getHeader("Accept-Encoding");
        fingerprintData.append(acceptEncoding != null ? acceptEncoding : "unknown");
        fingerprintData.append("|");
        
        // Screen resolution (if available from custom header)
        String screenResolution = request.getHeader("X-Screen-Resolution");
        fingerprintData.append(screenResolution != null ? screenResolution : "unknown");
        fingerprintData.append("|");
        
        // Timezone (if available from custom header)
        String timezone = request.getHeader("X-Timezone");
        fingerprintData.append(timezone != null ? timezone : "unknown");
        
        // Hash the fingerprint
        return hashFingerprint(fingerprintData.toString());
    }

    /**
     * Hash fingerprint data
     */
    private String hashFingerprint(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            log.error("Failed to hash fingerprint", e);
            return data; // Fallback to unhashed
        }
    }

    /**
     * Extract device information for logging
     */
    public DeviceInfo extractDeviceInfo(HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        String ipAddress = getClientIp(request);
        
        return new DeviceInfo(
            extractBrowser(userAgent),
            extractOS(userAgent),
            extractDeviceType(userAgent),
            ipAddress,
            generateFingerprint(request)
        );
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private String extractBrowser(String userAgent) {
        if (userAgent == null) return "Unknown";
        
        if (userAgent.contains("Chrome")) return "Chrome";
        if (userAgent.contains("Firefox")) return "Firefox";
        if (userAgent.contains("Safari")) return "Safari";
        if (userAgent.contains("Edge")) return "Edge";
        if (userAgent.contains("Opera")) return "Opera";
        
        return "Other";
    }

    private String extractOS(String userAgent) {
        if (userAgent == null) return "Unknown";
        
        if (userAgent.contains("Windows")) return "Windows";
        if (userAgent.contains("Mac OS")) return "macOS";
        if (userAgent.contains("Linux")) return "Linux";
        if (userAgent.contains("Android")) return "Android";
        if (userAgent.contains("iOS") || userAgent.contains("iPhone")) return "iOS";
        
        return "Other";
    }

    private String extractDeviceType(String userAgent) {
        if (userAgent == null) return "Unknown";
        
        if (userAgent.contains("Mobile")) return "Mobile";
        if (userAgent.contains("Tablet")) return "Tablet";
        
        return "Desktop";
    }

    public record DeviceInfo(
        String browser,
        String os,
        String deviceType,
        String ipAddress,
        String fingerprint
    ) {}
}
