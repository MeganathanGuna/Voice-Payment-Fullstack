package com.example.voice_payment_clg.service;

import com.example.voice_payment_clg.model.Transaction;
import com.example.voice_payment_clg.model.User;
import com.example.voice_payment_clg.repository.TransactionRepository;
import com.example.voice_payment_clg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final TransactionRepository repo;
    private final UserRepository userRepo;

    public Transaction pay(Long userId, String person, Double amount, String spokenPassword) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Password check
        if (!user.getPasswordVoice().trim().equalsIgnoreCase(spokenPassword.trim())) {
            throw new IllegalArgumentException("Incorrect password. Payment failed.");
        }

        // Balance check
        if (user.getBalance() < amount) {
            throw new IllegalArgumentException("Insufficient balance. Available: " + user.getBalance());
        }

        user.setBalance(user.getBalance() - amount);
        userRepo.save(user);

        Transaction tx = new Transaction();
        tx.setUser(user);
        tx.setPersonName(person);
        tx.setAmount(amount);
        tx.setDate(LocalDateTime.now());
        tx.setStatus("SUCCESS");

        return repo.save(tx);
    }

    public List<Transaction> getTransactions(Long userId) {
        return userRepo.findById(userId)
                .map(u -> repo.findByUserId(userId))
                .orElse(List.of());
    }

    public double addMoney(Long userId, Double amount) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        user.setBalance(user.getBalance() + amount);
        userRepo.save(user);

        return user.getBalance();
    }
}