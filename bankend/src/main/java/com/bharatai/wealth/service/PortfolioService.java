package com.bharatai.wealth.service;

import com.bharatai.wealth.dto.PortfolioRequest;
import com.bharatai.wealth.dto.PortfolioResponse;
import com.bharatai.wealth.exception.OwnershipException;
import com.bharatai.wealth.exception.ResourceNotFoundException;
import com.bharatai.wealth.model.PortfolioItem;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.PortfolioRepository;
import com.bharatai.wealth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    public Page<PortfolioResponse> getPortfolio(String email, Pageable pageable) {
        User user = findUserByEmail(email);
        return portfolioRepository.findByUser(user, pageable)
                .map(PortfolioResponse::from);
    }

    @Transactional
    @CacheEvict(value = {"portfolio", "dashboardSummary"}, allEntries = true)
    public PortfolioResponse addItem(PortfolioRequest request, String email) {
        User user = findUserByEmail(email);

        PortfolioItem item = PortfolioItem.builder()
                .user(user)
                .symbol(request.symbol().toUpperCase())
                .name(request.name())
                .type(request.type())
                .quantity(request.quantity())
                .avgBuyPrice(request.avgBuyPrice())
                .currentPrice(request.currentPrice())
                .build();

        PortfolioItem saved = portfolioRepository.save(item);
        log.info("Added portfolio item {} ({}) for user {}", saved.getId(), saved.getSymbol(), email);
        return PortfolioResponse.from(saved);
    }

    @Transactional
    @CacheEvict(value = {"portfolio", "dashboardSummary"}, allEntries = true)
    public void deleteItem(Long id, String email) {
        PortfolioItem item = portfolioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PortfolioItem", "id", id));

        if (!item.getUser().getEmail().equals(email)) {
            throw new OwnershipException("PortfolioItem", id);
        }

        portfolioRepository.deleteById(id);
        log.info("Deleted portfolio item {} for user {}", id, email);
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }
}
