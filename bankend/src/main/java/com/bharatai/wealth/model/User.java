package com.bharatai.wealth.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.USER;

    @Column(name = "is_active")
    @Builder.Default
    private Boolean active = true;

    // ==================== MFA Fields ====================
    @Column(name = "mfa_enabled")
    @Builder.Default
    private Boolean mfaEnabled = false;

    @Column(name = "mfa_secret")
    private String mfaSecret;

    // ==================== Brute Force Protection ====================
    @Column(name = "failed_login_attempts")
    @Builder.Default
    private Integer failedLoginAttempts = 0;

    @Column(name = "account_locked")
    @Builder.Default
    private Boolean accountLocked = false;

    @Column(name = "lock_time")
    private LocalDateTime lockTime;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "last_login_ip")
    private String lastLoginIp;

    // ==================== Audit Fields ====================
    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ==================== Permissions ====================

    /**
     * Derive the set of fine-grained permissions from this user's Role.
     * Used by @PreAuthorize("hasAuthority('EXPENSE_READ')") etc.
     */
    public Set<Permission> getPermissions() {
        return role.getPermissions();
    }

    // ==================== UserDetails Implementation ====================
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Include the role itself + all derived permissions as authorities
        Set<GrantedAuthority> authorities = new java.util.HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));
        role.getPermissions().forEach(p ->
                authorities.add(new SimpleGrantedAuthority(p.name())));
        return authorities;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public boolean isAccountLocked() {
        return accountLocked != null && accountLocked;
    }

    public boolean isMfaEnabled() {
        return mfaEnabled != null && mfaEnabled;
    }

    public boolean isActive() {
        return active != null && active;
    }

    public enum Role {
        USER,
        PREMIUM,
        ANALYST,
        ADMIN;

        /**
         * Returns the set of permissions granted to this role.
         * Higher roles inherit all permissions of lower roles.
         */
        public Set<Permission> getPermissions() {
            return switch (this) {
                case USER -> EnumSet.of(
                        Permission.EXPENSE_READ, Permission.EXPENSE_WRITE, Permission.EXPENSE_DELETE,
                        Permission.PORTFOLIO_READ, Permission.PORTFOLIO_WRITE, Permission.PORTFOLIO_DELETE,
                        Permission.GOAL_READ, Permission.GOAL_WRITE, Permission.GOAL_DELETE
                );
                case PREMIUM -> EnumSet.of(
                        Permission.EXPENSE_READ, Permission.EXPENSE_WRITE, Permission.EXPENSE_DELETE,
                        Permission.PORTFOLIO_READ, Permission.PORTFOLIO_WRITE, Permission.PORTFOLIO_DELETE,
                        Permission.GOAL_READ, Permission.GOAL_WRITE, Permission.GOAL_DELETE,
                        Permission.ANALYTICS_READ
                );
                case ANALYST -> EnumSet.of(
                        Permission.EXPENSE_READ,
                        Permission.PORTFOLIO_READ,
                        Permission.GOAL_READ,
                        Permission.ANALYTICS_READ
                );
                case ADMIN -> EnumSet.allOf(Permission.class);
            };
        }
    }
}
