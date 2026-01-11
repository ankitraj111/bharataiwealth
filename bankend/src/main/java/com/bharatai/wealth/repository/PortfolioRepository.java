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

    @org.springframework.data.jpa.repository.Query("SELECT SUM(p.quantity * p.currentPrice) FROM PortfolioItem p WHERE p.user = :user")
    java.math.BigDecimal sumTotalNetWorth(@org.springframework.data.repository.query.Param("user") User user);
}
