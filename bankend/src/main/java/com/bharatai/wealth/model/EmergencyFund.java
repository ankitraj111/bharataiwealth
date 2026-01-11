package com.bharatai.wealth.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "emergency_funds")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyFund {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "target_amount", precision = 15, scale = 2)
    private BigDecimal targetAmount;

    @Column(name = "current_amount", precision = 15, scale = 2)
    private BigDecimal currentAmount;

    @Column(name = "monthly_expenses", precision = 12, scale = 2)
    private BigDecimal monthlyExpenses;

    @Column(name = "months_buffer")
    private Integer monthsBuffer;
}
