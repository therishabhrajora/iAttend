package com.backend.iAttend.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDto {
    private Long id;
    private Long collegeId;
    private String name;
    private String rollNumber;
    private String studentClass;
}
