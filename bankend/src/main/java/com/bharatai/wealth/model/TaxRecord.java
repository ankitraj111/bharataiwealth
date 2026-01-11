package com.bharatai.wealth.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "tax_records")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaxRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String financialYear;

    @Column(name = "total_income", precision = 15, scale = 2)
    private BigDecimal totalIncome;

    @Column(name = "tax_paid", precision = 12, scale = 2)
    private BigDecimal taxPaid;

    @Column(name = "deductions_80c", precision = 12, scale = 2)
    private BigDecimal deductions80c;

    @Column(name = "other_deductions", precision = 12, scale = 2)
    private BigDecimal otherDeductions;
}
