package com.example.voice_payment_clg.controller;

import com.example.voice_payment_clg.model.Transaction;
import com.example.voice_payment_clg.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService service;

    @PostMapping
    public ResponseEntity<?> pay(
            @RequestParam Long userId,
            @RequestParam String person,
            @RequestParam Double amount,
            @RequestParam String password) {

        try {
            Transaction tx = service.pay(userId, person, amount, password);
            return ResponseEntity.ok(tx);
        } catch (IllegalArgumentException e) {
            // Wrong password or invalid amount → 400 with clear message
            return ResponseEntity.badRequest().body(
                    Map.of("error", e.getMessage())
            );
        } catch (RuntimeException e) {
            // Other business errors (e.g. user not found, insufficient balance)
            return ResponseEntity.badRequest().body(
                    Map.of("error", e.getMessage())
            );
        } catch (Exception e) {
            // Unexpected server errors → 500
            return ResponseEntity.internalServerError().body(
                    Map.of("error", "Internal server error")
            );
        }
    }

    @GetMapping("/history/{userId}")
    public List<Transaction> history(@PathVariable Long userId) {
        return service.getTransactions(userId);
    }

    @PostMapping("/add-money")
    public ResponseEntity<?> addMoney(
            @RequestParam Long userId,
            @RequestParam Double amount) {

        try {
            double newBalance = service.addMoney(userId, amount);
            return ResponseEntity.ok(Map.of(
                    "message", "Added ₹" + amount + " successfully",
                    "newBalance", newBalance
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Internal server error"));
        }
    }
}