package com.backend.iAttend.DTO;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

import com.backend.iAttend.entities.Student;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDTO {
    private String studentId; // instead of Student object
    private String teacherId; // instead of Teacher object
    private String subject;
    private LocalDate date;
    private String status; // "Present" or "Absent"
}

