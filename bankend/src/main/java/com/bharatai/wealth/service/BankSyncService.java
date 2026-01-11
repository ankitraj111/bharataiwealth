package com.bharatai.wealth.service;

import com.bharatai.wealth.model.BankConnection;
import com.bharatai.wealth.model.Expense;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BankSyncService {

    private final ExpenseRepository expenseRepository;
    private final Random random = new Random();

    @Transactional
    public List<Expense> syncTransactions(BankConnection connection) {
        User user = connection.getUser();
        List<Expense> syncedExpenses = new ArrayList<>();

        // Simulate syncing last 90 days if first time, or last 1 day if periodic
        int daysBack = connection.getLastSyncedAt() == null ? 90 : 1;

        for (int i = 0; i < daysBack; i++) {
            int dailyTransCount = random.nextInt(4); // 0-3 transactions per day
            LocalDate date = LocalDate.now().minusDays(i);

            for (int j = 0; j < dailyTransCount; j++) {
                Expense expense = generateMockTransaction(user, date);
                // Check for duplicates (in real app we use sourceTransId)
                if (expenseRepository.findBySourceTransId(expense.getSourceTransId()).isEmpty()) {
                    syncedExpenses.add(expenseRepository.save(expense));
                }
            }
        }

        return syncedExpenses;
    }

    private Expense generateMockTransaction(User user, LocalDate date) {
        String[] merchants = { "Swiggy", "Zomato", "Uber", "Ola", "Amazon", "Flipkart", "Jio", "Airtel", "Netflix",
                "MedPlus", "Starbucks" };
        String merchant = merchants[random.nextInt(merchants.length)];

        BigDecimal amount = BigDecimal.valueOf(100 + random.nextInt(2000));
        Expense.Category category = autoCategorize(merchant);
        Expense.PaymentSource source = Expense.PaymentSource.values()[random.nextInt(4)]; // Exclude CASH for bank sync

        return Expense.builder()
                .user(user)
                .description("Auto-synced from " + merchant)
                .merchantName(merchant)
                .amount(amount)
                .category(category)
                .date(date)
                .isAutoSynced(true)
                .sourceTransId(UUID.randomUUID().toString())
                .paymentSource(source)
                .build();
    }

    private Expense.Category autoCategorize(String merchant) {
        return switch (merchant) {
            case "Swiggy", "Zomato", "Starbucks" -> Expense.Category.FOOD;
            case "Uber", "Ola" -> Expense.Category.TRANSPORT;
            case "Amazon", "Flipkart" -> Expense.Category.SHOPPING;
            case "Jio", "Airtel", "Netflix" -> Expense.Category.BILLS;
            case "MedPlus" -> Expense.Category.HEALTH;
            default -> Expense.Category.OTHER;
        };
    }
}
