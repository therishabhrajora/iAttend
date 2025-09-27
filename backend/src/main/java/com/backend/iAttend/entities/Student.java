package com.backend.iAttend.entities;

import jakarta.persistence.*;
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
    private String rollNumber;
    private String studentClass;  // renamed because 'class' is a reserved keyword
}

