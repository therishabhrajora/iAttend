package com.backend.iAttend.entities;


import java.util.List;

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

    @OneToOne(mappedBy = "college",cascade = CascadeType.ALL)
    private Subscriptions subscription;

    @OneToMany(mappedBy = "college", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Teacher> teachers;

    @OneToMany(mappedBy = "college", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Student> students;



    


}

