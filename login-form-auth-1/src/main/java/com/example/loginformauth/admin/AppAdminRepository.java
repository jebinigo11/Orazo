package com.example.loginformauth.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppAdminRepository extends JpaRepository<AppAdmin, Long> {
    Optional<AppAdmin> findByName(String name);
}
