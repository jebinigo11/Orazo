package com.example.loginformauth.user;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {

    private final AppUserRepository repo;

    public AppUserService(AppUserRepository repo) {
        this.repo = repo;
    }

    public Optional<AppUser> findByCustomerId(String customerId) {
        return repo.findByCustomerId(customerId);
    }
}
