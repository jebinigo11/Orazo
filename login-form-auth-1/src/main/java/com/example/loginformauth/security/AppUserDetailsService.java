package com.example.loginformauth.security;

import com.example.loginformauth.user.AppUserRepository;
import com.example.loginformauth.user.AppUser;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final AppUserRepository repo;

    public AppUserDetailsService(AppUserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser u = repo.findByCustomerId(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Use plain-text password field and set USER role
        return User.withUsername(u.getCustomerId())
                .password(u.getPassword())   // <- plain-text password
                .roles("USER")
                .disabled(!u.isEnabled())
                .build();
    }
}
