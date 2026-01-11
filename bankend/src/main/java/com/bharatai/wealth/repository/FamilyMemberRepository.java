package com.bharatai.wealth.repository;

import com.bharatai.wealth.model.FamilyMember;
import com.bharatai.wealth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyMemberRepository extends JpaRepository<FamilyMember, Long> {
    List<FamilyMember> findByUser(User user);
}
