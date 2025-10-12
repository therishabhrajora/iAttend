package com.backend.iAttend.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @Column(unique = true, nullable = false)
    private String teacherId;
    private String name;
    private String email;
    private String password;
    private String subject;
    private String role;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Attendance> attandence;

}
