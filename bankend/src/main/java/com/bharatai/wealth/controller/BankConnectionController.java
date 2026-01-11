package com.bharatai.wealth.controller;

import com.bharatai.wealth.dto.BankConnectionRequest;
import com.bharatai.wealth.model.BankConnection;
import com.bharatai.wealth.model.Expense;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.BankConnectionRepository;
import com.bharatai.wealth.repository.UserRepository;
import com.bharatai.wealth.service.BankSyncService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bank-connections")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BankConnectionController {

    private final BankConnectionRepository bankConnectionRepository;
    private final UserRepository userRepository;
    private final BankSyncService bankSyncService;

    @GetMapping
    public ResponseEntity<List<BankConnection>> getConnections(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(bankConnectionRepository.findByUser(user));
    }

    @PostMapping("/connect")
    public ResponseEntity<BankConnection> connectBank(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody BankConnectionRequest request) {

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        BankConnection connection = BankConnection.builder()
                .user(user)
                .bankName(request.getBankName())
                .accountLastFour(request.getAccountLastFour())
                .status(BankConnection.ConnectionStatus.CONNECTED)
                .build();

        connection = bankConnectionRepository.save(connection);

        // Trigger initial sync
        bankSyncService.syncTransactions(connection);
        connection.setLastSyncedAt(LocalDateTime.now());
        bankConnectionRepository.save(connection);

        return ResponseEntity.ok(connection);
    }

    @PostMapping("/{id}/sync")
    public ResponseEntity<List<Expense>> syncTransactions(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        BankConnection connection = bankConnectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Connection not found"));

        if (!connection.getUser().getEmail().equals(userDetails.getUsername())) {
            return ResponseEntity.status(403).build();
        }

        List<Expense> newExpenses = bankSyncService.syncTransactions(connection);
        connection.setLastSyncedAt(LocalDateTime.now());
        bankConnectionRepository.save(connection);

        return ResponseEntity.ok(newExpenses);
    }
}
