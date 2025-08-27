package com.example.loginformauth.admin;

import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class AppAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long admin_id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false)
    private String password;

    // Constructors
    public AppAdmin() {}

    public AppAdmin(String name, String password) {
        this.name = name;
        this.password = password;
    }

    // Getters and Setters
    public Long getAdmin_id() {
        return admin_id;
    }

    public void setAdmin_id(Long admin_id) {
        this.admin_id = admin_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
