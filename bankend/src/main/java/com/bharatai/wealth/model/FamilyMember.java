package com.bharatai.wealth.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "family_members")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String relation;

    @Column(name = "net_worth", precision = 15, scale = 2)
    private BigDecimal netWorth;

    @Column(name = "monthly_expense", precision = 15, scale = 2)
    private BigDecimal monthlyExpense;

    @Builder.Default
    @Column(nullable = false)
    private String status = "ACTIVE";
}
