package com.backend.iAttend.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "student")
public class Student {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    private String name;
    @Column(unique = true, nullable = false)
    private String rollNumber;
    private String studentClass; // renamed because 'class' is a reserved keyword
    @Email
    private String email;   
    private String password;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Attendance> attendances;
}

