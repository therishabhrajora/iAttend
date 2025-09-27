package com.backend.iAttend.entities;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "teacher")
public class Teacher {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    private String name;
    private String email;
    private String password;
}
