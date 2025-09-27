package com.backend.iAttend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherDto {
    private Long id;
    private Long collegeId;  // instead of College object
    private String name;
    private String email;
    // password excluded from DTO for security
}
