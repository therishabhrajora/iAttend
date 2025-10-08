package com.backend.iAttend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    private String subject;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String status; // "Present" or "Absent"
}
 