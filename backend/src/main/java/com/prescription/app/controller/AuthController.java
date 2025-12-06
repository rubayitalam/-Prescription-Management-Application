package com.prescription.app.controller;

import com.prescription.app.dto.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(Authentication authentication) {
        // If we reach here, the user is authenticated via Basic Auth or Session
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return ResponseEntity.ok(new AuthResponse(authentication.getName(), role, "Login successful"));
    }
}
