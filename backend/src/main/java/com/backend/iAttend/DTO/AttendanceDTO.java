package com.backend.iAttend.DTO;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

import com.backend.iAttend.entities.Student;
import com.backend.iAttend.entities.Teacher;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDTO {
    private String studentId; 
    private String teacherId;
    private String subject;
    private LocalDate date;
    private String status; 
}

