package com.bharatai.wealth.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private LocalDate date;

    @Builder.Default
    @Column(nullable = false)
    private boolean isAutoSynced = false;

    @Column(unique = true)
    private String sourceTransId;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentSource paymentSource = PaymentSource.CASH;

    @Column
    private String merchantName;

    @Builder.Default
    @Column(nullable = false)
    private boolean isDeleted = false;

    public enum Category {
        FOOD, TRANSPORT, ENTERTAINMENT, BILLS, SHOPPING, HEALTH, EDUCATION, OTHER
    }

    public enum PaymentSource {
        UPI, DEBIT_CARD, CREDIT_CARD, NET_BANKING, CASH
    }
}
