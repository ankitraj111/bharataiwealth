package com.bharatai.wealth.service;

import com.bharatai.wealth.dto.ExpenseRequest;
import com.bharatai.wealth.dto.ExpenseResponse;
import com.bharatai.wealth.exception.OwnershipException;
import com.bharatai.wealth.exception.ResourceNotFoundException;
import com.bharatai.wealth.model.Expense;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.ExpenseRepository;
import com.bharatai.wealth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Business logic for expenses.
 * Controllers delegate here — no business logic in controllers.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public Page<ExpenseResponse> getExpenses(String email, Pageable pageable) {
        User user = findUserByEmail(email);
        return expenseRepository.findByUserAndIsDeletedFalse(user, pageable)
                .map(ExpenseResponse::from);
    }

    @Transactional
    @CacheEvict(value = {"expenses", "dashboardSummary"}, allEntries = true)
    public ExpenseResponse createExpense(ExpenseRequest request, String email) {
        User user = findUserByEmail(email);

        Expense expense = Expense.builder()
                .user(user)
                .amount(request.amount())
                .description(request.description())
                .category(request.category())
                .date(request.date())
                .merchantName(request.merchantName())
                .paymentSource(request.paymentSource() != null ? request.paymentSource() : Expense.PaymentSource.CASH)
                .build();

        Expense saved = expenseRepository.save(expense);
        log.info("Created expense {} for user {}", saved.getId(), email);
        return ExpenseResponse.from(saved);
    }

    @Transactional
    @CacheEvict(value = {"expenses", "dashboardSummary"}, allEntries = true)
    public ExpenseResponse updateExpense(Long id, ExpenseRequest request, String email) {
        Expense expense = findExpenseById(id);
        verifyOwnership(expense, email);

        expense.setAmount(request.amount());
        expense.setDescription(request.description());
        expense.setCategory(request.category());
        expense.setDate(request.date());
        expense.setMerchantName(request.merchantName());
        if (request.paymentSource() != null) {
            expense.setPaymentSource(request.paymentSource());
        }

        Expense saved = expenseRepository.save(expense);
        log.info("Updated expense {} for user {}", id, email);
        return ExpenseResponse.from(saved);
    }

    @Transactional
    @CacheEvict(value = {"expenses", "dashboardSummary"}, allEntries = true)
    public void deleteExpense(Long id, String email) {
        Expense expense = findExpenseById(id);
        verifyOwnership(expense, email);

        expense.setDeleted(true);
        expenseRepository.save(expense);
        log.info("Soft-deleted expense {} for user {}", id, email);
    }

    // ── Private helpers ──────────────────────────────────────────

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    private Expense findExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense", "id", id));
    }

    private void verifyOwnership(Expense expense, String email) {
        if (!expense.getUser().getEmail().equals(email)) {
            throw new OwnershipException("Expense", expense.getId());
        }
    }
}
