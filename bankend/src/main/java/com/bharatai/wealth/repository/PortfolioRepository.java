package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.PortfolioItem;
import com.bharatai.wealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<PortfolioItem, Long> {
    List<PortfolioItem> findByUser(User user);

    List<PortfolioItem> findByUserOrderByCurrentPriceDesc(User user);
}
