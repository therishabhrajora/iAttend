package com.backend.iAttend.entities;


import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "college")
public class College {
    @Id
    private String id;

    private String name;
    private String address;
    private String contact;
    private String email;
    private String password; // store hashed password
}

