package com.bharatai.wealth.security;

import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.security.Security;
import java.util.Base64;

/**
 * Bank-level encryption service using AES-256-GCM
 * Used for encrypting sensitive data at rest
 */
@Service
public class EncryptionService {

    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int GCM_TAG_LENGTH = 128;
    private static final int GCM_IV_LENGTH = 12;
    private static final int AES_KEY_SIZE = 256;

    @Value("${encryption.master-key:}")
    private String masterKeyBase64;

    private SecretKey masterKey;

    static {
        Security.addProvider(new BouncyCastleProvider());
    }

    /**
     * Initialize master key from configuration or generate new one
     */
    private SecretKey getMasterKey() {
        if (masterKey == null) {
            if (masterKeyBase64 != null && !masterKeyBase64.isEmpty()) {
                byte[] decodedKey = Base64.getDecoder().decode(masterKeyBase64);
                masterKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "AES");
            } else {
                // Generate new key (for development only)
                try {
                    KeyGenerator keyGen = KeyGenerator.getInstance("AES");
                    keyGen.init(AES_KEY_SIZE, new SecureRandom());
                    masterKey = keyGen.generateKey();
                } catch (Exception e) {
                    throw new RuntimeException("Failed to generate master key", e);
                }
            }
        }
        return masterKey;
    }

    /**
     * Encrypt sensitive data using AES-256-GCM
     * Returns Base64 encoded: IV + Encrypted Data
     */
    public String encrypt(String plaintext) {
        try {
            // Generate random IV
            byte[] iv = new byte[GCM_IV_LENGTH];
            new SecureRandom().nextBytes(iv);

            // Initialize cipher
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
            cipher.init(Cipher.ENCRYPT_MODE, getMasterKey(), parameterSpec);

            // Encrypt
            byte[] ciphertext = cipher.doFinal(plaintext.getBytes("UTF-8"));

            // Combine IV + Ciphertext
            byte[] combined = new byte[iv.length + ciphertext.length];
            System.arraycopy(iv, 0, combined, 0, iv.length);
            System.arraycopy(ciphertext, 0, combined, iv.length, ciphertext.length);

            return Base64.getEncoder().encodeToString(combined);
        } catch (Exception e) {
            throw new RuntimeException("Encryption failed", e);
        }
    }

    /**
     * Decrypt data encrypted with encrypt()
     */
    public String decrypt(String encryptedData) {
        try {
            // Decode Base64
            byte[] combined = Base64.getDecoder().decode(encryptedData);

            // Extract IV and ciphertext
            byte[] iv = new byte[GCM_IV_LENGTH];
            byte[] ciphertext = new byte[combined.length - GCM_IV_LENGTH];
            System.arraycopy(combined, 0, iv, 0, iv.length);
            System.arraycopy(combined, iv.length, ciphertext, 0, ciphertext.length);

            // Initialize cipher
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
            cipher.init(Cipher.DECRYPT_MODE, getMasterKey(), parameterSpec);

            // Decrypt
            byte[] plaintext = cipher.doFinal(ciphertext);
            return new String(plaintext, "UTF-8");
        } catch (Exception e) {
            throw new RuntimeException("Decryption failed", e);
        }
    }

    /**
     * Hash sensitive data for comparison (one-way)
     */
    public String hash(String data) {
        try {
            java.security.MessageDigest digest = java.security.MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(data.getBytes("UTF-8"));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("Hashing failed", e);
        }
    }

    /**
     * Mask sensitive data for logging (e.g., credit card, account numbers)
     */
    public String maskSensitiveData(String data, int visibleChars) {
        if (data == null || data.length() <= visibleChars) {
            return data;
        }
        int maskLength = data.length() - visibleChars;
        return "*".repeat(maskLength) + data.substring(maskLength);
    }

    /**
     * Mask email for logging
     */
    public String maskEmail(String email) {
        if (email == null || !email.contains("@")) {
            return email;
        }
        String[] parts = email.split("@");
        String username = parts[0];
        String domain = parts[1];
        
        if (username.length() <= 2) {
            return "*".repeat(username.length()) + "@" + domain;
        }
        
        return username.charAt(0) + "*".repeat(username.length() - 2) + 
               username.charAt(username.length() - 1) + "@" + domain;
    }
}
