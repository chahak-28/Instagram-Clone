package com.instagram.features.authentication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagram.features.authentication.model.AuthenticationUser;

@Repository
public interface AuthenticationUserRepository extends JpaRepository<AuthenticationUser, Long> {

	Optional<AuthenticationUser> findByEmail(String email);

}
