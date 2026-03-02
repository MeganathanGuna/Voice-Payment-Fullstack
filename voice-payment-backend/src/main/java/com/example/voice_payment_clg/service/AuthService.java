package com.example.voice_payment_clg.service;

import com.example.voice_payment_clg.model.User;
import com.example.voice_payment_clg.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UserRepository repository;

    public AuthService(UserRepository repository) {
        this.repository = repository;
    }

    public User register(String usernameVoice, String passwordVoice) {
        User user = new User();
        user.setUsernameVoice(usernameVoice);
        user.setPasswordVoice(passwordVoice);
        user.setBalance(500.0);  // Give new users starting balance
        return repository.save(user);
    }

    public User login(String usernameVoice, String passwordVoice) {
        List<User> users = repository.findAll();

        for (User user : users) {
            boolean usernameMatch = user.getUsernameVoice().equalsIgnoreCase(usernameVoice.trim());
            boolean passwordMatch = user.getPasswordVoice().equalsIgnoreCase(passwordVoice.trim());

            if (usernameMatch && passwordMatch) {
                return user;
            }
        }
        return null;
    }
}