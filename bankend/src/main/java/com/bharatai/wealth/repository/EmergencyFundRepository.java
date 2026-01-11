package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.EmergencyFund;
import com.bharatai.wealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmergencyFundRepository extends JpaRepository<EmergencyFund, Long> {
    Optional<EmergencyFund> findByUser(User user);
}
