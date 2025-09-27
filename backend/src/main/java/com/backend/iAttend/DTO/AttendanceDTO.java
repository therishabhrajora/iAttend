package com.backend.iAttend.DTO;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDTO {
    private Long studentId; // instead of Student object
    private Long teacherId; // instead of Teacher object
    private String subject;
    private LocalDate date;
    private String status; // "Present" or "Absent"
}

