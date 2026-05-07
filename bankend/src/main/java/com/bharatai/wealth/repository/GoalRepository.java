package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.Goal;
import com.bharatai.wealth.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByUser(User user);

    // ── Paginated version ─────────────────────────────────────────
    Page<Goal> findByUser(User user, Pageable pageable);
}

