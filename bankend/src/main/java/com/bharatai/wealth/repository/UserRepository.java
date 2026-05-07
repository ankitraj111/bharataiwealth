package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    // ── Admin panel counts ────────────────────────────────────────
    long countByActiveTrue();
    long countByRole(User.Role role);

    // ── Admin panel: paginated search & filter ────────────────────
    /** Search by email (case-insensitive), no role filter */
    Page<User> findByEmailContainingIgnoreCase(String email, Pageable pageable);

    /** Filter by role only */
    Page<User> findByRole(User.Role role, Pageable pageable);

    /** Search by email AND filter by role */
    Page<User> findByEmailContainingIgnoreCaseAndRole(String email, User.Role role, Pageable pageable);
}

