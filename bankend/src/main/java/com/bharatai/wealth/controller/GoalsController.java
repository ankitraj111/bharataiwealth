package com.bharatai.wealth.controller;

import com.bharatai.wealth.dto.GoalRequest;
import com.bharatai.wealth.dto.GoalResponse;
import com.bharatai.wealth.dto.PageResponse;
import com.bharatai.wealth.service.GoalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Thin controller — delegates all business logic to {@link GoalService}.
 */
@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalsController {

    private final GoalService goalService;

    @GetMapping
    @PreAuthorize("hasAuthority('GOAL_READ')")
    public ResponseEntity<PageResponse<GoalResponse>> getGoals(
            Authentication auth,
            @RequestParam(defaultValue = "0")          int page,
            @RequestParam(defaultValue = "20")         int size,
            @RequestParam(defaultValue = "targetYear") String sortBy,
            @RequestParam(defaultValue = "ASC")        String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        PageRequest pageRequest = PageRequest.of(page, Math.min(size, 100), sort);
        return ResponseEntity.ok(PageResponse.of(goalService.getGoals(auth.getName(), pageRequest)));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('GOAL_WRITE')")
    public ResponseEntity<GoalResponse> addGoal(
            @Valid @RequestBody GoalRequest request,
            Authentication auth
    ) {
        return ResponseEntity.ok(goalService.createGoal(request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('GOAL_DELETE')")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id, Authentication auth) {
        goalService.deleteGoal(id, auth.getName());
        return ResponseEntity.noContent().build();
    }
}
