package com.bharatai.wealth.service;

import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.UserRepository;
import dev.samstevens.totp.code.*;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.qr.ZxingPngQrGenerator;
import dev.samstevens.totp.secret.DefaultSecretGenerator;
import dev.samstevens.totp.secret.SecretGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import dev.samstevens.totp.time.TimeProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;

import static dev.samstevens.totp.util.Utils.getDataUriForImage;

/**
 * Service for handling Multi-Factor Authentication (MFA) using TOTP.
 * Generates secrets, QR codes, and verifies TOTP codes.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MfaService {

    private final UserRepository userRepository;

    private final SecretGenerator secretGenerator = new DefaultSecretGenerator();
    private final QrGenerator qrGenerator = new ZxingPngQrGenerator();
    private final TimeProvider timeProvider = new SystemTimeProvider();
    private final CodeVerifier codeVerifier = new DefaultCodeVerifier(
            new DefaultCodeGenerator(), timeProvider);

    /**
     * Generates a new MFA secret and QR code for the user.
     */
    @Transactional
    public MfaSetupResponse setupMfa(Long userId) throws QrGenerationException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String secret = secretGenerator.generate();

        // Save secret but don't enable MFA yet (user must verify first)
        user.setMfaSecret(secret);
        userRepository.save(user);

        QrData qrData = new QrData.Builder()
                .label(user.getEmail())
                .secret(secret)
                .issuer("BharatAIWealth")
                .algorithm(HashingAlgorithm.SHA1)
                .digits(6)
                .period(30)
                .build();

        String qrCodeImage = getDataUriForImage(
                qrGenerator.generate(qrData),
                qrGenerator.getImageMimeType());

        log.info("MFA setup initiated for user: {}", user.getEmail());
        return new MfaSetupResponse(secret, qrCodeImage);
    }

    /**
     * Verifies the TOTP code and enables MFA if valid.
     */
    @Transactional
    public boolean verifyAndEnableMfa(Long userId, String code) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getMfaSecret() == null) {
            throw new RuntimeException("MFA not set up for this user");
        }

        boolean isValid = codeVerifier.isValidCode(user.getMfaSecret(), code);

        if (isValid) {
            user.setMfaEnabled(true);
            userRepository.save(user);
            log.info("MFA enabled for user: {}", user.getEmail());
        } else {
            log.warn("Invalid MFA code during setup for user: {}", user.getEmail());
        }

        return isValid;
    }

    /**
     * Verifies the TOTP code during login.
     */
    public boolean verifyCode(String email, String code) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isMfaEnabled() || user.getMfaSecret() == null) {
            return true; // MFA not enabled, skip verification
        }

        boolean isValid = codeVerifier.isValidCode(user.getMfaSecret(), code);
        log.debug("MFA verification for {}: {}", email, isValid ? "success" : "failed");
        return isValid;
    }

    /**
     * Disables MFA for a user.
     */
    @Transactional
    public void disableMfa(Long userId, String code) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Require valid code to disable
        if (!codeVerifier.isValidCode(user.getMfaSecret(), code)) {
            throw new RuntimeException("Invalid MFA code");
        }

        user.setMfaEnabled(false);
        user.setMfaSecret(null);
        userRepository.save(user);
        log.info("MFA disabled for user: {}", user.getEmail());
    }

    /**
     * Checks if MFA is enabled for a user.
     */
    public boolean isMfaEnabled(String email) {
        return userRepository.findByEmail(email)
                .map(User::isMfaEnabled)
                .orElse(false);
    }

    /**
     * Response DTO for MFA setup.
     */
    public record MfaSetupResponse(String secret, String qrCodeDataUri) {
    }
}
