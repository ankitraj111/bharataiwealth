package com.bharatai.wealth.service;

import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Service for handling login attempt tracking and brute force protection.
 * Locks accounts after MAX_ATTEMPTS failed login attempts.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class LoginAttemptService {

    private static final int MAX_ATTEMPTS = 5;
    private static final int LOCK_DURATION_MINUTES = 30;

    private final UserRepository userRepository;

    /**
     * Called when a user successfully logs in.
     * Resets failed login attempts counter.
     * 
     * DEVELOPMENT MODE: Account locking features disabled
     */
    @Transactional
    public void loginSucceeded(String email, String ipAddress) {
        userRepository.findByEmail(email).ifPresent(user -> {
            // DEVELOPMENT MODE: Skip failed attempts and lock tracking
            // TODO: Re-enable for production
            // user.setFailedLoginAttempts(0);
            // user.setAccountLocked(false);
            // user.setLockTime(null);
            
            user.setLastLogin(LocalDateTime.now());
            user.setLastLoginIp(ipAddress);
            userRepository.save(user);
            log.info("Login succeeded for user: {} from IP: {}", email, ipAddress);
        });
    }

    /**
     * Called when a login attempt fails.
     * Increments failed attempts counter and locks account if threshold exceeded.
     */
    @Transactional
    public void loginFailed(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            int attempts = user.getFailedLoginAttempts() + 1;
            user.setFailedLoginAttempts(attempts);

            if (attempts >= MAX_ATTEMPTS) {
                user.setAccountLocked(true);
                user.setLockTime(LocalDateTime.now());
                log.warn("Account locked due to {} failed attempts: {}", attempts, email);
            } else {
                log.warn("Failed login attempt {} of {} for user: {}", attempts, MAX_ATTEMPTS, email);
            }

            userRepository.save(user);
        });
    }

    /**
     * Checks if an account is currently locked.
     * Automatically unlocks if lock duration has expired.
     */
    @Transactional
    public boolean isAccountLocked(String email) {
        return userRepository.findByEmail(email).map(user -> {
            if (!user.isAccountLocked()) {
                return false;
            }

            // Check if lock duration has expired
            if (user.getLockTime() != null &&
                    user.getLockTime().plusMinutes(LOCK_DURATION_MINUTES).isBefore(LocalDateTime.now())) {
                // Auto-unlock
                user.setAccountLocked(false);
                user.setFailedLoginAttempts(0);
                user.setLockTime(null);
                userRepository.save(user);
                log.info("Account auto-unlocked after {} minutes: {}", LOCK_DURATION_MINUTES, email);
                return false;
            }

            return true;
        }).orElse(false);
    }

    /**
     * Gets remaining lock time in minutes.
     */
    public long getRemainingLockTimeMinutes(String email) {
        return userRepository.findByEmail(email)
                .filter(User::isAccountLocked)
                .filter(user -> user.getLockTime() != null)
                .map(user -> {
                    LocalDateTime unlockTime = user.getLockTime().plusMinutes(LOCK_DURATION_MINUTES);
                    if (unlockTime.isAfter(LocalDateTime.now())) {
                        return java.time.Duration.between(LocalDateTime.now(), unlockTime).toMinutes();
                    }
                    return 0L;
                })
                .orElse(0L);
    }
}
