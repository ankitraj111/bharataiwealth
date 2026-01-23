package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    Page<AuditLog> findByUserIdOrderByTimestampDesc(Long userId, Pageable pageable);

    Page<AuditLog> findByEventTypeOrderByTimestampDesc(AuditLog.AuditEventType eventType, Pageable pageable);

    @Query("SELECT a FROM AuditLog a WHERE a.timestamp BETWEEN :start AND :end ORDER BY a.timestamp DESC")
    List<AuditLog> findByTimestampRange(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    @Query("SELECT a FROM AuditLog a WHERE a.success = false AND a.eventType = :eventType " +
            "AND a.timestamp > :since ORDER BY a.timestamp DESC")
    List<AuditLog> findFailedEventsSince(
            @Param("eventType") AuditLog.AuditEventType eventType,
            @Param("since") LocalDateTime since);

    @Query("SELECT COUNT(a) FROM AuditLog a WHERE a.ipAddress = :ip AND a.eventType = :eventType " +
            "AND a.success = false AND a.timestamp > :since")
    long countFailedAttemptsByIp(
            @Param("ip") String ipAddress,
            @Param("eventType") AuditLog.AuditEventType eventType,
            @Param("since") LocalDateTime since);
}
