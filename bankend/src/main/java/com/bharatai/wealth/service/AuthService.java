package com.bharatai.wealth.service;

import com.bharatai.wealth.dto.AuthDTO;
import com.bharatai.wealth.model.User;
import com.bharatai.wealth.repository.UserRepository;
import com.bharatai.wealth.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        @Override
        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new UsernameNotFoundException(
                                                "User not found with email: " + email));

                return new org.springframework.security.core.userdetails.User(
                                user.getEmail(),
                                user.getPassword(),
                                new ArrayList<>());
        }

        @Transactional
        public AuthDTO.AuthResponse register(AuthDTO.RegisterRequest request) {
                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new RuntimeException("Email already exists");
                }

                User user = User.builder()
                                .name(request.getName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(User.Role.USER)
                                .build();

                userRepository.save(user);

                UserDetails userDetails = loadUserByUsername(user.getEmail());
                String token = jwtService.generateToken(userDetails);

                return AuthDTO.AuthResponse.builder()
                                .token(token)
                                .user(AuthDTO.UserDTO.builder()
                                                .id(user.getId())
                                                .name(user.getName())
                                                .email(user.getEmail())
                                                .role(user.getRole().name())
                                                .build())
                                .build();
        }

        public AuthDTO.AuthResponse login(AuthDTO.LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

                UserDetails userDetails = loadUserByUsername(user.getEmail());
                String token = jwtService.generateToken(userDetails);

                return AuthDTO.AuthResponse.builder()
                                .token(token)
                                .user(AuthDTO.UserDTO.builder()
                                                .id(user.getId())
                                                .name(user.getName())
                                                .email(user.getEmail())
                                                .role(user.getRole().name())
                                                .build())
                                .build();
        }
}
