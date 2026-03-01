package com.bharatai.wealth.controller;

import lombok.RequiredArgsConstructor;
import com.bharatai.wealth.model.FamilyMember;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.FamilyMemberRepository;
import com.bharatai.wealth.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/family")
@RequiredArgsConstructor
public class FamilyMemberController {

    private final FamilyMemberRepository familyMemberRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<FamilyMember>> getFamily(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(familyMemberRepository.findByUser(user));
    }

    @PostMapping
    public ResponseEntity<FamilyMember> addMember(@RequestBody FamilyMember member, Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        member.setUser(user);
        return ResponseEntity.ok(familyMemberRepository.save(member));
    }
}
