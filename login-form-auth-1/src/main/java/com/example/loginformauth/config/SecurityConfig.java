package com.example.loginformauth.config;

import com.example.loginformauth.security.AppUserDetailsService;
import com.example.loginformauth.admin.AppAdminService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final AppUserDetailsService uds;
    private final AppAdminService adminService;

    public SecurityConfig(AppUserDetailsService uds, AppAdminService adminService) {
        this.uds = uds;
        this.adminService = adminService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // plain-text
    }

    @Bean
    public DaoAuthenticationProvider userAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(uds);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public DaoAuthenticationProvider adminAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(adminUserDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public UserDetailsService adminUserDetailsService() {
        return username -> adminService.findByName(username)
                .map(admin -> User.builder()
                        .username(admin.getName())
                        .password(admin.getPassword())  // plain-text
                        .roles("ADMIN")
                        .build())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/login").permitAll()          // user login
                .requestMatchers("/api/admin/login").permitAll()    // allow admin login without auth
                .requestMatchers("/api/admin/register").permitAll() // allow admin register
                .requestMatchers("/api/admin/**").hasRole("ADMIN")  // other admin endpoints require ADMIN role
                .requestMatchers("/api/**").authenticated()
            )
            .httpBasic(); // optional, keeps HTTP Basic for other secured endpoints
        return http.build();
    }

}
