package com.example.loginformauth.admin;

import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AppAdminService {

    private final AppAdminRepository adminRepository;

    public AppAdminService(AppAdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // Only find by name, no save
    public Optional<AppAdmin> findByName(String name) {
        return adminRepository.findByName(name);
    }
}
