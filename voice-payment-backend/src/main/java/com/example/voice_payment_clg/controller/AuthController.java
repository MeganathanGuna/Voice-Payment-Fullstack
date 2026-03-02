package com.example.voice_payment_clg.controller;

import com.example.voice_payment_clg.dto.VoiceAuthRequest;
import com.example.voice_payment_clg.model.User;
import com.example.voice_payment_clg.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody VoiceAuthRequest request) {
        User user = service.register(
                request.getUsernameVoice(),
                request.getPasswordVoice()
        );
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody VoiceAuthRequest request) {
        User user = service.login(
                request.getUsernameVoice(),
                request.getPasswordVoice()
        );

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401)
                    .body("Voice authentication failed");
        }
    }
}