package com.example.loginformauth.controller;

import com.example.loginformauth.user.AppUser;
import com.example.loginformauth.user.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AppUserService userService;

    // ------------------------
    // 1️⃣ User Login Endpoint (Simple)
    // ------------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Optional<AppUser> user = userService.findByCustomerId(req.username);

        if(user.isPresent() && user.get().getPassword().equals(req.password)) {
            return ResponseEntity.ok(new LoginResponse("Welcome, " + user.get().getName() + "!"));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    // ------------------------
    // DTO Classes
    // ------------------------
    public static class LoginRequest {
        public String username;
        public String password;
    }

    public static class LoginResponse {
        public String message;
        public LoginResponse(String message) {
            this.message = message;
        }
    }

    // ------------------------
    // Optional: Get Current User
    // ------------------------
    @GetMapping("/me/{username}")
    public ResponseEntity<?> getCurrentUser(@PathVariable String username) {
        Optional<AppUser> user = userService.findByCustomerId(username);
        if(user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
