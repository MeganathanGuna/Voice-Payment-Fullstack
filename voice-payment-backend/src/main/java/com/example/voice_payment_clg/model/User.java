package com.example.voice_payment_clg.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username_voice", nullable = false)
    private String usernameVoice;

    @Column(name = "password_voice", nullable = false)
    private String passwordVoice;

    @Column(name = "balance")
    private Double balance = 500.0;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsernameVoice() {
        return usernameVoice;
    }

    public void setUsernameVoice(String usernameVoice) {
        this.usernameVoice = usernameVoice;
    }

    public String getPasswordVoice() {
        return passwordVoice;
    }

    public void setPasswordVoice(String passwordVoice) {
        this.passwordVoice = passwordVoice;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}