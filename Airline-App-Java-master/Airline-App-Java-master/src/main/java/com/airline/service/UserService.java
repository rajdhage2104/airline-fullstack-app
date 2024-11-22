package com.airline.service;

import com.airline.dto.LoginResponse;
import com.airline.model.User;
import com.airline.repository.UserRepository;
import com.airline.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) throws Exception {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("Email already exists");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public LoginResponse loginUser(String email, String password) throws Exception {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new Exception("User not found"));
            
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid password");
        }
        
        String token = jwtUtil.generateToken(user.getEmail());
        
        return new LoginResponse(
            user.getId(), 
            user.getName(), 
            user.getEmail(), 
            user.getRole(),
            token
        );
    }
} 