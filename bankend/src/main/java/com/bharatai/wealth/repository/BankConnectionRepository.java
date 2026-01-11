package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.BankConnection;
import com.bharatai.wealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BankConnectionRepository extends JpaRepository<BankConnection, Long> {
    List<BankConnection> findByUser(User user);
}
