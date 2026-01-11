package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.TaxRecord;
import com.bharatai.wealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaxRecordRepository extends JpaRepository<TaxRecord, Long> {
    List<TaxRecord> findByUser(User user);

    java.util.Optional<TaxRecord> findByUserAndFinancialYear(User user, String financialYear);
}
