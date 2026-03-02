package com.example.voice_payment_clg.controller;

import com.example.voice_payment_clg.model.BankAccount;
import com.example.voice_payment_clg.service.BankAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bank")
@RequiredArgsConstructor
@CrossOrigin
public class BankAccountController {

    private final BankAccountService service;

    @PostMapping
    public BankAccount addAccount(@RequestBody BankAccount account,
                                  @RequestParam Long userId) {
        return service.addAccount(account, userId);
    }

    @GetMapping("/{userId}")
    public List<BankAccount> getAccounts(@PathVariable Long userId) {
        return service.getAccounts(userId);
    }
}
