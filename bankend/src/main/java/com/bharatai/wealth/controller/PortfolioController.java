package com.bharatai.wealth.controller;

import com.bharatai.wealth.dto.PageResponse;
import com.bharatai.wealth.dto.PortfolioRequest;
import com.bharatai.wealth.dto.PortfolioResponse;
import com.bharatai.wealth.service.PortfolioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Thin controller — delegates all business logic to {@link PortfolioService}.
 */
@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping
    @PreAuthorize("hasAuthority('PORTFOLIO_READ')")
    public ResponseEntity<PageResponse<PortfolioResponse>> getPortfolio(
            Authentication auth,
            @RequestParam(defaultValue = "0")            int page,
            @RequestParam(defaultValue = "20")           int size,
            @RequestParam(defaultValue = "currentPrice") String sortBy,
            @RequestParam(defaultValue = "DESC")         String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, Math.min(size, 100), sort);
        return ResponseEntity.ok(PageResponse.of(portfolioService.getPortfolio(auth.getName(), pageRequest)));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('PORTFOLIO_WRITE')")
    public ResponseEntity<PortfolioResponse> addPortfolioItem(
            @Valid @RequestBody PortfolioRequest request,
            Authentication auth
    ) {
        return ResponseEntity.ok(portfolioService.addItem(request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('PORTFOLIO_DELETE')")
    public ResponseEntity<Void> deletePortfolioItem(@PathVariable Long id, Authentication auth) {
        portfolioService.deleteItem(id, auth.getName());
        return ResponseEntity.noContent().build();
    }
}
