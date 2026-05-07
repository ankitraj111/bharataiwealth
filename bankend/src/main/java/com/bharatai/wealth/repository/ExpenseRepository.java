package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.Expense;
import com.bharatai.wealth.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);

    List<Expense> findByUserAndIsDeletedFalseOrderByDateDesc(User user);

    // ── Paginated version (replaces the full-list query) ──────────
    Page<Expense> findByUserAndIsDeletedFalse(User user, Pageable pageable);

    List<Expense> findByUserAndDateBetweenAndIsDeletedFalse(User user, LocalDate startDate, LocalDate endDate);

    @org.springframework.data.jpa.repository.Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user = :user AND e.date >= :startDate AND e.isDeleted = false")
    java.math.BigDecimal sumMonthlyExpenses(@org.springframework.data.repository.query.Param("user") User user,
            @org.springframework.data.repository.query.Param("startDate") LocalDate startDate);

    java.util.Optional<Expense> findBySourceTransId(String sourceTransId);
}
