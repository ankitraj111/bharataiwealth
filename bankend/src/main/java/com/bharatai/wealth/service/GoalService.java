package com.bharatai.wealth.service;

import com.bharatai.wealth.dto.GoalRequest;
import com.bharatai.wealth.dto.GoalResponse;
import com.bharatai.wealth.exception.OwnershipException;
import com.bharatai.wealth.exception.ResourceNotFoundException;
import com.bharatai.wealth.model.Goal;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.GoalRepository;
import com.bharatai.wealth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public Page<GoalResponse> getGoals(String email, Pageable pageable) {
        User user = findUserByEmail(email);
        return goalRepository.findByUser(user, pageable)
                .map(GoalResponse::from);
    }

    @Transactional
    public GoalResponse createGoal(GoalRequest request, String email) {
        User user = findUserByEmail(email);

        Goal goal = Goal.builder()
                .user(user)
                .name(request.name())
                .type(request.type())
                .targetAmount(request.targetAmount())
                .currentAmount(request.currentAmount())
                .targetYear(request.targetYear())
                .monthlyRequired(request.monthlyRequired())
                .build();

        Goal saved = goalRepository.save(goal);
        log.info("Created goal {} for user {}", saved.getId(), email);
        return GoalResponse.from(saved);
    }

    @Transactional
    public void deleteGoal(Long id, String email) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal", "id", id));

        if (!goal.getUser().getEmail().equals(email)) {
            throw new OwnershipException("Goal", id);
        }

        goalRepository.deleteById(id);
        log.info("Deleted goal {} for user {}", id, email);
    }

    private User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }
}
