package com.backend.iAttend.entities;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private String password;
    private String role;

    @OneToOne(mappedBy = "college", cascade = CascadeType.ALL)
    @JsonIgnore
    private Subscriptions subscription;

    @OneToMany(mappedBy = "college", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Teacher> teachers;

    @OneToMany(mappedBy = "college", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Student> students;

   
}
