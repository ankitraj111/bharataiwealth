package com.bharatai.wealth.controller;

import com.bharatai.wealth.model.User;
import com.bharatai.wealth.model.AuditLog;
import com.bharatai.wealth.repository.UserRepository;
import com.bharatai.wealth.repository.AuditLogRepository;
import com.bharatai.wealth.security.SecurityAuditLogger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;

/**
 * Admin Panel Controller
 * Provides admin-only endpoints for user management, security monitoring, and system administration
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;
    private final SecurityAuditLogger securityAuditLogger;

    // ==================== Dashboard ====================

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        Map<String, Object> dashboard = new HashMap<>();

        // User statistics
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByActiveTrue();
        long premiumUsers = userRepository.countByRole(User.Role.PREMIUM);

        dashboard.put("totalUsers", totalUsers);
        dashboard.put("activeUsers", activeUsers);
        dashboard.put("premiumUsers", premiumUsers);
        dashboard.put("inactiveUsers", totalUsers - activeUsers);

        // Security statistics (last 24 hours)
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
        long failedLogins = auditLogRepository.countByEventTypeAndTimestampAfter(
            AuditLog.AuditEventType.LOGIN_FAILED, yesterday
        );
        long successfulLogins = auditLogRepository.countByEventTypeAndTimestampAfter(
            AuditLog.AuditEventType.LOGIN_SUCCESS, yesterday
        );

        dashboard.put("failedLogins24h", failedLogins);
        dashboard.put("successfulLogins24h", successfulLogins);

        // System health
        dashboard.put("systemStatus", "healthy");
        dashboard.put("timestamp", LocalDateTime.now());

        return ResponseEntity.ok(dashboard);
    }

    // ==================== User Management ====================

    @GetMapping("/users")
    public ResponseEntity<Page<UserDTO>> getAllUsers(
            @RequestParam(defaultValue = "0")          int page,
            @RequestParam(defaultValue = "20")         int size,
            @RequestParam(defaultValue = "createdAt")  String sortBy,
            @RequestParam(defaultValue = "DESC")       String sortDir,
            @RequestParam(required = false)            String search,
            @RequestParam(required = false)            String role
    ) {
        Sort sort = sortDir.equalsIgnoreCase("ASC")
            ? Sort.by(sortBy).ascending()
            : Sort.by(sortBy).descending();

        PageRequest pageRequest = PageRequest.of(page, Math.min(size, 100), sort);

        // Resolve optional role filter
        User.Role roleFilter = null;
        if (role != null && !role.isBlank()) {
            try {
                roleFilter = User.Role.valueOf(role.toUpperCase());
            } catch (IllegalArgumentException ignored) {
                // Unknown role — treat as no filter
            }
        }

        // Apply search and/or role filter
        Page<User> users;
        if (search != null && !search.isBlank() && roleFilter != null) {
            users = userRepository.findByEmailContainingIgnoreCaseAndRole(search, roleFilter, pageRequest);
        } else if (search != null && !search.isBlank()) {
            users = userRepository.findByEmailContainingIgnoreCase(search, pageRequest);
        } else if (roleFilter != null) {
            users = userRepository.findByRole(roleFilter, pageRequest);
        } else {
            users = userRepository.findAll(pageRequest);
        }

        return ResponseEntity.ok(users.map(this::convertToDTO));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDTO> getUserDetails(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return ResponseEntity.ok(convertToDTO(user));
    }

    @PutMapping("/users/{userId}/role")
    public ResponseEntity<Map<String, String>> updateUserRole(
            @PathVariable Long userId,
            @RequestBody Map<String, String> request,
            @AuthenticationPrincipal UserDetails adminUser,
            HttpServletRequest httpRequest
    ) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        String newRole = request.get("role");
        User.Role oldRole = user.getRole();
        user.setRole(User.Role.valueOf(newRole));
        userRepository.save(user);

        // Log the role change
        securityAuditLogger.logSecurityEvent(
            SecurityAuditLogger.SecurityEvent.valueOf("ROLE_CHANGED"),
            adminUser.getUsername(),
            getClientIp(httpRequest),
            Map.of(
                "targetUser", user.getEmail(),
                "oldRole", oldRole.name(),
                "newRole", newRole
            )
        );

        return ResponseEntity.ok(Map.of(
            "message", "User role updated successfully",
            "userId", userId.toString(),
            "newRole", newRole
        ));
    }

    @PutMapping("/users/{userId}/status")
    public ResponseEntity<Map<String, String>> updateUserStatus(
            @PathVariable Long userId,
            @RequestBody Map<String, Boolean> request,
            @AuthenticationPrincipal UserDetails adminUser,
            HttpServletRequest httpRequest
    ) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        boolean enabled = request.get("enabled");
        user.setActive(enabled);
        userRepository.save(user);

        // Log the status change
        securityAuditLogger.logSecurityEvent(
            enabled ? SecurityAuditLogger.SecurityEvent.valueOf("ACCOUNT_UNLOCKED") 
                   : SecurityAuditLogger.SecurityEvent.ACCOUNT_LOCKED,
            adminUser.getUsername(),
            getClientIp(httpRequest),
            Map.of("targetUser", user.getEmail())
        );

        return ResponseEntity.ok(Map.of(
            "message", "User status updated successfully",
            "userId", userId.toString(),
            "enabled", String.valueOf(enabled)
        ));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Map<String, String>> deleteUser(
            @PathVariable Long userId,
            @AuthenticationPrincipal UserDetails adminUser,
            HttpServletRequest httpRequest
    ) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Don't allow deleting yourself
        if (user.getEmail().equals(adminUser.getUsername())) {
            return ResponseEntity.badRequest().body(
                Map.of("error", "Cannot delete your own account")
            );
        }

        String userEmail = user.getEmail();
        userRepository.delete(user);

        // Log the deletion
        securityAuditLogger.logSecurityEvent(
            SecurityAuditLogger.SecurityEvent.valueOf("USER_DELETED"),
            adminUser.getUsername(),
            getClientIp(httpRequest),
            Map.of("deletedUser", userEmail)
        );

        return ResponseEntity.ok(Map.of(
            "message", "User deleted successfully",
            "userId", userId.toString()
        ));
    }

    // ==================== Security Monitoring ====================

    @GetMapping("/security/audit-logs")
    public ResponseEntity<Page<AuditLog>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String userId
    ) {
        PageRequest pageRequest = PageRequest.of(page, size, 
            Sort.by("timestamp").descending());
        
        Page<AuditLog> logs;
        
        if (eventType != null && userId != null) {
            logs = auditLogRepository.findByEventTypeAndUserId(
                AuditLog.AuditEventType.valueOf(eventType), Long.parseLong(userId), pageRequest
            );
        } else if (eventType != null) {
            logs = auditLogRepository.findByEventType(
                AuditLog.AuditEventType.valueOf(eventType), pageRequest
            );
        } else if (userId != null) {
            logs = auditLogRepository.findByUserIdOrderByTimestampDesc(Long.parseLong(userId), pageRequest);
        } else {
            logs = auditLogRepository.findAll(pageRequest);
        }
        
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/security/failed-logins")
    public ResponseEntity<List<Map<String, Object>>> getFailedLogins(
            @RequestParam(defaultValue = "24") int hours
    ) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        List<AuditLog> failedLogins = auditLogRepository
            .findByEventTypeAndTimestampAfter(
                AuditLog.AuditEventType.LOGIN_FAILED, since
            );

        // Group by IP address
        Map<String, Long> ipCounts = new HashMap<>();
        for (AuditLog log : failedLogins) {
            String ip = log.getIpAddress();
            ipCounts.put(ip, ipCounts.getOrDefault(ip, 0L) + 1);
        }

        // Convert to list and sort
        List<Map<String, Object>> result = new ArrayList<>();
        ipCounts.forEach((ip, count) -> {
            Map<String, Object> entry = new HashMap<>();
            entry.put("ipAddress", ip);
            entry.put("failedAttempts", count);
            result.add(entry);
        });

        result.sort((a, b) -> 
            Long.compare((Long)b.get("failedAttempts"), (Long)a.get("failedAttempts"))
        );

        return ResponseEntity.ok(result);
    }

    @GetMapping("/security/suspicious-activity")
    public ResponseEntity<List<AuditLog>> getSuspiciousActivity(
            @RequestParam(defaultValue = "24") int hours
    ) {
        LocalDateTime since = LocalDateTime.now().minusHours(hours);
        List<AuditLog> suspicious = auditLogRepository
            .findByEventTypeAndTimestampAfter(
                AuditLog.AuditEventType.SUSPICIOUS_ACTIVITY, since
            );
        
        return ResponseEntity.ok(suspicious);
    }

    // ==================== System Administration ====================

    @GetMapping("/system/stats")
    public ResponseEntity<Map<String, Object>> getSystemStats() {
        Map<String, Object> stats = new HashMap<>();

        // User statistics by role
        Map<String, Long> usersByRole = new HashMap<>();
        for (User.Role role : User.Role.values()) {
            usersByRole.put(role.name(), userRepository.countByRole(role));
        }
        stats.put("usersByRole", usersByRole);

        // Activity statistics (last 7 days)
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        long loginCount = auditLogRepository.countByEventTypeAndTimestampAfter(
            AuditLog.AuditEventType.LOGIN_SUCCESS, weekAgo
        );
        stats.put("loginsLast7Days", loginCount);

        // Security events (last 7 days)
        long securityEvents = auditLogRepository.countByTimestampAfter(weekAgo);
        stats.put("securityEventsLast7Days", securityEvents);

        return ResponseEntity.ok(stats);
    }

    @PostMapping("/system/clear-cache")
    public ResponseEntity<Map<String, String>> clearCache(
            @AuthenticationPrincipal UserDetails adminUser,
            HttpServletRequest httpRequest
    ) {
        // Log the cache clear action
        securityAuditLogger.logSecurityEvent(
            SecurityAuditLogger.SecurityEvent.valueOf("CACHE_CLEARED"),
            adminUser.getUsername(),
            getClientIp(httpRequest),
            Map.of("action", "clear_cache")
        );

        return ResponseEntity.ok(Map.of(
            "message", "Cache cleared successfully",
            "timestamp", LocalDateTime.now().toString()
        ));
    }

    // ==================== Helper Methods ====================

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getRole().name(),
            user.isActive(),
            user.isMfaEnabled(),
            user.getCreatedAt(),
            user.getLastLogin()
        );
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    // ==================== DTOs ====================

    public record UserDTO(
        Long id,
        String email,
        String name,
        String role,
        boolean enabled,
        boolean mfaEnabled,
        LocalDateTime createdAt,
        LocalDateTime lastLogin
    ) {}
}
