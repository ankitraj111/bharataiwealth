package com.bharatai.wealth.controller;

import com.bharatai.wealth.model.PortfolioItem;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.PortfolioRepository;
import com.bharatai.wealth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    @GetMapping
    @org.springframework.cache.annotation.Cacheable(value = "portfolio", key = "#authentication.name")
    public ResponseEntity<List<PortfolioItem>> getPortfolio(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(portfolioRepository.findByUser(user));
    }

    @PostMapping
    @org.springframework.cache.annotation.CacheEvict(value = { "portfolio",
            "dashboardSummary" }, key = "#authentication.name")
    public ResponseEntity<PortfolioItem> addPortfolioItem(@RequestBody PortfolioItem item,
            Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        item.setUser(user);
        return ResponseEntity.ok(portfolioRepository.save(item));
    }
}
