package com.example.loginformauth.controller;

import com.example.loginformauth.admin.AppAdmin;
import com.example.loginformauth.admin.AppAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AppAdminService adminService;

    // Admin login only
    @PostMapping("/login")
    public ResponseEntity<String> adminLogin(@RequestBody Map<String, String> creds) {
        String username = creds.get("username");
        String password = creds.get("password");

        Optional<AppAdmin> admin = adminService.findByName(username);
        if(admin.isPresent() && admin.get().getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    // Get admin by name
    @GetMapping("/{name}")
    public ResponseEntity<AppAdmin> getAdmin(@PathVariable String name) {
        Optional<AppAdmin> admin = adminService.findByName(name);
        return admin.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }
}
