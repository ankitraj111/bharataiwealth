package com.bharatai.wealth.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bank_connections")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankConnection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String accountLastFour;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConnectionStatus status;

    @Column
    private LocalDateTime lastSyncedAt;

    public enum ConnectionStatus {
        CONNECTED, DISCONNECTED
    }
}
