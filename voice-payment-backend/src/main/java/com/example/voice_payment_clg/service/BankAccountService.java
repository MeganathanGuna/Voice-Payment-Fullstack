package com.example.voice_payment_clg.service;

import com.example.voice_payment_clg.model.BankAccount;
import com.example.voice_payment_clg.model.User;
import com.example.voice_payment_clg.repository.BankAccountRepository;
import com.example.voice_payment_clg.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BankAccountService {

    private final BankAccountRepository repo;
    private final UserRepository userRepo;

    public BankAccount addAccount(BankAccount account, Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        account.setUser(user);
        return repo.save(account);
    }

    public List<BankAccount> getAccounts(Long userId) {
        return repo.findByUserId(userId);
    }
}
