package com.bharatai.wealth.config;

import com.bharatai.wealth.model.Expense;
import com.bharatai.wealth.model.PortfolioItem;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.ExpenseRepository;
import com.bharatai.wealth.repository.PortfolioRepository;
import com.bharatai.wealth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;     

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final ExpenseRepository expenseRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create demo user if not exists
        if (!userRepository.existsByEmail("demo@bharatai.com")) {
            User demoUser = User.builder()
                    .name("Ankit Raj")
                    .email("demo@bharatai.com")
                    .password(passwordEncoder.encode("demo123"))
                    .role(User.Role.PREMIUM)
                    .build();
            userRepository.save(demoUser);
            log.info("Created demo user: demo@bharatai.com / demo123");

            // Add sample portfolio items
            portfolioRepository.save(PortfolioItem.builder()
                    .user(demoUser)
                    .symbol("RELIANCE")
                    .name("Reliance Industries Ltd")
                    .type(PortfolioItem.AssetType.STOCK)
                    .quantity(new BigDecimal("50"))
                    .avgBuyPrice(new BigDecimal("2450.00"))
                    .currentPrice(new BigDecimal("2580.50"))
                    .build());

            portfolioRepository.save(PortfolioItem.builder()
                    .user(demoUser)
                    .symbol("TCS")
                    .name("Tata Consultancy Services")
                    .type(PortfolioItem.AssetType.STOCK)
                    .quantity(new BigDecimal("25"))
                    .avgBuyPrice(new BigDecimal("3200.00"))
                    .currentPrice(new BigDecimal("3450.75"))
                    .build());

            portfolioRepository.save(PortfolioItem.builder()
                    .user(demoUser)
                    .symbol("HDFCBANK")
                    .name("HDFC Bank Ltd")
                    .type(PortfolioItem.AssetType.STOCK)
                    .quantity(new BigDecimal("100"))
                    .avgBuyPrice(new BigDecimal("1580.00"))
                    .currentPrice(new BigDecimal("1620.25"))
                    .build());

            portfolioRepository.save(PortfolioItem.builder()
                    .user(demoUser)
                    .symbol("BTC")
                    .name("Bitcoin")
                    .type(PortfolioItem.AssetType.CRYPTO)
                    .quantity(new BigDecimal("0.15"))
                    .avgBuyPrice(new BigDecimal("3500000.00"))
                    .currentPrice(new BigDecimal("3750000.00"))
                    .build());

            // Add sample expenses
            expenseRepository.save(Expense.builder()
                    .user(demoUser)
                    .description("Grocery Shopping")
                    .amount(new BigDecimal("2500.00"))
                    .category(Expense.Category.FOOD)
                    .date(LocalDate.now().minusDays(2))
                    .build());

            expenseRepository.save(Expense.builder()
                    .user(demoUser)
                    .description("Electricity Bill")
                    .amount(new BigDecimal("1800.00"))
                    .category(Expense.Category.BILLS)
                    .date(LocalDate.now().minusDays(5))
                    .build());

            expenseRepository.save(Expense.builder()
                    .user(demoUser)
                    .description("Metro Card Recharge")
                    .amount(new BigDecimal("500.00"))
                    .category(Expense.Category.TRANSPORT)
                    .date(LocalDate.now().minusDays(1))
                    .build());

            expenseRepository.save(Expense.builder()
                    .user(demoUser)
                    .description("Netflix Subscription")
                    .amount(new BigDecimal("649.00"))
                    .category(Expense.Category.ENTERTAINMENT)
                    .date(LocalDate.now())
                    .build());

            log.info("Created sample portfolio and expense data for demo user");
        }
    }
}
