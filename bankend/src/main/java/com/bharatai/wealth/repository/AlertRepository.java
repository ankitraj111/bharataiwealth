package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.Alert;
import com.bharatai.wealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByUserOrderByTimestampDesc(User user);
}
