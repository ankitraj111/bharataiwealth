package com.bharatai.wealth.controller;

import com.bharatai.wealth.dto.ExpenseRequest;
import com.bharatai.wealth.dto.ExpenseResponse;
import com.bharatai.wealth.dto.PageResponse;
import com.bharatai.wealth.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Thin controller — delegates all business logic to {@link ExpenseService}.
 */
@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @GetMapping
    @PreAuthorize("hasAuthority('EXPENSE_READ')")
    public ResponseEntity<PageResponse<ExpenseResponse>> getExpenses(
            Authentication auth,
            @RequestParam(defaultValue = "0")    int page,
            @RequestParam(defaultValue = "20")   int size,
            @RequestParam(defaultValue = "date") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, Math.min(size, 100), sort);
        return ResponseEntity.ok(PageResponse.of(expenseService.getExpenses(auth.getName(), pageRequest)));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('EXPENSE_WRITE')")
    public ResponseEntity<ExpenseResponse> addExpense(
            @Valid @RequestBody ExpenseRequest request,
            Authentication auth
    ) {
        return ResponseEntity.ok(expenseService.createExpense(request, auth.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('EXPENSE_WRITE')")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody ExpenseRequest request,
            Authentication auth
    ) {
        return ResponseEntity.ok(expenseService.updateExpense(id, request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('EXPENSE_DELETE')")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id, Authentication auth) {
        expenseService.deleteExpense(id, auth.getName());
        return ResponseEntity.noContent().build();
    }
}
