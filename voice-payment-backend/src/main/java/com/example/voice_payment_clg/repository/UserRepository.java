package com.example.voice_payment_clg.repository;

import com.example.voice_payment_clg.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

}
